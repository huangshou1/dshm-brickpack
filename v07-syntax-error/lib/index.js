export const name = 'v07-syntax-error';

// 设计死因：下一行 `=` 后缺少表达式，解析在此失败（故意保留，勿修）
const broken = ;

export function apply(ctx) {}
