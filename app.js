/**
 * Created by samuel on 2016/9/10.
 */


var express = require('express');
var app = express();

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
app.use(express.static('public'));


// nodejs package manager