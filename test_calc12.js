const vBase = 47210.44 / 84;
const target = 829.28;

for (let startOffset = 0; startOffset <= 5; startOffset++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i + startOffset, 24 + startOffset);
    let after = Math.max(0, i + startOffset - (24 + startOffset));
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
  }
  let avg = sum / 84;
  console.log(`startOffset=${startOffset}, avg=${avg.toFixed(2)}`);
}

for (let startOffset = 0; startOffset <= 5; startOffset++) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = Math.min(i + startOffset, 24);
    let after = Math.max(0, i + startOffset - 24);
    sum += vBase * (1 + before * 0.005) * (1 + after * 0.015);
  }
  let avg = sum / 84;
  console.log(`startOffset=${startOffset} (cap 24), avg=${avg.toFixed(2)}`);
}
