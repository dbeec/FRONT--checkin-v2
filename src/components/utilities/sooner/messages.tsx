export default function delayPromise() {
  return new Promise((resolve) => setTimeout(resolve, 3000));
}