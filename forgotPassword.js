const {ipcMain} = require('electron')
const sqlite3 = require('sqlite3').verbose();
let db=null;

  ipcMain.on('getPassword', (event, args) => {
    console.log("get password clicked: ", args);    
    
    event.reply('asynchronous-reply', forgotPassword(args));
  })

    // Connect database 
    function connectDB(){
      db = new sqlite3.Database('database/Jewellers.sqlite', (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Connected to the Jewellers.sqlite database.');
      });     
    
    }
  
    // close the database connection
    function closeDb(){
      db.close((err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Close the database connection.');
      });
    }
    function forgotPassword(arg){
      // console.log(arg['username']);
      // console.log(arg['password']);
      
      connectDB();
  let sql = 'SELECT Password FROM Employee where User_ID=? and Security_code=?';
  
  db.get(sql, [arg['username'],arg['securityCode']], (err, row) => {
    if (err) {
      throw err;
      
    }
    
    console.log(row.Password);
    return row
    ? row.Password
    : "Username and Security Code is not correct";
   
    
    
  });

  closeDb();
  
    }
    