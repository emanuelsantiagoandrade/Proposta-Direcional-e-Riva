const vBase = 47210.44 / 84;
const target = 829.28;

// What if the first installment is NOT adjusted?
// i=1: before=0, after=0
// i=2: before=1, after=0
// ...
// i=24 (April 2028): before=23, after=0
// i=25 (May 2028): before=24, after=0
// i=26 (June 2028): before=24, after=1
let sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i - 1, 24);
  let after = Math.max(0, i - 1 - 24);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test 1 (0-indexed, 24 months): avg=${(sum/84).toFixed(2)}`);

// What if the first installment is NOT adjusted, and IGPM starts at 23 months?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i - 1, 23);
  let after = Math.max(0, i - 1 - 23);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test 2 (0-indexed, 23 months): avg=${(sum/84).toFixed(2)}`);

// What if the first installment is NOT adjusted, and IGPM starts at 22 months?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i - 1, 22);
  let after = Math.max(0, i - 1 - 22);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test 3 (0-indexed, 22 months): avg=${(sum/84).toFixed(2)}`);

// What if the first installment is NOT adjusted, and IGPM starts at 21 months?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i - 1, 21);
  let after = Math.max(0, i - 1 - 21);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test 4 (0-indexed, 21 months): avg=${(sum/84).toFixed(2)}`);

// What if the first installment is NOT adjusted, and IGPM starts at 20 months?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i - 1, 20);
  let after = Math.max(0, i - 1 - 20);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test 5 (0-indexed, 20 months): avg=${(sum/84).toFixed(2)}`);
