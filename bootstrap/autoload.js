
const fs = require('fs'); // For filesystem handling

/**
 * Autoloading controllers
 */
const controllers = new Promise((resolve, reject)=>{
    fs.readdir('./controllers', (error, files)=>{
        if(error) console.log(error); // reject(new Error(error))
        else {
            let allControllers = {};
            files.forEach(file=>{
                fileNameWithoutExt = file.split('.js')[0];
                allControllers[fileNameWithoutExt] = require(`../controllers/${fileNameWithoutExt}`)
            })
            resolve(allControllers);
        }
    })
})

module.exports.controllers = controllers;