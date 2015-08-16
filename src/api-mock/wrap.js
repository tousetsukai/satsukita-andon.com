export default function wrap(val) {
  return new Promise((resolve) => {
    resolve(val);
  });
}
