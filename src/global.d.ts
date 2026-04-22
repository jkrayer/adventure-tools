export {};

declare global {
  type dieType = 4 | 6 | 8 | 10 | 12 | 20 | 100;

  type Table = {
    id: number;
    name: string;
    noOfDice: number;
    dieType: dieType;
    entries: { start: number; end: number; effect: string }[];
  };

  type Character = {
    id: number;
    ac: number;
    character: string;
    currentHP: number;
    link: string;
    maxHP: number;
    player: string;
  };
}
