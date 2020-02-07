
const Stock = require('../models/Base');
module.exports = {
    table: 'stock',

    async add(req, res){
        try{
            let stock = req.body;
            let datetime = new Date();
            result = await Stock.create('stocks',
                ['product', 'quantity', 'price', 'created_at', 'updated_at'],
                [stock.product, stock.quantity, stock.price, datetime, datetime ]
            )
            
            return res.send({status:'success', data:result})
        }catch(e){
            console.log(e)
            return res.send({status:'failed', message: e.message});
        }
    }
}