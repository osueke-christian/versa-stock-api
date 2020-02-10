require('dotenv').config()
const { Pool, Client } = require('pg')// For postgres DB manipulations
const isProduction = process.env.NODE_ENV === 'production'
const connectionString = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`;
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    ssl: isProduction
});

pool.query('SELECT NOW() as now')
    .then(res => {
        console.log('Connection successful!', res.rows[0].now);
    })
    .catch(e => console.error(e.stack));
    
class Database {
    constructor(){
        // DB table name must correspond with file name of Models extending this class 
        this.table = __filename.slice(__dirname.length + 1, -3);
        this.fillables = []; // Mass assignment will be allowed on columns specified here
        this.hidden = []; // Columns specified here will be hidden during data retrieval
    }

    /**
     * To be used in models for custom queries
     */
    query = async (query, values=[])=>{
        try{
            console.log(query, values)
            let q = await pool.query(query, values);
            return q.rows;
            pool.end();
        }catch(e){
            throw new Error(e.message);
            pool.end();
        }
        
    }

    /**
     * To be used in models for db insertion calls
     */
    create = async (table, fillables, values)=>{
        try{
            // Confirm fillables and values is array and length of both are equal
            let col = [];
            for(let i=1; i<=values.length; i++){ col.push(`$${i}`);}
            const queryText = `INSERT INTO ${table}(${fillables.join(', ')}) VALUES(${col.join(', ')}) returning *`;
            result = await this.query(queryText, values);
            return result;
        }catch(e){
            throw new Error(e);
        }
    }

    /**
     * To be used by models for db update calls
     */
    update = async (table, id, filter, values)=>{
        // Check if id is array, if NO, make it array else leave it like that
        id = typeof id == 'array' ? id.split('') : id;
        try{
            // Confirm fillables and values is array and length of both are equal
            values.push(id);
            let col = [];
            for(let i=1; i<=filter.length; i++){ col.push(`${filter[i-1]} = $${i}`);}
            const queryText = `UPDATE ${table} SET ${col.join(', ')} WHERE id = $${values.length} returning *`;
            result = await this.query(queryText, values);
            return result;
        }catch(e){
            throw new Error(e);
        }
    }

    /**
     * To be used in models for row delete calls
     */
    delete = async (table, id)=>{
        // Check if id is array, if NO, make it array else leave it like that
        id = typeof id == 'array' ? id : [id];
        try{
            const queryText = `DELETE FROM ${table} WHERE id = $1 returning *`
            result = await this.query(queryText, id);
            return result;
        }catch(e){
            throw new Error(e);
        }
    }

    /**
     * To be used by models to find records in the db
     */
    find = async (table, id, limit=false)=>{
        // Confimr limit value is always false or integer
        // Look up how to enforce data types in  javascript
        // Check if id is array, if NO, make it array else leave it like that
        id = typeof id == 'array' ? id : [id];
        try{
            // Confirm fillables and values is array and length of both are equal
            let col = [];
            const queryText = `SELECT * FROM ${table} WHERE id = $1 ${limit === false ? '' : 'LIMIT '+limit} returning *`
            result = await this.query(queryText, id);
            return result;
        }catch(e){
            throw new Error(e);
        }
    }

    /**
     * To be used by models to delimit find operations on the db
     */
    findWhere = async (table, filter, value, limit=false)=>{
        try{
            // Confirm fillables and values is array and length of both are equal
            let col = [];
            for(let i=1; i<=filter.length; i++){ 
                i > 1 ? col.push(`AND ${filter[i-1]} = $${i}`) : col.push(` ${filter[i-1]} = $${i}`);
            }
            const queryText = `SELECT * FROM ${table} WHERE ${col.join(' ')} ${limit === false ? '' : 'LIMIT '+limit} `;
            result = await this.query(queryText, value);
            return result;
        }catch(e){
            throw new Error(e);
        }
    }

    /**
     * To be used by models to delimit find operations on the db
     */
    selectAll = async (table, limit=false)=>{
        try{
            const queryText = `SELECT * FROM ${table} ORDER BY created_at DESC ${limit === false ? '' : 'LIMIT '+limit} `;
            result = await this.query(queryText);
            return result;
        }catch(e){
            throw new Error(e);
        }
    }
}
module.exports = new Database();