'use strict';

module.exports = (app) => {
   app.enable('trust proxy');
   app.use((req, res, next)=>{
       if(req.secure){
           next();
       } else {
           res.redirect(301, `https://${req.headers.host}/app${req.url}`);
       }
   });
};