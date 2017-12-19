let express = require('express');
let path = require('path');
let app = express();

app.get('/hello', (req, res) => res.send({ txt: "Hello world." }));

// Use Webpack if in development
if (process.env.NODE_ENV !== 'production') {
    let webpack = require('webpack');
    let webpackMiddleware = require('webpack-dev-middleware');
    let webpackConfig = require('./webpack.config');
    app.use(webpackMiddleware(webpack(webpackConfig)));
}
else {
    app.use(express.static('dist'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, './dist/index.html'));
    })
}

app.listen(process.env.PORT || 3050, () => console.log('Listening'));
