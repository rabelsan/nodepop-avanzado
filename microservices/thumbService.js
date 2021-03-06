/* eslint-disable no-undef */
'use strict';

// thumbnail image generator service

// eslint-disable-next-line no-undef
const cote = require('cote');
const jimp = require('jimp');

// microservice declaration
const thumbResponder = new cote.Responder({name: 'Thumbnail Service'});

// microservice logic
thumbResponder.on('generate thumbnail', (req, done) => {
    thumbnail(req.publicPath, req.imgFolder, req.img);
    done('Thumbnail file created: '+req.publicPath+req.imgFolder+'thumb_'+req.img);
});

// Service funtion to generate a thumnail image (format 100x100)
// and, if not error returned, create a new file in the same folder
// adding the prefix "thumb_"
async function thumbnail(path, folder, photo) {
    try{
        //read the image
        const image = await jimp.read(path+folder+photo);
        //resize the image 100x100
        await image.scaleToFit(100, 100);
        //save the thumbnail
        await image.writeAsync(path+folder+'thumb_'+photo);
    } catch (err) {
    console.log('jimp error: ', err.message);
    }
}