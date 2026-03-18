const vBase = 47210.44 / 84;

function test(name, fn) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    sum += fn(i);
  }
  console.log(`${name}: ${(sum/84).toFixed(2)}`);
}

// 1-indexed, INCC up to 23
test("1-idx, INCC 23, IGPM i-23", i => {
  let before = Math.min(i, 23);
  let after = Math.max(0, i - 23);
  return vBase * (1 + before * 0.005) * (1 + after * 0.015);
});

// 0-indexed, INCC up to 23
test("0-idx, INCC 23, IGPM i-23", i => {
  let idx = i - 1;
  let before = Math.min(idx, 23);
  let after = Math.max(0, idx - 23);
  return vBase * (1 + before * 0.005) * (1 + after * 0.015);
});

// 0-indexed, INCC up to 24
test("0-idx, INCC 24, IGPM i-24", i => {
  let idx = i - 1;
  let before = Math.min(idx, 24);
  let after = Math.max(0, idx - 24);
  return vBase * (1 + before * 0.005) * (1 + after * 0.015);
});

// 1-indexed, INCC up to 24, but IGPM starts at 1
test("1-idx, INCC 24, IGPM starts 1", i => {
  let before = Math.min(i, 24);
  let after = i > 24 ? i - 24 : 0;
  return vBase * (1 + before * 0.005) * (1 + after * 0.015);
});

// What if INCC is applied to ALL installments, but capped at 24?
// And IGPM is applied to ALL installments, but capped at 60?

// Let's try compound INCC and simple IGPM
test("Compound INCC 24, Simple IGPM i-24", i => {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  return vBase * Math.pow(1.005, before) * (1 + after * 0.015);
});

// Compound INCC 23, Simple IGPM i-23
test("Compound INCC 23, Simple IGPM i-23", i => {
  let before = Math.min(i, 23);
  let after = Math.max(0, i - 23);
  return vBase * Math.pow(1.005, before) * (1 + after * 0.015);
});

// What if INCC is 0.5% and IGPM is 1.5% and they are ADDED?
test("Added, INCC 24, IGPM i-24", i => {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  return vBase * (1 + before * 0.005 + after * 0.015);
});

test("Added, INCC 23, IGPM i-23", i => {
  let before = Math.min(i, 23);
  let after = Math.max(0, i - 23);
  return vBase * (1 + before * 0.005 + after * 0.015);
});

// What if the first installment has 1 month of INCC, etc.
// Let's try to find exactly 829.28
for (let b = 20; b <= 30; b++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i, b);
    let after = Math.max(0, i - b);
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
  }
  if (Math.abs(sum/84 - 829.28) < 1) {
    console.log(`Found close match: INCC ${b}, avg ${(sum/84).toFixed(2)}`);
  }
}

for (let b = 20; b <= 30; b++) {
  let sum = 0;
  for (let i = 0; i < 84; i++) {
    let before = Math.min(i, b);
    let after = Math.max(0, i - b);
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
  }
  if (Math.abs(sum/84 - 829.28) < 1) {
    console.log(`Found close match (0-idx): INCC ${b}, avg ${(sum/84).toFixed(2)}`);
  }
}
