const images = {
  1: require('./1.png'),
  2: require('./2.png'),
  3: require('./3.png'),
  4: require('./4.png'),
  5: require('./5.png'),
  6: require('./6.png'),
  7: require('./7.png'),
  8: require('./8.png'),
  9: require('./9.png'),
  10: require('./10.png'),
  11: require('./11.png'),
  12: require('./12.png'),
};

export default function randomImage() {
  let min = 1;
  let max = 12;
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  /**
     * random var will return the random image
     * Math.floor -> this function will round the number to proper figure
     * Math.random -> this fn generates a random floating-point number between `0` (inclusiv) and `1` (exclusive). this means it 
     * can return a value as small as '0' but never quite '1'
     * 
     * Math.random() * (max - min + 1):
        This expression scales the random floating-point number to the range between 0 and (max - min + 1).
        (max - min + 1) represents the range of possible integer values. For example, if min is 5 and max is 10, the range is 6 (10 - 5 + 1), which covers the integers 5, 6, 7, 8, 9, 10
        Math.floor(Math.random() * (max - min + 1)) + min:

    Adding min shifts the range of possible values from 0 to (max - min) up to min to max. For example, if min is 5 and max is 10, the possible values from the previous step are 0 to 5. Adding 5 shifts these to the range 5 to 10.
        * 
        */
  return images[random];
}
