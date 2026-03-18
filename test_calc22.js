const vBase = 47210.44 / 84;

let sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  sum += vBase * Math.pow(1.005, before) * (1 + after * 0.015);
}
console.log(`Compound INCC 24, Simple IGPM i-24: ${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 25);
  let after = Math.max(0, i - 25);
  sum += vBase * Math.pow(1.005, before) * (1 + after * 0.015);
}
console.log(`Compound INCC 25, Simple IGPM i-25: ${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  sum += vBase * (1 + before * 0.005) * Math.pow(1.015, after);
}
console.log(`Simple INCC 24, Compound IGPM i-24: ${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 25);
  let after = Math.max(0, i - 25);
  sum += vBase * (1 + before * 0.005) * Math.pow(1.015, after);
}
console.log(`Simple INCC 25, Compound IGPM i-25: ${(sum/84).toFixed(2)}`);
