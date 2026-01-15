export interface ICarControlSubComputer {
  compute: (intentValue: number, currentValue: number, deltaTime: number) => number;
}