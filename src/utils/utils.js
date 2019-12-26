// require('dotenv').config();

// dotenv.config();
// const adress = process.env.API_ADRESS
// console.log('FROM UTILS FOLDER ' + adress)
let Utils = {
    API_ADRESS: 'http://localhost:1337', // use this to alter dev and prod mode

    // API_ADRESS: 'https://me-api.christianfjsramverk.me', // prod.mode

    htmlEntities(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
      }
}

export default Utils;
