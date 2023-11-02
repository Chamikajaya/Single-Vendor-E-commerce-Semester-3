DELIMITER $$

-- procedure for getting all the varint under a product
DROP PROCEDURE IF EXISTS get_variants_by_product_id$$

CREATE PROCEDURE get_variants_by_product_id(IN product_id INT)
BEGIN 
    SELECT v.variant_id, v.variant_title, v.price, v.img
    FROM variant v
    WHERE v.product_id = product_id
    ORDER BY v.variant_id;
END$$

-- procedure for getting all the attibutes of a product
DROP PROCEDURE IF EXISTS get_attributes_by_product_id$$

CREATE PROCEDURE get_attributes_by_product_id(IN product_id INT)
BEGIN
    SELECT a.attr_key, a.attr_value, a.attr_type
    FROM Attribute a
    WHERE a.product_id = product_id
    ORDER BY a.attr_key;
END$$

-- procedure for getting all the products under a category
DROP PROCEDURE IF EXISTS get_products_by_category_id$$

CREATE PROCEDURE get_products_by_category_id(IN category_id INT)
BEGIN 

	SELECT p.product_id, p.title, p.sku, p.weight, p.description
    FROM product_category pc
    JOIN Product p USING(product_id)
    WHERE pc.category_id IN (
		SELECT c.category_id 
		FROM category c
		WHERE c.category_id = category_id OR c.parent_category_id = category_id
    )
    ORDER BY p.product_id;
END$$


-- procedure for getting all the categories under a parent category
DROP PROCEDURE IF EXISTS get_categories_by_parent_id$$

CREATE PROCEDURE get_categories_by_parent_id(IN parent_id INT)
BEGIN
    SELECT c.category_id, c.category_name
    FROM Category c
    WHERE c.parent_category_id = parent_id
    ORDER BY c.category_id;
END$$

-- procedure for getting all the category for a given product
-- DELIMITER $$
DROP PROCEDURE IF EXISTS get_categories_by_product_id$$

CREATE PROCEDURE get_categories_by_product_id(IN product_id INT)
BEGIN
    SELECT c.category_name as child_name, cc.category_name as parent_name
    FROM Product_Category pc
    LEFT OUTER JOIN Category c ON pc.category_id = c.category_id
    LEFT OUTER JOIN Category cc ON cc.category_id = c.parent_category_id
    WHERE pc.product_id = product_id
    ORDER BY c.category_id;
END$$

-- procedure for searching a product with given keyword
DROP PROCEDURE IF EXISTS search_product_by_keyword$$

CREATE PROCEDURE search_product_by_keyword(IN keyword VARCHAR(255))
BEGIN 
    SELECT p.product_id, p.title, p.sku, p.weight, p.description
    FROM Product p
    WHERE p.title LIKE CONCAT('%', keyword, '%')
    ORDER BY p.product_id;
END$$

-- procedure for attributes related process --
DROP PROCEDURE IF EXISTS get_attr_by_product_id$$

CREATE PROCEDURE get_attr_by_product_id(IN product_id INT)
BEGIN
	SELECT * FROM attribute a WHERE a.product_id = product_id ORDER BY attr_key ASC; 
END$$

-- procedure for fetch the specific variant data with stcok values
-- DELIMITER $$
DROP PROCEDURE IF EXISTS get_variant_by_id$$

CREATE PROCEDURE get_variant_by_id(IN variant_id INT)
BEGIN 
	SELECT p.product_id, v.variant_id, p.title, p.sku, p.description, 
			p.weight, v.variant_title, v.price, v.img, i.quantity,
            c.category_name as child_name, cc.category_name as parent_name
    FROM Variant v
    JOIN Product p USING(product_id)
    JOIN inventory i USING(variant_id)
    JOIN Product_category pc USING(product_id)
    LEFT OUTER JOIN Category c ON pc.category_id = c.category_id
    LEFT OUTER JOIN Category cc ON cc.category_id = c.parent_category_id
	WHERE v.variant_id = variant_id
    ORDER BY i.warehouse_id
    LIMIT 1;
    
END$$

-- procedure for fetch variant data with stcok values
DELIMITER $$
DROP PROCEDURE IF EXISTS get_variants$$

CREATE PROCEDURE get_variants(IN search_key VARCHAR(255))
BEGIN 
	SELECT p.product_id, v.variant_id, p.title, p.sku, p.description, 
			p.weight, v.variant_title, v.price, v.img,
            c.category_name as child_name, cc.category_name as parent_name
    FROM Variant v
    JOIN Product p USING(product_id)
    JOIN Product_category pc USING(product_id)
    LEFT OUTER JOIN Category c ON pc.category_id = c.category_id
    LEFT OUTER JOIN Category cc ON cc.category_id = c.parent_category_id
	WHERE v.variant_title LIKE search_key OR p.title LIKE search_key OR 
			c.category_name LIKE search_key OR cc.category_name LIKE search_key
    ORDER BY v.variant_id ASC;
    
END$$

DELIMITER ;