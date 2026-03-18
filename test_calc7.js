const vBase = 47210.44 / 84;
const target = 829.28;

for (let inccCap = 20; inccCap <= 30; inccCap++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i, inccCap);
    let after = Math.max(0, i - inccCap - 1); // IGPM starts the month AFTER the cap?
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
  }
  let avg = sum / 84;
  if (Math.abs(avg - target) < 0.5) {
    console.log(`Match A: inccCap=${inccCap}, avg=${avg.toFixed(2)}`);
  }
}

for (let inccCap = 20; inccCap <= 30; inccCap++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i, inccCap);
    let after = Math.max(0, i - inccCap); // IGPM starts immediately after the cap
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
  }
  let avg = sum / 84;
  if (Math.abs(avg - target) < 0.5) {
    console.log(`Match B: inccCap=${inccCap}, avg=${avg.toFixed(2)}`);
  }
}

// What if the INCC is NOT accumulated, but just a flat 0.5% per month?
// What if it's 0-indexed?
for (let inccCap = 20; inccCap <= 30; inccCap++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i - 1, inccCap);
    let after = Math.max(0, i - 1 - inccCap);
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
  }
  let avg = sum / 84;
  if (Math.abs(avg - target) < 0.5) {
    console.log(`Match C (0-indexed): inccCap=${inccCap}, avg=${avg.toFixed(2)}`);
  }
}

// What if INCC is applied to ALL installments up to the delivery date, but IGPM is applied to ALL installments AFTER the delivery date?
// Wait, the user said: "as parcelas até um mês antes devem está corrigidas com 0,5% e não até a data de entrega."
// This means the INCC adjustment stops 1 month before delivery.
// If delivery is May 2028, 1 month before is April 2028.
// May 2026 to April 2028 is 24 months.
// So INCC is capped at 24 months.
// But what about the May 2028 installment? Is it adjusted by 0.5% * 24?
// And June 2028? 0.5% * 24 + 1.5% * 1?
// Let's check Match A with inccCap=24:
// i=24: before=24, after=0
// i=25: before=24, after=0
// i=26: before=24, after=1
// This is exactly Match A with inccCap=24.
