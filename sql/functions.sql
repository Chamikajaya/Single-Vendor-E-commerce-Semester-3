DELIMITER //
CREATE FUNCTION getUserRole(user_id INT)
RETURNS enum('admin','customer')
BEGIN
    declare role enum('admin','customer');
    select u.role into role from user_auth u where u.user_id = user_id;
    RETURN role;
END;
//
DELIMITER ;


DELIMITER //
CREATE FUNCTION isStockAvailable(variant_id INT)
RETURNS BOOLEAN
BEGIN
    DECLARE result BOOLEAN;
    DECLARE count INT;
    SELECT SUM(i.quantity) INTO count FROM inventory i WHERE i.variant_id = variant_id;
    IF count > 0 THEN
        SET result = TRUE;
    ELSE
        SET result = FALSE;
    END IF;
    RETURN result;
END;
//
DELIMITER ;

DELIMITER //
CREATE FUNCTION orderDeliveryEstimate(city_id INT)
RETURNS DATE
BEGIN
    DECLARE estimatedDate DATE;
    DECLARE isMain TINYINT;
    SELECT c.isMain INTO isMain FROM city c WHERE c.city_id = city_id;
    IF isMain = 0 THEN
        SET estimatedDate = DATE_ADD(NOW(), INTERVAL 7 DAY);
    ELSE
        SET estimatedDate = DATE_ADD(NOW(), INTERVAL 5 DAY);
    END IF;
    RETURN estimatedDate;
END;
//
DELIMITER ;

DELIMITER //
CREATE FUNCTION productDeliveryEstimate(city_id INT, variant_id INT)
RETURNS DATE
BEGIN
    DECLARE estimatedDate DATE;
    DECLARE isMain TINYINT;
    DECLARE count INT;
    SELECT SUM(i.quantity) INTO count FROM inventory i WHERE i.variant_id = variant_id;
    SELECT c.isMain INTO isMain FROM city c WHERE c.city_id = city_id;
    IF isMain = 0 THEN
        IF count > 0 THEN
            SET estimatedDate = DATE_ADD(NOW(), INTERVAL 7 DAY);
        ELSE
            SET estimatedDate = DATE_ADD(NOW(), INTERVAL 10 DAY);
        END IF;
    ELSE
        IF count > 0 THEN
            SET estimatedDate = DATE_ADD(NOW(), INTERVAL 5 DAY);
        ELSE
            SET estimatedDate = DATE_ADD(NOW(), INTERVAL 8 DAY);
        END IF;
    END IF;
    RETURN estimatedDate;
END//