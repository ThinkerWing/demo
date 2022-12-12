git 地址
[github](https://github.com/ThinkerWing/demo)
[npm](https://www.npmjs.com/package/thinksdk-tracker)
# 使用demo
```html
<script src="./dist/index.js"></script>
    <button target-key="btn">按钮</button>
    <button>普通按钮</button>
    <button onclick="fn()">抛出错误按钮</button>
    <script>
        new tracker({
            requestUrl:'http://localhost:9000/tracker',
            historyTracker: true,
            domTracker: true,
            jsError: true
        })
        function fn() {
            throw Error('error')
        }
    </script>
```
/**
 * @requestUrl 接口地址
 * @historyTracker history上报
 * @hashTracker hash上报
 * @domTracker 携带Tracker-key 点击事件上报
 * @sdkVersionsdk版本
 * @extra透传字段
 * @jsError js 和 promise 报错异常上报
 */
 export interface DefaultOptons {
    uuid: string | undefined, // 用来做uv的
    requestUrl: string | undefined, // 上报的后台地址
    historyTracker: boolean, // 单页应用 有hash/history
    hashTracker: boolean,
    domTracker: boolean, // dom 点击事件之类的是否要上报
    sdkVersion: string | number,
    extra: Record<string, any> | undefined,
    jsError:boolean // 报错是否要上报
}
 
//必传参数 requestUrl
export interface Options extends Partial<DefaultOptons> {
    requestUrl: string,
}
 



# 开发流程
```npm init -y ``` 
生成package.json


```tsc --init``` 生成tsconfig.js

# 安装开发依赖
```
npm install rollup -D
npm install rollup-plugin-dts -D
npm install rollup-plugin-typescript2 -D
npm install typescript -D
```

```
es => import export
cjs => require exports
umd => AMD CMD global
```