import dotenv from "dotenv";
dotenv.config();

export const configCORS = (app) => {
  app.use(function (req, res, next) {

    var allowedDomains = [process.env.URL_WEB, 'http://localhost:8083'];
    var origin = req.headers.origin;
    if (allowedDomains.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
  })
};


