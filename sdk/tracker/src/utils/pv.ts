/**
    PV：页面访问量，即PageView，用户每次对网站的访问均被记录
    主要监听了 history 和 hash
    history API  go back  forward pushState  replaceState  
    history 无法通过 popstate 监听 pushState replaceState  只能重写其函数 在utils/pv
    hash 使用hashchange 监听
 */
export const createHistoryEvnent = <T extends keyof History>(
  type: T
): (() => any) => {
  const origin = history[type];
  return function(this: any) {
    const res = origin.apply(this, arguments);
    var e = new Event(type);
    window.dispatchEvent(e);
    return res;
  };
};
