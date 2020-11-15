var express=require("express"); 
var bodyParser=require("body-parser"); 
  
const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/dtds'); 
var db=mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 
  
var app=express() 
  
  
app.use(bodyParser.json()); 
app.use(express.static('public')); 
//app.use(bodyParser.urlencoded({ 
  //  extended: true
//})); 
  
app.post('/sign_up', function(req,res){ 

var daata =req.body;

if (!daata.name||!daata.email||!daata.password||!daata.phone){

res.send(404);

}

    var name = req.body.name; 
    var email =req.body.email; 
    var pass = req.body.password; 
    var phone =req.body.phone; 
  
    var data = { 
        "name": name, 
        "email":email, 
        "password":pass, 
        "phone":phone 
    } 
db.collection('details').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
    return res.redirect('signup_success.html'); 
}) 
  


//login

app.post('/login', function(req,res){


 var data =req.body;
 if (!data.name||!data.pass)
{
     console.log("error")
    res.send(404);
 }

 var name = data.name;
 var pass = data.pass
//      var name = req.body.name;
//    var pass = req.body.pass;
  
    db.collection('details').find({name:name,password:pass}).toArray(function(err, collection)
    {

console.log("sucess");
//res.send("sucess");
       if(collection!=0)
       {
        console.log("sucess");
     res.send("sucess");
       }
        else{
            console.log("error")
            res.send("error");
        }
            
        
      
    });
    
   
})







 app.get('/data', function(req,res){ 
    // var name = req.body.name; 
//     //var email =req.body.email; 
    db.collection('details').find({}).toArray(function(err, collection){ 
       if (err) throw err; 
        console.log(collection); 
        res.send(collection); 
     }); 
     
 }) 

//covid entry


app.post('/covid_entry', function(req,res){ 
    var name = req.body.name;  
    var place =req.body.place;
    var phone =req.body.phone; 
    var currentdate = new Date(); 
  
    var data = { 
        "name": name , 
        "place":place,  
        "phone":phone,
        "currentdate":currentdate
    } 
db.collection('covidentry').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
        
              
    }); 
    res.send("sucess");
  
}) 

//covidget data

app.get('/covidlist', function(req,res){ 
     
    db.collection('covidentry').find({}).toArray(function(err, collection){ 
       if (err) throw err; 
        console.log(collection); 
        res.send(collection); 
     }); 
     
 }) 

//online booking

app.post('/booking', function(req,res){ 
    var consignment_no = req.body.consignment_no;  
    var Delivery_place =req.body.Delivery_place;
    var currentdate = new Date(); 
  
    var data = { 
        "consignment_no":consignment_no, 
        "Delivery_place":Delivery_place,  
        "currentdate":currentdate
    } 
db.collection('booking_detailes').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
              
    }); 
          
  
}) 


//booking detailes list

app.get('/bookinglist', function(req,res){ 
     
    db.collection('booking_detailes').find({}).toArray(function(err, collection){ 
       if (err) throw err; 
        console.log(collection); 
        res.send(collection); 
     }); 
     
 }) 

 //adding delivery consignment

 app.post('/addingdelivery', function(req,res){ 
    var consignment_no = req.body.consignment_no;  
    var name = req.body.name;
    var phone =req.body.phone;
    var currentdate = new Date(); 
  
    var data = { 
        "consignment_no":consignment_no, 
        "name":name,
        "phone":phone,  
        "currentdate":currentdate
    } 
db.collection('addingdelivery_detailes').insertOne(data,function(err, collection){ 
        if (err) throw err; 
        console.log("Record inserted Successfully"); 
        console.log(data); 
              
    }); 
          
  
}) 
//
//adding delivery list
app.get('/addingdeliverylist', function(req,res){ 
     
    db.collection('addingdelivery_detailes').find({}).toArray(function(err, collection){ 
       if (err) throw err; 
        console.log(collection); 
        res.send(collection); 
     }); 
     
 }) 

//find one

 //db.collection('addingdelivery_detailes').findOne(function(err, collection){ 


// app.post('/auth', function(request, response) {
// 	var username = request.body.username;
// 	var password = request.body.password;
// 	if (username && password) {

//         db.collection('detailes').findOne(data.name=username,function(err, collection)
//         {
//             if (err) throw err; 
//             console.log("Successfully"); 
//         });
//         res.send("sucess");

//     })
        





app.get('/',function(req,res){ 
res.set({ 
    'Access-control-Allow-Origin': '*'
    }); 
return res.redirect('index.html'); 
}).listen(3000) 
  
  
console.log("server listening at port 3000"); 