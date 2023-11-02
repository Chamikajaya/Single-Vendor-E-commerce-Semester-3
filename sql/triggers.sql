DELIMITER $$

DROP TRIGGER IF EXISTS Orders_After_Update$$

CREATE TRIGGER Orders_After_Update
    AFTER UPDATE ON Customer_Order
    FOR EACH ROW
BEGIN 
    INSERT INTO Order_Log (order_id, action, log_date)
    VALUES (NEW.order_id, NEW.status, NOW());
END$$

-- trigger for place an order
DROP TRIGGER IF EXISTS Orders_After_Insert$$

CREATE TRIGGER Orders_After_Insert
    AFTER INSERT ON Customer_Order
    FOR EACH ROW
BEGIN 
	DECLARE cart_id INT;

    INSERT INTO Order_Log (order_id, action, log_date)
    VALUES (NEW.order_id, NEW.status, NOW());
	
    CALL get_last_cart(NEW.user_id, cart_id);
    -- update the inventory
	CALL iter_update_inventory(cart_id);
    
    -- insert new cart to the customer
    CALL add_cart(NEW.user_id);
END$$

-- trigger for updating inventory log when new entry inserted into the inventory
DROP TRIGGER IF EXISTS Inventory_After_Insert$$

CREATE TRIGGER Inventory_After_Insert
	AFTER INSERT ON Inventory
    FOR EACH ROW
BEGIN
	INSERT INTO Inventory_Log (warehouse_id, variant_id, changed_quantity, action, log_date)
    VALUES (NEW.warehouse_id, NEW.variant_id, NEW.quantity, "Add Items", NOW());
END$$

-- trigger for update the log when inventroy is updated
DROP TRIGGER IF EXISTS Inventory_After_Update$$

CREATE TRIGGER Inventory_After_Update
	AFTER UPDATE ON Inventory
    FOR EACH ROW
BEGIN
	IF NEW.quantity > OLD.quantity THEN
		INSERT INTO Inventory_Log (warehouse_id, variant_id, changed_quantity, action, log_date)
		VALUES (NEW.warehouse_id, NEW.variant_id, NEW.quantity - OLD.quantity, "Increase Items", NOW());
	ELSE 
		INSERT INTO Inventory_Log (warehouse_id, variant_id, changed_quantity, action, log_date)
		VALUES (NEW.warehouse_id, NEW.variant_id, OLD.quantity - NEW.quantity, "Decrease Items", NOW());
	END IF;
END$$

DELIMITER ;

