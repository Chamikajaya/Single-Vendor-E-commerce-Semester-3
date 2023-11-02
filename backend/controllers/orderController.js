import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";
import query from "../config/db.js";

// @desc    Create new order
// @route   POST /api/products
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    deliveryMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  } else {
    // get the user id from the requesr body
    console.log("User: ", req.user[0].user_id);
    const user_id = req.user[0].user_id;
    console.log("Order user ID: ", user_id);

    // get the cart id for the user id
    const cart_id = (await query("CALL get_last_cart_id(?)", [user_id]))[0][0]
      .cart_id;

    console.log("Order Cart ID: ", cart_id);

    // add the order items to the database
    for (let i = 0; i < orderItems.length; i++) {
      const orderItem = orderItems[i];
      await query("CALL add_cart_item(?, ?, ?)", [
        user_id,
        orderItem.variant_id,
        orderItem.quantity,
      ]);
      console.log("Successfully added: Order Item: ", orderItem);
    }

    // create the order in the order table
    const createdOrder = await query("CALL place_order(?, ?, ?, ?, ?)", [
      user_id,
      shippingAddress.city,
      paymentMethod,
      deliveryMethod.deliveryMethod,
      shippingAddress.address,
    ]);

    console.log("Successfully added: Order: ", createdOrder[0][0]);

    // const createdOrder = await order.save();

    res.status(201).json(createdOrder);
  }
});

// @desc    Get the orders for the logged in user
// @route   GET /api/orders/myorders
// @access  Private
// TODO: completed
const getMyOrders = asyncHandler(async (req, res) => {
  // Todo: Replace this MongoDB-specific code with MySQL code for retrieving orders by user ID
  // Example MySQL code: const orders = await db.query('SELECT * FROM orders WHERE user_id = ?', [req.user._id]);

  //   const orders = await Order.find({ user: req.user.user_id });
  const orders = await query("CALL get_order_by_user(?)", [
    parseInt(req.user.user_id),
  ]);
  res.status(201).json(orders);
});

// @desc    Get the orders for the logged in user
// @route   GET /api/orders/myorders
// @access  Private
// TODO: completed
const getPaymentMethods = asyncHandler(async (req, res) => {
  // Todo: Replace this MongoDB-specific code with MySQL code for retrieving orders by user ID
  // Example MySQL code: const orders = await db.query('SELECT * FROM orders WHERE user_id = ?', [req.user._id]);

  //   const orders = await Order.find({ user: req.user.user_id });
  const payment_methods = await query("SELECT * FROM payment_method", []);
  res.status(201).json(payment_methods);
});

// @desc    Get the orders for the logged in user
// @route   GET /api/orders/myorders
// @access  Private
// TODO: completed
const getDeliveryMethods = asyncHandler(async (req, res) => {
  // Todo: Replace this MongoDB-specific code with MySQL code for retrieving orders by user ID
  // Example MySQL code: const orders = await db.query('SELECT * FROM orders WHERE user_id = ?', [req.user._id]);

  //   const orders = await Order.find({ user: req.user.user_id });
  const delivery_methods = await query("SELECT * FROM delivery_method", []);
  res.status(201).json(delivery_methods);
});

// @desc    Get the orders for the logged in user
// @route   GET /api/orders/myorders
// @access  Private
// TODO: completed
const getCities = asyncHandler(async (req, res) => {
  // Todo: Replace this MongoDB-specific code with MySQL code for retrieving orders by user ID
  // Example MySQL code: const orders = await db.query('SELECT * FROM orders WHERE user_id = ?', [req.user._id]);

  //   const orders = await Order.find({ user: req.user.user_id });
  const cities = await query("SELECT * FROM city", []);
  res.status(201).json(cities);
});

// @desc    Get the orders for the logged in user
// @route   GET /api/orders/myorders
// @access  Private
// TODO: completed
const getDeliveryMethodById = asyncHandler(async (req, res) => {
  // Todo: Replace this MongoDB-specific code with MySQL code for retrieving orders by user ID
  // Example MySQL code: const orders = await db.query('SELECT * FROM orders WHERE user_id = ?', [req.user._id]);

  //   const orders = await Order.find({ user: req.user.user_id });
  const delivery_method = (
    await query("SELECT * FROM delivery_method WHERE delivery_method_id = ?", [
      parseInt(req.params.id),
    ])
  )[0];
  res.status(201).json(delivery_method);
});

// @desc    Get the orders for the logged in user
// @route   GET /api/orders/myorders
// @access  Private
// TODO: completed
const getPaymentMethodById = asyncHandler(async (req, res) => {
  // Todo: Replace this MongoDB-specific code with MySQL code for retrieving orders by user ID
  // Example MySQL code: const orders = await db.query('SELECT * FROM orders WHERE user_id = ?', [req.user._id]);

  //   const orders = await Order.find({ user: req.user.user_id });
  const payment_method = (
    await query("SELECT * FROM payment_method WHERE payment_method_id = ?", [
      parseInt(req.params.id),
    ])
  )[0];
  res.status(201).json(payment_method);
});

// @desc    Get the orders for the logged in user
// @route   GET /api/orders/myorders
// @access  Private
// TODO: completed
const getCityById = asyncHandler(async (req, res) => {
  // Todo: Replace this MongoDB-specific code with MySQL code for retrieving orders by user ID
  // Example MySQL code: const orders = await db.query('SELECT * FROM orders WHERE user_id = ?', [req.user._id]);

  //   const orders = await Order.find({ user: req.user.user_id });
  const city = (
    await query("SELECT * FROM city WHERE city_id = ?", [
      parseInt(req.params.id),
    ])
  )[0];
  res.status(201).json(city);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
// TODO: completed
const getOrderById = asyncHandler(async (req, res) => {
  const order = (
    await query("CALL get_order_by_order_id(?)", [parseInt(req.params.id)])
  )[0];

  const order_items = (
    await query("CALL get_order_items(?)", [parseInt(req.params.id)])
  )[0];
  if (order && order_items) {
    res.status(201).json({ order: order[0], order_items });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

const getOrderItems = asyncHandler(async (req, res) => {
  const order_items = (
    await query("CALL get_order_items(?)", [parseInt(req.params.id)])
  )[0];
  if (order_items) {
    res.status(201).json(order_items);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update the order to paid ( from false to true )
// @route   PUT /api/orders/:id/pay
// @access  Private
// TODO: completed
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // const order = await Order.findById(req.params.id);
  const order = (
    await query("CALL get_order_by_order_id(?)", [req.params.id])
  )[0][0];

  if (order) {
    await query("UPDATE order SET status = ? WHERE order_id = ?", [
      "paid",
      req.params.id,
    ]);
    order.status = "paid";
    res.status(201).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update the order to delivered status
// @route   PUT /api/orders/:id/deliver
// *** @access  Private/ Admin
// TODO:completed
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  let order = (
    await query("CALL get_order_by_order_id(?)", [req.params.id])
  )[0][0];
  if (order) {
    // order.isDelivered = true;
    // order.deliveredAt = Date.now();
    const initialDate = Date(); // Replace with your desired date

    // Calculate the number of days to add
    const numberOfDaysToAdd = 7; // Change this to the number of days you want to add

    // Calculate the milliseconds to add (1 day = 24 hours * 60 minutes * 60 seconds * 1000 milliseconds)
    const millisecondsToAdd = numberOfDaysToAdd * 24 * 60 * 60 * 1000;

    // Add the milliseconds to the initial Date object
    const currentDate = new Date(initialDate.getTime() + millisecondsToAdd);

    // Get year, month, and day components
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");

    // Format as 'YYYY-MM-DD'
    const sqlFormattedDate = `${year}-${month}-${day}`;
    const ship_id = await query("CALL create_shipping(?)", [sqlFormattedDate]);

    await query(
      "UPDATE order SET status = ?, shipping_id = ? WHERE order_id = ?",
      ["delivered", ship_id, req.params.id]
    );

    order.status = "delivered";
    order.shipping_id = ship_id;

    res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Get all orders
// @route   GET /api/orders/:id/deliver
//***  @access  Private/ Admin
// TODO: completed
const getOrders = asyncHandler(async (req, res) => {
  // Todo: Replace this MongoDB-specific code with MySQL code for retrieving all orders
  // Example MySQL code: const orders = await db.query('SELECT * FROM orders');
  // ! Please double check this example sql query

  //   const orders = await Order.find({}).populate("user", "id name");
  const orders = await query("CALL get_all_orders()", []);
  res.json(orders);
});

export {
  addOrderItems,
  getMyOrders,
  getOrderById,
  getOrderItems,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders,
  getPaymentMethods,
  getDeliveryMethods,
  getCities,
  getPaymentMethodById,
  getDeliveryMethodById,
  getCityById,
};
