export const checkState = (state: number) => {
  return state > 0 ? 'red' : state < 0 ? 'blue' : 'black';
};
