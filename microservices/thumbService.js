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
    let result = thumbnail(req.publicPath, req.imgFolder, req.img);
    done('thumbnail: ',result);
});

// Service funtion to generate a thumnail image (format 100x100)
// and, if not error returned, create a new file in the same folder
// adding the 
async function thumbnail(path, folder, photo) {
    try{
        //read the image
        const image = await jimp.read(path+folder+photo);
        //resize the image 100x100
        await image.resize(100, 100);
        //save the thumbnail
        await image.writeAsync(path+folder+'thumb_'+photo);
        return path+folder+'thumb'+photo;
    } catch (err) {
    console.log('jimp error: ', err.message);
    }
}