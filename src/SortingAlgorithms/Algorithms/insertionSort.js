const insertionSort = (array, barIndexPosition, arraySteps, colorSteps) => {
   let colorKey = colorSteps[colorSteps.length - 1].slice();

   let i, j, key;
   for (i = 1; i < array.length; i++) {
      key = array[i];
      j = i - 1;

      while (j >= 0 && array[j] > key) {
         array[j + 1] = array[j];
         arraySteps.push(array.slice());
         colorKey[i] = 0;
         colorKey[j] = 0;
         colorSteps.push(colorKey.slice());
         colorKey[j + 1] = 2;
         colorKey[i] = 1;
         colorKey[j] = 2;
         j = j - 1;
      }
      array[j + 1] = key;
      arraySteps.push(array.slice());
      colorSteps.push(colorKey.slice());
   }
   colorSteps[colorSteps.length - 1] = new Array(array.length).fill(3);
};

export default insertionSort;
