-- crate a database
DROP DATABASE IF EXISTS ecom;

CREATE DATABASE ecom;
USE ecom;
-- create a table for product
DROP TABLE IF EXISTS Product;

CREATE TABLE Product (
    product_id INT AUTO_INCREMENT NOT NULL,
    sku VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    weight DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY(product_id)
);

-- create a table for variant
DROP TABLE IF EXISTS Variant;

CREATE TABLE Variant (
    variant_id INT AUTO_INCREMENT NOT NULL,
    product_id INT NOT NULL,
    variant_title VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    img VARCHAR(255) NOT NULL,

	PRIMARY KEY (variant_id),

    FOREIGN KEY(product_id) REFERENCES Product(product_id)
);


-- createa a table for attribute
DROP TABLE IF EXISTS Attribute;

CREATE TABLE Attribute (
    product_id INT NOT NULL,
    attr_key VARCHAR(255) NOT NULL,
    attr_value VARCHAR(255) NOT NULL,
    attr_type ENUM('number', 'string', 'boolean'),

    PRIMARY KEY(product_id, attr_key),

    FOREIGN KEY(product_id) REFERENCES Product(product_id)
);


-- create a table for category
DROP TABLE IF EXISTS Category;

CREATE TABLE Category (
    category_id INT AUTO_INCREMENT NOT NULL,
    parent_category_id INT,
    category_name VARCHAR(255) NOT NULL,

    PRIMARY KEY(category_id),

    FOREIGN KEY(parent_category_id) REFERENCES Category(category_id)
);

-- create a table for product category
DROP TABLE IF EXISTS Product_Category;

CREATE TABLE Product_Category (
    product_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY(product_id, category_id),

    FOREIGN KEY(product_id) REFERENCES Product(product_id),
    FOREIGN KEY(category_id) REFERENCES Category(category_id)
);

-- create a table for city
DROP TABLE IF EXISTS City;

CREATE TABLE City (
    city_id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    zip_code VARCHAR(255) NOT NULL,

    PRIMARY KEY(city_id)
);

-- create a table for warehouse
DROP TABLE IF EXISTS Warehouse;

CREATE TABLE Warehouse (
    warehouse_id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,
    city_id INT NOT NULL,
    address VARCHAR(255) NOT NULL,
    contact_number VARCHAR(255) NOT NULL,

	PRIMARY KEY (warehouse_id),

    FOREIGN KEY (city_id) REFERENCES City(city_id)
);

-- create a table for inventory
DROP TABLE IF EXISTS Inventory;

CREATE TABLE Inventory (
    inventory_id INT AUTO_INCREMENT NOT NULL,
    warehouse_id INT NOT NULL,
    variant_id INT NOT NULL,
    quantity INT NOT NULL,

	PRIMARY KEy (inventory_id),

    FOREIGN KEY(warehouse_id) REFERENCES Warehouse(warehouse_id),
    FOREIGN KEY(variant_id) REFERENCES Variant(variant_id)
);

-- create a table for delivery method
DROP TABLE IF EXISTS Delivery_Method;

CREATE TABLE Delivery_Method (
    delivery_method_id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,

    PRIMARY KEY(delivery_method_id)
);

-- create a table for payment method
DROP TABLE IF EXISTS Payment_Method;

CREATE TABLE Payment_Method (
    payment_method_id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255) NOT NULL,

    PRIMARY KEY(payment_method_id)
);

-- createa a table for user authentication
DROP TABLE IF EXISTS User_Auth;

CREATE TABLE User_Auth (
    user_id INT AUTO_INCREMENT NOT NULL,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'customer') DEFAULT 'customer',

    PRIMARY KEY(user_id)

);

-- create a table for customer
DROP TABLE IF EXISTS Customer;

CREATE TABLE Customer (
    user_id INT NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    contact_number VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city_id INT NOT NULL,

    PRIMARY KEY (user_id),
	
    FOREIGN KEY(user_id) REFERENCES User_Auth(user_id),
    FOREIGN KEY(city_id) REFERENCES City(city_id)
);

-- create a table for cart
DROP TABLE IF EXISTS Cart;

CREATE TABLE Cart (
    cart_id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,

    PRIMARY KEY (cart_id),

    FOREIGN KEY (user_id) REFERENCES Customer(user_id)
);

-- create a table for cart item
DROP TABLE IF EXISTS Cart_Item;

CREATE TABLE Cart_Item (
    cart_item_id INT AUTO_INCREMENT NOT NULL,
    cart_id INT NOT NULL,
    variant_id INT NOT NULL,
    quantity INT NOT NULL,
    item_price DECIMAL(10, 2) NOT NULL,

    PRIMARY KEY(cart_item_id),

    FOREIGN KEY(cart_id) REFERENCES Cart(cart_id),
    FOREIGN KEY(variant_id) REFERENCES Variant(variant_id)
);

-- create a table for shipping
DROP TABLE IF EXISTS Shipping;

CREATE TABLE Shipping (
    shipping_id INT AUTO_INCREMENT NOT NULL,
    shipping_date DATE NOT NULL,
    delivery_estimate DATE NOT NULL,

    PRIMARY KEY (shipping_id)
);

-- create table for order
DROP TABLE IF EXISTS Customer_Order;

CREATE TABLE Customer_Order (
    order_id INT AUTO_INCREMENT NOT NULL,
    user_id INT NOT NULL,
    cart_id INT NOT NULL,
    shipping_id INT,
    delivery_method_id INT NOT NULL,
    payment_method_id INT NOT NULL,
    order_date DATE NOT NULL,
    city_id INT NOT NULL,
    delivery_address VARCHAR(255) NOT NULL,
    tot_price DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered') DEFAULT 'pending',

    PRIMARY KEY (order_id),

    FOREIGN KEY(user_id) REFERENCES Customer(user_id),
    FOREIGN KEY(cart_id) REFERENCES Cart(cart_id),
    FOREIGN KEY(shipping_id) REFERENCES Shipping(shipping_id),
    FOREIGN KEY(delivery_method_id) REFERENCES Delivery_Method(delivery_method_id),
    FOREIGN KEY(payment_method_id) REFERENCES Payment_Method(payment_method_id),
    FOREIGN KEY(city_id) REFERENCES City(city_id)
);

-- table for orders log
CREATE TABLE Order_Log (
    order_log_id INT AUTO_INCREMENT,
    order_id INT,
    action VARCHAR(255),
    log_date TIMESTAMP,

    PRIMARY KEY (order_log_id)
);

-- create table for inventory log
CREATE TABLE Inventory_Log (
    inventory_log_id INT AUTO_INCREMENT,
    warehouse_id INT,
    variant_id INT,
    changed_quantity INT,
    action VARCHAR(255),
    log_date TIMESTAMP,

    PRIMARY KEY (inventory_log_id)
);




