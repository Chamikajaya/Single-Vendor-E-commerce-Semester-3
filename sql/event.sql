DELIMITER $$

DROP EVENT IF EXISTS monthly_delete_order_log_event$$

CREATE EVENT monthly_delete_order_log_event
ON SCHEDULE 
    EVERY 1 MONTH
DO BEGIN
    DELETE FROM Order_Log WHERE order_date < DATE_SUB(NOW(), INTERVAL 1 MONTH);
END$$

DROP EVENT IF EXISTS monthly_delete_inventory_log_event$$

CREATE EVENT monthly_delete_inventory_log_event
ON SCHEDULE 
    EVERY 1 MONTH
DO BEGIN 
    DELETE FROM Inventory_Log
    WHERE log_date < DATE_SUB(NOW(), INTERVAL 1 MONTH);
END$$

DELIMITER ;