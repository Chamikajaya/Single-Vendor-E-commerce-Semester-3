
CREATE INDEX index_product_name ON Product (title);


CREATE INDEX index_user_email ON User_Auth (email);


CREATE INDEX index_full_text_search ON Product (title, description);


CREATE INDEX index_inventory_warehouse ON Inventory (warehouse_id);


CREATE INDEX index_order_customer ON Customer_Order (user_id);