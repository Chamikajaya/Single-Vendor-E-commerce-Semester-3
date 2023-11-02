-- customer view of the user table
DROP VIEW IF EXISTS customer_view;

CREATE VIEW customer_view AS
SELECT *
FROM User_Auth
JOIN Customer USING(user_id)
WHERE role='customer';

-- admin view of the user table
DROP VIEW IF EXISTS admin_view;

CREATE VIEW admin_view AS
SELECT *
FROM User_Auth
WHERE role='admin';

