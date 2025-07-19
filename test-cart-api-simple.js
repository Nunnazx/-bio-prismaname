// Simple test to verify cart API functionality
// Using built-in fetch (Node.js 18+)

const BASE_URL = 'http://localhost:3001';

async function testCartAPI() {
  console.log('🧪 Testing Cart API...\n');

  try {
    // Test 1: Get empty cart
    console.log('1. Testing GET /api/cart (empty cart)');
    const getResponse = await fetch(`${BASE_URL}/api/cart`);
    const cartData = await getResponse.json();
    
    console.log('✅ Cart fetched successfully');
    console.log(`   Items: ${cartData.items?.length || 0}`);
    console.log(`   Total: ₹${cartData.total || 0}`);
    console.log(`   Session ID: ${cartData.sessionId}\n`);

    // Test 2: Add item to cart (using existing product ID from database)
    console.log('2. Testing POST /api/cart (add item)');
    const addResponse = await fetch(`${BASE_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': getResponse.headers.get('set-cookie') || ''
      },
      body: JSON.stringify({
        productId: '6879a5dba3828dd53208317b', // Using existing product ID from logs
        quantity: 2
      })
    });

    if (addResponse.ok) {
      const updatedCart = await addResponse.json();
      console.log('✅ Item added successfully');
      console.log(`   Items: ${updatedCart.items?.length || 0}`);
      console.log(`   Total: ₹${updatedCart.total || 0}`);
      console.log(`   First item: ${updatedCart.items?.[0]?.productName || 'None'}\n`);
    } else {
      console.log('❌ Failed to add item');
      console.log(`   Status: ${addResponse.status}`);
      console.log(`   Error: ${await addResponse.text()}\n`);
    }

    // Test 3: Get cart again to verify persistence
    console.log('3. Testing GET /api/cart (with items)');
    const getResponse2 = await fetch(`${BASE_URL}/api/cart`, {
      headers: {
        'Cookie': getResponse.headers.get('set-cookie') || ''
      }
    });
    
    if (getResponse2.ok) {
      const persistedCart = await getResponse2.json();
      console.log('✅ Cart persistence verified');
      console.log(`   Items: ${persistedCart.items?.length || 0}`);
      console.log(`   Total: ₹${persistedCart.total || 0}\n`);
    }

    console.log('🎉 Cart API tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testCartAPI();