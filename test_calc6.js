const vBase = 47210.44 / 84;
const target = 829.28;

for (let inccMonths = 0; inccMonths <= 84; inccMonths++) {
  for (let igpmMonths = 0; igpmMonths <= 84; igpmMonths++) {
    let sum = 0;
    for (let i = 1; i <= 84; i++) {
      let before = Math.min(i, inccMonths);
      let after = Math.max(0, i - igpmMonths);
      sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
    }
    let avg = sum / 84;
    if (Math.abs(avg - target) < 0.5) {
      console.log(`Match: inccMonths=${inccMonths}, igpmMonths=${igpmMonths}, avg=${avg.toFixed(2)}`);
    }
  }
}
