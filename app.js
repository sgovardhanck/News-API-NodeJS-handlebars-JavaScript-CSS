const express = require('express');
const { engine } = require('express-handlebars');
const axios = require('axios');

const app = express();
const port = 3000;

const apiKey = '3b55c96bbb524cf4b34ee736f00f8633';
const apiUrl = 'http://newsapi.org/v2/everything';
const q = 'tech'; // Change this to your desired q code
const pageSize = 21;   // Number of news articles to fetch
// let currentPage = 1;
const requestOptions = {
    params: {
        q,
        pageSize,
        apiKey,
        // page: currentPage,
    }
};

// Configure Handlebars as the view engine
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

// Route to fetch news and render it using Handlebars
app.get('/', (req, res) => {
    axios.get(apiUrl, requestOptions)
        .then(response => {
            const articles = response.data.articles;
            // const articlesJson = JSON.stringify(articles);
            // res.render('news', { articlesJson, title: 'News Headlines' });
            res.render('news', { articles, title: 'News Headlines' });
        })
        .catch(error => {
            console.error('Error fetching news:', error.message);
            res.render('error', { title: 'Error' });
        });
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

