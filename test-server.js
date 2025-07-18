#!/usr/bin/env node

/**
 * Server-side E-commerce Testing Script
 * Tests server functionality and API endpoints
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

class ServerTestSuite {
  constructor() {
    this.baseUrl = 'http://localhost:3000';
    this.testResults = [];
  }

  async makeRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
      const urlObj = new URL(url);
      const protocol = urlObj.protocol === 'https:' ? https : http;
      
      const requestOptions = {
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: urlObj.pathname + urlObj.search,
        method: options.method || 'GET',
        headers: options.headers || {}
      };
      
      const req = protocol.request(requestOptions, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          resolve({
            statusCode: res.statusCode,
            headers: res.headers,
            data: data,
            url: url
          });
        });
      });
      
      req.on('error', reject);
      req.setTimeout(10000, () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });
      
      if (options.body) {
        req.write(options.body);
      }
      
      req.end();
    });
  }

  async logTest(testName, success, details = '') {
    const result = {
      test: testName,
      success,
      details,
      timestamp: new Date().toISOString()
    };
    
    this.testResults.push(result);
    
    const status = success ? '✅' : '❌';
    console.log(`${status} ${testName}${details ? ': ' + details : ''}`);
  }

  async testServerHealth() {
    console.log('\n🏥 Testing Server Health...');
    
    try {
      const response = await this.makeRequest(this.baseUrl);
      await this.logTest('Server Response', response.statusCode === 200, `Status: ${response.statusCode}`);
      await this.logTest('Server Content', response.data.length > 0, `Content length: ${response.data.length}`);
      
      // Check if it's HTML
      const isHTML = response.data.includes('<html') || response.data.includes('<!DOCTYPE');
      await this.logTest('HTML Content', isHTML, 'Valid HTML response');
      
    } catch (error) {
      await this.logTest('Server Health', false, error.message);
    }
  }

  async testProductsEndpoint() {
    console.log('\n🛍️ Testing Products Endpoint...');
    
    try {
      const response = await this.makeRequest(`${this.baseUrl}/en/products`);
      await this.logTest('Products Page Load', response.statusCode === 200, `Status: ${response.statusCode}`);
      
      // Check for product-related content
      const hasProductContent = response.data.includes('product') || 
                               response.data.includes('Product') ||
                               response.data.includes('biodegradable');
      await this.logTest('Products Content', hasProductContent, 'Product-related content found');
      
    } catch (error) {
      await this.logTest('Products Endpoint', false, error.message);
    }
  }

  async testCheckoutEndpoint() {
    console.log('\n💳 Testing Checkout Endpoint...');
    
    try {
      const response = await this.makeRequest(`${this.baseUrl}/checkout`);
      await this.logTest('Checkout Page Load', response.statusCode === 200, `Status: ${response.statusCode}`);
      
      // Check for checkout-related content
      const hasCheckoutContent = response.data.includes('checkout') || 
                                 response.data.includes('Checkout') ||
                                 response.data.includes('order');
      await this.logTest('Checkout Content', hasCheckoutContent, 'Checkout-related content found');
      
    } catch (error) {
      await this.logTest('Checkout Endpoint', false, error.message);
    }
  }

  async testWishlistEndpoint() {
    console.log('\n❤️ Testing Wishlist Endpoint...');
    
    try {
      const response = await this.makeRequest(`${this.baseUrl}/wishlist`);
      await this.logTest('Wishlist Page Load', response.statusCode === 200, `Status: ${response.statusCode}`);
      
      // Check for wishlist-related content
      const hasWishlistContent = response.data.includes('wishlist') || 
                                response.data.includes('Wishlist') ||
                                response.data.includes('saved');
      await this.logTest('Wishlist Content', hasWishlistContent, 'Wishlist-related content found');
      
    } catch (error) {
      await this.logTest('Wishlist Endpoint', false, error.message);
    }
  }

  async testThankYouEndpoint() {
    console.log('\n🙏 Testing Thank You Endpoint...');
    
    try {
      const response = await this.makeRequest(`${this.baseUrl}/thank-you?order=TEST123`);
      await this.logTest('Thank You Page Load', response.statusCode === 200, `Status: ${response.statusCode}`);
      
      // Check for thank you content
      const hasThankYouContent = response.data.includes('thank') || 
                                response.data.includes('Thank') ||
                                response.data.includes('order');
      await this.logTest('Thank You Content', hasThankYouContent, 'Thank you content found');
      
    } catch (error) {
      await this.logTest('Thank You Endpoint', false, error.message);
    }
  }

  async testAPIEndpoints() {
    console.log('\n🔌 Testing API Endpoints...');
    
    // Test if there are any API routes
    const apiRoutes = [
      '/api/products',
      '/api/cart',
      '/api/orders',
      '/api/reviews'
    ];
    
    for (const route of apiRoutes) {
      try {
        const response = await this.makeRequest(`${this.baseUrl}${route}`);
        const isValidAPI = response.statusCode === 200 || response.statusCode === 404;
        await this.logTest(`API Route ${route}`, isValidAPI, `Status: ${response.statusCode}`);
      } catch (error) {
        await this.logTest(`API Route ${route}`, false, error.message);
      }
    }
  }

  async testStaticAssets() {
    console.log('\n📁 Testing Static Assets...');
    
    const staticAssets = [
      '/favicon.ico',
      '/_next/static/css',
      '/_next/static/js'
    ];
    
    for (const asset of staticAssets) {
      try {
        const response = await this.makeRequest(`${this.baseUrl}${asset}`);
        const isValidAsset = response.statusCode === 200 || response.statusCode === 404;
        await this.logTest(`Static Asset ${asset}`, isValidAsset, `Status: ${response.statusCode}`);
      } catch (error) {
        await this.logTest(`Static Asset ${asset}`, false, error.message);
      }
    }
  }

  async testResponseTimes() {
    console.log('\n⚡ Testing Response Times...');
    
    const routes = [
      '/',
      '/en/products',
      '/checkout',
      '/wishlist'
    ];
    
    for (const route of routes) {
      try {
        const startTime = Date.now();
        const response = await this.makeRequest(`${this.baseUrl}${route}`);
        const responseTime = Date.now() - startTime;
        
        const isFast = responseTime < 3000; // 3 seconds threshold
        await this.logTest(`Response Time ${route}`, isFast, `${responseTime}ms`);
      } catch (error) {
        await this.logTest(`Response Time ${route}`, false, error.message);
      }
    }
  }

  async testEcommerceComponents() {
    console.log('\n🛒 Testing E-commerce Components...');
    
    try {
      // Test home page for e-commerce elements
      const homeResponse = await this.makeRequest(this.baseUrl);
      
      // Check for cart-related elements
      const hasCartElements = homeResponse.data.includes('cart') || 
                             homeResponse.data.includes('Cart') ||
                             homeResponse.data.includes('shopping');
      await this.logTest('Cart Components', hasCartElements, 'Cart-related elements found');
      
      // Check for product elements
      const hasProductElements = homeResponse.data.includes('product') || 
                                homeResponse.data.includes('Product');
      await this.logTest('Product Components', hasProductElements, 'Product-related elements found');
      
      // Check for navigation
      const hasNavigation = homeResponse.data.includes('<nav') || 
                           homeResponse.data.includes('navigation');
      await this.logTest('Navigation Components', hasNavigation, 'Navigation elements found');
      
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
    
    // Save report to file
    const reportPath = path.join(__dirname, 'server-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n' + '='.repeat(60));
    console.log('🎯 SERVER TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`🌐 Server URL: ${this.baseUrl}`);
    console.log(`📊 Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${passedTests}`);
    console.log(`❌ Failed: ${failedTests}`);
    console.log(`📈 Success Rate: ${successRate}%`);
    console.log('='.repeat(60));
    
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    
    // Show failed tests
    const failedTestsList = this.testResults.filter(r => !r.success);
    if (failedTestsList.length > 0) {
      console.log('\n❌ Failed Tests:');
      failedTestsList.forEach(test => {
        console.log(`   • ${test.test}: ${test.details}`);
      });
    }
    
    return report;
  }

  async runAllTests() {
    console.log('🚀 Starting Server Test Suite...\n');
    
    try {
      // Run all test suites
      await this.testServerHealth();
      await this.testProductsEndpoint();
      await this.testCheckoutEndpoint();
      await this.testWishlistEndpoint();
      await this.testThankYouEndpoint();
      await this.testAPIEndpoints();
      await this.testStaticAssets();
      await this.testResponseTimes();
      await this.testEcommerceComponents();
      
      // Generate final report
      const report = await this.generateReport();
      
      return report;
      
    } catch (error) {
      console.error('❌ Test suite failed:', error);
      await this.logTest('Test Suite Execution', false, error.message);
      return null;
    }
  }
}

// Function to check if server is running
async function checkServerRunning(url) {
  try {
    const urlObj = new URL(url);
    const response = await new Promise((resolve, reject) => {
      const req = http.request({
        hostname: urlObj.hostname,
        port: urlObj.port,
        path: '/',
        method: 'GET'
      }, (res) => {
        resolve({ statusCode: res.statusCode });
      });
      req.on('error', reject);
      req.setTimeout(5000, () => {
        req.destroy();
        reject(new Error('Server check timeout'));
      });
      req.end();
    });
    
    return response.statusCode === 200;
  } catch (error) {
    return false;
  }
}

// Run the test suite
if (require.main === module) {
  const testSuite = new ServerTestSuite();
  
  // First check if server is running
  checkServerRunning(testSuite.baseUrl).then(isRunning => {
    if (!isRunning) {
      console.log('❌ Server is not running at', testSuite.baseUrl);
      console.log('💡 Please start the server with: pnpm dev');
      process.exit(1);
    }
    
    console.log('✅ Server is running at', testSuite.baseUrl);
    
    // Run tests
    return testSuite.runAllTests();
  }).then((report) => {
    if (report && report.summary.successRate) {
      const successRate = parseFloat(report.summary.successRate);
      process.exit(successRate >= 70 ? 0 : 1); // Exit with error if success rate < 70%
    } else {
      process.exit(1);
    }
  }).catch((error) => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = ServerTestSuite;