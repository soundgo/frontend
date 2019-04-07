//Install express server
const express = require('express');
const path = require('path');
const sslRedirect = require('heroku-ssl-redirect');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./dist/frontend'));

// enable ssl redirect
app.use(sslRedirect());

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/dist/frontend/index.html'));
});


// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
