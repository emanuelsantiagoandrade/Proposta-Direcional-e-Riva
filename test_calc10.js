const vBase = 47210.44 / 84;
const target = 829.28;

let sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test 1 (mBefore=24, after=i-24): avg=${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 23);
  let after = Math.max(0, i - 23);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test 2 (mBefore=23, after=i-23): avg=${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 22);
  let after = Math.max(0, i - 22);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test 3 (mBefore=22, after=i-22): avg=${(sum/84).toFixed(2)}`);

// What if IGPM is ADDED instead of MULTIPLIED?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  sum += vBase * (1 + before * 0.005 + after * 0.015);
}
console.log(`Test 4 (Added, mBefore=24): avg=${(sum/84).toFixed(2)}`);

// What if the 1.5% is applied to the base value, and the 0.5% is applied to the base value?
// This is Test 4.

// What if INCC is applied to ALL installments up to delivery, but IGPM is applied to ALL installments?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = i;
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test 5 (IGPM all): avg=${(sum/84).toFixed(2)}`);

// What if INCC is compounded, but IGPM is simple?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  sum += vBase * Math.pow(1.005, before) * (1 + after * 0.015);
}
console.log(`Test 6 (Compound INCC, Simple IGPM, mBefore=24): avg=${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 23);
  let after = Math.max(0, i - 23);
  sum += vBase * Math.pow(1.005, before) * (1 + after * 0.015);
}
console.log(`Test 7 (Compound INCC, Simple IGPM, mBefore=23): avg=${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 25);
  let after = Math.max(0, i - 25);
  sum += vBase * Math.pow(1.005, before) * (1 + after * 0.015);
}
console.log(`Test 8 (Compound INCC, Simple IGPM, mBefore=25): avg=${(sum/84).toFixed(2)}`);

// What if INCC is simple, but IGPM is compound?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  sum += vBase * (1 + before * 0.005) * Math.pow(1.015, after);
}
console.log(`Test 9 (Simple INCC, Compound IGPM, mBefore=24): avg=${(sum/84).toFixed(2)}`);

// What if BOTH are compound?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  sum += vBase * Math.pow(1.005, before) * Math.pow(1.015, after);
}
console.log(`Test 10 (Compound both, mBefore=24): avg=${(sum/84).toFixed(2)}`);

// What if BOTH are compound, mBefore=23?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 23);
  let after = Math.max(0, i - 23);
  sum += vBase * Math.pow(1.005, before) * Math.pow(1.015, after);
}
console.log(`Test 11 (Compound both, mBefore=23): avg=${(sum/84).toFixed(2)}`);
