const mongoose = require("mongoose");
const express = require("express");
const Schema = mongoose.Schema;
const app = express();
const jsonParser = express.json();
var dbURI = 'mongodb://localhost:27017/usersdb';

const userScheme = new Schema({
    tovarName: String,
    opiName: String,
    midleName: String,
    date: String,
    time: Number,
    reason: String,
    comment: String
}, {
    versionKey: false
});
const User = mongoose.model("User", userScheme);

const adminScheme = new Schema({
    login: String,
    password: String
}, {
    versionKey: false
});
const Admin = mongoose.model("Admin", adminScheme);

// Тут выбираем папку, которая будет прослушиваться
app.use(express.static(__dirname + "/dist/"));

// Тут подключаемся к серверу бд
mongoose.connect(dbURI, { useNewUrlParser: true,  useUnifiedTopology: true  }, function (err) {
    if (err) return console.log(err);
    app.listen(3008, function () {
        console.log("Сервер подключен...");
    });
});
// CONNECTION EVENTS
mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

// CAPTURE APP TERMINATION / RESTART EVENTS
// To be called when process is restarted or terminated
gracefulShutdown = function(msg, callback) {
    mongoose.connection.close(function() {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
// For nodemon restarts
process.once('SIGUSR2', function() {
    gracefulShutdown('nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function() {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app termination', function() {
        process.exit(0);
    });
});

// Это объявляем добавление элементов 
app.post("/api/reg", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const login = req.body.login;
    const password = req.body.password;

    const admin = new Admin({
        login: login,
        password: password
    });

    Admin.findOne({ login: login }, function (err, result) {
        if (!result) {
            res.send(result)
            admin.save(function (err) {
                if (err) return console.log(err);
            });
        } else {
            res.send(result);
        }
    })

    //сохранение объекта

});

app.post("/api/reg", jsonParser, function(req, res){
    Admin.findOne({login: login}, function (err, result){
        if (!result){
            res.send(result)
        } else {
            res.send(result)
        }
    })    
});

// объявление добавления элементов
app.post("/api/users", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    const tovarName = req.body.tovarName;
    const opiName = req.body.opiName;
    const midleName = req.body.midleName;
    const date = req.body.date;
    const time = req.body.time;
    const reason = req.body.reason;
    const comment = req.body.comment;

    const user = new User({
        tovarName: tovarName,
        opiName: opiName,
        midleName: midleName,
        date: date,
        time: time,
        reason: reason,
        comment: comment
    });
    // Это сохранение объекта в бд
    user.save(function (err) {
        if (err) return console.log(err);
        res.send(user);
    });
});
// Получаем список объектов
app.get("/api/getUsers", function (req, res) {

    User.find({}, function (err, users) {

        if (err) return console.log(err);
        res.send(users)
    });
});
// Удаление объектов
app.delete("/api/users/:id", function (req, res) {

    const id = req.params.id;
    User.findByIdAndDelete(id, function (err, user) {

        if (err) return console.log(err);
        res.send(user);
    });
});
// Изменение объектов
app.put("/api/users", jsonParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const id = req.body._id;
    const tovarName = req.body.tovarName;
    const opiName = req.body.opiName;
    const midleName = req.body.midleName;
    const date = req.body.date;
    const time = req.body.time;
    const reason = req.body.reason;
    const comment = req.body.comment;
    const newUser = {
        tovarName: tovarName,
        opiName: opiName,
        midleName: midleName,
        date: date,
        time: time,
        reason: reason,
        comment: comment
    };
    // Функция ищет и обноваляет выбранный объект
    User.findOneAndUpdate({ _id: id }, newUser, { new: true }, function (err, user) {
        if (err) return console.log(err);
        res.send(user);
    });
});