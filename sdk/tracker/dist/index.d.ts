/**
 * @requestUrl 接口地址
 * @historyTracker history上报
 * @hashTracker hash上报
 * @domTracker 携带Tracker-key 点击事件上报
 * @sdkVersionsdk版本
 * @extra透传字段
 * @jsError js 和 promise 报错异常上报
 */
interface DefaultOptons {
    uuid: string | undefined;
    requestUrl: string | undefined;
    historyTracker: boolean;
    hashTracker: boolean;
    domTracker: boolean;
    sdkVersion: string | number;
    extra: Record<string, any> | undefined;
    jsError: boolean;
}
interface Options extends Partial<DefaultOptons> {
    requestUrl: string;
}
type reportTrackerData = {
    [key: string]: any;
    event: string;
    targetKey: string;
};

declare class Tracker {
    data: Options;
    private version;
    constructor(options: Options);
    private initDef;
    /**
    UV(独立访客)：即Unique Visitor，访问您网站的一台电脑客户端为一个访客
    用户唯一表示 可以在登录之后通过接口返回的id 进行设置值 提供了setUserId
    也可以使用canvas 指纹追踪技术
     */
    setUserId<T extends DefaultOptons['uuid']>(uuid: T): void;
    setExtra<T extends DefaultOptons['extra']>(extra: T): void;
    sendTracker<T extends reportTrackerData>(data: T): void;
    private captureEvents;
    private installInnerTrack;
    private targetKeyReport;
    private jsError;
    private errorEvent;
    private promiseReject;
    private reportTracker;
}

export { Tracker as default };
