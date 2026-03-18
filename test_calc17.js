const vBase = 47210.44 / 84;

let totalSum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 25);
  let after = Math.max(0, i - 25);
  totalSum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`INCC 25: ${(totalSum/84).toFixed(2)}`);

totalSum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 26);
  let after = Math.max(0, i - 26);
  totalSum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`INCC 26: ${(totalSum/84).toFixed(2)}`);

totalSum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  // What if the 1.5% is applied to the base value?
  if (after > 0) {
    totalSum += vBase * (1 + before * 0.005 + after * 0.015);
  } else {
    totalSum += vBase * (1 + before * 0.005);
  }
}
console.log(`Added: ${(totalSum/84).toFixed(2)}`);
