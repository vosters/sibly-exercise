export const stringify = <T>(val: any): string => {
  return typeof val === 'object' ? JSON.stringify(val) : String(val);
};

export const hashArgs = (...args: any): string => {
  return args.reduce((acc: any, arg: any) => stringify(arg) + ':' + acc, '');
};
