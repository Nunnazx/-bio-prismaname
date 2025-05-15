-- Seed data for testing

-- Insert sample products
INSERT INTO products (name, slug, description, features, specifications, price, image_url, category, is_featured, stock_status)
VALUES
    ('Biodegradable Shopping Bags', 'biodegradable-shopping-bags', 'Eco-friendly shopping bags that decompose naturally.', 
     ARRAY['100% biodegradable', 'Strong and durable', 'Custom printing available', 'Various sizes'], 
     '{"material": "PLA and PBAT blend", "thickness": "25 microns", "sizes": ["small", "medium", "large"], "load_capacity": "5kg"}', 
     12.99, '/images/shop/biodegradable-bags.png', 'bags', true, 'in_stock'),
    
    ('Compostable Food Containers', 'compostable-food-containers', 'Food-safe containers perfect for takeaway and food delivery.', 
     ARRAY['Microwave safe', 'Oil and water resistant', 'No plastic or wax lining', 'Suitable for hot and cold foods'], 
     '{"material": "Bagasse", "sizes": ["8oz", "16oz", "32oz"], "temperature_range": "-20°C to 120°C", "certifications": ["ASTM D6400", "EN13432"]}', 
     15.99, '/images/shop/compostable-containers.png', 'containers', true, 'in_stock'),
    
    ('Biodegradable Cutlery Set', 'biodegradable-cutlery-set', 'Durable cutlery that breaks down naturally after disposal.', 
     ARRAY['Heat resistant', 'Sturdy design', 'No plastic additives', 'Compostable in industrial facilities'], 
     '{"material": "PLA", "items_per_set": 24, "includes": ["forks", "knives", "spoons"], "color": "natural"}', 
     8.99, '/images/shop/biodegradable-cutlery.png', 'cutlery', false, 'in_stock'),
    
    ('Eco-Friendly Packaging Film', 'eco-friendly-packaging-film', 'Transparent film for packaging that biodegrades in natural environments.', 
     ARRAY['Crystal clear', 'Excellent barrier properties', 'Printable surface', 'Biodegrades in soil'], 
     '{"material": "PBAT and PLA blend", "thickness": "15-30 microns", "width": "up to 1.2m", "transparency": "92%"}', 
     29.99, '/images/shop/eco-packaging.png', 'packaging', true, 'in_stock');

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, content, excerpt, featured_image, status, tags, published_at)
VALUES
    ('The Future of Sustainable Packaging', 'future-of-sustainable-packaging', 
     '# The Future of Sustainable Packaging\n\nSustainable packaging is rapidly evolving as businesses and consumers alike recognize the urgent need to reduce plastic waste and environmental impact. This blog explores the latest trends and innovations in eco-friendly packaging solutions.\n\n## Biodegradable Materials\n\nOne of the most significant advancements in sustainable packaging is the development of truly biodegradable materials. Unlike traditional plastics that can take hundreds of years to break down, these new materials decompose naturally within months under the right conditions.\n\n## Compostable Alternatives\n\nCompostable packaging goes a step further by not only breaking down but also providing nutrients to the soil. Materials like bagasse (sugarcane fiber), mushroom packaging, and seaweed-based films are gaining popularity for their minimal environmental footprint.\n\n## Circular Economy Approaches\n\nThe concept of a circular economy is central to the future of packaging. This involves designing products that can be reused, recycled, or composted, eliminating waste and pollution from the start.\n\n## Regulatory Changes\n\nGovernments worldwide are implementing stricter regulations on single-use plastics, driving innovation in the packaging industry. These policies are accelerating the transition to more sustainable alternatives.\n\n## Consumer Awareness\n\nIncreasing consumer awareness about environmental issues is putting pressure on brands to adopt more sustainable packaging solutions. Companies that embrace eco-friendly packaging often gain a competitive edge in the market.\n\n## Conclusion\n\nThe future of sustainable packaging looks promising, with continuous innovations addressing the environmental challenges posed by traditional packaging materials. As technology advances and awareness grows, we can expect even more creative and effective solutions to emerge.',
     'Explore the latest trends and innovations in sustainable packaging solutions that are shaping the future of the industry.',
     '/images/blog/sustainable-packaging-trends.png', 'published', ARRAY['sustainability', 'packaging', 'innovation'], '2023-11-15T10:00:00Z'),
    
    ('Biodegradable vs. Compostable: Understanding the Difference', 'biodegradable-vs-compostable', 
     '# Biodegradable vs. Compostable: Understanding the Difference\n\nThe terms "biodegradable" and "compostable" are often used interchangeably, but they represent different processes and outcomes. This blog post clarifies these important distinctions to help consumers make more informed choices.\n\n## What Does Biodegradable Mean?\n\nBiodegradable materials break down naturally through biological processes, returning to nature over time. However, there\'s no specific timeframe for this process, and some "biodegradable" products may still take years or decades to fully decompose.\n\n## What Does Compostable Mean?\n\nCompostable materials not only break down but do so in a specific timeframe (typically around 90 days) and in specific composting conditions. Additionally, they leave no toxic residue and can actually benefit the soil as they decompose.\n\n## Key Differences\n\n1. **Timeframe**: Biodegradable has no time requirement, while compostable materials must break down within a specific period.\n2. **End Result**: Biodegradable materials simply break down, while compostable materials convert into nutrient-rich compost.\n3. **Certification**: Compostable products often meet specific standards (like ASTM D6400 or EN13432), while "biodegradable" has fewer regulatory definitions.\n4. **Environmental Impact**: Not all biodegradable materials are beneficial to the environment, whereas properly composted materials contribute positively to soil health.\n\n## Making Informed Choices\n\nWhen selecting products, look for specific certifications rather than vague claims. Products certified as compostable by recognized organizations have been tested to ensure they break down completely in composting facilities without leaving harmful residues.\n\n## Conclusion\n\nUnderstanding the difference between biodegradable and compostable is crucial for making environmentally responsible choices. While both options are generally better than non-degradable plastics, compostable materials typically offer superior environmental benefits when properly disposed of.',
     'Learn the crucial differences between biodegradable and compostable materials to make more informed environmental choices.',
     '/images/blog/biodegradable-vs-compostable.png', 'published', ARRAY['education', 'sustainability', 'materials'], '2023-12-05T14:30:00Z'),
    
    ('5 Ways Businesses Can Reduce Plastic Waste', '5-ways-businesses-can-reduce-plastic-waste', 
     '# 5 Ways Businesses Can Reduce Plastic Waste\n\nBusinesses of all sizes have a significant role to play in reducing plastic waste. This article outlines practical strategies that companies can implement to minimize their plastic footprint while potentially reducing costs and improving their brand image.\n\n## 1. Audit Your Plastic Usage\n\nBefore making changes, understand where and how much plastic your business uses. Conduct a thorough audit of all plastic materials in your operations, from packaging and shipping materials to office supplies and employee areas.\n\n## 2. Switch to Sustainable Alternatives\n\nReplace conventional plastics with biodegradable or compostable alternatives. Consider materials like PLA (polylactic acid), PBAT (polybutylene adipate terephthalate), or natural fibers like bagasse for packaging and service items.\n\n## 3. Implement a Recycling Program\n\nEstablish comprehensive recycling systems within your facilities. Provide clearly labeled bins, educate employees on proper sorting, and partner with recycling services that can handle various types of plastic waste.\n\n## 4. Engage Suppliers and Partners\n\nExtend your sustainability efforts throughout your supply chain. Work with suppliers who share your commitment to reducing plastic waste and collaborate on developing more sustainable packaging and shipping solutions.\n\n## 5. Educate and Incentivize Customers\n\nEncourage customers to participate in your plastic reduction initiatives. Offer incentives for returning packaging, bringing reusable containers, or choosing eco-friendly options. Communicate your sustainability efforts to build customer loyalty and brand value.\n\n## Measuring Impact\n\nTrack and report on your plastic reduction efforts. Quantify the amount of plastic eliminated, recycled, or replaced with sustainable alternatives. Share these metrics with stakeholders to demonstrate your commitment to environmental responsibility.\n\n## Conclusion\n\nReducing plastic waste is not just an environmental imperative but also a business opportunity. Companies that take proactive steps to minimize their plastic footprint often discover operational efficiencies, cost savings, and enhanced brand reputation in the process.',
     'Discover practical strategies for businesses to significantly reduce their plastic waste while improving sustainability credentials.',
     '/images/blog/reducing-plastic-waste.png', 'published', ARRAY['business', 'sustainability', 'waste-reduction'], '2024-01-20T09:15:00Z'),
    
    ('The Rise of Corporate Sustainability Initiatives', 'rise-of-corporate-sustainability-initiatives', 
     '# The Rise of Corporate Sustainability Initiatives\n\nCorporate sustainability has evolved from a niche concern to a mainstream business imperative. This article examines how companies across industries are integrating environmental responsibility into their core strategies and operations.\n\n## Beyond Compliance\n\nModern sustainability initiatives go far beyond regulatory compliance. Leading companies are proactively setting ambitious environmental goals, from achieving carbon neutrality to eliminating waste and implementing circular economy principles.\n\n## Strategic Integration\n\nRather than treating sustainability as a separate function, forward-thinking organizations are integrating environmental considerations into every aspect of their business, from product design and manufacturing to supply chain management and marketing.\n\n## Innovation Driver\n\nSustainability challenges are spurring innovation across industries. Companies are developing new materials, processes, and business models that reduce environmental impact while creating competitive advantages and opening new market opportunities.\n\n## Stakeholder Expectations\n\nInvestors, customers, employees, and communities increasingly expect companies to demonstrate meaningful environmental commitments. Organizations that fail to address sustainability risk losing stakeholder trust and support.\n\n## Measuring and Reporting\n\nTransparent reporting of environmental performance is becoming standard practice. Companies are adopting sophisticated metrics and frameworks to track their sustainability progress and communicate it effectively to stakeholders.\n\n## Case Studies\n\nNumerous companies across sectors are demonstrating leadership in corporate sustainability:\n\n- **Unilever** has committed to halving the environmental footprint of its products while growing its business.\n- **Patagonia** has pioneered sustainable materials and practices in the apparel industry.\n- **Microsoft** has pledged to be carbon negative by 2030 and to remove all historical carbon emissions by 2050.\n\n## Conclusion\n\nCorporate sustainability has transitioned from a peripheral concern to a central business priority. As environmental challenges intensify and stakeholder expectations evolve, companies that embrace sustainability as a core value will be better positioned for long-term success.',
     'Explore how leading companies are integrating sustainability into their core business strategies and operations.',
     '/images/blog/corporate-sustainability.png', 'draft', ARRAY['business', 'sustainability', 'corporate-responsibility'], NULL);

-- Insert sample inquiries
INSERT INTO inquiries (name, email, company, phone, message, product_interest, status, notes)
VALUES
    ('Raj Patel', 'raj.patel@greenretail.com', 'Green Retail Solutions', '+91 98765 43210', 
     'We are interested in your biodegradable shopping bags for our retail chain. Could you please send us samples and bulk pricing information?', 
     'Biodegradable Shopping Bags', 'in_progress', 'Sent samples on 2023-12-10. Following up next week.'),
    
    ('Priya Sharma', 'priya@ecofooddelivery.in', 'Eco Food Delivery', '+91 87654 32109', 
     'Looking for compostable food containers for our food delivery service. Need approximately 10,000 units per month. Please provide details on customization options.', 
     'Compostable Food Containers', 'new', NULL),
    
    ('Amit Singh', 'amit.singh@hotelgroup.com', 'Sustainable Hospitality Group', '+91 76543 21098', 
     'Our hotel chain is transitioning to eco-friendly products. Interested in your full range of biodegradable products for our restaurants and room service.', 
     'Multiple Products', 'completed', 'Contract signed for 12-month supply. Initial order placed.'),
    
    ('Sarah Johnson', 'sarah@globalbrands.com', 'Global Brands Inc.', '+1 555-123-4567', 
     'We are a multinational company looking to replace our packaging with sustainable alternatives. Would like to discuss partnership opportunities.', 
     'Eco-Friendly Packaging Film', 'new', NULL);

-- Insert sample certifications
INSERT INTO certifications (name, issuing_body, description, image_url, valid_from, valid_until)
VALUES
    ('ASTM D6400', 'American Society for Testing and Materials', 
     'Standard specification for compostable plastics. Certifies that products completely biodegrade in a commercial composting facility.', 
     '/images/certifications/astm-certified.png', '2022-01-15', '2025-01-14'),
    
    ('ISO 14001:2015', 'International Organization for Standardization', 
     'Environmental Management System certification. Demonstrates our commitment to environmental responsibility in all operations.', 
     '/images/certifications/iso-certified.png', '2021-06-10', '2024-06-09');

-- Insert sample testimonials
INSERT INTO testimonials (client_name, client_company, client_position, content, rating, image_url, is_featured)
VALUES
    ('Vikram Mehta', 'Eco Retail Solutions', 'Procurement Director', 
     'AICMT International has been our trusted supplier for biodegradable packaging for over two years. Their products consistently meet our high standards for quality and environmental performance.', 
     5, '/images/clients/eco-retail-logo.png', true),
    
    ('Ananya Desai', 'Sustainable Foods', 'CEO', 
     'Switching to AICMT''s compostable food containers has been a game-changer for our business. Our customers appreciate our commitment to sustainability, and we''ve seen a significant increase in repeat business.', 
     5, '/images/clients/sustainable-foods-logo.png', true),
    
    ('Michael Chen', 'Green Hospitality Group', 'Sustainability Manager', 
     'The biodegradable products from AICMT have helped us reduce our environmental footprint while maintaining the premium experience our guests expect. Their technical support and consistent quality are outstanding.', 
     4, '/images/clients/green-hospitality-logo.png', false);

-- Insert sample SEO metadata
INSERT INTO seo_metadata (page_path, title, description, keywords, og_image)
VALUES
    ('/', 'AICMT International - Biodegradable Solutions for a Sustainable Future', 
     'AICMT International provides innovative biodegradable and compostable plastic alternatives for businesses committed to sustainability.', 
     ARRAY['biodegradable plastics', 'compostable packaging', 'sustainable solutions', 'eco-friendly products'], 
     '/images/banners/home-banner.jpg'),
    
    ('/products', 'Sustainable Products - AICMT International', 
     'Explore our range of biodegradable and compostable products designed for businesses transitioning to sustainable packaging solutions.', 
     ARRAY['biodegradable products', 'compostable packaging', 'eco-friendly alternatives', 'sustainable business'], 
     '/images/banners/products-banner.jpg'),
    
    ('/about', 'About AICMT International - Our Sustainability Journey', 
     'Learn about AICMT International''s mission to provide innovative biodegradable solutions and our commitment to environmental sustainability.', 
     ARRAY['about AICMT', 'sustainability mission', 'biodegradable innovation', 'eco-friendly company'], 
     '/images/banners/about-banner.jpg'),
    
    ('/blog', 'Sustainability Blog - AICMT International', 
     'Stay informed about the latest trends, innovations, and insights in sustainable packaging and environmental responsibility.', 
     ARRAY['sustainability blog', 'biodegradable news', 'environmental insights', 'packaging innovation'], 
     '/images/banners/blog-banner.jpg');
