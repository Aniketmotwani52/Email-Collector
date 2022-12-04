
const expres=require("express");
const bodyParser=require("body-parser");
const htps = require("https");

const app=expres();

app.use(bodyParser.urlencoded({extended:true}));

app.listen( process.env.PORT || "880",function(){
    console.log("Server is running on port 880");
});

//app.use(expres.static(__dirname+"/public"));
//app.use(expres.static(__dirname+"/public/images.jpg"));

// app.get("/public/images.jpg",function(){
//     sendFile(__dirname+"/public/images.jpg");
// })

app.use('/public', expres.static(__dirname + '/public'));


app.get("/",function(req,res){
    // res.send("Hey server is running !");
    res.sendFile(__dirname + "/email.html");
});

app.get("/email.css",function(req,res){
    res.sendFile(__dirname+ "/public/email.css");
});

app.post("/",function(req,res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const mailId = req.body.email;

    const data={
                members: [
                            {
                                email_address : mailId,
                                status : "subscribed",
                                merge_fields :{
                                            FNAME : firstName,
                                            LNAME : lastName
                                            }
                            }
                        ]    
                }
    
    console.log(data);
    const jsonData = JSON.stringify(data);
    console.log(jsonData);


    const url="https://us18.api.mailchimp.com/3.0/lists/26a9098040";
    const option = {
        method : "POST",
        auth : "aniketmotwani52:b0fcd9b98f3330607068f6d5f2825d3c-us18"
    }
    const request= htps.request(url,option,function(response){
        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();


    res.write(" <p> Your good name is " + firstName + " " + lastName) + " </p>";
    //res.write("<br>");
    res.write("<p> Your email id is " + mailId + " </p>");
    res.send();

})




//api key
//b0fcd9b98f3330607068f6d5f2825d3c-us18

//list id 
//26a9098040
