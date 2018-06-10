exports.shuffle = (array) => {
  const shuffleArray = [...array];
  let currentIndex = shuffleArray.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = shuffleArray[currentIndex];
    shuffleArray[currentIndex] = shuffleArray[randomIndex];
    shuffleArray[randomIndex] = temporaryValue;
  }

  return shuffleArray;
};

