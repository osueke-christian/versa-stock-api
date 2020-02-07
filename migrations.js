const DB = require('./models/Base');
/**
 * Create Tables
 */
async function createStocksTable(){
    console.log('creating stocks table...')
    const queryText =
    `CREATE TABLE IF NOT EXISTS
        stocks(
          id SERIAL PRIMARY KEY,
          product VARCHAR(128) NOT NULL, 
          quantity VARCHAR(128) NOT NULL, 
          price FLOAT NOT NULL, 
          created_at TIMESTAMP, 
          updated_at TIMESTAMP
        )
    `;
    result = await DB.query(queryText)
    console.log(result);
}

createStocksTable();