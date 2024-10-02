const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(process.env.SHOPIFY_STORE_URL, {
      headers: {
        'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
      },
    });
    
    const orders = response.data.orders;
    const totalOrders = orders.length;
    
    const paidOrders = orders.filter(order => order.financial_status === 'paid');
    const totalPaidOrders = paidOrders.length;
    
    const totalSales = paidOrders.reduce((acc, order) => acc + parseFloat(order.total_price), 0);
    
    const conversionRate = totalOrders > 0 ? (totalPaidOrders / totalOrders) * 100 : 0;

    res.json({ totalOrders, totalPaidOrders, totalSales, conversionRate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch Shopify data' });
  }
});

router.get('/orders', async (req, res) => {
  try {
    const response = await axios.get(process.env.SHOPIFY_STORE_URL, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': process.env.SHOPIFY_ACCESS_TOKEN,
      },
    });
    
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
