<h1 align = "center"> E-commerce Platform for C Retailers </h1>

![C Retailers](https://github.com/Chamikajaya/dbProjFinal/assets/108650897/17bbda11-83cd-4fb8-95ca-f5250009a728)

This repository encompasses the database design and implementation of a single-vendor e-commerce platform tailored for "C," a local retail chain in Texas. The platform is equipped with a user-friendly interface and caters to the following key features:

1. **Product Management**
2. **User Management** 
3. **Order Management** 
4. **Analytics Reports (Admin Level)**


<br>

# Quick Links

[Single Vendor E-Commerce Platform - C](#single-vendor-e-commerce-platform---c)

  - [Getting Started](#getting_started)
    - [Implementation Details](#implementation-details)
    - [Getting Started](#getting-started)
    - [Dependencies](#dependencies)
    - [Developer Guide](#developer-guide)
      -[ER Diagram](er_diagram)

- [Database Design](#Database-Design)
  
-  [Views](#Views)

-  [Events](#Events)

- [Indexes](#Indexes)

- [Delivery Module](#Delivery_Module)
  
- [Functions](#Functions)

- [Transactions](#Transactions)

- [Triggers](#Triggers)
  
- [Stored Procedures](#Stored-Procedures)
  
- [Security](#Security)
  
- [Team Members & Contributions](#Team-Members-&-Contributions)

<br>

# Getting Started

## Implementation Details

- An SQL database is used to manage data.
- Front End: React
- API: NodeJS (Express)
- Developed using NodeJS v18.17.1

## Get started with the project

- Required Softwares
  - NodeJS v18.17.1 or higher 
  - MySQL Workbench 8
  - Code editor that can run JavaScript

To get started with the platform, follow these steps :

1. Clone the repository:
```
git clone https://github.com/Chamikajaya/dbProjFinal
```

2. Navigate to the project directory.

3. Install the dependencies:
```
npm install
```


4. Create an .env file in the db.js directory with the following environmental variables:

```
HOST=<hostname ()>
USER=<server username()>
PASSWORD=<your password (You Must specify)>
DATABASE=<Database name()>
```

5. Run in developer mode (only if you have access and have successfully connected to the database):
```
npm run dev
```

## Dependencies
All Dependencies used in our project are listed below.
- bcrypt@5.1.1
- bcryptjs@2.4.3
- colors@1.4.0
- concurrently@7.6.0
- config@3.3.9
- cookie-parser@1.4.6
- dotenv@16.0.3
- express@4.18.2
- jsonwebtoken@9.0.2
- mongoose@7.0.1
- multer@1.4.5-lts.1
- mysql@2.18.1
- nodemon@2.0.21

## Developer Guide

### Entity-Relationship (ER) Diagram
![ECommersePlatformDB_ERD (1)](https://github.com/Chamikajaya/dbProjFinal/assets/108650897/0246e613-0222-4976-b17d-c23ddcc2a962)

# Database Design

### Consistency and Avoiding Redundancy:
1. **Primary Keys**: 
    - Each table has a primary key, ensuring a unique identifier for each row.

2. **Foreign Key**: 
    - Maintaing foreign key integrity: Establishes a link between data in two tables, ensuring consistency across tables.

<br>

# Views

### **View Name**: `customer_view`
This view is intended to show information about users who have the role of 'customer.'
```sql
CREATE VIEW customer_view AS
SELECT *
FROM User_Auth
JOIN Customer USING(user_id)
WHERE role='customer';
```

### **View Name**: `admin_view`
This view is intended to show information about users who have the role of 'admin.'
```sql
CREATE VIEW admin_view AS
SELECT *
FROM User_Auth
WHERE role='admin';
```

### **View Name**: `item_details`
The "item_details" view simplifies the retrieval of essential information about products and their variants. It joins the "product" and "variant" tables and orders the results to make it easier to work with.
```sql
CREATE VIEW item_details AS
SELECT product_id, sku, title, weight, variant_id, variant_title, price
FROM product
JOIN variant USING(product_id)
ORDER BY product_id, variant_id
```
<br>

# Events

### **Event Name**: `monthly_delete_order_log_event`
Deletes the order log after a month.
```sql
CREATE EVENT monthly_delete_order_log_event
ON SCHEDULE 
    EVERY 1 MONTH
DO BEGIN
    DELETE FROM Order_Log WHERE order_date < DATE_SUB(NOW(), INTERVAL 1 MONTH);
END$$
```

### **Event Name**:`monthly_delete_inventory_log_event`
Deletes the inventory log after a month.
```sql
CREATE EVENT monthly_delete_inventory_log_event
ON SCHEDULE 
    EVERY 1 MONTH
DO BEGIN 
    DELETE FROM Inventory_Log
    WHERE log_date < DATE_SUB(NOW(), INTERVAL 1 MONTH);
END$$
```

<br>

# Indexes

### **Index Name**: index_product_name
Product title will be frequenty used in product searching and each time a product 
```sql
CREATE INDEX index_product_name ON Product (title);
```

### **Index Name**: index_user_email
When a user is signing up each time database is querried for authentication. Indexing user email will make the authentication faster.
```sql
CREATE INDEX index_user_email ON User_Auth (email);
```

### **Index Name**: index_full_text_search
Product can be searched not only by its name but also with the keywords within the product descripton.
```sql
CREATE INDEX index_full_text_search ON Product (title, description);
```

### **Index Name**: index_inventory_warehouse
Indexes on the warehouse_id column can enhance the performance of aggregation and grouping operations. For example, when you want to calculate the total inventory for a specific warehouse, the index can make these operations more efficient.
```sql
CREATE INDEX index_inventory_warehouse ON Inventory (warehouse_id);
```

### **Index Name**: index_order_customer
When running queries that filter or search for customer orders by user_id, creating an index on this column can significantly improve query performance
```sql
CREATE INDEX index_order_customer ON Customer_Order (user_id);
```

<br> 

# Delivery Module

- Calculation of the delivery estimate.
- Use of stored procedures

```sql
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
```

# Functions  
### **Function Name**: `getUserRole`

**Description**:This function returns the user role (admin/customer) given a user id.
This function retrieves the role (either 'admin' or 'customer') of a user based 
on their user id by querying a database table (user_auth) and returns that role.

```sql
CREATE FUNCTION getUserRole(user_id INT)
RETURNS enum('admin','customer')
BEGIN
    declare role enum('admin','customer');
    select u.role into role from user_auth u where u.user_id = user_id;
    RETURN role;
END;
```

### **Function Name**: `isStockAvailable`

**Description**: This function returns the stock availability as a boolean given a variant id.
This function determines the availability of a product variant's stock by summing 
up the quantities in the inventory for that variant. 
It returns a boolean value (TRUE if stock is available, FALSE if not).

```sql
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
```


### **Function Name**: `orderDeliveryEstimate`

**Description**: This function provides an estimated delivery date for an entire order based on the city where
the order is being delivered. If the city is not a main city , it estimates a 
delivery date 7 days from the current date; otherwise, for main cities, it estimates a delivery 
date 5 days from the current date.

```sql
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
```

### **Function Name**: `productDeliveryEstimate`

**Description**: This function calculates the estimated delivery date for a specific product variant based on the city where the order is 
being delivered and the availability of the product in stock.

```sql
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
END;
```

<br>

# Transactions
```sql
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
    
    START TRANSACTION; -- start the critical section as the transaction
    
    CALL get_last_cart(user_id, cart_id);
	CALL get_cart_total(user_id, tot_price);
    
    SELECT orderDeliveryEstimate(city_id) INTO estimate;
		
	INSERT INTO shipping(shipping_date, delivery_estimate) 
    VALUES (NOW(), estimate);
    
    INSERT INTO Customer_Order
        (user_id, cart_id, city_id, payment_method_id, delivery_method_id, order_date, delivery_address, tot_price, shipping_id)
    VALUES 
        (user_id, cart_id, city_id, payment_method_id, delivery_method_id, NOW(), shipping_address, tot_price, last_insert_id());


	COMMIT; -- commit the result into the database
    
	SELECT LAST_INSERT_ID() AS order_id;
END$$
```
<br>

# Triggers
### Trigger: Orders_After_Update
Trigger to update after an order
```sql
CREATE TRIGGER Orders_After_Update
    AFTER UPDATE ON Customer_Order
    FOR EACH ROW
BEGIN 
    INSERT INTO Order_Log (order_id, action, log_date)
    VALUES (NEW.order_id, NEW.status, NOW());
```

### Trigger: Orders_After_Insert
Trigger for place an order
```sql
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
```

### Trigger: Inventory_After_Insert
Trigger for updating inventory log when new entry inserted into the inventory
```sql
CREATE TRIGGER Inventory_After_Insert
	AFTER INSERT ON Inventory
    FOR EACH ROW
BEGIN
	INSERT INTO Inventory_Log (inventory_id, variant_id, changed_quantity, action, log_date)
    VALUES (NEW.inventory_id, NEW.variant_id, NEW.quantity, "Add Items", NOW());
```

### Trigger: Inventory_After_Update
Trigger for update the log when inventroy is updated

```sql
CREATE TRIGGER Inventory_After_Update
	AFTER UPDATE ON Inventory
    FOR EACH ROW
BEGIN
	INSERT INTO Inventory_Log (inventory_id, variant_id, changed_quantity, action, log_date)
    VALUES (NEW.inventory_id, NEW.variant_id, NEW.quantity - OLD.quantity, "Increase Items", NOW());
```

<br>

# Stored Procedures
1. add_cart
```sql
PROCEDURE `add_cart`(
IN user_id INT
)
BEGIN
	INSERT INTO Cart (user_id)
    VALUES (user_id);
END
```

2. add_cart_item
```sql
PROCEDURE `add_cart_item`(
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
END
```

3. create_shipping
```sql
PROCEDURE `create_shipping`(IN estimate DATE)
BEGIN
	INSERT INTO shipping(shipping_date, delivery_estimate)
    VALUES (NOW(), estimate);
    
    SELECT last_insert_id() AS shipping_id;
END
```

4. update_inventory
```sql
PROCEDURE `update_inventory`(
    IN variant_id INT,
    IN quantity INT
)
BEGIN 
    UPDATE inventory i
    SET i.quantity = i.quantity - quantity
    WHERE i.variant_id = variant_id AND i.warehouse_id = 1;
END
```

5. `get_attr_by_product_id`
- gets just the attributes
6. `get_attributes_by_product_id`
- gets attribute values for a given product
7. `get_cart_items`
- gets the cart item
8. `get_cart_total`
- Calls get_last_cart and obtails the total
9. `get_categories_by_parent_id`
10. register_customer
```sql
PROCEDURE `register_customer`(
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
END
```

11. place_order
```sql
PROCEDURE `place_order`(
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
    
    START TRANSACTION; -- start the critical section as the transaction
    
    CALL get_last_cart(user_id, cart_id);
	CALL get_cart_total(user_id, tot_price);
    
    SELECT orderDeliveryEstimate(city_id) INTO estimate;
		
	INSERT INTO shipping(shipping_date, delivery_estimate) 
    VALUES (NOW(), estimate);
    
    INSERT INTO Customer_Order
        (user_id, cart_id, city_id, payment_method_id, delivery_method_id, order_date, delivery_address, tot_price, shipping_id)
    VALUES 
        (user_id, cart_id, city_id, payment_method_id, delivery_method_id, NOW(), shipping_address, tot_price, last_insert_id());


	COMMIT; -- commit the result into the database
    
	SELECT LAST_INSERT_ID() AS order_id;
END
```
12. `search_product_by_keyword`
- Search for product parameters by a keyword (strings)
13. `ship_order`
- Updating order status to shipped
14. most_sold_products
```sql
PROCEDURE `MostSoldProducts`(yearvalue INT, monthvalue INT)
BEGIN
	SELECT variant_id, product_id, variant_title, price, img, sum(quantity) AS tot_sales
	FROM customer_order
	JOIN cart_item USING(cart_id)
	JOIN variant USING(variant_id)
	WHERE YEAR(order_date) = yearvalue AND MONTH(order_date) = monthvalue
	GROUP BY variant_id
	ORDER BY tot_sales DESC;
END
```
15. most_sold_category
```sql
PROCEDURE `MostSoldCategory`(yearvalue INT, monthvalue INT)
BEGIN
	SELECT category_id, category_name, SUM(quantity)
    FROM customer_order
    JOIN cart_item USING(cart_id)
    JOIN variant USING(variant_id)
    JOIN product_category USING(product_id)
    JOIN category USING(category_id)
	WHERE YEAR(order_date) = yearvalue AND MONTH(order_date) = monthvalue
	GROUP BY category_id
    ORDER BY SUM(quantity) DESC
    LIMIT 1;
END
```

# Security
### Strategies we used to make the database secure
- Password Hashing:  Securing stored passwords.
- Authentication: Verifying user identity.
- Authorization: Controlling access rights.
- Predefined Statements: Mitigating SQL injection.
- Input Validation: Ensuring data integrity.
- Stored Procedures: Centralizing database logic.
- Environment Variables: Securing sensitive data.

#### Password Hashing
Purpose: Convert plain passwords to encrypted format.
Irreversible: Hashed passwords cannot be reverted to original.
Salt: Random data added for extra security.
Bcrypt: Popular hashing algorithm. 
Avoids Plain Text: Never store raw passwords.
Compromise Safety: Stolen hashes are not directly usable.

![read_1](https://github.com/Chamikajaya/dbProjFinal/assets/108650897/00e38440-5578-4065-b32d-1a20ffd87373)

#### Authentication
- JWT (JSON Web Tokens):
Allows for secure transmission of information between the client and server.
- Avoiding Browser Storage:
Storing tokens in browsers can expose them to cross-site scripting attacks.
Safeguarding user data and session information is of utmost priority.
- Enhanced Authentication Process:
Upon successful user login, the system generates a JWT token.
This token is a representation of the user's session.
- Using HTTP Only Cookies:
Instead of storing the JWT token in the user's local storage or session storage, it's placed in an HTTP Only cookie.
HTTP Only cookies can't be accessed by JavaScript, enhancing security.
Every subsequent request made by the user includes this cookie, ensuring they remain authenticated.

![read_2](https://github.com/Chamikajaya/dbProjFinal/assets/108650897/1b9d7cb2-8704-4834-816e-54e70956e438)
![read_3](https://github.com/Chamikajaya/dbProjFinal/assets/108650897/bfb1b238-ae57-4046-bb8d-8036621dea13)


#### Authorization
Roles Defined: Admins and general users.
Route Restriction: Only admins can access specific routes.
Access Control: Ensures data accessibility only to authorized roles.
Reduced Vulnerabilities: Limited access reduces potential attack points.
Data Integrity: Role-based actions maintain database consistency.



# Team Members & Individual contributions:

### **C.H Jayasinghe:  210247B**
- Designed the database & ER diagram
- Drafting SQL queries 
- Worked on the frontend and backend
- Created API
- Managed Authorization and Authentication
- Authored Prepared Statements
- Implemented functionality for the security of the database
  1. Tokens
  2. Sessions

### **DJ. P. S. A. Chandrawansha: 210077D**
- Designed the database & ER diagram
- Drafting SQL queries 
- Worked on the backend
- Creating stored procedures
  1. register_customer
  2. place_order
  3. search_product_by_keyword
  4. ship_order ++
- Implementing triggers in the database
- Creating events for the database
  1. monthly_delete_order_log_event
  2. monthly_delete_inventory_log_event

### **M.A.C.L Mallikarachchi: 210363C**
- Designed the database & ER diagram
- Drafting SQL queries
- Images for the database
- Worked on stored procedures
  1. add_cart
  2. add_cart_item
  3. get_all_orders
  4. update_inventory
  5. get_cart_total ++
- Creating transactions for the database
- Worked on the documentation for the project

### **D.M.P.S. Dissanayake: 210146N**
- Designed the database & ER diagram
- Worked on the backend connections
- Drafting SQL queries
- Images for the database
- Working on the Admin analysis reports
- Authored views
  1. customer_view
  2. admin_view

### **M.S Gamage: 210176F**
- Designed the database & ER diagram
- Implemented the delivery module
- Images for the database
- Indexing
  1. index_product_name
  2. index_user_email
  3. index_full_text_search
  4. index_inventory_warehouse
- Authored functions
  1. getUserRole
  2. isStockAvailable
  3. orderDeliveryEstimate
  4. productDeliveryEstimate
- Frontend UI
