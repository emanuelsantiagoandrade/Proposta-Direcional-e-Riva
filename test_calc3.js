const vBase = 47210.44 / 84;
const target = 829.28;

for (let mBefore = 15; mBefore <= 30; mBefore++) {
  for (let mAfterOffset = -5; mAfterOffset <= 5; mAfterOffset++) {
    let sum = 0;
    for (let i = 1; i <= 84; i++) {
      let before = Math.min(i, mBefore);
      let after = Math.max(0, i - mBefore + mAfterOffset);
      sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
    }
    let avg = sum / 84;
    if (Math.abs(avg - target) < 1.0) {
      console.log(`Match: mBefore=${mBefore}, mAfterOffset=${mAfterOffset}, avg=${avg.toFixed(2)}`);
    }
  }
}

for (let mBefore = 15; mBefore <= 30; mBefore++) {
  for (let mAfterOffset = -5; mAfterOffset <= 5; mAfterOffset++) {
    let sum = 0;
    for (let i = 1; i <= 84; i++) {
      let before = Math.min(i - 1, mBefore);
      if (before < 0) before = 0;
      let after = Math.max(0, i - 1 - mBefore + mAfterOffset);
      sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
    }
    let avg = sum / 84;
    if (Math.abs(avg - target) < 1.0) {
      console.log(`Match (0-indexed): mBefore=${mBefore}, mAfterOffset=${mAfterOffset}, avg=${avg.toFixed(2)}`);
    }
  }
}

// What if IGPM is 1% instead of 1.5%?
// User said: "As que são do mês seguinte da entrega até terminar são ajustadas por 1,5%."
// So IGPM + 1% = 1.5%? No, IGPM is typically 0.5% + 1% = 1.5%.

// What if the INCC is applied to the month of delivery, but IGPM starts the month AFTER delivery?
// In the current code:
// monthsBeforeDelivery = mCount; // 25
// monthsAfterDelivery = i - mCount; // i - 25
// If delivery is May 2028, and installment is May 2028, it's before delivery.
// If installment is June 2028, it's after delivery.
// For June 2028 (i=26): monthsBeforeDelivery = 25, monthsAfterDelivery = 1.
// In this case, avg is 822.09.

// What if "até um mês antes" means INCC is applied up to April 2028 (24 months).
// And for May 2028 (i=25), it's already IGPM?
// Then mBefore = 24.
// For i=25: before = 24, after = 1.
// Let's check this:
let sum = 0;
let mBefore = 24;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, mBefore);
  let after = Math.max(0, i - mBefore);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`If mBefore=24, avg=${(sum/84).toFixed(2)}`);

// What if the first installment is NOT adjusted?
// i=1: before=0, after=0
// i=2: before=1, after=0
// ...
// i=24 (April 2028): before=23, after=0
// i=25 (May 2028): before=24, after=0
// i=26 (June 2028): before=24, after=1
sum = 0;
mBefore = 24;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i - 1, mBefore);
  let after = Math.max(0, i - 1 - mBefore);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`If 0-indexed and mBefore=24, avg=${(sum/84).toFixed(2)}`);

// What if the INCC stops at delivery (25 months), but IGPM starts from the first installment after delivery?
// Wait, the user said: "as parcelas até um mês antes devem está corrigidas com 0,5% e não até a data de entrega."
// This implies the INCC adjustment should stop 1 month BEFORE the delivery date.
// So if delivery is May 2028, INCC stops at April 2028.
// But what happens to the May 2028 installment? Is it adjusted by IGPM?
// User said: "As que são do mês seguinte da entrega até terminar são ajustadas por 1,5%."
// So:
// Up to 1 month before delivery (April 2028): INCC (0.5%)
// Delivery month (May 2028): ??? Maybe no adjustment? Or INCC? Or IGPM?
// Month after delivery (June 2028) to end: IGPM (1.5%)

// Let's test:
// Up to April 2028 (i=1 to 24): INCC
// May 2028 (i=25): INCC?
// June 2028 (i=26 to 84): IGPM
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = 0;
  let after = 0;
  if (i <= 24) {
    before = i;
  } else if (i === 25) {
    before = 24; // INCC stops at month before delivery?
  } else {
    before = 24;
    after = i - 25;
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
  } else {
    before = 24;
    after = i - 24; // IGPM starts at delivery month?
  }
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test B: avg=${(sum/84).toFixed(2)}`);

sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = 0;
  let after = 0;
  if (i <= 23) {
    before = i;
  } else {
    before = 23;
    after = i - 23;
  }
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test C: avg=${(sum/84).toFixed(2)}`);

