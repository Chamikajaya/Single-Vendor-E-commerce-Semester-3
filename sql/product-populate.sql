
INSERT INTO Product (product_id, sku, title, weight, description)
VALUES
        (1, 'SKU1001', 'Mobile Phone', 1.0, 'A high-quality mobile phone with advanced features.'),
        (2, 'SKU1002', 'Television', 5.2, 'A large-screen television with 4K resolution.'),
        (3, 'SKU1003', 'USB cable', 0.1, 'A durable USB cable for charging and data transfer.'),
        (4, 'SKU1004', 'Laptop', 2.0, 'A powerful laptop with a sleek design.'),
        (5, 'SKU1005', 'Digital Camera', 0.5, 'A compact digital camera with high resolution.'),
        (6, 'SKU1006', 'Headphones', 0.2, 'Comfortable headphones with noise-cancelling technology.'),
        (7, 'SKU1007', 'Tablet', 0.8, 'A versatile tablet with a long battery life.'),
        (8, 'SKU1008', 'Smartwatch', 0.1, 'A stylish smartwatch with fitness tracking features.'),
        (9, 'SKU1009', 'Gaming Console', 3.5, 'A high-performance gaming console with immersive graphics.'),
        (10, 'SKU1010', 'Router', 0.3, 'A reliable router for fast internet speeds.'),
        (11, 'SKU1011', 'Desktop Computer', 5.0, 'A powerful desktop computer for work or play.'),
        (12, 'SKU1012', 'E-Reader', 0.2, 'A lightweight e-reader with a glare-free screen.'),
        (13, 'SKU1013', 'Printer', 7.0, 'A high-quality printer for home or office use.'),
        (14, 'SKU1014', 'Wireless Keyboard', 0.5, 'A wireless keyboard with a comfortable typing experience.'),
        (15, 'SKU1015', 'External Hard Drive', 0.9, 'A reliable external hard drive for data backup and storage.'),
        (16, 'SKU1016', 'Alarm Clock', 0.2, 'A stylish alarm clock with multiple alarm settings.'),
        (17, 'SKU1017', 'Bluetooth Speaker', 0.6, 'A portable Bluetooth speaker with high-quality sound.'),
        (18, 'SKU1018', 'Computer Monitor', 4.0, 'A large computer monitor with high resolution.'),
        (19, 'SKU1019', 'Webcam', 0.3, 'A high-quality webcam for video conferencing.'),
        (20, 'SKU1020', 'Microphone', 0.4, 'A professional-grade microphone for recording or streaming.'),
        (21, 'SKU1021', 'Lego', 0.6, 'A fun Lego set for kids and adults.'),
        (22, 'SKU1022', 'Barbie', 0.3, 'A classic Barbie doll with stylish accessories.'),
        (23, 'SKU1023', 'Hotwheels', 0.2, 'A set of Hotwheels cars for kids.'),
        (24, 'SKU1024', 'Doctor Play Kit', 0.4, 'A doctor play kit for kids to learn and play.'),
        (25, 'SKU1025', 'Scrabble', 0.8, 'A classic board game for family game night.'),
        (26, 'SKU1026', 'Wireless Mouse', 0.1, 'A wireless mouse with a comfortable grip.'),
        (27, 'SKU1027', 'Smart Speaker', 0.5, 'A smart speaker with voice control and high-quality sound.'),
        (28, 'SKU1028', 'Fitness Tracker', 0.2, 'A fitness tracker with heart rate monitoring and activity tracking.'),
        (29, 'SKU1029', 'Bluetooth Earbuds', 0.1, 'Wireless earbuds with noise-cancelling technology and long battery life.'),
        (30, 'SKU1030', 'Portable Charger', 0.3, 'A portable charger for on-the-go charging.'),
        (31, 'SKU1031', 'Wireless Charger', 0.1, 'A wireless charger for convenient charging.'),
        (32, 'SKU1032', 'Smart Thermostat', 0.3, 'A smart thermostat for energy-efficient temperature control.'),
        (33, 'SKU1033', 'Smart Lock', 0.2, 'A smart lock for keyless entry and remote access.'),
        (34, 'SKU1034', 'Smart Bulb', 0.1, 'A smart bulb for customizable lighting.'),
        (35, 'SKU1035', 'Robot Vacuum', 2.0, 'A robot vacuum for automated cleaning.'),
        (36, 'SKU1036', 'Air Purifier', 1.5, 'An air purifier for clean and fresh air.'),
        (37, 'SKU1037', 'Electric Toothbrush', 0.2, 'An electric toothbrush for effective oral care.'),
        (38, 'SKU1038', 'Water Bottle', 0.3, 'A reusable water bottle for eco-friendly hydration.'),
        (39, 'SKU1039', 'Wireless Headset', 0.2, 'A wireless headset for hands-free communication.'),
        (40, 'SKU1040', 'Smart Scale', 0.3, 'A smart scale for accurate weight tracking.');


INSERT INTO variant 
VALUES 
    (001, 1, 'iPhone 13 - 64GB', 799.99, 'https://drive.google.com/file/d/1O1_2zkwjxZRf5SnGfLp2iSwcdMLm9-ed/view?usp=drive_link'),
    (002, 1, 'iPhone 13 - 128GB', 899.99, 'https://drive.google.com/file/d/1O1_2zkwjxZRf5SnGfLp2iSwcdMLm9-ed/view?usp=drive_link'),
    (003, 1, 'iPhone 13 - 256GB', 999.99, 'https://drive.google.com/file/d/1O1_2zkwjxZRf5SnGfLp2iSwcdMLm9-ed/view?usp=drive_link'),
    (004, 1, 'iPhone 13 Pro - 64GB', 1099.99, 'https://drive.google.com/file/d/1O1_2zkwjxZRf5SnGfLp2iSwcdMLm9-ed/view?usp=drive_link'),
    (005, 1, 'iPhone 13 Pro - 128GB', 1199.99, 'https://drive.google.com/file/d/1O1_2zkwjxZRf5SnGfLp2iSwcdMLm9-ed/view?usp=drive_link'),
    (006, 1, 'iPhone 13 Pro - 256GB', 1299.99, 'https://drive.google.com/file/d/1O1_2zkwjxZRf5SnGfLp2iSwcdMLm9-ed/view?usp=drive_link'),

    (007, 2, 'Samsung Television - 40-inch', 499.99, 'https://drive.google.com/file/d/1_pFt6W-lQv59aHsgfM2Y_igTY2EIKdvd/view?usp=drive_link'),
    (008, 2, 'Samsung Television - 55-inch', 799.99, 'https://drive.google.com/file/d/1_pFt6W-lQv59aHsgfM2Y_igTY2EIKdvd/view?usp=drive_link'),

    (009, 3, 'USB Cable Connector', 7.99, 'https://drive.google.com/file/d/1YFII865WqSvPl9Vm2HFFqx6qtH6PCHJc/view?usp=drive_link'),
    (010, 3, 'USB Cable - 1ft', 9.99, 'https://drive.google.com/file/d/1tPjvzsmyz6NPNPmQ_RlLA429T0f2TzjC/view?usp=drive_link'),

    (011, 4, 'Laptop - MacBook Air', 899.99, 'https://drive.google.com/file/d/1sQaeWU3q3aiBryb6X_g1bVy5ikRknb6B/view?usp=drive_link'),
    (012, 4, 'Laptop - MacBook Pro', 1299.99, 'https://drive.google.com/file/d/1SsZirmzyRDDtPlr4sFY13uSBc5yWQsjp/view?usp=drive_link'),

    (013, 5, 'Digital Camera - Basic', 299.99, 'https://drive.google.com/file/d/1Q8ywlFQpz24BWInwRtca1Lx2w9_MQNsT/view?usp=drive_link'),
    (014, 5, 'Digital Camera - Pro', 599.99, 'https://drive.google.com/file/d/1zqmdnPacqztM3KvVtKsk4yf8CYKnCc5D/view?usp=drive_link'),

    (015, 6, 'Headphones - Wired', 49.99, 'https://drive.google.com/file/d/1EMgePxFM7A6bO2PYkM9oETBoHGhixyJD/view?usp=drive_link'),
    (016, 6, 'Headphones - Wireless', 89.99, 'https://drive.google.com/file/d/1KkBL5t_rGSItQF9s-B3006cftnjBVuHD/view?usp=drive_link'),

    (017, 7, 'Tablet - 10-inch', 299.99, 'https://drive.google.com/file/d/1i-AFDeiMNqqWj7AggSIsO768dn9LxP8J/view?usp=drive_link'),
    (018, 7, 'Tablet - 12-inch', 499.99, 'https://drive.google.com/file/d/1m29KlEDvSnTH1E1WLBAaFrOdcwopun9l/view?usp=drive_link'),

    (019, 8, 'Smartwatch - Basic', 79.99, 'https://drive.google.com/file/d/1pv5gLyPsJ0nOCiXgQdEarfPPr58lSyWl/view?usp=sharing' ),
    (020, 8, 'Smartwatch - Advanced', 149.99, 'https://drive.google.com/file/d/1ZFRGJjcwsSrFVx1pKY5FJSfvKxxNw-12/view?usp=sharing'),

    (021, 9, 'Gaming Console - Standard', 299.99, 'https://drive.google.com/file/d/1yS7LblPRNOR6MQQevB9JDZhYA_4Xr2lK/view?usp=sharing'),
    (022, 9, 'Gaming Console - Pro', 499.99, 'https://drive.google.com/file/d/1gtKEh0uF6EJFFkDaYuTK-WiP-SBaFJJe/view?usp=sharing'),

    (023, 10, 'Router - Single Band', 39.99, 'https://drive.google.com/file/d/120IphTuO1sknuIF_DeT4g09PUTC8bUFE/view?usp=drive_link'),
    (024, 10, 'Router - Dual Band', 69.99, 'https://drive.google.com/file/d/1Qb6BSC1b4qoN13tadK6owbMtoohRKFbF/view?usp=drive_link'),

    (025, 11, 'Desktop Computer - 8GB RAM', 899.99, 'https://drive.google.com/file/d/1fNMxEKeNOi66NXIHvvbZRyw5w0ig9Eww/view?usp=drive_link'),
    (026, 11, 'Desktop Computer - 16GB RAM', 1199.99, 'https://drive.google.com/file/d/1vC2MA-mb_Zqw-_EnHSGG8C_l9LPGX83H/view?usp=drive_link'),

    (027, 12, 'E-Reader - WiFi', 119.99, 'https://drive.google.com/file/d/19HVjuqFFgahXHbDon5PQN46zcuLyYcWP/view?usp=drive_link'),
    (028, 12, 'E-Reader - 3G', 139.99, 'https://drive.google.com/file/d/10kqRST5YBw31x70kNb8m9ONRmLaC82zA/view?usp=drive_link'),

    (029, 13, 'Printer - Wireless', 249.99,'https://drive.google.com/file/d/1gaqu9d8yEO2vtUq0DXTbEbBIXxIuL1UE/view?usp=sharing'),
    (030, 13, 'Printer - Laser', 349.99, 'https://drive.google.com/file/d/1DNkhpcQRPFlHJYvaAc79Zp6SMvMWFnJP/view?usp=sharing'),

    (031, 14, 'Wireless Keyboard - Compact', 29.99, 'https://drive.google.com/file/d/1QrH8XyxqvkVq239r3apL2Iy0TV-XWIuj/view?usp=sharing'),
    (032, 14, 'Wireless Keyboard - Ergonomic', 39.99, 'https://drive.google.com/file/d/1ZsuOMAEzYOJhGRGuXf2dG9jMFPG_sDQl/view?usp=sharing'),

    (033, 15, 'External Hard Drive - 1TB', 79.99, 'https://drive.google.com/file/d/150LgjfnC6cnRMHagUSbjCtxWqzHSAtsX/view?usp=sharing'),
    (034, 15, 'External Hard Drive - 2TB', 129.99, 'https://drive.google.com/file/d/1mIgKBV8kuBPmbHKauvjdDoNq31nJhziq/view?usp=sharing'),

    (035, 16, 'Alarm Clock - Budget', 149.99, 'https://drive.google.com/file/d/1t5c9YpPoYV6qkC2Q9w9oMBAbH-ysiQNs/view?usp=sharing'),
    (036, 16, 'Alarm Clock - Flagship', 699.99, 'https://drive.google.com/file/d/1ltWhdKr8lzr0JX7MhaialmPtlwAVBs_r/view?usp=sharing'),

    (037, 17, 'Bluetooth Speaker - Portable', 49.99, 'https://drive.google.com/file/d/10foSjVFljTlC1C9PdEnVzmvn2pWOfJ9W/view?usp=sharing'),
    (038, 17, 'Bluetooth Speaker - High-End', 149.99, 'https://drive.google.com/file/d/1sCiRS982qWg7hrh24KW51j8uK3MRxIGs/view?usp=sharing' ),

    (039, 18, 'Computer Monitor - 24-inch', 199.99, 'https://drive.google.com/file/d/1633BS3TFwonnJIqxvR-ftmthZ2KXPThm/view?usp=sharing'),
    (040, 18, 'Computer Monitor - 27-inch', 299.99, 'https://drive.google.com/file/d/1n_E9cP8cAsvUxfgcx_FBxAgbF1xOMcdq/view?usp=sharing'),

    (041, 19, 'Webcam - 720p', 29.99,'https://drive.google.com/file/d/1Wox7slPfAICgsKxS2OWzieQkWi7j8L6d/view?usp=sharing'),
    (042, 19, 'Webcam - 1080p', 49.99, 'https://drive.google.com/file/d/1WteZPOvN5C9-K_r3iw5Kz9q7ThuB4ErI/view?usp=sharing'),

    (043, 20, 'Microphone - Condenser', 89.99, 'https://drive.google.com/file/d/1BKLkCaxDx8tKvhMapLRzQrpJp0qxg8OT/view?usp=drive_link'),
    (044, 20, 'Microphone - Dynamic', 79.99, 'https://drive.google.com/file/d/1EO0f1i4d_Qxz649ZF6vl22v7Pc9824U7/view?usp=drive_link'),

    (45, 21, 'Lego - Classic', 0.7, 'https://drive.google.com/file/d/1bPmJjKFPhHKKIvYigNWYSZp0WK42tbJR/view?usp=drive_link'),
    (46, 21, 'Lego - Technic', 0.8, 'https://drive.google.com/file/d/1P1zcnZNWLGJDKl3G9V-H1aVf91bx29ip/view?usp=drive_link'),

    (47, 22, 'Barbie - Fashionista', 0.4, 'https://drive.google.com/file/d/1wKxxoCmrOEMqyJNGiNdMkghCyqogXTys/view?usp=drive_link'),
    (48, 22, 'Barbie - Dreamhouse', 0.5, 'https://drive.google.com/file/d/1Ei6QAWjTU8GlRQlpva5RZ4LpbsyJ1FuB/view?usp=drive_link'),

    (49, 23, 'Hotwheels - Race Cars', 0.3, 'https://drive.google.com/file/d/1dDLgFgZxY2P2al9Isx-Kc0dPc-Sbwg_H/view?usp=drive_link'),
    (50, 23, 'Hotwheels - Track Set', 0.4, 'https://drive.google.com/file/d/1G5a3uvkuaPOIPvkOI0p4NKNp96o4pU9m/view?usp=drive_link'),

    (51, 24, 'Doctor Play Kit - Deluxe', 0.6, 'https://drive.google.com/file/d/1iCr3TI9WiG7-v1diYQHbu7aQ6lYL_je0/view?usp=drive_link'),
    (52, 24, 'Doctor Play Kit - Medical Bag', 0.5, 'https://drive.google.com/file/d/1K-nWCqSY-Q4XkKPEQyyLHQ9Pg1UZKcG8/view?usp=drive_link'),

    (53, 25, 'Scrabble - Classic', 1.0, 'https://drive.google.com/file/d/1CKmd4BlTYbFHSeE6HHr9sioakgOe0UMQ/view?usp=drive_link'),
    (54, 25, 'Scrabble - Junior', 0.9, 'https://drive.google.com/file/d/1uL5f4ixBWelPWsdZ0fxyZZ6svh1D_GpB/view?usp=drive_link');
