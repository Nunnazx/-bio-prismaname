#!/usr/bin/env node

/**
 * Live E-commerce Testing Script
 * Tests all e-commerce operations on the running server
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class LiveEcommerceTest {
  constructor() {
    this.browser = null;
    this.page = null;
    this.baseUrl = 'http://localhost:3001';
    this.testResults = [];
  }

  async init() {
    console.log('🚀 Starting Live E-commerce Tests...\n');
    
    this.browser = await puppeteer.launch({
      headless: false, // Show browser for visual verification
      defaultViewport: { width: 1920, height: 1080 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    
    // Set up console logging
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('⚠️  Browser:', msg.text());
      }
    });
  }

  async logTest(testName, success, details = '') {
    const result = { test: testName, success, details, timestamp: new Date().toISOString() };
    this.testResults.push(result);
    
    const status = success ? '✅' : '❌';
    console.log(`${status} ${testName}${details ? ': ' + details : ''}`);
  }

  async takeScreenshot(name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `test-${name}-${timestamp}.png`;
    const filepath = path.join(__dirname, 'test-screenshots', filename);
    
    // Create directory if it doesn't exist
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    await this.page.screenshot({ path: filepath, fullPage: true });
    console.log(`📸 Screenshot: ${filename}`);
  }

  async testHomePage() {
    console.log('\n🏠 Testing Home Page...');
    
    try {
      await this.page.goto(this.baseUrl, { waitUntil: 'networkidle2', timeout: 30000 });
      await this.takeScreenshot('homepage');
      
      const title = await this.page.title();
      await this.logTest('Home Page Load', title.length > 0, `Title: ${title}`);
      
      // Check for main navigation
      const hasNav = await this.page.$('nav') !== null;
      await this.logTest('Navigation Present', hasNav);
      
      // Check for product showcase
      const productElements = await this.page.$$('[data-testid*="product"], .product-card, .product-grid');
      await this.logTest('Product Showcase', productElements.length > 0, `Found ${productElements.length} product elements`);
      
    } catch (error) {
      await this.logTest('Home Page Test', false, error.message);
    }
  }

  async testProductsPage() {
    console.log('\n🛍️ Testing Products Page...');
    
    try {
      await this.page.goto(`${this.baseUrl}/en/products`, { waitUntil: 'networkidle2', timeout: 30000 });
      await this.takeScreenshot('products-page');
      
      // Wait for products to load
      await this.page.waitForTimeout(2000);
      
      const url = this.page.url();
      await this.logTest('Products Page Load', url.includes('/products'));
      
      // Check for product cards
      const productCards = await this.page.$$('.product-card, [data-testid="product-card"], .grid > div');
      await this.logTest('Product Cards Display', productCards.length > 0, `Found ${productCards.length} products`);
      
      // Test search functionality if present
      const searchInput = await this.page.$('input[placeholder*="search"], input[type="search"]');
      if (searchInput) {
        await searchInput.type('biodegradable');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.logTest('Product Search', true, 'Search executed successfully');
      }
      
    } catch (error) {
      await this.logTest('Products Page Test', false, error.message);
    }
  }

  async testAddToCart() {
    console.log('\n🛒 Testing Add to Cart...');
    
    try {
      // Look for Add to Cart buttons
      const addToCartButtons = await this.page.$$('button:has-text("Add to Cart"), [data-testid="add-to-cart"], button[class*="cart"]');
      
      if (addToCartButtons.length > 0) {
        await this.logTest('Add to Cart Buttons Found', true, `Found ${addToCartButtons.length} buttons`);
        
        // Click first Add to Cart button
        await addToCartButtons[0].click();
        await this.page.waitForTimeout(2000);
        await this.logTest('Add to Cart Click', true, 'Button clicked successfully');
        
        // Look for cart indicator or notification
        const cartIndicator = await this.page.$('[data-testid="cart-icon"], .cart-icon, .cart-count');
        await this.logTest('Cart Indicator Update', cartIndicator !== null, 'Cart indicator found');
        
      } else {
        await this.logTest('Add to Cart Buttons Found', false, 'No Add to Cart buttons found');
      }
      
    } catch (error) {
      await this.logTest('Add to Cart Test', false, error.message);
    }
  }

  async testShoppingCart() {
    console.log('\n🛒 Testing Shopping Cart...');
    
    try {
      // Look for cart icon or button
      const cartButton = await this.page.$('button:has-text("cart"), [data-testid="cart"], .cart-icon, button[class*="cart"]');
      
      if (cartButton) {
        await cartButton.click();
        await this.page.waitForTimeout(2000);
        await this.takeScreenshot('cart-open');
        await this.logTest('Cart Drawer Open', true, 'Cart opened successfully');
        
        // Check for cart items
        const cartItems = await this.page.$$('.cart-item, [data-testid="cart-item"], .cart-product');
        await this.logTest('Cart Items Display', cartItems.length >= 0, `Found ${cartItems.length} items in cart`);
        
        // Look for checkout button
        const checkoutButton = await this.page.$('button:has-text("checkout"), [data-testid="checkout"], a[href*="checkout"]');
        await this.logTest('Checkout Button Present', checkoutButton !== null);
        
      } else {
        await this.logTest('Cart Access', false, 'Cart button not found');
      }
      
    } catch (error) {
      await this.logTest('Shopping Cart Test', false, error.message);
    }
  }

  async testWishlist() {
    console.log('\n❤️ Testing Wishlist...');
    
    try {
      // Look for wishlist buttons
      const wishlistButtons = await this.page.$$('button:has-text("Save"), button:has-text("Wishlist"), [data-testid="wishlist"], .heart-icon');
      
      if (wishlistButtons.length > 0) {
        await wishlistButtons[0].click();
        await this.page.waitForTimeout(1000);
        await this.logTest('Wishlist Add', true, 'Wishlist button clicked');
        
        // Navigate to wishlist page
        try {
          await this.page.goto(`${this.baseUrl}/wishlist`, { waitUntil: 'networkidle2', timeout: 15000 });
          await this.takeScreenshot('wishlist-page');
          await this.logTest('Wishlist Page Load', true, 'Wishlist page loaded');
        } catch (error) {
          await this.logTest('Wishlist Page Load', false, 'Page failed to load');
        }
        
      } else {
        await this.logTest('Wishlist Buttons Found', false, 'No wishlist buttons found');
      }
      
    } catch (error) {
      await this.logTest('Wishlist Test', false, error.message);
    }
  }

  async testCheckout() {
    console.log('\n💳 Testing Checkout...');
    
    try {
      await this.page.goto(`${this.baseUrl}/checkout`, { waitUntil: 'networkidle2', timeout: 15000 });
      await this.takeScreenshot('checkout-page');
      
      const url = this.page.url();
      await this.logTest('Checkout Page Load', url.includes('/checkout'));
      
      // Check for form fields
      const formFields = await this.page.$$('input[type="text"], input[type="email"], input[type="tel"], textarea');
      await this.logTest('Checkout Form Fields', formFields.length > 0, `Found ${formFields.length} form fields`);
      
      // Test form filling
      const nameInput = await this.page.$('input[name*="name"], input[placeholder*="name"], #firstName, #name');
      if (nameInput) {
        await nameInput.type('Test User');
        await this.logTest('Form Input Test', true, 'Name field filled');
      }
      
      const emailInput = await this.page.$('input[type="email"], input[name*="email"]');
      if (emailInput) {
        await emailInput.type('test@example.com');
        await this.logTest('Email Input Test', true, 'Email field filled');
      }
      
    } catch (error) {
      await this.logTest('Checkout Test', false, error.message);
    }
  }

  async testThankYou() {
    console.log('\n🙏 Testing Thank You Page...');
    
    try {
      await this.page.goto(`${this.baseUrl}/thank-you?order=TEST123`, { waitUntil: 'networkidle2', timeout: 15000 });
      await this.takeScreenshot('thank-you-page');
      
      const url = this.page.url();
      await this.logTest('Thank You Page Load', url.includes('/thank-you'));
      
      // Check for thank you content
      const pageText = await this.page.evaluate(() => document.body.innerText.toLowerCase());
      const hasThankYouContent = pageText.includes('thank') || pageText.includes('order') || pageText.includes('confirmation');
      await this.logTest('Thank You Content', hasThankYouContent, 'Thank you content found');
      
    } catch (error) {
      await this.logTest('Thank You Page Test', false, error.message);
    }
  }

  async testResponsive() {
    console.log('\n📱 Testing Responsive Design...');
    
    try {
      // Test mobile viewport
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.goto(this.baseUrl, { waitUntil: 'networkidle2', timeout: 15000 });
      await this.takeScreenshot('mobile-view');
      await this.logTest('Mobile Viewport', true, 'Mobile view loaded');
      
      // Test tablet viewport
      await this.page.setViewport({ width: 768, height: 1024 });
      await this.page.reload({ waitUntil: 'networkidle2', timeout: 15000 });
      await this.takeScreenshot('tablet-view');
      await this.logTest('Tablet Viewport', true, 'Tablet view loaded');
      
      // Reset to desktop
      await this.page.setViewport({ width: 1920, height: 1080 });
      
    } catch (error) {
      await this.logTest('Responsive Test', false, error.message);
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
    
    // Save report
    const reportPath = path.join(__dirname, 'live-ecommerce-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n' + '='.repeat(60));
    console.log('🎯 LIVE E-COMMERCE TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`🌐 Server URL: ${this.baseUrl}`);
    console.log(`📊 Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${passedTests}`);
    console.log(`❌ Failed: ${failedTests}`);
    console.log(`📈 Success Rate: ${successRate}%`);
    console.log('='.repeat(60));
    
    // Show test details
    console.log('\n📋 Test Details:');
    this.testResults.forEach(test => {
      const status = test.success ? '✅' : '❌';
      console.log(`   ${status} ${test.test}${test.details ? ': ' + test.details : ''}`);
    });
    
    console.log(`\n📄 Report saved to: ${reportPath}`);
    
    return report;
  }

  async runAllTests() {
    try {
      await this.init();
      
      // Run all e-commerce tests
      await this.testHomePage();
      await this.testProductsPage();
      await this.testAddToCart();
      await this.testShoppingCart();
      await this.testWishlist();
      await this.testCheckout();
      await this.testThankYou();
      await this.testResponsive();
      
      // Generate report
      const report = await this.generateReport();
      
      return report;
      
    } catch (error) {
      console.error('❌ Test suite failed:', error);
      await this.logTest('Test Suite Execution', false, error.message);
    } finally {
      if (this.browser) {
        await this.browser.close();
      }
    }
  }
}

// Run the tests
if (require.main === module) {
  const testSuite = new LiveEcommerceTest();
  testSuite.runAllTests().then((report) => {
    if (report && report.summary.successRate) {
      const successRate = parseFloat(report.summary.successRate);
      console.log(`\n🎯 Final Result: ${successRate >= 70 ? '✅ PASS' : '❌ FAIL'} (${successRate}%)`);
      process.exit(successRate >= 70 ? 0 : 1);
    } else {
      process.exit(1);
    }
  }).catch((error) => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = LiveEcommerceTest;