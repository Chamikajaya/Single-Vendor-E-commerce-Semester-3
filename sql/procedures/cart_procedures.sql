DELIMITER $$

-- procedure for create a new cart for a given user
DROP PROCEDURE IF EXISTS add_cart$$

CREATE PROCEDURE add_cart(IN user_id INT)
BEGIN
	INSERT INTO Cart (user_id)
    VALUES (user_id);
END$$

-- procedure for getting the latest cart of a user
DROP PROCEDURE IF EXISTS get_last_cart$$

CREATE PROCEDURE get_last_cart(IN user_id INT, OUT cart_id INT)
BEGIN
    SELECT c.cart_id INTO cart_id
    FROM cart c
    WHERE c.user_id = user_id
    ORDER BY c.cart_id DESC
    LIMIT 1;
END$$

-- procedure for getting last cart id --
DROP PROCEDURE IF EXISTS get_last_cart_id$$

CREATE PROCEDURE get_last_cart_id(IN user_id INT)
BEGIN
    SELECT c.cart_id
    FROM cart c
    WHERE c.user_id = user_id
    ORDER BY c.cart_id DESC
    LIMIT 1;
END$$


-- procedure for insert an selected item into users latest cart
DROP PROCEDURE IF EXISTS add_cart_item$$

CREATE PROCEDURE add_cart_item(
    IN user_id INT,
    IN variant_id INT, 
    IN quantity INT
    )
BEGIN 
    DECLARE cart_id INT;
    CALL get_last_cart(user_id, cart_id);

    INSERT INTO cart_item (cart_id, variant_id, quantity, item_price)
    VALUES 
        (cart_id, variant_id, quantity, 
            (SELECT price FROM variant v WHERE v.variant_id = variant_id)
        );
END$$


-- procedure for getting all items in a users latest cart
-- DELIMITER $$
DROP PROCEDURE IF EXISTS get_cart_items$$

CREATE PROCEDURE get_cart_items(IN user_id INT)
BEGIN 
    DECLARE cart_id INT;
    CALL get_last_cart(user_id, cart_id);

    SELECT ci.variant_id, ci.quantity, ci.item_price, p.title, v.variant_title, v.price, v.img
    FROM cart_item ci
    JOIN Variant v USING(variant_id)
    JOIN Product p ON v.product_id = p.product_id
    WHERE ci.cart_id = cart_id
    ORDER BY ci.variant_id;
END$$

-- procedure for getting the total price of a users latest cart
DROP PROCEDURE IF EXISTS get_cart_total$$

CREATE PROCEDURE get_cart_total(IN user_id INT, OUT tot_price DECIMAL(10, 2))
BEGIN 
    DECLARE cart_id INT;
    CALL get_last_cart(user_id, cart_id);

    SELECT SUM(item_price * quantity) AS total INTO tot_price
    FROM cart_item
    WHERE cart_id = cart_id;
END$$

DELIMITER ;