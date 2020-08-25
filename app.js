const express=require("express");

const https = require('https');
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req,res){
  const query =req.body.cityName;
  const apiKey="a6c5f6d9678670e6966e6606dd0b3489"
  const unit="metric"

  const url="https://api.openweathermap.org/data/2.5/weather?q="+ query +" &appid=a6c5f6d9678670e6966e6606dd0b3489&units=metric"
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData=JSON.parse(data)
      const temp=weatherData.main.temp;
      const weatherspeed=weatherData.wind.speed;
      const press=weatherData.main.pressure;
      const humid=weatherData.main.humidity;
      const icon=weatherData.weather[0].icon;
      const imageURL=" http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>The speed is currently " + weatherspeed +"</P>");
      res.write("<p>The pressure is currently " + press + "</p>");
      res.write("<p>The humidity is " + humid + "</p>");
      res.write("<h1>The temperature in "+ query +" is " + temp + " degree Celsius.</h1>");
      res.write("<img src=" + imageURL +">");
      res.send()
    })
  })
})




app.listen(process.env.PORT || 3000, function(){
  console.log("server is running on port 3000.");
})
