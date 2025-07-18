#!/usr/bin/env node

/**
 * Simple E-commerce Test Script
 * Tests basic functionality without complex HTTP handling
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class SimpleTestSuite {
  constructor() {
    this.testResults = [];
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

  async testFileStructure() {
    console.log('\n📁 Testing E-commerce File Structure...');
    
    const requiredFiles = [
      'lib/cart-context.tsx',
      'components/shopping-cart.tsx',
      'components/product-reviews.tsx',
      'components/add-to-cart-button.tsx',
      'app/checkout/page.tsx',
      'app/wishlist/page.tsx',
      'app/thank-you/page.tsx',
      'components/product-search.tsx',
      'components/product-comparison.tsx'
    ];
    
    for (const file of requiredFiles) {
      const exists = fs.existsSync(path.join(__dirname, file));
      await this.logTest(`File: ${file}`, exists, exists ? 'Found' : 'Missing');
    }
  }

  async testComponentContent() {
    console.log('\n🧩 Testing Component Content...');
    
    const componentTests = [
      {
        file: 'lib/cart-context.tsx',
        searchTerms: ['CartContext', 'addToCart', 'removeFromCart', 'useCart'],
        name: 'Cart Context'
      },
      {
        file: 'components/shopping-cart.tsx',
        searchTerms: ['ShoppingCart', 'cart-item', 'checkout'],
        name: 'Shopping Cart'
      },
      {
        file: 'components/product-reviews.tsx',
        searchTerms: ['ProductReviews', 'rating', 'review', 'Star'],
        name: 'Product Reviews'
      },
      {
        file: 'components/add-to-cart-button.tsx',
        searchTerms: ['AddToCartButton', 'addToCart', 'quantity'],
        name: 'Add to Cart Button'
      },
      {
        file: 'app/checkout/page.tsx',
        searchTerms: ['checkout', 'order', 'payment', 'billing'],
        name: 'Checkout Page'
      }
    ];
    
    for (const test of componentTests) {
      try {
        const filePath = path.join(__dirname, test.file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          const hasAllTerms = test.searchTerms.every(term => 
            content.toLowerCase().includes(term.toLowerCase())
          );
          await this.logTest(`${test.name} Content`, hasAllTerms, 
            hasAllTerms ? 'All required elements found' : 'Missing some elements');
        } else {
          await this.logTest(`${test.name} Content`, false, 'File not found');
        }
      } catch (error) {
        await this.logTest(`${test.name} Content`, false, error.message);
      }
    }
  }

  async testPackageJson() {
    console.log('\n📦 Testing Package Dependencies...');
    
    try {
      const packagePath = path.join(__dirname, 'package.json');
      const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      const requiredDeps = [
        'react',
        'next',
        'lucide-react',
        '@radix-ui/react-dialog',
        '@radix-ui/react-toast'
      ];
      
      for (const dep of requiredDeps) {
        const hasDepInDeps = packageContent.dependencies && packageContent.dependencies[dep];
        const hasDepInDevDeps = packageContent.devDependencies && packageContent.devDependencies[dep];
        const hasDep = hasDepInDeps || hasDepInDevDeps;
        
        await this.logTest(`Dependency: ${dep}`, hasDep, hasDep ? 'Found' : 'Missing');
      }
      
    } catch (error) {
      await this.logTest('Package.json Check', false, error.message);
    }
  }

  async testTypeScriptConfig() {
    console.log('\n🔧 Testing TypeScript Configuration...');
    
    try {
      const tsconfigPath = path.join(__dirname, 'tsconfig.json');
      const exists = fs.existsSync(tsconfigPath);
      await this.logTest('TypeScript Config', exists, exists ? 'Found' : 'Missing');
      
      if (exists) {
        const content = fs.readFileSync(tsconfigPath, 'utf8');
        const hasJSX = content.includes('jsx');
        await this.logTest('JSX Support', hasJSX, hasJSX ? 'Configured' : 'Not configured');
      }
      
    } catch (error) {
      await this.logTest('TypeScript Config', false, error.message);
    }
  }

  async testTailwindConfig() {
    console.log('\n🎨 Testing Tailwind Configuration...');
    
    try {
      const tailwindPath = path.join(__dirname, 'tailwind.config.js');
      const exists = fs.existsSync(tailwindPath);
      await this.logTest('Tailwind Config', exists, exists ? 'Found' : 'Missing');
      
      if (exists) {
        const content = fs.readFileSync(tailwindPath, 'utf8');
        const hasContent = content.includes('content') && content.includes('theme');
        await this.logTest('Tailwind Content Config', hasContent, hasContent ? 'Configured' : 'Not configured');
      }
      
    } catch (error) {
      await this.logTest('Tailwind Config', false, error.message);
    }
  }

  async testEcommerceFeatures() {
    console.log('\n🛒 Testing E-commerce Feature Implementation...');
    
    const features = [
      {
        name: 'Shopping Cart Context',
        file: 'lib/cart-context.tsx',
        keywords: ['CartProvider', 'useCart', 'localStorage', 'addToCart']
      },
      {
        name: 'Product Reviews System',
        file: 'components/product-reviews.tsx',
        keywords: ['rating', 'review', 'Star', 'submitReview']
      },
      {
        name: 'Checkout Process',
        file: 'app/checkout/page.tsx',
        keywords: ['checkout', 'payment', 'order', 'billing']
      },
      {
        name: 'Wishlist Functionality',
        file: 'app/wishlist/page.tsx',
        keywords: ['wishlist', 'Heart', 'localStorage', 'removeFromWishlist']
      },
      {
        name: 'Product Search',
        file: 'components/product-search.tsx',
        keywords: ['search', 'filter', 'category', 'price']
      }
    ];
    
    for (const feature of features) {
      try {
        const filePath = path.join(__dirname, feature.file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          const implementedFeatures = feature.keywords.filter(keyword => 
            content.toLowerCase().includes(keyword.toLowerCase())
          );
          
          const completeness = (implementedFeatures.length / feature.keywords.length) * 100;
          const isComplete = completeness >= 75; // 75% threshold
          
          await this.logTest(feature.name, isComplete, 
            `${Math.round(completeness)}% complete (${implementedFeatures.length}/${feature.keywords.length} features)`);
        } else {
          await this.logTest(feature.name, false, 'File not found');
        }
      } catch (error) {
        await this.logTest(feature.name, false, error.message);
      }
    }
  }

  async testBuildConfiguration() {
    console.log('\n🔨 Testing Build Configuration...');
    
    try {
      // Test Next.js config
      const nextConfigPath = path.join(__dirname, 'next.config.mjs');
      const hasNextConfig = fs.existsSync(nextConfigPath);
      await this.logTest('Next.js Config', hasNextConfig, hasNextConfig ? 'Found' : 'Missing');
      
      // Test PostCSS config
      const postcssConfigPath = path.join(__dirname, 'postcss.config.mjs');
      const hasPostcssConfig = fs.existsSync(postcssConfigPath);
      await this.logTest('PostCSS Config', hasPostcssConfig, hasPostcssConfig ? 'Found' : 'Missing');
      
      // Test components.json (shadcn/ui)
      const componentsJsonPath = path.join(__dirname, 'components.json');
      const hasComponentsJson = fs.existsSync(componentsJsonPath);
      await this.logTest('Components Config', hasComponentsJson, hasComponentsJson ? 'Found' : 'Missing');
      
    } catch (error) {
      await this.logTest('Build Configuration', false, error.message);
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
        timestamp: new Date().toISOString()
      },
      results: this.testResults,
      categories: {
        'File Structure': this.testResults.filter(r => r.test.startsWith('File:')),
        'Component Content': this.testResults.filter(r => r.test.includes('Content')),
        'E-commerce Features': this.testResults.filter(r => 
          ['Shopping Cart Context', 'Product Reviews System', 'Checkout Process', 'Wishlist Functionality', 'Product Search'].includes(r.test)
        ),
        'Configuration': this.testResults.filter(r => 
          r.test.includes('Config') || r.test.includes('Dependency')
        )
      }
    };
    
    // Save report to file
    const reportPath = path.join(__dirname, 'ecommerce-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    console.log('\n' + '='.repeat(60));
    console.log('🎯 E-COMMERCE IMPLEMENTATION TEST RESULTS');
    console.log('='.repeat(60));
    console.log(`📊 Total Tests: ${totalTests}`);
    console.log(`✅ Passed: ${passedTests}`);
    console.log(`❌ Failed: ${failedTests}`);
    console.log(`📈 Success Rate: ${successRate}%`);
    console.log('='.repeat(60));
    
    // Show category breakdown
    console.log('\n📋 Category Breakdown:');
    Object.entries(report.categories).forEach(([category, tests]) => {
      const categoryPassed = tests.filter(t => t.success).length;
      const categoryTotal = tests.length;
      const categoryRate = categoryTotal > 0 ? ((categoryPassed / categoryTotal) * 100).toFixed(1) : '0.0';
      console.log(`   ${category}: ${categoryPassed}/${categoryTotal} (${categoryRate}%)`);
    });
    
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
    
    // Show failed tests
    const failedTestsList = this.testResults.filter(r => !r.success);
    if (failedTestsList.length > 0) {
      console.log('\n❌ Failed Tests:');
      failedTestsList.forEach(test => {
        console.log(`   • ${test.test}: ${test.details}`);
      });
    }
    
    // Show recommendations
    console.log('\n💡 Recommendations:');
    if (successRate < 90) {
      console.log('   • Review failed tests and fix missing components');
    }
    if (report.categories['E-commerce Features'].filter(t => t.success).length < 4) {
      console.log('   • Complete implementation of core e-commerce features');
    }
    if (report.categories['Configuration'].filter(t => t.success).length < 3) {
      console.log('   • Verify build and configuration files');
    }
    
    return report;
  }

  async runAllTests() {
    console.log('🚀 Starting E-commerce Implementation Test Suite...\n');
    
    try {
      // Run all test suites
      await this.testFileStructure();
      await this.testComponentContent();
      await this.testPackageJson();
      await this.testTypeScriptConfig();
      await this.testTailwindConfig();
      await this.testEcommerceFeatures();
      await this.testBuildConfiguration();
      
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

// Run the test suite
if (require.main === module) {
  const testSuite = new SimpleTestSuite();
  
  testSuite.runAllTests().then((report) => {
    if (report && report.summary.successRate) {
      const successRate = parseFloat(report.summary.successRate);
      console.log(`\n🎯 Final Result: ${successRate >= 80 ? '✅ PASS' : '❌ FAIL'} (${successRate}%)`);
      process.exit(successRate >= 80 ? 0 : 1);
    } else {
      process.exit(1);
    }
  }).catch((error) => {
    console.error('Test execution failed:', error);
    process.exit(1);
  });
}

module.exports = SimpleTestSuite;