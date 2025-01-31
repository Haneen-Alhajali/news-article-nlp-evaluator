const fetch = require('node-fetch'); 
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.MEANINGCLOUD_API_KEY;
const BASE_URL = "https://api.meaningcloud.com/sentiment-2.1";



app.use(express.static(path.join(__dirname, '../../dist')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
});


app.post('/analyze', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    const apiUrl = `${BASE_URL}?key=${API_KEY}&url=${encodeURIComponent(url)}&lang=en`;

    try {
        const response = await fetch(apiUrl, { method: 'POST' });
        const data = await response.json();
        console.log("API Response:", JSON.stringify(data, null, 2)); // Log full response
        
        if (!data || !data.status || data.status.code !== "0") {
            console.error("MeaningCloud API Error:", data.status ? data.status.msg : "Unknown error");
            return res.status(500).json({ error: data.status ? data.status.msg : "API request failed" });
        }
    
        // Check if all expected fields exist before sending response
        if (!data.score_tag || !data.agreement || !data.subjectivity || !data.confidence || !data.irony) {
            return res.status(500).json({ error: "Incomplete API response" });
        }
    
        const sentimentLabels = {
            "P+": "Strong Positive",
            "P": "Positive",
            "NEU": "Neutral",
            "N": "Negative",
            "N+": "Strong Negative",
            "NONE": "No sentiment detected"
        };
        
        const sentimentAnalysis = {
            polarity: `${data.score_tag} (${sentimentLabels[data.score_tag].toLowerCase()})`,
            agreement: data.agreement,
            subjectivity: data.subjectivity,
            confidence: data.confidence,
            irony: data.irony
        };
        
        res.json(sentimentAnalysis);
        
    } catch (error) {
        console.error("Error fetching MeaningCloud API:", error);
        res.status(500).json({ error: "Failed to fetch API data" });
    }
    
});

app.listen(8081, () => {
    console.log('Server is running on port 8081');
});
