const random = function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export { random };
