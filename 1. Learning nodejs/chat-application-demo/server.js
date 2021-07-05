//install express with npm install -s express
//install mongosse with npm install -s mongoose

var express = require('express');
var app = express();

var http = require("http"); //creating an http server
var server = http.createServer(app);

const { Server } = require('socket.io');

var io = new Server(server);  // using http over socket.io
var mongoose = require('mongoose');

// app.use(express.static(__dirname));  //to serve the static files - the entire directory
app.use(express.json());; // to use json req body in post
app.use(express.urlencoded({
    extended: true
  })); //This supports the urlencoded post request from html.

mongoose.Promise = Promise //add this line if mongoose promise is depricated

//URI for mongoDB connection
var dbUrl = "mongodb+srv://shivamXI:testingmongodb@cluster0.sab3t.gcp.mongodb.net/chatApp?retryWrites=true&w=majority"

//here, we are storing and adding data in variable.
//but in real application we will add the data to the database and also fetch it from database
// var messages = [
//     { name:"Shivam", message: "hello" },
//     { name: "Shiv", message: 'howdy' }
// ]

//object for mongodb
var Message = mongoose.model('Message', {
    name:String,
    message: String
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });

//handling get request
app.get('/message', (req, res)=>{

    Message.find({}, (err, messages)=>{
        res.send(messages)
    })
    // res.send(messages);
})

//get message of specific user - used for testing in server.spec.js
app.get('/message/:user', (req, res)=>{
    var user = req.params.user
    Message.find({name: user}, (err, messages)=>{
        res.send(messages)
    })
    // res.send(messages);
})


//handling post request
//express cannot read req body by itself. We will need body-parser for it
//npm install -s body-parser
app.post('/message', async (req, res)=>{  //add async keyword when use async/await
    var message = new Message(req.body);

    //save the posted data
    //nested callback - harder to understand code
    /*
    message.save((err)=>{
        if(err) sendStatus(500)
        Message.findOne({message: 'badword'}, (err, censored)=>{
            if(censored) {
                console.log('censored words were found', censored)
                Message.remove({_id: censored.id}, (err)=>{
                    console.log('removed censored message')
                })
            }
        })

        // message.push(req.body);
        io.emit('message', req.body);
        res.sendStatus(200);
    })
    */

    //promise chaining - easier to understand and powerful(make async code simpler)
    /*
    message.save()
    .then(()=>{
        console.log('saved')
        return Message.findOne({message: 'badword'})  //this will return call to next promise chain
    })
    .then( censored => {  //callback for promise
        if(censored) {
            console.log('censored words found', censored)
            return Message.deleteOne({_id: censored.id})  //return call to next promise chain
        }
        io.emit('message', req.body)
        res.sendStatus(200)
    })
    .catch((err)=>{  //catch if there is any error
        res.sendStatus(500)
        return console.error(err)
    })
    */

    //using async/await - much simpler than prommise chaining
    //use try/catch/finally to handle errors here
    try {
        //throw 'error'
    var savedMessage = await message.save()

    var censored = await Message.findOne({message: 'badword'})

    if(censored)
        await Message.deleteOne({_id: censored.id})  //delete the badword
    else {    
        console.log('saved')
        io.emit('message', req.body)
    }

    res.sendStatus(200)
    
    } catch(error) {
        res.sendStatus(500)
        return console.error(error)
    } finally {
        console.log('message post called')
    }

    // console.log(req.body);
    //messages.push(req.body);
    //io.emit('message', req.body); //emmiting a socket instance when new data is posted. This is an event whci can be listened in html.
    //res.sendStatus(200);
})

//listening to a socket connection
io.on('connection', (socket)=> {
    console.log('a user connected')
})

//connect to mongodb
mongoose.connect(dbUrl, { useNewUrlParser:true, useUnifiedTopology:true },(err)=> {
    console.log("mongodb connection", err)
})

// app.listen(3000); //start a server on port 3000

//we can start server with a callback too
// var server = app.listen(3000, ()=>{
//     console.log("server is listening on port", server.address().port);
// })

//start a http server with socket
server.listen(3000, ()=>{
    console.log("server is listening on port", 3000);
})