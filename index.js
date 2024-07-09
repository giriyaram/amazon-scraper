const express = require('express');
const request = require('request-promise');

const app = express();
const PORT = process.env.PORT || 5000;

// const apiKey = '5d573d39d510426422f5a384f14cc9b2';

const generateScaperUrl = (apiKey) => 'http://api.scraperapi.com?api_key=${apiKey}&autoparse=true';

// allowing application to parse json input
app.use(express.json());

// routing
app.get('/', (req, res) => {
    res.send('welcome to Amazon Scraper API');
});

// Get product details
app.get('/products/:productID/', async (req, res) => {
    const {productID} = req.params;
    const {apiKey } = req.query;

    try {
        const response = await request(`${generateScaperUrl(apiKey)}&url=https://www.amazon.in/dp/${productID}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})

// Get product reviews
app.get('/products/:productID/reviews', async (req, res) => {
    const {productID} = req.params;
    const {apiKey } = req.query;

    try {
        const response = await request(`${generateScaperUrl(apiKey)}&url=https://www.amazon.in/product-reviews/${productID}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})

// Get product offers
app.get('/products/:productID/offers', async (req, res) => {
    const {productID} = req.params;
    const {apiKey } = req.query;

    try {
        const response = await request(`${generateScaperUrl(apiKey)}&url=https://www.amazon.com/gp/offer-listing${productID}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})

// Get search query
app.get('/search/:searchQuery', async (req, res) => {
    const {searchQuery} = req.params;
    const {apiKey } = req.query;

    try {
        const response = await request(`${generateScaperUrl(apiKey)}&url=https://www.amazon.com/s?k=${searchQuery}`);

        res.json(JSON.parse(response));
    } catch (error) {
        res.json(error)
    }
})


// start the server
app.listen(PORT, () => {`server running on port ${PORT}`});