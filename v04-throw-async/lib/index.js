export const name = 'v04-throw-async';
export function apply(ctx) {
  return Promise.reject(new Error('dshm-brickpack deliberate async throw'));
}
