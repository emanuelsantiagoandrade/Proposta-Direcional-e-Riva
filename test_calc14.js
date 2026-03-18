const vBase = 47210.44 / 84;

let sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  if (after > 0) {
    sum += vBase * (1 + after * 0.015); // ONLY IGPM?
  } else {
    sum += vBase * (1 + before * 0.005);
  }
}
console.log(`Only IGPM after delivery: ${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  if (after > 0) {
    sum += vBase * (1 + (before * 0.005) + (after * 0.015)); // Added
  } else {
    sum += vBase * (1 + before * 0.005);
  }
}
console.log(`Added INCC and IGPM: ${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  // What if IGPM is 1.5% per month, but it starts counting from month 1?
  if (after > 0) {
    sum += vBase * (1 + before * 0.005) * (1 + i * 0.015);
  } else {
    sum += vBase * (1 + before * 0.005);
  }
}
console.log(`IGPM from month 1: ${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  // What if IGPM is 1.5% per month, starting from month 25, but applied to the base value?
  if (after > 0) {
    sum += vBase * (1 + before * 0.005) * Math.pow(1.015, after);
  } else {
    sum += vBase * (1 + before * 0.005);
  }
}
console.log(`Compound IGPM: ${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  // What if INCC is applied for 24 months, and IGPM is applied for 60 months, but IGPM is 1.5% of the INCC-adjusted value?
  // This is the current logic.
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Current logic (INCC 24, IGPM i-24): ${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 23);
  let after = Math.max(0, i - 23);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Current logic (INCC 23, IGPM i-23): ${(sum/84).toFixed(2)}`);

// What if the 1.5% is applied to the base value, but starting from month 25?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  if (after > 0) {
    // INCC up to 24, plus IGPM for `after` months
    sum += vBase * (1 + 24 * 0.005) * (1 + after * 0.015);
  } else {
    sum += vBase * (1 + before * 0.005);
  }
}
console.log(`INCC 24 fixed, IGPM i-24: ${(sum/84).toFixed(2)}`);

// What if INCC is 0.5% and IGPM is 1.5%, but IGPM is applied from month 24?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 23); // IGPM starts at month 24
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`INCC 24, IGPM i-23: ${(sum/84).toFixed(2)}`);

// What if INCC is 0.5% and IGPM is 1.5%, but IGPM is applied from month 23?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 22); // IGPM starts at month 23
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`INCC 24, IGPM i-22: ${(sum/84).toFixed(2)}`);

// What if INCC is 0.5% and IGPM is 1.5%, but IGPM is applied from month 25?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 25); // IGPM starts at month 26
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`INCC 24, IGPM i-25: ${(sum/84).toFixed(2)}`);
