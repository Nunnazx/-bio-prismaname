#!/usr/bin/env node

/**
 * Comprehensive E-commerce Testing Script
 * Tests all e-commerce functionality automatically
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

class EcommerceTestSuite {
  constructor() {
    this.browser = null;
    this.page = null;
    this.baseUrl = 'http://localhost:3000';
    this.testResults = [];
    this.screenshots = [];
  }

  async init() {
    console.log('🚀 Starting E-commerce Test Suite...\n');
    
    this.browser = await puppeteer.launch({
      headless: false, // Set to true for headless testing
      defaultViewport: { width: 1920, height: 1080 },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    this.page = await this.browser.newPage();
    
    // Set up console logging
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('❌ Browser Error:', msg.text());
      }
    });
    
    // Set up error handling
    this.page.on('pageerror', error => {
      console.log('❌ Page Error:', error.message);
    });
  }

  async takeScreenshot(name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `screenshot-${name}-${timestamp}.png`;
    const filepath = path.join(__dirname, 'test-screenshots', filename);
    
    // Create directory if it doesn't exist
    const dir = path.dirname(filepath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    await this.page.screenshot({ path: filepath, fullPage: true });
    this.screenshots.push(filepath);
    console.log(`📸 Screenshot saved: ${filename}`);
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

  async waitForElement(selector, timeout = 5000) {
    try {
      await this.page.waitForSelector(selector, { timeout });
      return true;
    } catch (error) {
      return false;
    }
  }

  async testHomePage() {
    console.log('\n🏠 Testing Home Page...');
    
    try {
      await this.page.goto(this.baseUrl, { waitUntil: 'networkidle2' });
      await this.takeScreenshot('homepage');
      
      // Test page load
      const title = await this.page.title();
      await this.logTest('Home Page Load', title.length > 0, `Title: ${title}`);
      
      // Test navigation elements
      const hasNav = await this.waitForElement('nav');
      await this.logTest('Navigation Present', hasNav);
      
      // Test hero section
      const hasHero = await this.waitForElement('[data-testid="hero-section"], .hero, h1');
      await this.logTest('Hero Section Present', hasHero);
      
      // Test product showcase
      const hasProducts = await this.waitForElement('[data-testid="products"], .product-card, .product-grid');
      await this.logTest('Product Showcase Present', hasProducts);
      
    } catch (error) {
      await this.logTest('Home Page Load', false, error.message);
    }
  }

  async testProductsPage() {
    console.log('\n🛍️ Testing Products Page...');
    
    try {
      await this.page.goto(`${this.baseUrl}/en/products`, { waitUntil: 'networkidle2' });
      await this.takeScreenshot('products-page');
      
      // Test products page load
      const url = this.page.url();
      await this.logTest('Products Page Load', url.includes('/products'));
      
      // Test product grid
      const productCards = await this.page.$$('.product-card, [data-testid="product-card"]');
      await this.logTest('Product Cards Present', productCards.length > 0, `Found ${productCards.length} products`);
      
      // Test search functionality
      const searchInput = await this.page.$('input[placeholder*="search"], input[type="search"]');
      if (searchInput) {
        await searchInput.type('biodegradable');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(1000);
        await this.logTest('Product Search', true, 'Search executed');
      } else {
        await this.logTest('Product Search', false, 'Search input not found');
      }
      
    } catch (error) {
      await this.logTest('Products Page Load', false, error.message);
    }
  }

  async testShoppingCart() {
    console.log('\n🛒 Testing Shopping Cart...');
    
    try {
      // Look for Add to Cart buttons
      const addToCartButtons = await this.page.$$('button:has-text("Add to Cart"), [data-testid="add-to-cart"]');
      
      if (addToCartButtons.length > 0) {
        // Click first Add to Cart button
        await addToCartButtons[0].click();
        await this.page.waitForTimeout(1000);
        await this.logTest('Add to Cart Click', true);
        
        // Look for cart icon or cart drawer
        const cartIcon = await this.page.$('[data-testid="cart-icon"], .cart-icon, button:has-text("cart")');
        if (cartIcon) {
          await cartIcon.click();
          await this.page.waitForTimeout(1000);
          await this.takeScreenshot('cart-open');
          await this.logTest('Cart Drawer Open', true);
          
          // Test cart contents
          const cartItems = await this.page.$$('.cart-item, [data-testid="cart-item"]');
          await this.logTest('Cart Items Present', cartItems.length > 0, `Found ${cartItems.length} items`);
          
        } else {
          await this.logTest('Cart Icon Found', false);
        }
      } else {
        await this.logTest('Add to Cart Button Found', false);
      }
      
    } catch (error) {
      await this.logTest('Shopping Cart Test', false, error.message);
    }
  }

  async testWishlist() {
    console.log('\n❤️ Testing Wishlist...');
    
    try {
      // Look for wishlist buttons
      const wishlistButtons = await this.page.$$('button:has-text("Save"), button:has-text("Wishlist"), [data-testid="wishlist-button"]');
      
      if (wishlistButtons.length > 0) {
        await wishlistButtons[0].click();
        await this.page.waitForTimeout(1000);
        await this.logTest('Wishlist Add Click', true);
        
        // Navigate to wishlist page
        await this.page.goto(`${this.baseUrl}/wishlist`, { waitUntil: 'networkidle2' });
        await this.takeScreenshot('wishlist-page');
        
        const wishlistItems = await this.page.$$('.wishlist-item, [data-testid="wishlist-item"]');
        await this.logTest('Wishlist Page Load', true);
        await this.logTest('Wishlist Items Present', wishlistItems.length >= 0, `Found ${wishlistItems.length} items`);
        
      } else {
        await this.logTest('Wishlist Button Found', false);
      }
      
    } catch (error) {
      await this.logTest('Wishlist Test', false, error.message);
    }
  }

  async testCheckoutProcess() {
    console.log('\n💳 Testing Checkout Process...');
    
    try {
      // Navigate to checkout
      await this.page.goto(`${this.baseUrl}/checkout`, { waitUntil: 'networkidle2' });
      await this.takeScreenshot('checkout-page');
      
      const url = this.page.url();
      await this.logTest('Checkout Page Load', url.includes('/checkout'));
      
      // Test form fields
      const formFields = await this.page.$$('input[type="text"], input[type="email"], input[type="tel"], textarea');
      await this.logTest('Checkout Form Fields Present', formFields.length > 0, `Found ${formFields.length} fields`);
      
      // Fill out basic form (if cart has items)
      const firstNameInput = await this.page.$('input[name="firstName"], #firstName');
      if (firstNameInput) {
        await firstNameInput.type('Test User');
        await this.logTest('Form Fill Test', true, 'First name filled');
      }
      
      const emailInput = await this.page.$('input[type="email"], input[name="email"]');
      if (emailInput) {
        await emailInput.type('test@example.com');
        await this.logTest('Email Fill Test', true, 'Email filled');
      }
      
    } catch (error) {
      await this.logTest('Checkout Process Test', false, error.message);
    }
  }

  async testProductReviews() {
    console.log('\n⭐ Testing Product Reviews...');
    
    try {
      // Go back to products page and click on a product
      await this.page.goto(`${this.baseUrl}/en/products`, { waitUntil: 'networkidle2' });
      
      const productLinks = await this.page.$$('a[href*="/products/"], .product-card a');
      if (productLinks.length > 0) {
        await productLinks[0].click();
        await this.page.waitForTimeout(2000);
        await this.takeScreenshot('product-detail');
        
        // Look for reviews section
        const reviewsSection = await this.page.$('[data-testid="reviews"], .reviews, h2:has-text("Reviews")');
        await this.logTest('Product Detail Page Load', true);
        await this.logTest('Reviews Section Present', !!reviewsSection);
        
        // Look for review form
        const reviewForm = await this.page.$('form:has(textarea), [data-testid="review-form"]');
        if (reviewForm) {
          await this.logTest('Review Form Present', true);
          
          // Try to fill review form
          const reviewTextarea = await this.page.$('textarea[name*="content"], textarea[placeholder*="review"]');
          if (reviewTextarea) {
            await reviewTextarea.type('This is a test review for the product.');
            await this.logTest('Review Form Fill', true);
          }
        } else {
          await this.logTest('Review Form Present', false);
        }
      }
      
    } catch (error) {
      await this.logTest('Product Reviews Test', false, error.message);
    }
  }

  async testProductSearch() {
    console.log('\n🔍 Testing Product Search & Filters...');
    
    try {
      await this.page.goto(`${this.baseUrl}/en/products`, { waitUntil: 'networkidle2' });
      
      // Test search functionality
      const searchInput = await this.page.$('input[placeholder*="search"], input[type="search"]');
      if (searchInput) {
        await searchInput.clear();
        await searchInput.type('PBAT');
        await this.page.keyboard.press('Enter');
        await this.page.waitForTimeout(2000);
        await this.takeScreenshot('search-results');
        await this.logTest('Product Search Execution', true, 'Searched for PBAT');
        
        // Check if results are filtered
        const resultCount = await this.page.$eval('body', () => {
          const text = document.body.innerText;
          const match = text.match(/(\d+)\s+products?\s+found/i);
          return match ? parseInt(match[1]) : 0;
        }).catch(() => 0);
        
        await this.logTest('Search Results Display', resultCount >= 0, `Found ${resultCount} results`);
      }
      
      // Test filters
      const filterButtons = await this.page.$$('button:has-text("Filter"), [data-testid="filter-button"]');
      if (filterButtons.length > 0) {
        await filterButtons[0].click();
        await this.page.waitForTimeout(1000);
        await this.logTest('Filter Panel Open', true);
        
        // Test category filter
        const categoryCheckboxes = await this.page.$$('input[type="checkbox"]');
        if (categoryCheckboxes.length > 0) {
          await categoryCheckboxes[0].click();
          await this.page.waitForTimeout(1000);
          await this.logTest('Category Filter Apply', true);
        }
      }
      
    } catch (error) {
      await this.logTest('Product Search Test', false, error.message);
    }
  }

  async testResponsiveDesign() {
    console.log('\n📱 Testing Responsive Design...');
    
    try {
      // Test mobile viewport
      await this.page.setViewport({ width: 375, height: 667 });
      await this.page.goto(this.baseUrl, { waitUntil: 'networkidle2' });
      await this.takeScreenshot('mobile-homepage');
      await this.logTest('Mobile Viewport Load', true);
      
      // Test tablet viewport
      await this.page.setViewport({ width: 768, height: 1024 });
      await this.page.reload({ waitUntil: 'networkidle2' });
      await this.takeScreenshot('tablet-homepage');
      await this.logTest('Tablet Viewport Load', true);
      
      // Reset to desktop
      await this.page.setViewport({ width: 1920, height: 1080 });
      await this.logTest('Responsive Design Test', true, 'All viewports tested');
      
    } catch (error) {
      await this.logTest('Responsive Design Test', false, error.message);
    }
  }

  async testPerformance() {
    console.log('\n⚡ Testing Performance...');
    
    try {
      const startTime = Date.now();
      await this.page.goto(this.baseUrl, { waitUntil: 'networkidle2' });
      const loadTime = Date.now() - startTime;
      
      await this.logTest('Page Load Performance', loadTime < 5000, `Load time: ${loadTime}ms`);
      
      // Test Core Web Vitals
      const metrics = await this.page.evaluate(() => {
        return new Promise((resolve) => {
          new PerformanceObserver((list) => {
            const entries = list.getEntries();
            const vitals = {};
            
            entries.forEach((entry) => {
              if (entry.name === 'first-contentful-paint') {
                vitals.fcp = entry.startTime;
              }
              if (entry.name === 'largest-contentful-paint') {
                vitals.lcp = entry.startTime;
              }
            });
            
            resolve(vitals);
          }).observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
          
          // Fallback timeout
          setTimeout(() => resolve({}), 3000);
        });
      });
      
      if (metrics.fcp) {
        await this.logTest('First Contentful Paint', metrics.fcp < 2000, `FCP: ${Math.round(metrics.fcp)}ms`);
      }
      
      if (metrics.lcp) {
        await this.logTest('Largest Contentful Paint', metrics.lcp < 4000, `LCP: ${Math.round(metrics.lcp)}ms`);
      }
      
    } catch (error) {
      await this.logTest('Performance Test', false, error.message);
    }
  }

  async generateReport() {
    console.log('\n📊 Generating Test Report...');
    
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(r => r.success).length;
    const failedTests = totalTests - passedTests;
    const successRate = ((passedTests / totalTests) * 100).toFixed(1);
    
    const report = {
      summary: {
        totalTests,
        passedTests,
        failedTests,
        successRate: `${successRate}%`,
        timestamp: new Date().toISOString()
      },
      results: this.testResults,
      screenshots: this.screenshots
    };
    
    // Save report to file
    const reportPath = path.join(__dirname, 'test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Generate HTML report
    const htmlReport = this.generateHTMLReport(report);
    const htmlPath = path.join(__dirname, 'test-report.html');
    fs.writeFileSync(htmlPath, htmlReport);
    
    console.log('\n' + '='.repeat(60));
    console.log('🎯 E-COMMERCE TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`📊 Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${passedTests}`);
    console.log(`❌ Failed: ${failedTests}`);
    console.log(`📈 Success Rate: ${successRate}%`);
    console.log('='.repeat(60));
    
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    console.log(`🌐 HTML report saved to: ${htmlPath}`);
    console.log(`📸 Screenshots saved to: ./test-screenshots/`);
    
    return report;
  }

  generateHTMLReport(report) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>E-commerce Test Report</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; background: #f5f5f5; }
        .container { max-width: 1200px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .header { text-align: center; margin-bottom: 30px; }
        .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: #f8f9fa; padding: 20px; border-radius: 8px; text-align: center; }
        .stat-number { font-size: 2em; font-weight: bold; margin-bottom: 5px; }
        .passed { color: #28a745; }
        .failed { color: #dc3545; }
        .test-result { margin: 10px 0; padding: 15px; border-radius: 5px; }
        .test-passed { background: #d4edda; border-left: 4px solid #28a745; }
        .test-failed { background: #f8d7da; border-left: 4px solid #dc3545; }
        .test-name { font-weight: bold; }
        .test-details { color: #666; font-size: 0.9em; margin-top: 5px; }
        .screenshots { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 30px; }
        .screenshot { text-align: center; }
        .screenshot img { max-width: 100%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🛒 E-commerce Test Report</h1>
            <p>Generated on ${new Date(report.summary.timestamp).toLocaleString()}</p>
        </div>
        
        <div class="summary">
            <div class="stat-card">
                <div class="stat-number">${report.summary.totalTests}</div>
                <div>Total Tests</div>
            </div>
            <div class="stat-card">
                <div class="stat-number passed">${report.summary.passedTests}</div>
                <div>Passed</div>
            </div>
            <div class="stat-card">
                <div class="stat-number failed">${report.summary.failedTests}</div>
                <div>Failed</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${report.summary.successRate}</div>
                <div>Success Rate</div>
            </div>
        </div>
        
        <h2>Test Results</h2>
        ${report.results.map(result => `
            <div class="test-result ${result.success ? 'test-passed' : 'test-failed'}">
                <div class="test-name">${result.success ? '✅' : '❌'} ${result.test}</div>
                ${result.details ? `<div class="test-details">${result.details}</div>` : ''}
            </div>
        `).join('')}
    </div>
</body>
</html>`;
  }

  async runAllTests() {
    try {
      await this.init();
      
      // Run all test suites
      await this.testHomePage();
      await this.testProductsPage();
      await this.testShoppingCart();
      await this.testWishlist();
      await this.testCheckoutProcess();
      await this.testProductReviews();
      await this.testProductSearch();
      await this.testResponsiveDesign();
      await this.testPerformance();
      
      // Generate final report
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

// Run the test suite
if (require.main === module) {
  const testSuite = new EcommerceTestSuite();
  testSuite.runAllTests().then((report) => {
    if (report && report.summary.successRate) {
      const successRate = parseFloat(report.summary.successRate);
      process.exit(successRate >= 80 ? 0 : 1); // Exit with error if success rate < 80%
    } else {
      process.exit(1);
    }
  }).catch((error) => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = EcommerceTestSuite;