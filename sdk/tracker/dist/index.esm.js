//版本
var TrackerConfig;
(function (TrackerConfig) {
    TrackerConfig["version"] = "1.0.0";
})(TrackerConfig || (TrackerConfig = {}));

/**
    PV：页面访问量，即PageView，用户每次对网站的访问均被记录
    主要监听了 history 和 hash
    history API  go back  forward pushState  replaceState
    history 无法通过 popstate 监听 pushState replaceState  只能重写其函数 在utils/pv
    hash 使用hashchange 监听
 */
const createHistoryEvnent = (type) => {
    const origin = history[type];
    return function () {
        const res = origin.apply(this, arguments);
        var e = new Event(type);
        window.dispatchEvent(e);
        return res;
    };
};

const MouseEventList = ['click', 'dblclick', 'contextmenu', 'mousedown', 'mouseup', 'mouseenter', 'mouseout', 'mouseover'];
class Tracker {
    constructor(options) {
        this.data = Object.assign(this.initDef(), options);
        this.installInnerTrack();
    }
    initDef() {
        this.version = TrackerConfig.version;
        window.history['pushState'] = createHistoryEvnent("pushState");
        window.history['replaceState'] = createHistoryEvnent('replaceState');
        return {
            sdkVersion: this.version,
            historyTracker: false,
            hashTracker: false,
            domTracker: false,
            jsError: false
        };
    }
    /**
    UV(独立访客)：即Unique Visitor，访问您网站的一台电脑客户端为一个访客
    用户唯一表示 可以在登录之后通过接口返回的id 进行设置值 提供了setUserId
    也可以使用canvas 指纹追踪技术
     */
    setUserId(uuid) {
        this.data.uuid = uuid;
    }
    setExtra(extra) {
        this.data.extra = extra;
    }
    sendTracker(data) {
        this.reportTracker(data);
    }
    captureEvents(MouseEventList, targetKey, data) {
        MouseEventList.forEach(event => {
            window.addEventListener(event, () => {
                this.reportTracker({ event, targetKey, data });
            });
        });
    }
    installInnerTrack() {
        console.log(this.data);
        if (this.data.historyTracker) {
            this.captureEvents(['pushState'], 'history-pv');
            this.captureEvents(['replaceState'], 'history-pv');
            this.captureEvents(['popstate'], 'history-pv');
        }
        if (this.data.hashTracker) {
            this.captureEvents(['hashchange'], 'hash-pv');
        }
        if (this.data.domTracker) {
            this.targetKeyReport();
        }
        if (this.data.jsError) {
            this.jsError();
        }
    }
    //dom 点击上报
    targetKeyReport() {
        MouseEventList.forEach(event => {
            window.addEventListener(event, (e) => {
                const target = e.target;
                const targetValue = target.getAttribute('target-key');
                if (targetValue) {
                    this.sendTracker({
                        targetKey: targetValue,
                        event
                    });
                }
            });
        });
    }
    jsError() {
        this.errorEvent();
        this.promiseReject();
    }
    //捕获js报错
    errorEvent() {
        window.addEventListener('error', (e) => {
            this.sendTracker({
                targetKey: 'message',
                event: 'error',
                message: e.message
            });
        });
    }
    //捕获promise 错误
    promiseReject() {
        window.addEventListener('unhandledrejection', (event) => {
            event.promise.catch(error => {
                this.sendTracker({
                    targetKey: "reject",
                    event: "promise",
                    message: error
                });
            });
        });
    }
    //上报
    reportTracker(data) {
        const params = Object.assign(this.data, data, { time: new Date().getTime() });
        let headers = {
            type: 'application/x-www-form-urlencoded'
        };
        let blob = new Blob([JSON.stringify(params)], headers);
        navigator.sendBeacon(this.data.requestUrl, blob);
    }
}

export { Tracker as default };
