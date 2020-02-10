
const Stock = require('../models/Base');
module.exports = {
    table: 'stock',

    /**
     * 
     * @param {*} data
     */
    async add(req, res){
        try{
            let stock = req.body;
            let datetime = new Date();
            if(!req.body) throw new Error({'message': 'No parameter passed'});
            if(!stock.product || !stock.quantity || stock.price) throw new Error({'message': 'Payload Incomplete'});
            if(isNaN(stock.quantity) || isNaN(stock.price) || stock.quantity < 1 || stock.price < 1) throw new Error({'message': 'Price & Quantity must be a number greater than 0'});

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
            if(!req.body) throw new Error({'message': 'No parameter passed'});
            if(!stock.product || !stock.quantity || stock.price) throw new Error({'message': 'Payload Incomplete'});
            if(isNaN(stock.quantity) || isNaN(stock.price) || stock.quantity < 1 || stock.price < 1) throw new Error({'message': 'Price & Quantity must be a number greater than 0'});
            if(!stock.id) throw new Error({'message': 'No stock specified'});
            
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
            if(!stock.id) throw new Error({'message': 'No stock specified'});
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