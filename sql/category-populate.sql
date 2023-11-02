

INSERT INTO Category (category_name, parent_category_id)
VALUES 
    ('Electronics', NULL),
    ('Toys', NULL),
    ('Mobile', 1), -- 3
    ('Desktop', 1), -- 4
    ('Laptop', 1), -- 5
    ('Tablets', 1), -- 6
    ('Printers', 1), -- 7
    ('Scanners', 1), -- 8
    ('Monitors', 1), -- 9
    ('Projectors', 1), -- 10
    ('Cameras', 1), -- 11
    ('Headphones', 1), -- 12
    ('Speakers', 1), -- 13
    ('Microphones', 1), -- 14
    ('Mouse', 1), -- 15
    ('Keyboard', 1), -- 16
    ('Playing Kits', 2), -- 17
    ('Dolls', 2), -- 18
    ('Action Figures', 2), -- 19
    ('Puzzles', 2), -- 20
    ('Remote Control Toys', 2), -- 21
    ('Building Toys', 2), -- 22
    ('Educational Toys', 2), -- 23
    ('Soft Toys', 2), -- 24
    ('Board Games', 2), -- 25
    ('Card Games', 2), -- 26
    ('Outdoor Toys', 2), -- 27
    ('TV', 1); -- 28



INSERT INTO Product_Category (product_id, category_id)
VALUES  (1, 3),
        (2, 28),
        (3, 1),
        (4, 5),
        (5, 11),
        (6, 12),
        (7, 6),
        (8, 3),
        (9, 3),
        (10, 1),
        (11, 4),
        (12, 5),
        (13, 6),
        (14, 7),
        (15, 8),
        (16, 9),
        (17, 10),
        (18, 11),
        (19, 12),
        (20, 13);