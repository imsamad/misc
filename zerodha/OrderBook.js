// Function to generate a random number within a specified range
function getRandomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

// Function to generate a random limit order
function generateOrder(minPrice = 90, maxPrice = 110, minQty = 1, maxQty = 10) {
  return {
    price: getRandomInRange(minPrice, maxPrice).toFixed(2), // Random price between 90 and 110
    quantity: Math.floor(getRandomInRange(minQty, maxQty)), // Random quantity between 1 and 10
  };
}

// Generate random limit orders for both bid and ask sides
let bidOrders = [];
let askOrders = [];

for (let i = 0; i < 10; i++) {
  bidOrders.push(generateOrder());
  askOrders.push(generateOrder());
}

// Sort orders by price
bidOrders.sort((a, b) => b.price - a.price); // Sort bid orders in descending order of price
askOrders.sort((a, b) => a.price - b.price); // Sort ask orders in ascending order of price

// Execute trades by matching bid and ask prices
while (bidOrders.length > 0 && askOrders.length > 0) {
  // continue;
  const bestBid = parseFloat(bidOrders[0].price);
  const bestAsk = parseFloat(askOrders[0].price);

  if (bestBid >= bestAsk) {
    // If there's a match between best bid and ask prices
    // Determine trade quantity based on the smaller of the two order quantities
    const tradeQuantity = Math.min(
      bidOrders[0].quantity,
      askOrders[0].quantity
    );

    // Execute trade at the matched price
    console.log(`Trade executed: Price=${bestAsk}, Quantity=${tradeQuantity}`);

    // Update order quantities after trade execution
    bidOrders[0].quantity -= tradeQuantity;
    askOrders[0].quantity -= tradeQuantity;

    // Remove orders with zero quantity
    if (bidOrders[0].quantity === 0) {
      bidOrders.shift();
    }
    if (askOrders[0].quantity === 0) {
      askOrders.shift();
    }
  } else {
    break; // No more trades can be executed if there's no match between bid and ask prices
  }
}
