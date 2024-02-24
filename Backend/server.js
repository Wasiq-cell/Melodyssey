    const express = require("express");
    const session = require('express-session');
    const cors = require('cors');
    const router = express.Router();
    const path = require('path');
    const exphbs = require('express-handlebars');
    const Handlebars = require("handlebars");
    const mongoose = require('mongoose');
    const JwtStrategy = require('passport-jwt').Strategy;
    const ExtractJwt = require('passport-jwt').ExtractJwt;
    const passport = require("passport");
    const axios = require('axios');
    const bodyParser = require('body-parser');
    
    const User = require('./models/User');
    const authRoutes = require("./routes/auth");
    const songRoutes = require("./routes/song");
    const playlistRoutes = require("./routes/playlist");

    require("dotenv").config();
    const app = express();
    
    const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
    const insecureHandlebars = allowInsecurePrototypeAccess(exphbs);

    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = "thiskeyissecret1";
  
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.findOne({ _id: jwt_payload.identifier });
        
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (error) {
        return done(error, false);
      }
    }));

    const dbFlag = require('./database/dbconnect');
    const PORT = process.env.PORT || 8000;

    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    app.engine('handlebars', exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars)
    }));
    app.set('view engine', 'handlebars');
    app.set('views', './views');

    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/scripts', express.static('scripts'));
    app.use(express.json());
    app.use(passport.initialize());

    app.get('/', (req, res) => {
        res.render('home');
    });

    app.get('/home', (req, res) => {
        res.render('home');
    });

    app.get('/login', (req, res) => {
        res.render('login');
    });

    app.get('/signup', (req, res) => {
        res.render('signup');
    });

    app.use("/auth", authRoutes);
    app.use("/song", songRoutes);
    app.use("/playlist", playlistRoutes);


    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    });
