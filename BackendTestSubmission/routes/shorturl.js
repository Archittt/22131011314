const express = require('express');
const router = express.Router();
const Url = require('../models/Url');
const Click = require('../models/Click');
const generateCode = require('../utils/generateCode');
const geoip = require('geoip-lite');

// Create short URL
router.post('/shorturls', async (req, res) => {
    const { url, validity = 30, shortcode } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const code = shortcode || generateCode();
    const expiry = new Date(Date.now() + validity * 60 * 1000);

    try {
        const exists = await Url.findOne({ shortcode: code });
        if (exists) return res.status(409).json({ error: 'Shortcode already exists' });

        const newUrl = await Url.create({ shortcode: code, longUrl: url, expiry });
        return res.status(201).json({
            shortLink: `http://localhost:3000/${code}`,
            expiry: expiry.toISOString()
        });
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
});

// Redirect user
router.get('/:shortcode', async (req, res) => {
    const { shortcode } = req.params;

    try {
        const record = await Url.findOne({ shortcode });
        if (!record) return res.status(404).json({ error: 'Shortcode not found' });
        if (new Date() > record.expiry) return res.status(410).json({ error: 'Shortcode expired' });

        record.clickCount += 1;
        await record.save();

        const geo = geoip.lookup(req.ip);
        await Click.create({
            shortcode,
            referrer: req.get('Referrer') || 'Direct',
            geo: geo?.country || 'Unknown'
        });

        return res.redirect(record.longUrl);
    } catch (err) {
        return res.status(500).json({ error: 'Redirection error' });
    }
});

// Get stats
router.get('/shorturls/:shortcode', async (req, res) => {
    const { shortcode } = req.params;

    try {
        const urlData = await Url.findOne({ shortcode });
        if (!urlData) return res.status(404).json({ error: 'Shortcode not found' });

        const clicks = await Click.find({ shortcode });

        res.json({
            longUrl: urlData.longUrl,
            createdAt: urlData.createdAt.toISOString(),
            expiry: urlData.expiry.toISOString(),
            totalClicks: urlData.clickCount,
            clicks: clicks.map(click => ({
                timestamp: click.timestamp.toISOString(),
                referrer: click.referrer,
                geo: click.geo
            }))
        });
    } catch (err) {
        res.status(500).json({ error: 'Could not retrieve stats' });
    }
});

module.exports = router;