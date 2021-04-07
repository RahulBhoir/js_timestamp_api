const express = require('express');

const app = express();
app.use(express.urlencoded({extended:true}));



app.listen(process.env.PORT || 3000, ()=>{
    console.log('server is running');
});

function getTimeStamp(userDate){
    let utcTime, unixTime, date;
    if(new Date(userDate) != 'Invalid Date'){
        date = new Date(userDate);
    }
    else if(Number(userDate) != NaN){
        date = new Date(Number(userDate));
    }
    else{
        return {'error': 'Invalid Date'};
    }
    utcTime = String(date).slice(0,28);  
    unixTime = date.getTime();
    const timestamp = {
        'unix': unixTime,
        'utc': utcTime
    }
    return timestamp;
}

app.get('/api/timestamp/:date', function(req,res){
    date = req.params.date;
    const timestamp = getTimeStamp(date);
    res.send(timestamp);
})

app.get('/api/timestamp/', function(req,res){
    date = new Date();
    const timestamp = getTimeStamp(date);
    res.send(timestamp);
})

