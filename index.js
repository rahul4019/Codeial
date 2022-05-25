const express = require('express');
const app = express();
const port = 8000;

// use express router
app.use('/',require('./routes'));

// setup the view function
app.set('view engine','ejs');
app.set('views','./views')

app.listen(port,(err)=>{
    if(err){
        console.log(`Error in running the server: ${err}`);
        return;
    }

    console.log(`Server is running on port: ${port}`);

});


