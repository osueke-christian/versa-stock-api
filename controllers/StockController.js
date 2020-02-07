
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
    },

    async update(req, res){
        try{
            let stock = req.body;
            stock['id'] = req.params.stockId;
            result = await Stock.update('stocks', stock.id,
                ['product', 'quantity', 'price', 'updated_at'],
                [stock.product, stock.quantity, stock.price, new Date()]
            )
            return res.send({status:'success', data:stock})
        }catch(e){
            console.log(e)
            return res.send({status:'failed', message: e.message});
        }
    },

    async delete(req, res){
        try{
            stock = req.body;
            stock['id'] = req.params.stockId;
            result = await Stock.delete('stocks', stock.id)
            
            return res.send({status:'success', data:result})
        }catch(e){
            console.log(e)
            return res.send({status:'failed', message: e.message});
        }
    },

    async list(req, res){
        try{
            stock = req.body;
            result = await Stock.selectAll('stocks')
            
            return res.send({status:'success', data: result})
        }catch(e){
            console.log(e)
            return res.send({status:'failed', message: e.message});
        }
    }
}