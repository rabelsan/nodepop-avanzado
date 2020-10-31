/* eslint-disable no-undef */
'use strict';

require('dotenv').config();

const readline = require('readline');
const conn = require('./lib/connectMongoose');
const Advertisement = require('./models/Advertisement');
const User = require('./models/User');
const i18n = require('./lib/i18nConfigure');


conn.once('open', async () => {
  try {

    const respuesta = await askUser(i18n.__('Are you sure you want to initialize the Data Base with test data?  (yes/no)'));

    if (respuesta.toLowerCase() !== i18n.__('yes')) {
      console.log('Process aborted!');
      return process.exit(0);
    }

    await initAdvertisements();
    await initUsers();

    // close connection
    conn.close();

  } catch (err) {
    console.log('There was an error:', err);
    process.exit(1);
  }

});

async function initAdvertisements() {
  // delete all documents in collection
  console.log('Deleting all documents...');
  await Advertisement.deleteMany();

  // loading test documents
  console.log('Loading advertisements...');
  const result = await Advertisement.insertMany([
    { name: 'Trek Madone SLR7', 
      sale: true, 
      price: 5000, 
      photo: 'images/bike-trek-madone-SLR7.jpg',
      tags: ['bicicleta','bicycle','Trek','Madone']
    },
    { name: 'Guantes Bluegrass Manatee', 
      sale: false, 
      price: 12, 
      photo: 'images/guantes-bluegrass-manatee.jpg',
      tags: ['guantes','globes','bicicleta','bicycle')]
    },
    { name: 'Casco Dexter Proton Negan', 
      sale: true, 
      price: 60, 
      photo: 'images/casco-Dexter-Proton-Negan.jpg',
      tags: ['casco','helmet'),'integral','moto','motorbyke']
    },
    { name: 'Armario dos puertas correderas', 
      sale: true, 
      price: 75, 
      photo: 'images/armario-2-puertas-correderas.jpeg',
      tags: ['armario','wardrobe'),'dos puertas','two gates'),'corredera','sliding']
    }
  ]);
  console.log(`${result.length} advertisements have been created.`);
}

async function initUsers() {
   // delete all documents in collection
   console.log('Deleting all documents...');
   await User.deleteMany();
 
   // loading test documents
   // cargar los documentos iniciales
   console.log('Loading users...');
   const result = await Usuario.insertMany([
    { email: 'user@example.com', password: await User.hashPassword('1234') },
    { email: 'rabelsan@gmail.com', password: await User.hashPassword('1234') },
   ]);
   console.log(`${result.length} users have been created.`);
}

function askUser(textoPregunta) {
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(textoPregunta, answer => {
      rl.close();
      resolve(answer);
    });
  });
}