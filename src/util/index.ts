// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const checkState = (state: number) => {
  return state > 0 ? 'red' : state < 0 ? 'blue' : 'black';
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const deleteCommand = (arr: string[], some: string) => {
  const idx = arr.indexOf(some);

  if (idx > -1) {
    arr.splice(idx, 1);
  }
  return arr;
};
