const {ipcMain} = require('electron');
const sqlite3 = require('sqlite3').verbose();
let db=null;

  ipcMain.on('validateLogin', (event, arg) => {
    console.log("get password clicked: ", arg);
// For Login
    // var Status=loginUser(arg);
     // console.log(Status);

// For Create User
    // let arguments = {'User_Id': "abcd", 'Password': "password",'Code': 45678,'Name': "ChiCHu",'Number': 144146464,'P_Address': "Meerut",'T_Address': "Meerut"};
    // createEmp(arguments);
//For Product Add
    let arguments = {'Product_Name': "Ladies Ring", 'Product_Code': "LR",'Type': "R"};
    productAdd(arguments);

   
      event.reply('asynchronous-reply', true);

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

  function loginUser(arg){
    // console.log(arg['username']);
    // console.log(arg['password']);
    
    connectDB();
let sql = 'SELECT * FROM Employee where User_ID=? and Password=?';

db.all(sql, [arg['username'],arg['password']], (err, rows) => {
  if (err) {
    throw err;
    
  }
  console.log(rows.length);
  if(rows.length==1)
    return 1;
  else
    return 0;  
  
  
});
// let sql1 = `SELECT * FROM Employee`;

// db.all(sql1, [], (err, rows) => {
//   if (err) {
//     throw err;
//   }
//   rows.forEach((row) => {
//     console.log(row.User_ID);
//     console.log(row.Employee_ID);
//     console.log(row.Security_Code);
//     console.log("###############");
//   });
// });
closeDb();

  }
// Create New User
  function createEmp(arg){
    connectDB();
    let sql = 'INSERT INTO Employee VALUES (?,?,?,?,?,?,?)' ;
    db.run(sql, [arg['User_Id'],arg['Password'],arg['Code'],arg['Name'],arg['Number'],arg['P_Address'],arg['T_Address']], function(err) {
      if (err) {
        // return console.error(err.message);
        throw err;
      }
      console.log(`Rows inserted ${this.changes}`);
    });
    closeDb();
  }

  //Create New Product
  function productAdd(arg){
    connectDB();
    let sql = 'INSERT INTO Product VALUES (?,?,?)' ;
    db.run(sql, [arg['Product_Name'],arg['Product_Code'],arg['Type']], function(err) {
      if (err) {
        // return console.error(err.message);
        throw err;
      }
      console.log(`Rows inserted ${this.changes}`);
    });
    closeDb();
  }


  