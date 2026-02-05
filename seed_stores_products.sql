-- STEP 2: Add Sample Stores and Products
-- Run this script AFTER you have created at least one merchant user account through Supabase Auth
-- Replace 'YOUR_MERCHANT_USER_ID' with the actual UUID from auth.users

DO $$
DECLARE
  merchant_user_id UUID;
  store1_id UUID;
  store2_id UUID;
  store3_id UUID;
  store4_id UUID;
BEGIN
  -- Get the first user with role 'merchant' or any user if no merchant exists
  -- IMPORTANT: Replace this with your actual merchant user ID
  SELECT id INTO merchant_user_id FROM users WHERE role = 'merchant' LIMIT 1;
  
  -- If no merchant found, use any existing user (for demo purposes)
  IF merchant_user_id IS NULL THEN
    SELECT id INTO merchant_user_id FROM users LIMIT 1;
  END IF;

  -- Check if we have a valid user
  IF merchant_user_id IS NULL THEN
    RAISE EXCEPTION 'No users found! Please create a user account first through Supabase Auth.';
  END IF;

  RAISE NOTICE 'Using merchant_id: %', merchant_user_id;

  -- Insert Sample Stores
  INSERT INTO stores (merchant_id, name, description, logo_url, address, maps_link, category, subscription_plan, is_active, points_balance)
  VALUES
    (merchant_user_id, 'Fashion Hub', 'Your destination for trendy clothing and accessories', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=300&h=300&fit=crop', 'Cairo, Egypt - Downtown', 'https://maps.google.com', 'Clothing', 'premium', true, 1000),
    (merchant_user_id, 'Footwear Emporium', 'Premium shoes and sneakers collection', 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=300&h=300&fit=crop', 'Alexandria, Egypt - City Center', 'https://maps.google.com', 'Shoes', 'premium', true, 850),
    (merchant_user_id, 'Accessory Haven', 'Elegant accessories for every occasion', 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?w=300&h=300&fit=crop', 'Giza, Egypt - Mall of Arabia', 'https://maps.google.com', 'Accessories', 'basic', true, 650),
    (merchant_user_id, 'Style Studio', 'Complete fashion solutions under one roof', 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=300&h=300&fit=crop', 'Cairo, Egypt - Nasr City', 'https://maps.google.com', 'Clothing', 'premium', true, 920)
  ON CONFLICT DO NOTHING;

  -- Get store IDs
  SELECT id INTO store1_id FROM stores WHERE name = 'Fashion Hub' LIMIT 1;
  SELECT id INTO store2_id FROM stores WHERE name = 'Footwear Emporium' LIMIT 1;
  SELECT id INTO store3_id FROM stores WHERE name = 'Accessory Haven' LIMIT 1;
  SELECT id INTO store4_id FROM stores WHERE name = 'Style Studio' LIMIT 1;

  -- Insert Sample Products
  IF store1_id IS NOT NULL THEN
    INSERT INTO products (store_id, name, description, price, category, gender_filter, image_urls, stock_quantity, is_active) 
    VALUES
      (store1_id, 'Summer Floral Dress', 'Light and breezy summer dress with floral pattern', 499.99, 'Clothing', 'Women', ARRAY['https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=700&fit=crop'], 25, true),
      (store2_id, 'Classic Leather Sandals', 'Comfortable leather sandals for everyday wear', 349.99, 'Shoes', 'Women', ARRAY['https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500&h=700&fit=crop'], 40, true),
      (store3_id, 'Statement Gold Necklace', 'Elegant gold-plated statement necklace', 299.99, 'Jewelry', 'Unisex', ARRAY['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=700&fit=crop'], 15, true),
      (store1_id, 'Casual Linen Shirt', 'Breathable linen shirt perfect for summer', 379.99, 'Clothing', 'Men', ARRAY['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=700&fit=crop'], 30, true),
      (store2_id, 'Premium Running Shoes', 'High-performance running shoes with cushioning', 899.99, 'Shoes', 'Unisex', ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=700&fit=crop'], 20, true),
      (store4_id, 'Designer Backpack', 'Stylish and functional designer backpack', 649.99, 'Bags', 'Unisex', ARRAY['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=700&fit=crop'], 18, true),
      (store3_id, 'Minimalist Watch', 'Elegant minimalist watch with leather strap', 799.99, 'Watches', 'Unisex', ARRAY['https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=500&h=700&fit=crop'], 12, true),
      (store1_id, 'Denim Jacket', 'Classic denim jacket with modern fit', 549.99, 'Clothing', 'Unisex', ARRAY['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=700&fit=crop'], 22, true)
    ON CONFLICT DO NOTHING;
  END IF;

  RAISE NOTICE '=================================';
  RAISE NOTICE 'Stores and products added successfully!';
  RAISE NOTICE 'Stores: %', (SELECT COUNT(*) FROM stores);
  RAISE NOTICE 'Products: %', (SELECT COUNT(*) FROM products);
  RAISE NOTICE '=================================';
END $$;
