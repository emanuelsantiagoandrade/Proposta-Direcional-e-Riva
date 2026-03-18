const vBase = 47210.44 / 84;

let sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 23);
  let after = Math.max(0, i - 23);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Simple INCC 23, Simple IGPM i-23: ${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 23);
  let after = Math.max(0, i - 23);
  sum += vBase * Math.pow(1.005, before) * (1 + after * 0.015);
}
console.log(`Compound INCC 23, Simple IGPM i-23: ${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 23);
  let after = Math.max(0, i - 23);
  sum += vBase * (1 + before * 0.005) * Math.pow(1.015, after);
}
console.log(`Simple INCC 23, Compound IGPM i-23: ${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 23);
  let after = Math.max(0, i - 23);
  sum += vBase * Math.pow(1.005, before) * Math.pow(1.015, after);
}
console.log(`Compound INCC 23, Compound IGPM i-23: ${(sum/84).toFixed(2)}`);
