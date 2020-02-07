
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where all API routes for the application are registered.
|
*/

const express   = require('express'); // Framework for building the API
const router    = express.Router();
const {controllers} = require('../bootstrap/autoload');

module.exports = function(){
    controllers.then(ctrl=>{
        router.post( '/stock/create', ctrl.StockController.add );
        router.patch( '/stock/:stockId', ctrl.StockController.update);
    }).catch(error=>{
        console.log(error.message);
    })

    return router;
}