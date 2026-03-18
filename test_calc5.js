const vBase = 47210.44 / 84;
const target = 829.28;

// Let's test different adjustments for the delivery month
for (let deliveryMonthAdj of [0, 0.005, 0.015]) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = 0;
    let after = 0;
    let adj = 0;
    if (i <= 24) {
      // Up to 1 month before delivery
      before = i;
      adj = (1 + before * 0.005);
    } else if (i === 25) {
      // Delivery month
      if (deliveryMonthAdj === 0) {
        adj = (1 + 24 * 0.005); // Fixed at previous month
      } else if (deliveryMonthAdj === 0.005) {
        adj = (1 + 25 * 0.005); // Continues INCC
      } else if (deliveryMonthAdj === 0.015) {
        adj = (1 + 24 * 0.005) * (1 + 1 * 0.015); // Starts IGPM
      }
    } else {
      // Month after delivery to end
      before = 24; // Or 25?
      after = i - 25; // If i=26, after=1
      
      if (deliveryMonthAdj === 0) {
        adj = (1 + 24 * 0.005) * (1 + after * 0.015);
      } else if (deliveryMonthAdj === 0.005) {
        adj = (1 + 25 * 0.005) * (1 + after * 0.015);
      } else if (deliveryMonthAdj === 0.015) {
        adj = (1 + 24 * 0.005) * (1 + (after + 1) * 0.015);
      }
    }
    sum += vBase * adj;
  }
  let avg = sum / 84;
  console.log(`Delivery Month Adj: ${deliveryMonthAdj}, avg=${avg.toFixed(2)}`);
}

// What if the first installment is 0 months?
for (let deliveryMonthAdj of [0, 0.005, 0.015]) {
  let sum = 0;
  for (let i = 1; i <= 84; i++) {
    let before = 0;
    let after = 0;
    let adj = 0;
    if (i <= 24) {
      // Up to 1 month before delivery
      before = i - 1;
      adj = (1 + before * 0.005);
    } else if (i === 25) {
      // Delivery month
      if (deliveryMonthAdj === 0) {
        adj = (1 + 23 * 0.005); // Fixed at previous month
      } else if (deliveryMonthAdj === 0.005) {
        adj = (1 + 24 * 0.005); // Continues INCC
      } else if (deliveryMonthAdj === 0.015) {
        adj = (1 + 23 * 0.005) * (1 + 1 * 0.015); // Starts IGPM
      }
    } else {
      // Month after delivery to end
      before = 23; // Or 24?
      after = i - 25; // If i=26, after=1
      
      if (deliveryMonthAdj === 0) {
        adj = (1 + 23 * 0.005) * (1 + after * 0.015);
      } else if (deliveryMonthAdj === 0.005) {
        adj = (1 + 24 * 0.005) * (1 + after * 0.015);
      } else if (deliveryMonthAdj === 0.015) {
        adj = (1 + 23 * 0.005) * (1 + (after + 1) * 0.015);
      }
    }
    sum += vBase * adj;
  }
  let avg = sum / 84;
  console.log(`0-indexed, Delivery Month Adj: ${deliveryMonthAdj}, avg=${avg.toFixed(2)}`);
}
