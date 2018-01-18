const multer = require('multer');


// Create a folder 'uploads' where the images are created
module.exports =multer({dest: 'uploads/'});