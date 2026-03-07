// Returns +1 or -1 randomly
export function randomSign(): 1 | -1 {
  return Math.random() < 0.5 ? -1 : 1;
}
