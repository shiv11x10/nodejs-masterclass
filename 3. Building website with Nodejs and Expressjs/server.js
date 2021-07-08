const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

const cookieSession = require('cookie-session');

const createError = require('http-errors');

const FeedbackService = require('./services/FeedbackService');
const SpeakersService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakersService = new SpeakersService('./data/speakers.json');

const routes = require('./routes');

app.use(express.json()); // to use json req body in post
app.use(
  express.urlencoded({
    extended: true,
  })
); // This supports the urlencoded post request from html.

app.set('trust proxy', 1);

app.use(
  cookieSession({
    name: 'session',
    keys: ['Ghduehdfjn3474y7yf', 'dkvncjkvn49u489uWWv'],
  })
);

app.set('view engine', 'ejs'); // ejs is a template engine
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './static')));

app.locals.siteName = 'ROUX Meetsups'; // global variable siteName will be added to app

// always include aysnc await in tr catch to handle errors gracefully
app.use(async (req, res, next) => {
  // res.locals.someVariable = 'hello'; // variable will be addded to response

  try {
    const names = await speakersService.getNames();
    res.locals.speakerName = names;
    console.log(res.locals);
    next();
  } catch (err) {
    return next(err);
  }
});

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// })
// app.get('/', (req, res) => {
//   // res.sendFile(path.join(__dirname, './static/index.html'));
//   res.render('pages/index', { pageTitle: 'Welcome' });
// });

// app.get('/speakers', (req, res) => {
//   res.sendFile(path.join(__dirname, './static/speakers.html'));
// });

app.use(
  '/',
  routes({
    feedbackService,
    speakersService,
  })
);

// handle 404 error - http-errors
app.use((req, res, next) => {
  return next(createError(404, 'File not found'));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  const status = err.status || 500;
  res.locals.status = status;
  res.status(status);
  res.render('error');
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
