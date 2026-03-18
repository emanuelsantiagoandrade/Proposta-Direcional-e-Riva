const vBase = 47210.44 / 84;

// Test simple multiplied
console.log("--- Simple Multiplied ---");
for (let m = 20; m <= 30; m++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i, m);
    let after = Math.max(0, i - m);
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
  }
  console.log(`Simple Mult m=${m}:`, sum / 84);
}

// What if the 1.5% is NOT multiplied by the accumulated INCC?
console.log("--- Simple Added (INCC + IGPM) ---");
for (let m = 20; m <= 30; m++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i, m);
    let after = Math.max(0, i - m);
    sum += vBase * (1 + before * 0.005 + after * 0.015);
  }
  console.log(`Simple Add m=${m}:`, sum / 84);
}

// What if the 1.5% is applied to the base value, and INCC is applied to the base value, but they are added?
// That's the same as above.

// What if INCC continues after delivery, and IGPM is added on top?
console.log("--- INCC continues, IGPM added after ---");
for (let m = 20; m <= 30; m++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = i; // INCC for all months
    let after = Math.max(0, i - m);
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.01); // 1% or 1.5%?
  }
  console.log(`INCC continues, IGPM 1% m=${m}:`, sum / 84);
}

console.log("--- INCC continues, IGPM 1.5% added after ---");
for (let m = 20; m <= 30; m++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = i; // INCC for all months
    let after = Math.max(0, i - m);
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.015); // 1% or 1.5%?
  }
  console.log(`INCC continues, IGPM 1.5% m=${m}:`, sum / 84);
}

// What if the accumulated INCC is fixed at delivery, and then IGPM is applied on top of that fixed value?
console.log("--- Fixed INCC at delivery, IGPM on top ---");
for (let m = 20; m <= 30; m++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i, m);
    let after = Math.max(0, i - m);
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
  }
  console.log(`Fixed INCC, IGPM on top m=${m}:`, sum / 84);
}

// Wait, the user said: "as parcelas até um mês antes devem está corrigidas com 0,5% e não até a data de entrega."
// If delivery is May 2028, "um mês antes" is April 2028.
// May 2026 to April 2028 is 24 months.
// So m = 24.
// But none of the m=24 results are 829.28.
// Let's check the exact formula for 829.28.
// 829.28 * 84 = 69659.52
// Total sum = 69659.52

// What if the first installment has 0 months of adjustment?
console.log("--- First installment has 0 months adjustment ---");
for (let m = 20; m <= 30; m++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i - 1, m);
    let after = Math.max(0, i - 1 - m);
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
  }
  console.log(`First 0, Simple Mult m=${m}:`, sum / 84);
}

// What if the first installment has 0 months adjustment, and INCC is fixed at delivery?
console.log("--- First 0, INCC fixed at delivery ---");
for (let m = 20; m <= 30; m++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i - 1, m);
    let after = Math.max(0, i - 1 - m);
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
  }
  console.log(`First 0, Fixed INCC m=${m}:`, sum / 84);
}

// What if INCC is applied to ALL installments, and IGPM is added after?
console.log("--- INCC to all, IGPM added after ---");
for (let m = 20; m <= 30; m++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = i;
    let after = Math.max(0, i - m);
    sum += vBase * (1 + before * 0.005 + after * 0.015);
  }
  console.log(`INCC all, IGPM add m=${m}:`, sum / 84);
}

// What if the adjustment is compound for INCC and simple for IGPM?
console.log("--- Compound INCC, Simple IGPM ---");
for (let m = 20; m <= 30; m++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i, m);
    let after = Math.max(0, i - m);
    sum += vBase * Math.pow(1.005, before) * (1 + after * 0.015);
  }
  console.log(`Compound INCC, Simple IGPM m=${m}:`, sum / 84);
}

// What if the adjustment is simple for INCC and compound for IGPM?
console.log("--- Simple INCC, Compound IGPM ---");
for (let m = 20; m <= 30; m++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i, m);
    let after = Math.max(0, i - m);
    sum += vBase * (1 + before * 0.005) * Math.pow(1.015, after);
  }
  console.log(`Simple INCC, Compound IGPM m=${m}:`, sum / 84);
}
