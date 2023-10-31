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

    // console.log("Order Cart ID: ", cart_id);

    // add the order items to the database
    for (let i = 0; i < orderItems.length; i++) {
      const orderItem = orderItems[i];
      await query("CALL add_cart_item(?, ?, ?)", [
        user_id,
        orderItem.variant_id,
        orderItem.quantity,
      ]);
      // console.log("Successfully added: Order Item: ", orderItem);
    }

    // create the order in the order table
    const createdOrder = await query("CALL place_order(?, ?, ?, ?, ?)", [
      user_id,
      shippingAddress.city,
      paymentMethod,
      deliveryMethod.deliveryMethod,
      shippingAddress.address,
    ]);

    // console.log("Successfully added: Order: ", createdOrder[0][0]);

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
    await query("CALL get_order_by_order_id(?)", [
      parseInt(req.params.order_id),
    ])
  )[0];
  console.log(order);
  if (order) {
    console.log("Order: ", order[0][0]);
    res.status(201).json(order[0][0]);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update the order to paid ( from false to true )
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  // Todo: Replace this MongoDB-specific code with MySQL code for updating the order to paid
  // Example MySQL code: const order = await db.query('UPDATE orders SET isPaid = true, paidAt = ?, paymentResult = ? WHERE order_id = ?', [Date.now(), JSON.stringify(paymentResult), req.params.id]);
  // * Please double check this example sql query with ER diagram

  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };
    const updatedOrder = await order.save();
    res.status(201).json(updatedOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

// @desc    Update the order to delivered status
// @route   PUT /api/orders/:id/deliver
// *** @access  Private/ Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  // Todo: Replace this MongoDB-specific code with MySQL code for updating the order to paid
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
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
