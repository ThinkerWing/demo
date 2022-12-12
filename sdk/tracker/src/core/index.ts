import { DefaultOptons, Options, TrackerConfig, reportTrackerData } from "../types/index";
import { createHistoryEvnent } from "../utils/pv";
 
const MouseEventList: string[] = ['click', 'dblclick', 'contextmenu', 'mousedown', 'mouseup', 'mouseenter', 'mouseout', 'mouseover']
 
export default class Tracker {
    public data: Options;
    private version: string | undefined;
 
    public constructor(options: Options) {
        this.data = Object.assign(this.initDef(), options)
        this.installInnerTrack()
    }
 
    private initDef(): DefaultOptons {
        this.version = TrackerConfig.version;
        window.history['pushState'] = createHistoryEvnent("pushState")
        window.history['replaceState'] = createHistoryEvnent('replaceState')
        return <DefaultOptons>{
 
            sdkVersion: this.version,
            historyTracker: false,
            hashTracker: false,
            domTracker: false,
            jsError: false
        }
    }
 
    
    /**
    UV(独立访客)：即Unique Visitor，访问您网站的一台电脑客户端为一个访客
    用户唯一表示 可以在登录之后通过接口返回的id 进行设置值 提供了setUserId
    也可以使用canvas 指纹追踪技术
     */
    public setUserId<T extends DefaultOptons['uuid']>(uuid: T) {
        this.data.uuid = uuid;
    }
 
    public setExtra<T extends DefaultOptons['extra']>(extra: T) {
        this.data.extra = extra
    }
 
    public sendTracker<T extends reportTrackerData>(data: T) {
        this.reportTracker(data)
    }
 
    private captureEvents<T>(MouseEventList: string[], targetKey: string, data?: T) {
        MouseEventList.forEach(event => {
            window.addEventListener(event, () => {
                this.reportTracker({ event, targetKey, data })
            })
        })
    }
 
    private installInnerTrack() {
        console.log(this.data);
        if (this.data.historyTracker) {
            this.captureEvents(['pushState'], 'history-pv')
            this.captureEvents(['replaceState'], 'history-pv')
            this.captureEvents(['popstate'], 'history-pv')
        }
        if (this.data.hashTracker) {
            this.captureEvents(['hashchange'], 'hash-pv')
        }
        if (this.data.domTracker) {
            this.targetKeyReport()
        }
        if (this.data.jsError) {
            this.jsError()
        }
    }
    //dom 点击上报
    private targetKeyReport() {
        MouseEventList.forEach(event => {
            window.addEventListener(event, (e) => {
                const target = e.target as HTMLElement
                const targetValue = target.getAttribute('target-key')
                if (targetValue) {
                    this.sendTracker({
                        targetKey: targetValue,
                        event
                    })
                }
            })
        })
    }
 
    private jsError() {
        this.errorEvent()
        this.promiseReject()
    }
   //捕获js报错
    private errorEvent() {
        window.addEventListener('error', (e) => {
            this.sendTracker({
                targetKey: 'message',
                event: 'error',
                message: e.message
            })
        })
    }
   //捕获promise 错误
    private promiseReject() {
        window.addEventListener('unhandledrejection', (event) => {
            event.promise.catch(error => {
                this.sendTracker({
                    targetKey: "reject",
                    event: "promise",
                    message: error
                })
            })
        })
    }
   //上报
    private reportTracker<T>(data: T) {
        const params = Object.assign(this.data, data, { time: new Date().getTime() })
        let headers = {
            type: 'application/x-www-form-urlencoded'
        };
        let blob = new Blob([JSON.stringify(params)], headers);
        navigator.sendBeacon(this.data.requestUrl, blob)
    }
 
}
 
 
 