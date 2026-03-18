const vBase = 47210.44 / 84;

for (let b = 20; b <= 30; b++) {
  for (let aOffset = -5; aOffset <= 5; aOffset++) {
    let sum = 0;
    for (let i = 1; i <= 84; i++) {
      let before = Math.min(i, b);
      let after = Math.max(0, i - (b + aOffset));
      sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
    }
    let avg = sum / 84;
    if (Math.abs(avg - 825.84) < 0.1) {
      console.log(`Match 825.84: b=${b}, aOffset=${aOffset}, avg=${avg.toFixed(2)}`);
    }
    if (Math.abs(avg - 829.28) < 0.1) {
      console.log(`Match 829.28: b=${b}, aOffset=${aOffset}, avg=${avg.toFixed(2)}`);
    }
  }
}
