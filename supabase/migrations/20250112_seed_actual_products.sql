-- Insert sample products with actual categories and images
INSERT INTO products (id, name, code, category, description, features, specifications, price, image_url, is_active, created_at, updated_at) VALUES
-- Filler Master Batches
('550e8400-e29b-41d4-a716-446655440001', 'Biodegradable Filler Master Batch - White', 'FMB-W-001', 'filler-master-batches', 'High-quality biodegradable filler master batch in white color for enhanced opacity and strength in biodegradable plastic products.', '{"features": ["100% biodegradable and compostable", "Excellent dispersion properties", "Enhanced opacity", "Improved mechanical properties", "Food grade approved", "ASTM D6400 certified"]}', '{"Color": "White", "Density": "1.2-1.4 g/cm³", "Melting Point": "160-180°C", "Filler Content": "70-80%", "Particle Size": "2-5 microns", "Moisture Content": "< 0.1%"}', '85.00', '/images/products/biodegradable-film.png', true, NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440002', 'Biodegradable Filler Master Batch - Natural', 'FMB-N-002', 'filler-master-batches', 'Natural colored biodegradable filler master batch for cost-effective production of eco-friendly plastic products.', '{"features": ["Eco-friendly composition", "Cost-effective solution", "Good processability", "Consistent quality", "Reduces raw material cost", "Compostable within 180 days"]}', '{"Color": "Natural/Beige", "Density": "1.1-1.3 g/cm³", "Melting Point": "155-175°C", "Filler Content": "65-75%", "Particle Size": "3-6 microns", "Moisture Content": "< 0.15%"}', '78.00', '/images/products/biodegradable-film.png', true, NOW(), NOW()),

-- Carry Bags Plain
('550e8400-e29b-41d4-a716-446655440003', 'Biodegradable Shopping Bags - Small (8x10 inch)', 'CB-S-001', 'carry-bags-plain', 'Small size biodegradable carry bags perfect for retail stores, grocery shops, and daily shopping needs.', '{"features": ["100% biodegradable", "Strong and durable", "Leak-proof", "Easy to carry", "Eco-friendly alternative", "Compostable in home conditions"]}', '{"Size": "8 x 10 inches", "Thickness": "20-25 microns", "Weight Capacity": "2-3 kg", "Material": "PBAT + PLA + Starch", "Degradation Time": "90-180 days", "Color": "Natural"}', '2.50', '/images/shop/biodegradable-shopping-bags.png', true, NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440004', 'Biodegradable Shopping Bags - Medium (10x12 inch)', 'CB-M-002', 'carry-bags-plain', 'Medium size biodegradable carry bags suitable for supermarkets and medium-sized shopping requirements.', '{"features": ["Medium capacity", "Reinforced handles", "Tear resistant", "Waterproof", "Biodegradable material", "CPCB approved"]}', '{"Size": "10 x 12 inches", "Thickness": "25-30 microns", "Weight Capacity": "4-5 kg", "Material": "PBAT + PLA + Starch", "Degradation Time": "90-180 days", "Color": "Natural"}', '3.20', '/images/shop/biodegradable-shopping-bags.png', true, NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440005', 'Biodegradable Shopping Bags - Large (12x15 inch)', 'CB-L-003', 'carry-bags-plain', 'Large size biodegradable carry bags for heavy-duty shopping and bulk purchases.', '{"features": ["Large capacity", "Extra strong handles", "Heavy-duty construction", "Multi-purpose use", "Environmentally safe", "Industrial compostable"]}', '{"Size": "12 x 15 inches", "Thickness": "30-35 microns", "Weight Capacity": "6-8 kg", "Material": "PBAT + PLA + Starch", "Degradation Time": "90-180 days", "Color": "Natural"}', '4.80', '/images/shop/biodegradable-shopping-bags.png', true, NOW(), NOW()),

-- Carry Bags with Private Labelling
('550e8400-e29b-41d4-a716-446655440006', 'Custom Printed Biodegradable Bags - Single Color', 'CBP-SC-001', 'carry-bags-private-label', 'Biodegradable carry bags with single color custom printing for brand promotion and marketing.', '{"features": ["Custom logo printing", "Single color design", "Brand promotion", "Eco-friendly marketing", "High-quality print", "Durable construction"]}', '{"Printing": "Single Color", "Print Area": "Up to 80% of bag surface", "Minimum Order": "5000 pieces", "Lead Time": "7-10 days", "Print Method": "Flexographic", "Colors Available": "Black, Blue, Red, Green"}', NULL, '/images/shop/biodegradable-bags.png', true, NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440007', 'Custom Printed Biodegradable Bags - Multi Color', 'CBP-MC-002', 'carry-bags-private-label', 'Premium biodegradable carry bags with multi-color custom printing for enhanced brand visibility.', '{"features": ["Multi-color printing", "Premium quality", "Enhanced brand visibility", "Professional appearance", "Eco-friendly branding", "Customizable design"]}', '{"Printing": "Multi Color (up to 4 colors)", "Print Area": "Full bag surface", "Minimum Order": "10000 pieces", "Lead Time": "10-15 days", "Print Method": "Gravure", "Finish": "Matte/Glossy"}', NULL, '/images/shop/biodegradable-bags.png', true, NOW(), NOW()),

-- Grocery Pouches
('550e8400-e29b-41d4-a716-446655440008', 'Biodegradable Grocery Pouches - Vegetables', 'GP-V-001', 'grocery-pouches', 'Specially designed biodegradable pouches for storing fresh vegetables and fruits.', '{"features": ["Food grade material", "Breathable design", "Moisture resistant", "Transparent visibility", "Safe for food contact", "Quick decomposition"]}', '{"Size": "6 x 9 inches", "Thickness": "15-20 microns", "Material": "PLA + PBAT", "Transparency": "High", "Food Grade": "Yes", "Shelf Life": "12 months"}', '1.80', '/images/shop/eco-packaging.png', true, NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440009', 'Biodegradable Grocery Pouches - Dry Goods', 'GP-D-002', 'grocery-pouches', 'Biodegradable pouches perfect for storing dry goods like grains, pulses, and spices.', '{"features": ["Airtight seal", "Moisture barrier", "Puncture resistant", "Easy to open", "Reusable", "Compostable material"]}', '{"Size": "8 x 12 inches", "Thickness": "20-25 microns", "Material": "PBAT + Starch", "Barrier Properties": "Excellent", "Seal Type": "Heat sealable", "Storage": "Dry conditions"}', '2.40', '/images/shop/eco-packaging.png', true, NOW(), NOW()),

-- Supermarket Pouches with Perforation
('550e8400-e29b-41d4-a716-446655440010', 'Perforated Biodegradable Pouches Roll - Small', 'SPP-S-001', 'supermarket-pouches', 'Roll of small perforated biodegradable pouches for easy dispensing in supermarkets and retail stores.', '{"features": ["Easy tear perforation", "Convenient dispensing", "Uniform size", "High clarity", "Food safe", "Biodegradable material"]}', '{"Pouch Size": "6 x 8 inches", "Roll Length": "200 pouches", "Perforation": "Every 8 inches", "Core Size": "3 inches", "Material": "PLA blend", "Thickness": "12-15 microns"}', '45.00', '/images/shop/compostable-containers.png', true, NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440011', 'Perforated Biodegradable Pouches Roll - Medium', 'SPP-M-002', 'supermarket-pouches', 'Medium size perforated biodegradable pouches on roll for versatile supermarket applications.', '{"features": ["Medium capacity", "Easy dispensing", "Clear visibility", "Strong construction", "Eco-friendly", "Cost-effective"]}', '{"Pouch Size": "8 x 10 inches", "Roll Length": "150 pouches", "Perforation": "Every 10 inches", "Core Size": "3 inches", "Material": "PBAT + PLA", "Thickness": "15-18 microns"}', '52.00', '/images/shop/compostable-containers.png', true, NOW(), NOW()),

-- D-Cut Garment Bags
('550e8400-e29b-41d4-a716-446655440012', 'D-Cut Biodegradable Garment Bags - Medium', 'DCG-M-001', 'd-cut-garment-bags', 'Medium size D-cut biodegradable bags perfect for garment stores and clothing retail.', '{"features": ["D-cut handle design", "Comfortable grip", "Suitable for garments", "Professional appearance", "Eco-friendly", "Strong and durable"]}', '{"Size": "12 x 15 inches", "Handle Type": "D-Cut", "Thickness": "25-30 microns", "Material": "PBAT + Starch", "Weight Capacity": "3-4 kg", "Color": "White/Natural"}', '3.80', '/images/shop/biodegradable-bags.png', true, NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440013', 'D-Cut Biodegradable Garment Bags - Large', 'DCG-L-002', 'd-cut-garment-bags', 'Large size D-cut biodegradable bags for heavy garments and bulk clothing items.', '{"features": ["Large capacity", "Reinforced D-cut handles", "Heavy-duty construction", "Professional look", "Biodegradable material", "Retail friendly"]}', '{"Size": "15 x 18 inches", "Handle Type": "D-Cut", "Thickness": "30-35 microns", "Material": "PBAT + Starch", "Weight Capacity": "5-6 kg", "Color": "White/Natural"}', '5.20', '/images/shop/biodegradable-bags.png', true, NOW(), NOW()),

-- Garbage Bags
('550e8400-e29b-41d4-a716-446655440014', 'Biodegradable Garbage Bags - Small (19x21 inch)', 'GB-S-001', 'garbage-bags', 'Small size biodegradable garbage bags for household and office waste management.', '{"features": ["100% biodegradable", "Leak-proof", "Strong and puncture resistant", "Easy to tie", "Odor control", "Home compostable"]}', '{"Size": "19 x 21 inches", "Thickness": "20-25 microns", "Capacity": "10-15 liters", "Material": "PBAT + PLA + Starch", "Degradation": "90-180 days", "Color": "Green/Black"}', '4.50', '/images/shop/garbage-bags.jpg', true, NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440015', 'Biodegradable Garbage Bags - Medium (24x32 inch)', 'GB-M-002', 'garbage-bags', 'Medium size biodegradable garbage bags suitable for kitchen and general household waste.', '{"features": ["Medium capacity", "Extra strong", "Tie handles", "Leak resistant", "Eco-friendly disposal", "ASTM D6400 certified"]}', '{"Size": "24 x 32 inches", "Thickness": "25-30 microns", "Capacity": "30-40 liters", "Material": "PBAT + PLA + Starch", "Degradation": "90-180 days", "Color": "Green/Black"}', '6.80', '/images/shop/garbage-bags.jpg', true, NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440016', 'Biodegradable Garbage Bags - Large (30x37 inch)', 'GB-L-003', 'garbage-bags', 'Large size biodegradable garbage bags for heavy-duty waste management and commercial use.', '{"features": ["Large capacity", "Heavy-duty construction", "Industrial strength", "Tear resistant", "Commercial grade", "Compostable certification"]}', '{"Size": "30 x 37 inches", "Thickness": "35-40 microns", "Capacity": "50-60 liters", "Material": "PBAT + PLA + Starch", "Degradation": "90-180 days", "Color": "Black"}', '9.50', '/images/shop/garbage-bags.jpg', true, NOW(), NOW()),

-- Tiffin Sheets
('550e8400-e29b-41d4-a716-446655440017', 'Biodegradable Tiffin Sheets - Food Grade', 'TS-FG-001', 'tiffin-sheets', 'Food grade biodegradable tiffin sheets for wrapping and packaging food items safely.', '{"features": ["Food grade certified", "Safe for direct food contact", "Grease resistant", "Moisture barrier", "Easy to wrap", "Compostable material"]}', '{"Size": "12 x 12 inches", "Thickness": "25-30 microns", "Material": "PLA + PBAT", "Food Grade": "Yes", "Temperature Resistance": "Up to 70°C", "Transparency": "High"}', '0.85', '/images/products/compostable-food-container.png', true, NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440018', 'Biodegradable Tiffin Sheets - Heavy Duty', 'TS-HD-002', 'tiffin-sheets', 'Heavy duty biodegradable tiffin sheets for wrapping oily and heavy food items.', '{"features": ["Heavy duty construction", "Oil resistant", "Strong and durable", "Multi-purpose use", "Food safe", "Biodegradable"]}', '{"Size": "15 x 15 inches", "Thickness": "35-40 microns", "Material": "PBAT + Starch", "Oil Resistance": "Excellent", "Temperature Resistance": "Up to 80°C", "Color": "Natural"}', '1.20', '/images/products/compostable-food-container.png', true, NOW(), NOW()),

-- Packaging Sheets in Rolls
('550e8400-e29b-41d4-a716-446655440019', 'Biodegradable Packaging Sheet Roll - Thin', 'PSR-T-001', 'packaging-sheets-rolls', 'Thin biodegradable packaging sheet roll for light packaging and wrapping applications.', '{"features": ["Continuous roll format", "Easy to cut", "Lightweight", "Cost-effective", "Versatile use", "Eco-friendly packaging"]}', '{"Width": "12 inches", "Length": "100 meters", "Thickness": "15-20 microns", "Core Size": "3 inches", "Material": "PLA blend", "Roll Weight": "2.5 kg"}', '180.00', '/images/products/biodegradable-film.png', true, NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440020', 'Biodegradable Packaging Sheet Roll - Medium', 'PSR-M-002', 'packaging-sheets-rolls', 'Medium thickness biodegradable packaging sheet roll for general packaging needs.', '{"features": ["Medium thickness", "Good barrier properties", "Puncture resistant", "Heat sealable", "Industrial use", "Compostable"]}', '{"Width": "18 inches", "Length": "75 meters", "Thickness": "25-30 microns", "Core Size": "3 inches", "Material": "PBAT + PLA", "Roll Weight": "4.2 kg"}', '285.00', '/images/products/biodegradable-film.png', true, NOW(), NOW()),

('550e8400-e29b-41d4-a716-446655440021', 'Biodegradable Packaging Sheet Roll - Heavy Duty', 'PSR-HD-003', 'packaging-sheets-rolls', 'Heavy duty biodegradable packaging sheet roll for industrial and heavy packaging applications.', '{"features": ["Heavy duty construction", "Superior strength", "Industrial grade", "Excellent barrier", "Machine compatible", "Certified compostable"]}', '{"Width": "24 inches", "Length": "50 meters", "Thickness": "40-50 microns", "Core Size": "6 inches", "Material": "PBAT + Starch", "Roll Weight": "8.5 kg"}', '420.00', '/images/products/biodegradable-film.png', true, NOW(), NOW());

-- Insert corresponding product images
INSERT INTO product_images (product_id, image_url, alt_text, is_primary, display_order) VALUES
-- Filler Master Batches
('550e8400-e29b-41d4-a716-446655440001', '/images/products/biodegradable-film.png', 'Biodegradable Filler Master Batch - White', true, 0),
('550e8400-e29b-41d4-a716-446655440002', '/images/products/biodegradable-film.png', 'Biodegradable Filler Master Batch - Natural', true, 0),

-- Carry Bags Plain
('550e8400-e29b-41d4-a716-446655440003', '/images/shop/biodegradable-shopping-bags.png', 'Biodegradable Shopping Bags - Small', true, 0),
('550e8400-e29b-41d4-a716-446655440004', '/images/shop/biodegradable-shopping-bags.png', 'Biodegradable Shopping Bags - Medium', true, 0),
('550e8400-e29b-41d4-a716-446655440005', '/images/shop/biodegradable-shopping-bags.png', 'Biodegradable Shopping Bags - Large', true, 0),

-- Carry Bags with Private Labelling
('550e8400-e29b-41d4-a716-446655440006', '/images/shop/biodegradable-bags.png', 'Custom Printed Biodegradable Bags - Single Color', true, 0),
('550e8400-e29b-41d4-a716-446655440007', '/images/shop/biodegradable-bags.png', 'Custom Printed Biodegradable Bags - Multi Color', true, 0),

-- Grocery Pouches
('550e8400-e29b-41d4-a716-446655440008', '/images/shop/eco-packaging.png', 'Biodegradable Grocery Pouches - Vegetables', true, 0),
('550e8400-e29b-41d4-a716-446655440009', '/images/shop/eco-packaging.png', 'Biodegradable Grocery Pouches - Dry Goods', true, 0),

-- Supermarket Pouches with Perforation
('550e8400-e29b-41d4-a716-446655440010', '/images/shop/compostable-containers.png', 'Perforated Biodegradable Pouches Roll - Small', true, 0),
('550e8400-e29b-41d4-a716-446655440011', '/images/shop/compostable-containers.png', 'Perforated Biodegradable Pouches Roll - Medium', true, 0),

-- D-Cut Garment Bags
('550e8400-e29b-41d4-a716-446655440012', '/images/shop/biodegradable-bags.png', 'D-Cut Biodegradable Garment Bags - Medium', true, 0),
('550e8400-e29b-41d4-a716-446655440013', '/images/shop/biodegradable-bags.png', 'D-Cut Biodegradable Garment Bags - Large', true, 0),

-- Garbage Bags
('550e8400-e29b-41d4-a716-446655440014', '/images/shop/garbage-bags.jpg', 'Biodegradable Garbage Bags - Small', true, 0),
('550e8400-e29b-41d4-a716-446655440015', '/images/shop/garbage-bags.jpg', 'Biodegradable Garbage Bags - Medium', true, 0),
('550e8400-e29b-41d4-a716-446655440016', '/images/shop/garbage-bags.jpg', 'Biodegradable Garbage Bags - Large', true, 0),

-- Tiffin Sheets
('550e8400-e29b-41d4-a716-446655440017', '/images/products/compostable-food-container.png', 'Biodegradable Tiffin Sheets - Food Grade', true, 0),
('550e8400-e29b-41d4-a716-446655440018', '/images/products/compostable-food-container.png', 'Biodegradable Tiffin Sheets - Heavy Duty', true, 0),

-- Packaging Sheets in Rolls
('550e8400-e29b-41d4-a716-446655440019', '/images/products/biodegradable-film.png', 'Biodegradable Packaging Sheet Roll - Thin', true, 0),
('550e8400-e29b-41d4-a716-446655440020', '/images/products/biodegradable-film.png', 'Biodegradable Packaging Sheet Roll - Medium', true, 0),
('550e8400-e29b-41d4-a716-446655440021', '/images/products/biodegradable-film.png', 'Biodegradable Packaging Sheet Roll - Heavy Duty', true, 0);
