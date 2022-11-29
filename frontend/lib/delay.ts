// delay 5 sec for loading
export function delay(ms: number = 2000) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
