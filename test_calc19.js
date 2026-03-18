const vBase = 47210.44 / 84;

let sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  let val = vBase * (1 + before * 0.005) * (1 + after * 0.015);
  sum += Math.round(val * 100) / 100;
}
console.log(`Rounded before sum: ${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  let val = vBase * (1 + before * 0.005) * (1 + after * 0.015);
  sum += Math.floor(val * 100) / 100;
}
console.log(`Floored before sum: ${(sum/84).toFixed(2)}`);
