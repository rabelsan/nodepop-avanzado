/* eslint-disable no-undef */
'use strict';

// eslint-disable-next-line no-undef
const cote = require('cote');

module.exports = function(path, folder, photo) {
    const thumbClient = new cote.Requester({ name: 'Thumbnail Client' });
    thumbClient.send({ 
        type: 'generate thumbnail', 
        publicPath: path, 
        imgFolder: folder, 
        img: photo }, result => {
        console.log(result);
      });
};