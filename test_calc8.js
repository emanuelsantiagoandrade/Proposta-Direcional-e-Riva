const vBase = 47210.44 / 84;
const target = 829.28;

// Test: INCC up to 1 month before delivery (24 months).
// IGPM starts on the delivery month (Installment 25).
let sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test 1: avg=${(sum/84).toFixed(2)}`);

// Test: INCC up to 1 month before delivery (24 months).
// IGPM starts 1 month before delivery (Installment 24).
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 23);
  let after = Math.max(0, i - 23);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test 2: avg=${(sum/84).toFixed(2)}`);

// Test: INCC up to 2 months before delivery (23 months).
// IGPM starts 1 month before delivery (Installment 24).
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 22);
  let after = Math.max(0, i - 22);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test 3: avg=${(sum/84).toFixed(2)}`);

// What if INCC is NOT capped, but IGPM starts earlier?
// "as parcelas até um mês antes devem está corrigidas com 0,5% e não até a data de entrega."
// This means the 0.5% correction applies only up to 1 month before delivery.
// If it applies up to 1 month before delivery, then the installments AFTER that must be corrected by 1.5%.
// So Installment 25 (delivery month) is corrected by 1.5%.
// Let's check Test 1 again. Test 1 gave 825.94.
// Still not 829.28.

// What if the 0.5% is applied to ALL installments, but the 1.5% is applied to installments after 1 month before delivery?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = i;
  let after = Math.max(0, i - 24);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test 4: avg=${(sum/84).toFixed(2)}`);

// What if the 0.5% is applied to ALL installments, and the 1.5% is applied to installments after 23 months?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = i;
  let after = Math.max(0, i - 23);
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test 5: avg=${(sum/84).toFixed(2)}`);

// What if the 0.5% is applied up to 24 months, and the 1.5% is applied to ALL installments?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = i;
  sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
}
console.log(`Test 6: avg=${(sum/84).toFixed(2)}`);

// What if the 0.5% is applied up to 24 months, and the 1.5% is applied to installments after 24 months, but ADDED?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  sum += vBase * (1 + before * 0.005 + after * 0.015);
}
console.log(`Test 7: avg=${(sum/84).toFixed(2)}`);

// What if the 0.5% is applied up to 24 months, and the 1.5% is applied to installments after 24 months, but COMPOUNDED?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 24);
  let after = Math.max(0, i - 24);
  sum += vBase * Math.pow(1.005, before) * Math.pow(1.015, after);
}
console.log(`Test 8: avg=${(sum/84).toFixed(2)}`);

// What if the 0.5% is applied up to 23 months, and the 1.5% is applied to installments after 23 months, COMPOUNDED?
sum = 0;
for (let i = 1; i <= 84; i++) {
  let before = Math.min(i, 23);
  let after = Math.max(0, i - 23);
  sum += vBase * Math.pow(1.005, before) * Math.pow(1.015, after);
}
console.log(`Test 9: avg=${(sum/84).toFixed(2)}`);
