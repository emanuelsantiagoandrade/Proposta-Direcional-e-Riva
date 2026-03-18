const vBase = 47210.44 / 84;

let sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = 0;
  let after = 0;
  if (i <= 24) {
    before = i;
  } else if (i === 25) {
    before = 24; // Keeps INCC from April 2028
  } else {
    before = 24;
    after = i - 25; // IGPM starts in June 2028
  }
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test A: avg=${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = 0;
  let after = 0;
  if (i <= 24) {
    before = i;
  } else if (i === 25) {
    before = 25; // INCC continues for May 2028
  } else {
    before = 25;
    after = i - 25; // IGPM starts in June 2028
  }
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test B: avg=${(sum/84).toFixed(2)}`);

// What if the delivery month is adjusted by IGPM?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = 0;
  let after = 0;
  if (i <= 24) {
    before = i;
  } else {
    before = 24;
    after = i - 24; // IGPM starts in May 2028
  }
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test C: avg=${(sum/84).toFixed(2)}`);

// What if INCC is applied up to 1 month before delivery, and IGPM starts from the month AFTER delivery, but the delivery month has NO adjustment?
// That's Test A.

// What if INCC is applied up to 1 month before delivery, and IGPM starts from the month AFTER delivery, but the delivery month has INCC + IGPM?
// That's Test C.
