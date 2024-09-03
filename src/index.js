const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const User = require('../models/user');
const Machine = require('../models/machines'); 
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../templates/html'));

app.use('/images', express.static(path.join(__dirname, '../templates/images')));
app.use('/css', express.static(path.join(__dirname, '../templates/css')));
app.use('/js', express.static(path.join(__dirname, '../templates/js')));


app.get('/', (req, res) => {
    res.render('login', {error:null});  
});


app.get('/dashboard', (req, res) => {
    res.render('dashboard');  
});

app.get('/dryer-status', async (req, res) => {
  try {
    const dryers = await Machine.findAll({ where: { type: 'dryer' } });
    res.render('dryer-status', { dryers });
  } catch (error) {
    console.error('Error fetching dryer status:', error);
    res.status(500).send('Error fetching dryer status');
  }
});

app.get('/laundry-status', async (req, res) => {
  try {
    const laundries = await Machine.findAll({ where: { type: 'laundry' } });
    res.render('laundry-status', { laundries });
  } catch (error) {
    console.error('Error fetching laundry status:', error);
    res.status(500).send('Error fetching laundry status');
  }
});


app.get('/verification', (req, res) => {
    res.render('verification'); 
});

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'hand.carved1964@gmail.com', 
    pass: 'olznnokhcxqjgeli', 
  },
});

app.get('/verification', (req, res) => {
    res.sendFile(path.join(__dirname, '../templates/html/verification.ejs'));
});

//verifikacizacia
app.post('/send-verification-code', async (req, res) => {
    const { email } = req.body;
    console.log(`Received email: ${email}`);

    if (!email) {
        return res.status(400).send('Email is required');
    }

    if (!email.endsWith('@kiu.edu.ge')) {
      return res.render('login', { error: 'Invalid email domain. Please use your university email.' });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

   const user = await User.upsert({
      email,
      verification_code: verificationCode,
      is_verified: true,
  });

  if(user){
    return res.render('login', { error: 'Your email is already verified.' });
  }

    try {
           await User.upsert({
            email,
            verification_code: verificationCode,
            is_verified: false,
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Your Verification Code',
            text: `Your verification code is: ${verificationCode}`,
        };


        await transporter.sendMail(mailOptions);
        res.redirect('/verification');
    } catch (error) {
        console.error('Error sending verification code:', error);
        res.status(500).send('Error sending verification code. Please try again later.');
    }
});



// Route to verify code
app.post('/verify-code', async (req, res) => {
  const { email, code } = req.body;

  if (!email || !code) {
    return res.status(400).send('Email and code are required');
  }

  try {
    const user = await User.findOne({
      where: {
        email,
        verification_code: code,
        is_verified: false,
      },
    });

    if (!user) {
      return res.status(400).send('Invalid or expired verification code');
    }
    user.is_verified = true;
    user.verification_code = null;
  if(user.is_verified == true){
    await user.save();
  }
    res.status(200).send('Email verified successfully');
  } catch (error) {
    res.status(500).send('Error verifying code');
  }
});

app.post('/login', async (req, res) => {
  const { emailBack } = req.body;

  if (!emailBack || !emailBack.endsWith('@kiu.edu.ge')) {
      return res.render('login', { error: 'Invalid email domain. Please use your university email.' });
  }

  try {
      const user = await User.findOne({
          where: {
              email: emailBack,
              is_verified: 1,
          },
      });

      if (user) {
          return res.redirect(`/dashboard?email=${encodeURIComponent(emailBack)}`);
      } else {
          return res.render('login', { error: 'Email not found or verified. Please sign up first.' });
      }
  } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ error: 'Internal server error.' });
  }
});

app.post('/update-machine-status', async (req, res) => {
  const { id, status, email } = req.body;

  try {
    const machine = await Machine.findByPk(id);
    if (!machine) {
      return res.status(404).send('Machine not found');
    }

    if (status === 'busy') {
      await machine.update({ status, email });
      return res.sendStatus(200);
    } else if (status === 'available') {
      if (machine.email === email) {
        await machine.update({ status: 'available', email: null });
        return res.sendStatus(200);
      } else {
        return res.status(403).send('Email does not match.');
      }
    }
  } catch (error) {
    console.error('Error updating machine status:', error);
    res.status(500).send('Error updating machine status');
  }
});

app.post('/go-back', (req, res) => {
  const email = req.body.email;
  if (email) {
      return res.redirect(`/dashboard?email=${encodeURIComponent(email)}`);
  } else {
      return res.redirect('/dashboard');
  }
});



// dashvebani misni
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
