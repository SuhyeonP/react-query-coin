export const checkState = (state: number): string => {
  return state > 0 ? 'red' : state < 0 ? 'blue' : 'black';
};
export const deleteCommand = (arr: string[], some: string): string[] => {
  const idx = arr.indexOf(some);

  if (idx > -1) {
    arr.splice(idx, 1);
  }
  return arr;
};
