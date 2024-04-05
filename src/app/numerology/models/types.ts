export interface Square {
  title: string;
  figure: number;
  result: string;
  description: string;
}

export interface FullDescription {
  title: string;
  text: string;
}

export interface RowAndCol {
  title: string;
  img: string;
  result: number;
  description: string;
}

export interface CharacterTraits {
  no: string;
  one: string;
  two: string;
  three: string;
  four: string;
  five: string;
  six: string;
}

type SetNumbers = {
  oneNum: CharacterTraits;
  twoNum: CharacterTraits;
  threeNum: CharacterTraits;
  fourNum: CharacterTraits;
  fiveNum: CharacterTraits;
  sixNum: CharacterTraits;
  sevenNum: CharacterTraits;
  eightNum: CharacterTraits;
  nineNum: CharacterTraits;
}

type SetRows = {
  row147: CharacterTraits;
  row258: CharacterTraits;
  row369: CharacterTraits;
}

type SetCols = {
  col123: CharacterTraits;
  col456: CharacterTraits;
  col789: CharacterTraits;
}
type SetDiags = {
  diag159: CharacterTraits;
  diag753: CharacterTraits;
}

type MaxDiag = {
  max159: string;
  max753: string;
  equality: string;
}

export interface Description {
  dataNumbers: SetNumbers;
  dataRow: SetRows;
  dataCol: SetCols;
  dataDiag: SetDiags;
  maxDiag: MaxDiag;
}
