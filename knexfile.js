require('dotenv').config();
// const localPgConnection = {
//   host: process.env.DB_HOST,
//   database
// }
module.exports = {
  development: {
    client: 'sqlite3',
    connection: { filename: './database/users.db3' },
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done);
      },
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations'
    
    },
    seeds: { directory: './database/seeds' },
  },
  testing: {
    client: 'sqlite3',
    connection: {
      filename: './database/test.db3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
    },
    seeds: {  directory: './database/seeds',
    },
  },

  // production: {                                                        
  //   client: 'pg', 
  //   // useNullAsDefault: true,                                                                                                 
  //   connection: process.env.DATABASE_URL,                               
  //   pool: {                                                            
  //     min: 2,                                                           
  //     max: 10,                                                          
  //   },                                                                  
  //   migrations: {                                                       
  //       directory: './database/migrations',                                 
  //   },                                                                  
  //   seeds: {                                                            
  //     directory: './database/seeds',                                        
  //   },                                                                  
  // },
};