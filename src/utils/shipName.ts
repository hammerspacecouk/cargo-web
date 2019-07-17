const characters: string[] = `abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ'`.split("");
const originalGuessLength: number = 25;
const characterIncrement: number = 7;

const getRandomCharacter = (): string => {
  return characters[Math.floor(Math.random() * characters.length)];
};

const getInitial = () => {
  // on the first run make an array of Random characters.
  // Each character will increment until it matches
  const guessArray = [];
  for (let i = 0; i < originalGuessLength; i++) {
    guessArray.push(getRandomCharacter());
  }
  return guessArray;
};

export const makeRandom = (previous: string, toMatch?: string): string => {
  const guessArray = previous.length > 1 ? previous.split("") : getInitial();

  let toMatchArray = null;
  if (toMatch) {
    toMatchArray = toMatch.padEnd(originalGuessLength).split("");
  }

  const charactersLength = characters.length;
  const guessLength = guessArray.length;
  const toMatchLength = toMatchArray ? toMatchArray.length : 0;

  if (toMatchArray && guessLength < toMatchLength) {
    for (let i = guessLength; i < toMatchLength; i++) {
      guessArray.push(getRandomCharacter());
    }
  }

  // check each of the guessed characters in turn
  for (let i = 0; i < guessLength; i++) {
    // if this character has arrived at the matching Name character, leave it alone
    if (toMatchArray && toMatchArray[i] === guessArray[i]) {
      continue;
    }

    // increment the character (wrapping around if required)
    let newIndex = characters.indexOf(guessArray[i]) + characterIncrement;
    if (newIndex >= charactersLength) {
      newIndex = newIndex - charactersLength;
    }
    guessArray[i] = characters[newIndex];
  }

  return guessArray.join("");
};
