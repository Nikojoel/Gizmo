'use strict';
const path = require('app-root-path');

const getPortal = async (req, res) =>{
    if(req.user.user_role !== 1) {
       return res.send('Not authorized');
    }
    res.sendFile(path + '/admin/index.html');
}
module.exports = {
    getPortal,
};