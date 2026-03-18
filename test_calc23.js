const vBase = 47210.44 / 84;

let sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Current logic (INCC 24, IGPM i-24): ${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  // What if INCC is compounded, and IGPM is compounded?
  sum += vBase * Math.pow(1.005, before) * Math.pow(1.015, after);
}
console.log(`Compound both (INCC 24, IGPM i-24): ${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  // What if INCC is compounded, and IGPM is simple?
  sum += vBase * Math.pow(1.005, before) * (1 + after * 0.015);
}
console.log(`Compound INCC 24, Simple IGPM i-24: ${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 23);
  let after = Math.max(0, i - 23);
  // What if INCC is compounded, and IGPM is simple?
  sum += vBase * Math.pow(1.005, before) * (1 + after * 0.015);
}
console.log(`Compound INCC 23, Simple IGPM i-23: ${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  // What if INCC is simple, and IGPM is compounded?
  sum += vBase * (1 + before * 0.005) * Math.pow(1.015, after);
}
console.log(`Simple INCC 24, Compound IGPM i-24: ${(sum/84).toFixed(2)}`);

// What if the user meant 1.5% ONLY (not IGPM + 1%)?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Simple INCC 24, Simple IGPM 1.5% i-24: ${(sum/84).toFixed(2)}`);

// What if the user meant 1.5% ONLY, but compounded?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  sum += vBase * (1 + before * 0.005) * Math.pow(1.015, after);
}
console.log(`Simple INCC 24, Compound IGPM 1.5% i-24: ${(sum/84).toFixed(2)}`);

// What if INCC is 0.5% compounded and IGPM is 1.5% compounded?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  sum += vBase * Math.pow(1.005, before) * Math.pow(1.015, after);
}
console.log(`Compound INCC 24, Compound IGPM 1.5% i-24: ${(sum/84).toFixed(2)}`);

// What if INCC is 0.5% simple and IGPM is 1.5% simple, but IGPM is applied to the base value?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  if (after > 0) {
    sum += vBase * (1 + before * 0.005 + after * 0.015);
  } else {
    sum += vBase * (1 + before * 0.005);
  }
}
console.log(`Added INCC 24, IGPM 1.5% i-24: ${(sum/84).toFixed(2)}`);

// What if INCC is 0.5% simple and IGPM is 1.5% simple, but IGPM starts from month 1?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  if (after > 0) {
    sum += vBase * (1 + before * 0.005) * (1 + i * 0.015);
  } else {
    sum += vBase * (1 + before * 0.005);
  }
}
console.log(`Simple INCC 24, Simple IGPM 1.5% from month 1: ${(sum/84).toFixed(2)}`);

// What if INCC is 0.5% simple and IGPM is 1.5% simple, but IGPM starts from month 25?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  if (after > 0) {
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
  } else {
    sum += vBase * (1 + before * 0.005);
  }
}
console.log(`Simple INCC 24, Simple IGPM 1.5% from month 25: ${(sum/84).toFixed(2)}`);

// Let's try to find exactly 829.28 with simple interest
for (let b = 20; b <= 30; b++) {
  for (let aOffset = -5; aOffset <= 5; aOffset++) {
    let sum = 0;
    for (let i = 1; i <= 84; i++) {
      let before = Math.min(i, b);
      let after = Math.max(0, i - (b + aOffset));
      sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
    }
    let avg = sum / 84;
    if (Math.abs(avg - 829.28) < 0.1) {
      console.log(`Match 829.28 (Simple): b=${b}, aOffset=${aOffset}, avg=${avg.toFixed(2)}`);
    }
  }
}

// Let's try to find exactly 829.28 with compound INCC and simple IGPM
for (let b = 20; b <= 30; b++) {
  for (let aOffset = -5; aOffset <= 5; aOffset++) {
    let sum = 0;
    for (let i = 1; i <= 84; i++) {
      let before = Math.min(i, b);
      let after = Math.max(0, i - (b + aOffset));
      sum += vBase * Math.pow(1.005, before) * (1 + after * 0.015);
    }
    let avg = sum / 84;
    if (Math.abs(avg - 829.28) < 0.1) {
      console.log(`Match 829.28 (Compound INCC, Simple IGPM): b=${b}, aOffset=${aOffset}, avg=${avg.toFixed(2)}`);
    }
  }
}

// Let's try to find exactly 829.28 with simple INCC and compound IGPM
for (let b = 20; b <= 30; b++) {
  for (let aOffset = -5; aOffset <= 5; aOffset++) {
    let sum = 0;
    for (let i = 1; i <= 84; i++) {
      let before = Math.min(i, b);
      let after = Math.max(0, i - (b + aOffset));
      sum += vBase * (1 + before * 0.005) * Math.pow(1.015, after);
    }
    let avg = sum / 84;
    if (Math.abs(avg - 829.28) < 0.1) {
      console.log(`Match 829.28 (Simple INCC, Compound IGPM): b=${b}, aOffset=${aOffset}, avg=${avg.toFixed(2)}`);
    }
  }
}

// Let's try to find exactly 829.28 with compound INCC and compound IGPM
for (let b = 20; b <= 30; b++) {
  for (let aOffset = -5; aOffset <= 5; aOffset++) {
    let sum = 0;
    for (let i = 1; i <= 84; i++) {
      let before = Math.min(i, b);
      let after = Math.max(0, i - (b + aOffset));
      sum += vBase * Math.pow(1.005, before) * Math.pow(1.015, after);
    }
    let avg = sum / 84;
    if (Math.abs(avg - 829.28) < 0.1) {
      console.log(`Match 829.28 (Compound INCC, Compound IGPM): b=${b}, aOffset=${aOffset}, avg=${avg.toFixed(2)}`);
    }
  }
}
