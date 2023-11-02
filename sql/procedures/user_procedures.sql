DELIMITER $$

-- procedure for register a new customer on the system
-- DELIMITER $$
DROP PROCEDURE IF EXISTS register_customer$$

CREATE PROCEDURE register_customer(
    IN username VARCHAR(255),
    IN email VARCHAR(255),
    IN password VARCHAR(255),
    IN first_name VARCHAR(255),
    IN last_name VARCHAR(255),
    IN city_id INT,
    IN address VARCHAR(255),
    IN contact_number VARCHAR(255)
)
BEGIN
    INSERT INTO User_Auth (username, email, password)
    VALUES (username, email, password);

    INSERT INTO Customer (user_id, first_name, last_name, city_id, address, contact_number)
    VALUES 
        (LAST_INSERT_ID(), first_name, last_name, city_id, address, contact_number);
	
    CALL add_cart(LAST_INSERT_ID());
    
	SELECT * FROM User_Auth WHERE user_id = LAST_INSERT_ID();
END$$

-- procedure for getting the user from the email
DROP PROCEDURE IF EXISTS get_user_by_email$$

CREATE PROCEDURE get_user_by_email(IN email VARCHAR(255))
BEGIN 
    SELECT u.user_id, u.username, u.email, u.password
    FROM User_Auth u
    WHERE u.email = email;
END$$


-- procedure for getting the ucustomer data from the user id
DROP PROCEDURE IF EXISTS get_customer_by_user_id$$

CREATE PROCEDURE get_customer_by_user_id(IN user_id INT)
BEGIN 
    SELECT c.user_id, c.first_name, c.last_name, c.city_id, c.address, c.contact_number
    FROM Customer c
    WHERE c.user_id = user_id;
END$$

-- procedure for get customer details without password
-- DELIMITER $$
DROP PROCEDURE IF EXISTS get_customer$$

CREATE PROCEDURE get_customer(IN email VARCHAR(255))
BEGIN
	SELECT u.username, u.email, c.first_name, c.last_name, c.contact_number, c.address, c.city_id
    FROM User_Auth u
    JOIN customer c USING(user_id)
    WHERE u.email = email
    LIMIT 1;
END$$

DELIMITER ;