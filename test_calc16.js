const vBase = 562.03;

let totalSum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  totalSum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`vBase rounded: ${(totalSum/84).toFixed(2)}`);

totalSum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 23);
  let after = Math.max(0, i - 23);
  totalSum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`vBase rounded, INCC 23: ${(totalSum/84).toFixed(2)}`);
