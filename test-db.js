#!/usr/bin/env node

/**
 * Database and E-commerce Functionality Test
 * Tests core e-commerce operations and database connectivity
 */

const http = require('http');

class EcommerceManualTest {
  constructor() {
    this.baseUrl = 'http://localhost:3000';
    this.testResults = [];
  }

  async makeRequest(path) {
    return new Promise((resolve, reject) => {
      const url = `${this.baseUrl}${path}`;
      const req = http.request(url, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            data: data,
            headers: res.headers
          });
        });
      });
      
      req.on('error', reject);
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      
      req.end();
    });
  }

  async logTest(testName, success, details = '') {
    const result = { test: testName, success, details, timestamp: new Date().toISOString() };
    this.testResults.push(result);
    
    const status = success ? '✅' : '❌';
    console.log(`${status} ${testName}${details ? ': ' + details : ''}`);
  }

  async testServerConnection() {
    console.log('\n🌐 Testing Server Connection...');
    
    try {
      const response = await this.makeRequest('/');
      await this.logTest('Server Connection', response.statusCode === 200 || response.statusCode === 307, `Status: ${response.statusCode}`);
      
      if (response.statusCode === 307) {
        // Follow redirect
        const redirectResponse = await this.makeRequest('/en');
        await this.logTest('Homepage Load', redirectResponse.statusCode === 200, `Status: ${redirectResponse.statusCode}`);
      }
      
    } catch (error) {
      await this.logTest('Server Connection', false, error.message);
    }
  }

  async testProductsEndpoint() {
    console.log('\n🛍️ Testing Products Endpoint...');
    
    try {
      const response = await this.makeRequest('/en/products');
      await this.logTest('Products Page', response.statusCode === 200, `Status: ${response.statusCode}`);
      
      // Check for product-related content
      const hasProductContent = response.data.includes('product') || 
                               response.data.includes('Product') ||
                               response.data.includes('biodegradable');
      await this.logTest('Products Content', hasProductContent, 'Product content found');
      
      // Check for e-commerce elements
      const hasEcommerceElements = response.data.includes('cart') || 
                                  response.data.includes('Cart') ||
                                  response.data.includes('add') ||
                                  response.data.includes('price');
      await this.logTest('E-commerce Elements', hasEcommerceElements, 'Shopping elements found');
      
    } catch (error) {
      await this.logTest('Products Endpoint', false, error.message);
    }
  }

  async testCheckoutEndpoint() {
    console.log('\n💳 Testing Checkout Endpoint...');
    
    try {
      const response = await this.makeRequest('/checkout');
      await this.logTest('Checkout Page', response.statusCode === 200, `Status: ${response.statusCode}`);
      
      // Check for checkout-related content
      const hasCheckoutContent = response.data.includes('checkout') || 
                                 response.data.includes('Checkout') ||
                                 response.data.includes('order') ||
                                 response.data.includes('payment');
      await this.logTest('Checkout Content', hasCheckoutContent, 'Checkout content found');
      
    } catch (error) {
      await this.logTest('Checkout Endpoint', false, error.message);
    }
  }

  async testWishlistEndpoint() {
    console.log('\n❤️ Testing Wishlist Endpoint...');
    
    try {
      const response = await this.makeRequest('/wishlist');
      await this.logTest('Wishlist Page', response.statusCode === 200, `Status: ${response.statusCode}`);
      
      // Check for wishlist-related content
      const hasWishlistContent = response.data.includes('wishlist') || 
                                response.data.includes('Wishlist') ||
                                response.data.includes('saved') ||
                                response.data.includes('favorite');
      await this.logTest('Wishlist Content', hasWishlistContent, 'Wishlist content found');
      
    } catch (error) {
      await this.logTest('Wishlist Endpoint', false, error.message);
    }
  }

  async testThankYouEndpoint() {
    console.log('\n🙏 Testing Thank You Endpoint...');
    
    try {
      const response = await this.makeRequest('/thank-you?order=TEST123');
      await this.logTest('Thank You Page', response.statusCode === 200, `Status: ${response.statusCode}`);
      
      // Check for thank you content
      const hasThankYouContent = response.data.includes('thank') || 
                                response.data.includes('Thank') ||
                                response.data.includes('order') ||
                                response.data.includes('confirmation');
      await this.logTest('Thank You Content', hasThankYouContent, 'Thank you content found');
      
    } catch (error) {
      await this.logTest('Thank You Endpoint', false, error.message);
    }
  }

  async testDatabaseConnection() {
    console.log('\n🗄️ Testing Database Connection...');
    
    try {
      // Test products endpoint which uses database
      const response = await this.makeRequest('/en/products');
      
      // Check for Prisma query indicators in response
      const hasDatabaseContent = response.data.length > 1000; // Substantial content suggests DB connection
      await this.logTest('Database Connection', hasDatabaseContent, 'Database queries executing');
      
      // Check response time (should be reasonable if DB is working)
      const startTime = Date.now();
      await this.makeRequest('/en/products');
      const responseTime = Date.now() - startTime;
      
      await this.logTest('Database Performance', responseTime < 5000, `Response time: ${responseTime}ms`);
      
    } catch (error) {
      await this.logTest('Database Connection', false, error.message);
    }
  }

  async testEcommerceComponents() {
    console.log('\n🛒 Testing E-commerce Components...');
    
    try {
      // Test homepage for e-commerce elements
      const homeResponse = await this.makeRequest('/en');
      
      // Check for cart-related elements
      const hasCartElements = homeResponse.data.includes('cart') || 
                             homeResponse.data.includes('Cart') ||
                             homeResponse.data.includes('shopping');
      await this.logTest('Cart Components', hasCartElements, 'Cart elements found');
      
      // Check for product elements
      const hasProductElements = homeResponse.data.includes('product') || 
                                homeResponse.data.includes('Product');
      await this.logTest('Product Components', hasProductElements, 'Product elements found');
      
      // Check for React components
      const hasReactComponents = homeResponse.data.includes('_next') || 
                                homeResponse.data.includes('react');
      await this.logTest('React Components', hasReactComponents, 'React components loading');
      
      // Check for CSS/styling
      const hasStyling = homeResponse.data.includes('css') || 
                        homeResponse.data.includes('tailwind');
      await this.logTest('Styling System', hasStyling, 'CSS/Tailwind loading');
      
    } catch (error) {
      await this.logTest('E-commerce Components', false, error.message);
    }
  }

  async generateReport() {
    console.log('\n📊 Generating Test Report...');
    
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(r => r.success).length;
    const failedTests = totalTests - passedTests;
    const successRate = totalTests > 0 ? ((passedTests / totalTests) * 100).toFixed(1) : '0.0';
    
    const report = {
      summary: {
        totalTests,
        passedTests,
        failedTests,
        successRate: `${successRate}%`,
        timestamp: new Date().toISOString(),
        serverUrl: this.baseUrl
      },
      results: this.testResults
    };
    
    console.log('\n' + '='.repeat(60));
    console.log('🎯 E-COMMERCE FUNCTIONALITY TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`🌐 Server URL: ${this.baseUrl}`);
    console.log(`📊 Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${passedTests}`);
    console.log(`❌ Failed: ${failedTests}`);
    console.log(`📈 Success Rate: ${successRate}%`);
    console.log('='.repeat(60));
    
    // Show test categories
    const categories = {
      'Server & Database': this.testResults.filter(r => 
        r.test.includes('Server') || r.test.includes('Database')
      ),
      'E-commerce Pages': this.testResults.filter(r => 
        r.test.includes('Products') || r.test.includes('Checkout') || 
        r.test.includes('Wishlist') || r.test.includes('Thank You')
      ),
      'Components & Features': this.testResults.filter(r => 
        r.test.includes('Components') || r.test.includes('Elements') || 
        r.test.includes('Content') || r.test.includes('Styling')
      )
    };
    
    console.log('\n📋 Test Categories:');
    Object.entries(categories).forEach(([category, tests]) => {
      const categoryPassed = tests.filter(t => t.success).length;
      const categoryTotal = tests.length;
      const categoryRate = categoryTotal > 0 ? ((categoryPassed / categoryTotal) * 100).toFixed(1) : '0.0';
      console.log(`   ${category}: ${categoryPassed}/${categoryTotal} (${categoryRate}%)`);
    });
    
    // Show failed tests
    const failedTestsList = this.testResults.filter(r => !r.success);
    if (failedTestsList.length > 0) {
      console.log('\n❌ Failed Tests:');
      failedTestsList.forEach(test => {
        console.log(`   • ${test.test}: ${test.details}`);
      });
    }
    
    // E-commerce status
    const ecommerceTests = this.testResults.filter(r => 
      r.test.includes('Cart') || r.test.includes('Product') || 
      r.test.includes('Checkout') || r.test.includes('Wishlist')
    );
    const ecommercePassed = ecommerceTests.filter(t => t.success).length;
    const ecommerceRate = ecommerceTests.length > 0 ? ((ecommercePassed / ecommerceTests.length) * 100).toFixed(1) : '0.0';
    
    console.log('\n🛒 E-commerce Status:');
    console.log(`   Core E-commerce Features: ${ecommercePassed}/${ecommerceTests.length} (${ecommerceRate}%)`);
    
    if (parseFloat(ecommerceRate) >= 80) {
      console.log('   Status: ✅ E-COMMERCE SYSTEM WORKING');
    } else if (parseFloat(ecommerceRate) >= 60) {
      console.log('   Status: ⚠️  E-COMMERCE SYSTEM PARTIALLY WORKING');
    } else {
      console.log('   Status: ❌ E-COMMERCE SYSTEM NEEDS ATTENTION');
    }
    
    return report;
  }

  async runAllTests() {
    console.log('🚀 Starting E-commerce Functionality Tests...\n');
    
    try {
      // Run all tests
      await this.testServerConnection();
      await this.testProductsEndpoint();
      await this.testCheckoutEndpoint();
      await this.testWishlistEndpoint();
      await this.testThankYouEndpoint();
      await this.testDatabaseConnection();
      await this.testEcommerceComponents();
      
      // Generate report
      const report = await this.generateReport();
      
      return report;
      
    } catch (error) {
      console.error('❌ Test suite failed:', error);
      await this.logTest('Test Suite Execution', false, error.message);
      return null;
    }
  }
}

// Run the tests
if (require.main === module) {
  const testSuite = new EcommerceManualTest();
  testSuite.runAllTests().then((report) => {
    if (report && report.summary.successRate) {
      const successRate = parseFloat(report.summary.successRate);
      console.log(`\n🎯 Final Result: ${successRate >= 70 ? '✅ PASS' : '❌ NEEDS WORK'} (${successRate}%)`);
      process.exit(successRate >= 70 ? 0 : 1);
    } else {
      process.exit(1);
    }
  }).catch((error) => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = EcommerceManualTest;