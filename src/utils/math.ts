export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
};
export const easeOut = (currentTime: number, startValue: number, changeInValue: number, duration: number) => {
  currentTime /= duration;
  return -changeInValue * currentTime * (currentTime - 2) + startValue;
};
