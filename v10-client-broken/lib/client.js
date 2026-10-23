import 'dshm-brickpack-no-such-client-package';

// 顶层 import 先于本注册执行；该包不存在，client 半身在此失败。
window.__ModuleLoader__.load({
  id: 'v10-client-broken',
  factory() {
    return { apply() {} };
  },
});
