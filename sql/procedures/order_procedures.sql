DELIMITER $$

-- procedure for place an order
-- DELIMITER $$
DROP PROCEDURE IF EXISTS place_order$$

CREATE PROCEDURE place_order(
    IN user_id INT,
    IN city_id INT,
    IN payment_method_id INT,
    IN delivery_method_id INT,
    IN shipping_address VARCHAR(255)
)
BEGIN 
	DECLARE is_out_city INT;
    DECLARE cart_id INT;
	DECLARE tot_price DECIMAL(10, 2);
    DECLARE estimate DATE;
    
    CALL get_last_cart(user_id, cart_id);
	CALL get_cart_total(user_id, tot_price);
    
    SELECT isMain INTO is_out_city FROM city c WHERE c.city_id = city_id;
    
    SELECT 
    CASE
		WHEN is_out_city = 0 THEN 7
		WHEN is_city_out = 1 THEN 5
	END AS new_date INTO estimate;
		
	INSERT INTO shipping(shipping_date, delivery_estimate) 
    VALUES (NOW(), new_date);
    
    INSERT INTO Customer_Order
        (user_id, cart_id, city_id, payment_method_id, delivery_method_id, order_date, delivery_address, tot_price, shipping_id)
    VALUES 
        (user_id, cart_id, city_id, payment_method_id, delivery_method_id, NOW(), shipping_address, tot_price, last_insert_id());

	SELECT LAST_INSERT_ID() AS order_id;
END$$


-- procedure for update the inventory of a product
DROP PROCEDURE IF EXISTS update_inventory$$

CREATE PROCEDURE update_inventory(
    IN variant_id INT,
    IN quantity INT
)
BEGIN 
    UPDATE inventory i
    SET i.quantity = i.quantity - quantity
    WHERE i.variant_id = variant_id AND i.warehouse_id = 1;
END$$

-- procedure for get all the orders
DROP PROCEDURE IF EXISTS get_all_orders$$

CREATE PROCEDURE get_all_orders()
BEGIN 
	SELECT o.user_id, u.email, o.cart_id, sp.shipping_date, sp.delivery_estimate, d.name, p.name, order_date, c.name, o.delivery_address, tot_price, status
    FROM Customer_Order o
    JOIN delivery_method d USING(delivery_method_id)
    JOIN payment_method p USING(payment_method_id)
    JOIN City c USING(city_id)
    JOIN User_Auth u USING(user_id)
    LEFT JOIN shipping sp USING(shipping_id)
    ORDER BY order_date DESC;
END$$

-- procedure for get all the orders under a given user
DROP PROCEDURE IF EXISTS get_order_by_user$$

CREATE PROCEDURE get_order_by_user(IN user_id INT)
BEGIN 
	SELECT o.order_id, o.user_id, u.email, o.cart_id, sp.shipping_date, sp.delivery_estimate, d.name, p.name, order_date, c.name, o.delivery_address, tot_price, status
    FROM Customer_Order o
    JOIN delivery_method d USING(delivery_method_id)
    JOIN payment_method p USING(payment_method_id)
    JOIN City c USING(city_id)
    JOIN User_Auth u USING(user_id)
    LEFT JOIN Shipping sp USING(shipping_id)
    WHERE o.user_id = user_id
    ORDER BY order_date DESC;
    
END$$

-- procedure for get specific order for given order id
-- DELIMITER $$
DROP PROCEDURE IF EXISTS get_order_by_order_id$$

CREATE PROCEDURE get_order_by_order_id(IN order_id INT)
BEGIN 
	SELECT order_id, o.user_id, u.email, o.cart_id, sp.shipping_date, sp.delivery_estimate, d.name, p.name, order_date, c.name, o.delivery_address, o.tot_price, o.status
    FROM Customer_Order o
    JOIN delivery_method d USING(delivery_method_id)
    JOIN payment_method p USING(payment_method_id)
    JOIN City c USING(city_id)
    JOIN User_Auth u USING(user_id)
    LEFT JOIN Shipping sp USING(shipping_id)
    WHERE o.order_id = order_id
    ORDER BY order_date DESC;
    
END$$

-- procedure for shipa a order
DROP PROCEDURE IF EXISTS ship_order;

CREATE PROCEDURE ship_order(IN order_id INT, IN delivery_estimate DATE)
BEGIN
	-- first create a shipping row in the shipping table
    INSERT INTO Shipping (shipping_date, delivery_estimate)
    VALUES (NOW(), delivery_estimate);
    
    UPDATE Customer_Order o
    SET o.shipping_id = LAST_INSERT_ID(), o.status = 'shipped'
    WHERE o.order_id = order_id;
END$$

-- procedure for iteratively update the each inventory item to update their quantity
DROP PROCEDURE IF EXISTS iter_update_inventory$$

CREATE PROCEDURE iter_update_inventory(IN cart_id INT)
BEGIN
    DECLARE done INT;
	DECLARE var_id INT;
    DECLARE quantity INT;

   
	DECLARE cur CURSOR FOR
    SELECT ci.variant_id, ci.quantity
    FROM cart_item ci
    WHERE ci.cart_id = cart_id;
    
    -- Declare handler for when no more rows to fetch
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;
    
    
    OPEN cur;

    -- Start the loop
    read_loop: LOOP
        FETCH cur INTO var_id, quantity;

        IF done = 1 THEN
            LEAVE read_loop;
        END IF;

		CALL update_inventory(var_id, quantity);

    END LOOP;

    CLOSE cur;
END$$


-- procedure for get order items based on the order items --
-- DELIMITER $$
DROP PROCEDURE IF EXISTS get_order_items$$

CREATE PROCEDURE get_order_items(IN order_id INT)
BEGIN
	SELECT oi.variant_id, oi.quantity, oi.item_price, v.variant_title, v.img, v.price, p.title, p.product_id, p.sku, p.description, p.weight
    FROM customer_order o
    JOIN cart_item oi ON o.cart_id = oi.cart_id
    JOIN variant v USING(variant_id)
    JOIN product p ON p.product_id = v.product_id
    WHERE o.order_id = order_id
    ORDER BY v.variant_title ASC;
END$$

DELIMITER ;