(window as any).global = window;
global.Buffer = global.Buffer || ({} as any);
global.process = { 
  env: { DEBUG: undefined },
  version: '',
  nextTick: (cb: Function) => setTimeout(cb, 0)
} as any;
global.Buffer.TYPED_ARRAY_SUPPORT = false;
(window as any).process = global.process;
