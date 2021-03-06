const { Router } = require('express');
const { getById } = require('../models/Order');
const Order = require('../models/Order');
const pool = require('../utils/pool');

module.exports = Router()
  .post('/', async (req, res) => {
    console.log('post', 'sdf')
    const order = await Order.insert({product: req.body.product, quantity: req.body.quantity});
    res.send(order);
  })

  .get('/:id', async (req, res) => {
    const order = await Order.getById(req.params.id)
    res.json(order);
  })

  .get('/', async (req, res) => {
    const orders = await Order.getAll();
    res.json(orders);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;  
      const order = await Order.updateById(id, req.body)
      console.log(order);
      res.json(order);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const order = await Order.deleteById(id);
    res.json(order);
  });
