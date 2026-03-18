const vBase = 47210.44 / 84;

const startDate = new Date(Date.UTC(2026, 4, 10)); // May 10, 2026
const deliveryDate = new Date(Date.UTC(2028, 4, 30)); // May 30, 2028
const inccEndDate = new Date(Date.UTC(2028, 3, 30)); // April 30, 2028

let totalSum = 0;

for (let i = 1; i <= 84; i++) {
  const currentInstallmentDate = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth() + (i - 1), startDate.getUTCDate()));
  
  let monthsBeforeDelivery = 0;
  let monthsAfterDelivery = 0;

  if (currentInstallmentDate > inccEndDate) {
    let mCount = 0;
    for (let j = 1; j <= i; j++) {
      const dDate = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth() + (j - 1), startDate.getUTCDate()));
      if (dDate <= inccEndDate) {
        mCount++;
      }
    }
    monthsBeforeDelivery = mCount;
    monthsAfterDelivery = i - mCount;
  } else {
    monthsBeforeDelivery = i;
    monthsAfterDelivery = 0;
  }

  const adjustedValue = vBase * (1 + monthsBeforeDelivery * 0.005) * (1 + monthsAfterDelivery * 0.015);
  totalSum += adjustedValue;
}

console.log(`App.tsx logic (INCC end date = April 30, 2028): ${(totalSum/84).toFixed(2)}`);

totalSum = 0;
for (let i = 1; i <= 84; i++) {
  const currentInstallmentDate = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth() + (i - 1), startDate.getUTCDate()));
  
  let monthsBeforeDelivery = 0;
  let monthsAfterDelivery = 0;

  if (currentInstallmentDate > deliveryDate) {
    let mCount = 0;
    for (let j = 1; j <= i; j++) {
      const dDate = new Date(Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth() + (j - 1), startDate.getUTCDate()));
      if (dDate <= deliveryDate) {
        mCount++;
      }
    }
    monthsBeforeDelivery = mCount;
    monthsAfterDelivery = i - mCount;
  } else {
    monthsBeforeDelivery = i;
    monthsAfterDelivery = 0;
  }

  const adjustedValue = vBase * (1 + monthsBeforeDelivery * 0.005) * (1 + monthsAfterDelivery * 0.015);
  totalSum += adjustedValue;
}

console.log(`App.tsx logic (INCC end date = deliveryDate): ${(totalSum/84).toFixed(2)}`);
