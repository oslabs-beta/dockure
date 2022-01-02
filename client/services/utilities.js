export const throttle = (fn, time) => {
  let timeoutId = null;

  return function () {
    if (timeoutId !== null) {
      return;
    }
    fn(...arguments);
    timeoutId = setTimeout(() => {
      timeoutId = null;
    }, time);
  };
};
