export const name = 'v03-throw-sync';
export function apply(ctx) {
  throw new Error('dshm-brickpack deliberate sync throw');
}
