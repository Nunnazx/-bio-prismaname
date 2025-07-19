// Simple test to check cart API functionality
const BASE_URL = 'http://localhost:3000'

async function testCartAPI() {
  console.log('🧪 Testing Cart API...\n')
  
  try {
    // Test 1: Get empty cart
    console.log('1. Testing GET /api/cart (should create empty cart)')
    const getResponse = await fetch(`${BASE_URL}/api/cart`)
    const cartData = await getResponse.json()
    console.log('Cart data:', JSON.stringify(cartData, null, 2))
    console.log('✅ GET cart successful\n')
    
    // Test 2: Get a product to add to cart
    console.log('2. Getting products to test with')
    const productsResponse = await fetch(`${BASE_URL}/api/products`)
    if (productsResponse.ok) {
      const products = await productsResponse.json()
      if (products.length > 0) {
        const testProduct = products[0]
        console.log('Using product:', testProduct.name, 'ID:', testProduct.id)
        
        // Test 3: Add product to cart
        console.log('\n3. Testing POST /api/cart (add item)')
        const addResponse = await fetch(`${BASE_URL}/api/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: testProduct.id,
            quantity: 2
          })
        })
        
        if (addResponse.ok) {
          const updatedCart = await addResponse.json()
          console.log('Updated cart:', JSON.stringify(updatedCart, null, 2))
          console.log('✅ Add to cart successful')
        } else {
          console.log('❌ Add to cart failed:', addResponse.status, await addResponse.text())
        }
      } else {
        console.log('⚠️ No products found to test with')
      }
    } else {
      console.log('⚠️ Could not fetch products, testing with dummy product ID')
      
      // Test with a dummy product (this should fail gracefully)
      const addResponse = await fetch(`${BASE_URL}/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: '507f1f77bcf86cd799439011', // dummy ObjectId
          quantity: 1
        })
      })
      
      console.log('Response status:', addResponse.status)
      console.log('Response:', await addResponse.text())
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message)
  }
}

// Run the test
testCartAPI()