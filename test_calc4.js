const vBase = 47210.44 / 84;
const target = 829.28;

// Let's test all possible combinations of before and after
for (let mBefore = 0; mBefore <= 40; mBefore++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i, mBefore);
    let after = Math.max(0, i - mBefore);
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
  }
  let avg = sum / 84;
  if (Math.abs(avg - target) < 0.5) {
    console.log(`Match A: mBefore=${mBefore}, avg=${avg.toFixed(2)}`);
  }
}

// What if the 1.5% is NOT multiplied, but added?
for (let mBefore = 0; mBefore <= 40; mBefore++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i, mBefore);
    let after = Math.max(0, i - mBefore);
    sum += vBase * (1 + before * 0.005 + after * 0.015);
  }
  let avg = sum / 84;
  if (Math.abs(avg - target) < 0.5) {
    console.log(`Match B (Added): mBefore=${mBefore}, avg=${avg.toFixed(2)}`);
  }
}

// What if INCC is applied to all, and IGPM is added?
for (let mBefore = 0; mBefore <= 40; mBefore++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = i;
    let after = Math.max(0, i - mBefore);
    sum += vBase * (1 + before * 0.005 + after * 0.015);
  }
  let avg = sum / 84;
  if (Math.abs(avg - target) < 0.5) {
    console.log(`Match C (INCC all, IGPM add): mBefore=${mBefore}, avg=${avg.toFixed(2)}`);
  }
}

// What if INCC is applied to all, and IGPM is multiplied?
for (let mBefore = 0; mBefore <= 40; mBefore++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = i;
    let after = Math.max(0, i - mBefore);
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
  }
  let avg = sum / 84;
  if (Math.abs(avg - target) < 0.5) {
    console.log(`Match D (INCC all, IGPM mult): mBefore=${mBefore}, avg=${avg.toFixed(2)}`);
  }
}

// What if INCC is applied up to mBefore, and then IGPM is applied to the REMAINING balance?
// No, it's a simple average of all installments.

// What if the first installment is 0 months?
for (let mBefore = 0; mBefore <= 40; mBefore++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i - 1, mBefore);
    let after = Math.max(0, i - 1 - mBefore);
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
  }
  let avg = sum / 84;
  if (Math.abs(avg - target) < 0.5) {
    console.log(`Match E (0-indexed): mBefore=${mBefore}, avg=${avg.toFixed(2)}`);
  }
}

// What if INCC is applied up to mBefore, and IGPM is applied from mBefore + 1, but they are added?
for (let mBefore = 0; mBefore <= 40; mBefore++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i, mBefore);
    let after = Math.max(0, i - mBefore);
    sum += vBase * (1 + before * 0.005 + after * 0.015);
  }
  let avg = sum / 84;
  if (Math.abs(avg - target) < 0.5) {
    console.log(`Match F (Added): mBefore=${mBefore}, avg=${avg.toFixed(2)}`);
  }
}

// What if INCC is applied up to mBefore, and IGPM is applied from mBefore + 1, but IGPM is 1%?
for (let mBefore = 0; mBefore <= 40; mBefore++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i, mBefore);
    let after = Math.max(0, i - mBefore);
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.01);
  }
  let avg = sum / 84;
  if (Math.abs(avg - target) < 0.5) {
    console.log(`Match G (IGPM 1%): mBefore=${mBefore}, avg=${avg.toFixed(2)}`);
  }
}

// What if INCC is applied up to mBefore, and IGPM is applied from mBefore + 1, but IGPM is 1% and added?
for (let mBefore = 0; mBefore <= 40; mBefore++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i, mBefore);
    let after = Math.max(0, i - mBefore);
    sum += vBase * (1 + before * 0.005 + after * 0.01);
  }
  let avg = sum / 84;
  if (Math.abs(avg - target) < 0.5) {
    console.log(`Match H (IGPM 1% Added): mBefore=${mBefore}, avg=${avg.toFixed(2)}`);
  }
}

// What if INCC is applied up to mBefore, and IGPM is applied from mBefore + 1, but IGPM is 1% and INCC continues?
for (let mBefore = 0; mBefore <= 40; mBefore++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = i;
    let after = Math.max(0, i - mBefore);
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.01);
  }
  let avg = sum / 84;
  if (Math.abs(avg - target) < 0.5) {
    console.log(`Match I (INCC all, IGPM 1% mult): mBefore=${mBefore}, avg=${avg.toFixed(2)}`);
  }
}

// What if INCC is applied up to mBefore, and IGPM is applied from mBefore + 1, but IGPM is 1% and INCC continues, added?
for (let mBefore = 0; mBefore <= 40; mBefore++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = i;
    let after = Math.max(0, i - mBefore);
    sum += vBase * (1 + before * 0.005 + after * 0.01);
  }
  let avg = sum / 84;
  if (Math.abs(avg - target) < 0.5) {
    console.log(`Match J (INCC all, IGPM 1% add): mBefore=${mBefore}, avg=${avg.toFixed(2)}`);
  }
}

// What if it's Compound INCC and Simple IGPM?
for (let mBefore = 0; mBefore <= 40; mBefore++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i, mBefore);
    let after = Math.max(0, i - mBefore);
    sum += vBase * Math.pow(1.005, before) * (1 + after * 0.015);
  }
  let avg = sum / 84;
  if (Math.abs(avg - target) < 0.5) {
    console.log(`Match K (Compound INCC, Simple IGPM): mBefore=${mBefore}, avg=${avg.toFixed(2)}`);
  }
}

// What if it's Compound INCC and Compound IGPM?
for (let mBefore = 0; mBefore <= 40; mBefore++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i, mBefore);
    let after = Math.max(0, i - mBefore);
    sum += vBase * Math.pow(1.005, before) * Math.pow(1.015, after);
  }
  let avg = sum / 84;
  if (Math.abs(avg - target) < 0.5) {
    console.log(`Match L (Compound INCC, Compound IGPM): mBefore=${mBefore}, avg=${avg.toFixed(2)}`);
  }
}
