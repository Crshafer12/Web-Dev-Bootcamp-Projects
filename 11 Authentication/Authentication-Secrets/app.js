require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
//const bcrypt = require("bcrypt");
//const saltRounds = 10;
//const encrypt = require("mongoose-encryption");
//const md5 = require("md5");
const port = 3000;

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	session({
		secret: "A long string.",
		resave: false,
		saveUninitialized: true,
		//cookie: { secure: true }
	})
);

app.use(passport.initialize());
app.use(passport.session());

//mongoose.connect("mongod://localhost:27017/userDB", { useNewUrlParser: true });
mongoose.connect(process.env.MONGO, { useNewUrlParser: true });
//mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
	email: String,
	password: String,
	secret: [String],
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", function (req, res) {
	res.render("home");
});

app.get("/login", function (req, res) {
	res.render("login");
});

app.get("/submit", function (req, res) {
	if (req.isAuthenticated()) {
		res.render("submit");
	} else {
		res.redirect("/login");
	}
});

app.post("/submit", function (req, res) {
	const submittedSecret = req.body.secret;

	User.findById(req.user.id, function (err, foundUser) {
		if (err) {
			console.log(err);
		} else {
			if (foundUser) {
				foundUser.secret = submittedSecret;
				foundUser.save(function () {
					res.redirect("/secrets");
				});
			}
		}
	});
});

app.get("/logout", function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

app.get("/register", function (req, res) {
	res.render("register");
});

app.get("/secrets", function (req, res) {
	User.find({ secret: { $ne: null } }, function (err, foundUsers) {
		if (err) {
			console.log(err);
		} else {
			if (foundUsers) {
				res.render("secrets", { usersWithSecrets: foundUsers });
			}
		}
	});
});

app.post("/register", function (req, res) {
	User.register({ username: req.body.username }, req.body.password, function (err, user) {
		if (err) {
			console.log(err);
			res.redrect("/register");
		} else {
			passport.authenticate("local")(req, res, function () {
				res.redirect("/secrets");
			});
		}
	});

	// bcrypt.hash(req.body.password, saltRounds).then(function(hash) {
	//     const newUser = new User({
	//         email: req.body.username,
	//         password: hash
	//     });
	//     newUser.save(function(err) {
	//         if (err) {
	//             console.log(err);
	//         } else {
	//             res.render("secrets");
	//         }
	//     });
	// });
});

app.post("/login", function (req, res) {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
	});

	req.login(user, function (err) {
		if (err) {
			console.log(err);
		} else {
			passport.authenticate("local")(req, res, function () {
				res.redirect("/secrets");
			});
		}
	});
	// const username = req.body.username;
	// const password = req.body.password;

	// User.findOne({ email: username }, function(err, foundUser) {
	//     if (err) {
	//         console.log(err);
	//     } else {
	//         if (foundUser) {
	//             bcrypt.compare(password, foundUser.password, function(err, result) {
	//                 if (result === true) {
	//                     res.render("secrets");
	//                 }
	//             });
	//         }
	//     }
	// });
});

app.listen(port, () => {
	console.log("Server started on port 3000");
});
