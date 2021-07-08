const express = require('express');
const router = express.Router();

const speakersRoute = require('./speakers');
const feedbackROute = require('./feedback');

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (req, res, next) => {
    // res.sendFile(path.join(__dirname, './static/index.html'));

    // testing cookie-seiion
    // if (!req.session.visitcount) {
    //   req.session.visitcount = 0;
    // }
    // req.session.visitcount += 1;
    // console.log(`Number of visits ${req.session.visitcount}`);

    // res.render('pages/index', { pageTitle: 'Welcome' });
    try {
      const artwork = await speakersService.getAllArtwork();
      const topSpeakers = await speakersService.getList();
      console.log(topSpeakers);
      return res.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        topSpeakers,
        artwork,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedback', feedbackROute(params));
  return router;
};
