const {ipcMain} = require('electron');
let con=null;

const db = require('../database/databaseConnect.js');



  ipcMain.on('validateLogin', (event, arg) => {
    // console.log("get password clicked: ", arg);    
   con=db.connectDatabase();
  //  loginUser(arg);
  // let arguments = {'Product_Name': "Gents Ring", 'Product_Code': "GR-70",'Type': "W"};
  // productAdd(arguments);
  // let arguments = {'Type': "R"};
  // productGet(arguments)

  // let arguments = {'Type': "PW"};
  // purchaseIdGet(arguments);

  // let arguments = {'Customer_Id': "CUS-101", 'Customer_Name': "Ashish",'GSTIN': "GST6561655",'Firm_Name': "XYZ", 'Email': "ashish@gmail.com",'Contact_no': 1234567890,'Alter_no': 7894561230, 'P_Address': "Meerut",'T_Address': "Meerut",'Cash_A': 0, 'Cash_R': 0,'Metal_A': 0,'Metal_R': 0};
  // customerAdd(arguments); 

  customerIdGet();

//   let arguments = {
//     "Customer":{
//       "Customer_Id":"CUS-101",
//       "Cash_Advance":0,
//       "Cash_Remain":0,
//       "Metal_Advance":2,
//       "Metal_Remain":0},
//     "payment":{
//       "Payment_no":"PR@16092020@1002",
//       "Customer_Id":"CUS-101",
//       "Total_Amt":60000,
//       "Cash_Paid": 30000,
//       "Metal_paid":8,
//       "Cash_Remain": 0,
//       "Metal_Remain":0,
//       "Metal_Rate":5000,
//       "Comment":"",
//       "Type":"PR"},
//     "purchase" : [{
//       "Purchase_no": "PR@16092020@1002",
//       "Product_Code": "LR-1001",
//       "Product_Name": "Ladies Ring",
//       "Gross_Weight": 15,
//       "Net_Weight": 10,
//       "Diamond": "1.5@3000",
//       "Diamond_Prize": 4500,
//       "Tunch": 100,
//       "Fine_Gold": 10,
//       "Extra_Amt": 0,
//       "Rate": 5000,
//       "Final_Amt": 60000,
//       "Diamond_Sale": "1.5@4000",
//       "Tunch_Sale": 100,
//       "Labour_Sale": 10,
//       "Comment": "",
//       "Sold_Status": false,
//       "Active_Satus": true


//     }, {
//       "Purchase_no": "PR@16092020@1002",
//       "Product_Code": "GR-1002",
//       "Product_Name": "Gents Ring",
//       "Gross_Weight": 15,
//       "Net_Weight": 10,
//       "Diamond": "1.5@3000",
//       "Diamond_Prize": 4500,
//       "Tunch": 100,
//       "Fine_Gold": 10,
//       "Extra_Amt": 0,
//       "Rate": 5000,
//       "Final_Amt": 60000,
//       "Diamond_Sale": "1.5@4000",
//       "Tunch_Sale": 100,
//       "Labour_Sale": 10,
//       "Comment": "",
//       "Sold_Status": false,
//       "Active_Satus": true
//     }]

// };
  // purchaseRetail(arguments);

  let arguments = {
    "Customer":{
      "Customer_Id":"CUS-102",
      "Cash_Advance":0,
      "Cash_Remain":0,
      "Metal_Advance":0,
      "Metal_Remain":20},
    "payment":{
      "Payment_no":"PW@16092020@1003",
      "Customer_Id":"CUS-102",
      "Total_Amt":60000,
      "Cash_Paid": 60000,
      "Metal_paid":0,
      "Cash_Remain": 0,
      "Metal_Remain":0,
      "Metal_Rate":5000,
      "Comment":"",
      "Type":"PW"},
    "purchase" : [{
      "Purchase_no": "PW@16092020@1003",
      "Product_Code": "LR-70",
      "Product_Name": "Ladies Ring",
      "Gross_Weight": 300,
      "Net_Weight": 300,
      "Diamond": "30@3000",
      "Diamond_Prize": 60000,
      "Tunch": 70,
      "Wastage": 4,
      "Fine_Gold": 222,      
      "Rate": 5000,
      "Final_Amt": 60000,
      "Comment": "",
      "Active_Satus": true
    }, {
      "Purchase_no": "PW@16092020@1003",
      "Product_Code": "GR-65",
      "Product_Name": "Gents Ring",
      "Gross_Weight": 100,
      "Net_Weight": 100,
      "Diamond": "30@3000",
      "Diamond_Prize": 60000,
      "Tunch": 65,
      "Wastage": 5,
      "Fine_Gold": 70,      
      "Rate": 5000,
      "Final_Amt": 60000,
      "Comment": "",
      "Active_Satus": true
    }]

};

// purchaseWholesale(arguments);


// let arguments = {'Code': "LR-1001"};
// RetailDataGet(arguments);

// let arguments = {'Name': "KJ", 'Owner_Name': "Lokesh",'GSTIN': "GST6561655",'Address': "Meerut",'Contact_no': 1234567890,'Alter_no': 7894561230, 'Email': "ashish@gmail.com",'WebSite': "",'Capital_Cash': 500000, 'Capital_Metal': 500,'Cr_Cash': 0,'Cr_Metal': 0,'Advance_Cash': 0,'Advance_Metal': 0};
// organization(arguments); 

  let loginDetails = {validLogin: true, loginDetails: {name: "Ankit Tyagi", userID: "ankit52"}}
    event.reply('asynchronous-reply', loginDetails);
  })

  function loginUser(arg){
    console.log(arg['username']);
    console.log(arg['password']);
    
   
let sql = 'SELECT * FROM Employee where User_ID=? and Password=?';

con.all(sql, [arg['username'],arg['password']], (err, rows) => {
  if (err) {
    throw err;
    
  }
  console.log(rows.length);
  if(rows.length==1)
    return 1;
  else
    return 0;  
  
  
});
db.closeDatabase(con);
}

  //Create New Product
  function productAdd(arg){
    
    let sql = 'INSERT INTO Product VALUES (?,?,?)' ;
    con.run(sql, [arg['Product_Name'],arg['Product_Code'],arg['Type']], function(err) {
      if (err) {
        // return console.error(err.message);
        throw err;
      }
      console.log(`Rows inserted ${this.changes}`);
    });


    db.closeDatabase(con);
  }

    //Get Product
    function productGet(arg){
    
      let sql = 'Select * from  Product where Type=?' ;
      con.all(sql, [arg['Type']], function(err,rows) {
        if (err) {
          // return console.error(err.message);
          throw err;
        }
        rows.forEach((row) => {
          console.log(row.Product_Name);
          console.log(row.Product_Code);
          console.log("###");
        });
      });
      db.closeDatabase(con);
    }

    //Create New Customer
  function customerAdd(arg){
    
    let sql = 'INSERT INTO Customer VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)' ;
    con.run(sql, [arg['Customer_Id'],arg['Customer_Name'],arg['GSTIN'],arg['Firm_Name'],arg['Email'],arg['Contact_no'],arg['Alter_no'],arg['P_Address'],arg['T_Address'],arg['Cash_A'],arg['Cash_R'],arg['Metal_A'],arg['Metal_R']], function(err) {
      if (err) {
        // return console.error(err.message);
        throw err;
      }
      console.log(`Rows inserted ${this.changes}`);
    });
    db.closeDatabase(con);
  }

  //Get Customer
  function customerGet(){
    
    let sql = 'Select * from  Customer' ;
    con.all(sql, [], function(err,rows) {
      if (err) {
        // return console.error(err.message);
        throw err;
      }
      rows.forEach((row) => {
        console.log(row.Customer_Name);
        console.log(row.Customer_ID);
        console.log(row.GSTIN);
        console.log("###");
      });
    });
    db.closeDatabase(con);
  }

  

  //Get CustomerId New
  function customerIdGet(){
    
    let sql = 'Select * from  Customer' ;
    con.all(sql, [], function(err,rows) {
      if (err) {
        // return console.error(err.message);
        throw err;
      }
      console.log(rows.length);
      // return " CUS- (101 + rows.length)  "  is the new CustomerId
    });
    db.closeDatabase(con);
  }

  //Purchase Retail
  function purchaseRetail(arg){
// console.log("enter");
// console.log(arg["Customer"]["Customer_Id"]); 
// console.log(arg["payment"]["Payment_no"]);

    let sql = 'INSERT INTO Purchase_Retail VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,datetime("now"),datetime("now"))' ;
  let count=0;
arg["purchase"].forEach((row) => {
  con.run(sql, [row.Purchase_no,row.Product_Code,row.Product_Name,row.Gross_Weight,row.Net_Weight,row.Diamond,row.Diamond_Prize,row.Tunch,row.Fine_Gold,row.Extra_Amt,row.Rate,row.Final_Amt,row.Diamond_Sale,row.Tunch_Sale,row.Labour_Sale,row.Comment,row.Sold_Status,row.Active_Satus], function(err) {
    if (err) {
      // return console.error(err.message);
      throw err;
      return err;
    }
    count++;
    // console.log(`Rows inserted ${this.changes}`);
  });
  
});
console.log(`Rows inserted purchase `+count);
let sql_payment = 'INSERT INTO Payment VALUES (?,?,?,?,?,?,?,?,?,?)' ;
    con.run(sql_payment, [arg["payment"]["Payment_no"],
                          arg["payment"]["Customer_Id"],
                          arg["payment"]["Total_Amt"],
                          arg["payment"]["Cash_Paid"],
                          arg["payment"]["Metal_paid"],
                          arg["payment"]["Cash_Remain"],
                          arg["payment"]["Metal_Remain"],
                          arg["payment"]["Metal_Rate"],
                          arg["payment"]["Comment"],
                          arg["payment"]["Type"]], function(err) {
      if (err) {
        // return console.error(err.message);
        return err;
      }
      console.log(`Rows inserted ${this.changes}`);
    });

   
    if(arg["Customer"]){
      // console.log(arg["Customer"]["Cash_Advance"]);
      // console.log(arg["Customer"]["Metal_Advance"]);
      // console.log(arg["Customer"]["Cash_Remain"]);
      // console.log(arg["Customer"]["Metal_Remain"]);
      // console.log(arg["Customer"]["Customer_Id"]);
      let sql_update = 'UPDATE Customer SET Cash_Advance=?,Metal_Advance=?,Cash_Remain=?,Metal_Remain=? where Customer_ID=?' ;
      con.run(sql_update, [arg["Customer"]["Cash_Advance"],
                            arg["Customer"]["Metal_Advance"],
                            arg["Customer"]["Cash_Remain"],
                            arg["Customer"]["Metal_Remain"],
                            arg["Customer"]["Customer_Id"]], function(err) {
      if (err) {
      // return console.error(err.message);
      return err;
      }
      console.log(`Rows Update ${this.changes}`);
});
    }
    else
      console.log("yes");


  }

    //Purchase WholeSale
    function purchaseWholesale(arg){
      // console.log("enter");
      // console.log(arg["Customer"]["Customer_Id"]); 
      // console.log(arg["payment"]["Payment_no"]);
      
          let sql = 'INSERT INTO Purchase_WholeSale VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,datetime("now"),datetime("now"))' ;
        let count=0;
      arg["purchase"].forEach((row) => {
        con.run(sql, [row.Purchase_no,row.Product_Code,row.Product_Name,row.Gross_Weight,row.Net_Weight,row.Diamond,row.Diamond_Prize,row.Tunch,row.Wastage,row.Fine_Gold,row.Rate,row.Final_Amt,row.Comment,row.Active_Satus], function(err) {
          if (err) {
            // return console.error(err.message);
            throw err;
            return err;
          }
          let sql_W_Status = 'Select Stock,Fine_Metal,Diamond_Remain from  WholeSale_Status where Product_ID=?' ;
      con.all(sql_W_Status, [row.Product_Code], function(err,rows) {
        if (err) {
          // return console.error(err.message);
          throw err;
        }
        if(rows.length==1){
          let Diamond_Remain=0;
          if(row.Diamond!=""){
            let quntity = row.Diamond.split("@");
            Diamond_Remain=parseInt(quntity[0]);
          }
          // console.log(rows[0].Stock);
          // console.log(parseInt(rows[0].Stock)+parseInt(row.Net_Weight));
          // console.log(parseInt(rows[0].Fine_Metal)+parseInt(row.Fine_Gold));
          // console.log(parseInt(rows[0].Diamond_Remain)+Diamond_Remain);
          let sql_W_update = 'UPDATE WholeSale_Status SET Stock=?,Fine_Metal=?,Diamond_Remain=? where Product_ID=?' ;
          con.run(sql_W_update, [parseInt(rows[0].Stock)+parseInt(row.Net_Weight),
                                parseInt(rows[0].Fine_Metal)+parseInt(row.Fine_Gold),
                                parseInt(rows[0].Diamond_Remain)+Diamond_Remain,
                                row.Product_Code], function(err) {
          if (err) {
          return console.error(err.message);
          return err;
          }
          // console.log(`Rows Update ${this.changes}`);
    });

        }      
      else{
        let Diamond_Remain=0;
        if(row.Diamond!=""){
          let quntity = row.Diamond.split("@");
          Diamond_Remain=parseInt(quntity[0]);
        }
        let sql_W_Insert = 'INSERT INTO WholeSale_Status VALUES (?,?,?,?,?)' ;
        con.run(sql_W_Insert  ,[row.Product_Code,row.Product_Name,row.Net_Weight,row.Fine_Gold,Diamond_Remain], function(err) {
          if (err) {
            // return console.error(err.message);
            throw err;
          }
          // console.log(`Rows inserted ${this.changes}`);
        });

      }
        return 0;
      });
          count++;
          // console.log(`Rows inserted ${this.changes}`);
        });
        
      });
      console.log(`Rows inserted purchase `+count);
      let sql_payment = 'INSERT INTO Payment VALUES (?,?,?,?,?,?,?,?,?,?)' ;
          con.run(sql_payment, [arg["payment"]["Payment_no"],
                                arg["payment"]["Customer_Id"],
                                arg["payment"]["Total_Amt"],
                                arg["payment"]["Cash_Paid"],
                                arg["payment"]["Metal_paid"],
                                arg["payment"]["Cash_Remain"],
                                arg["payment"]["Metal_Remain"],
                                arg["payment"]["Metal_Rate"],
                                arg["payment"]["Comment"],
                                arg["payment"]["Type"]], function(err) {
            if (err) {
              // return console.error(err.message);
              return err;
            }
            console.log(`Rows inserted ${this.changes}`);
          });
      
         
          if(arg["Customer"]){
            // console.log(arg["Customer"]["Cash_Advance"]);
            // console.log(arg["Customer"]["Metal_Advance"]);
            // console.log(arg["Customer"]["Cash_Remain"]);
            // console.log(arg["Customer"]["Metal_Remain"]);
            // console.log(arg["Customer"]["Customer_Id"]);
            let sql_update = 'UPDATE Customer SET Cash_Advance=?,Metal_Advance=?,Cash_Remain=?,Metal_Remain=? where Customer_ID=?' ;
            con.run(sql_update, [arg["Customer"]["Cash_Advance"],
                                  arg["Customer"]["Metal_Advance"],
                                  arg["Customer"]["Cash_Remain"],
                                  arg["Customer"]["Metal_Remain"],
                                  arg["Customer"]["Customer_Id"]], function(err) {
            if (err) {
            // return console.error(err.message);
            return err;
            }
            console.log(`Rows Update ${this.changes}`);
      });
          }
          else
            console.log("yes");
      
      
        }

        //Get Purchase_id and Sale_Id for Create New Id
    function purchaseIdGet(arg){
    
      let sql = 'Select * from  Payment where Type=?' ;
      con.all(sql, [arg['Type']], function(err,rows) {
        if (err) {
          console.error(err.message);
          throw err;
        }
        console.log(rows.length);
        // return " arg['Type'] + Currnet Date + (1001 + rows.length)  "  is the new Purchase Id
        
      });
      db.closeDatabase(con);
    }

          //Get Sale Retail Item by Code
          function RetailDataGet(arg){
    
            let sql = 'Select * from  Purchase_Retail where Product_Code=?' ;
            con.all(sql, [arg['Code']], function(err,rows) {
              if (err) {
                console.error(err.message);
                throw err;
              }
              // console.log(rows[0].Product_Name);
              let Data={"Product_Name":rows[0].Product_Name,
                        "Product_Code":rows[0].Product_Code,
                        "Gross_Weight":rows[0].Gross_Weight,
                        "Net_Weight":rows[0].Net_Weight,
                        "Diamond":rows[0].Diamond,
                        "Diamond_Prize":rows[0].Diamond_Prize,
                        "Tunch":rows[0].Tunch,
                        "Fine_gold":rows[0].Fine_gold,
                        "Extra_Amount":rows[0].Extra_Amount,
                        "Diamond_Sale":rows[0].Diamond_Sale,
                        "Tunch_Sale":rows[0].Tunch_Sale,
                        "Labour_Sale":rows[0].Labour_Sale}

                        console.log(Data);
                        
              // return " arg['Type'] + Currnet Date + (1001 + rows.length)  "  is the new Purchase Id
              
            });
            db.closeDatabase(con);
          }

             //Create Organization
  function organization(arg){
    
    let sql = 'INSERT INTO Organization VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)' ;
    con.run(sql, [arg['Name'],arg['Owner_Name'],arg['GSTIN'],arg['Address'],arg['Contact_no'],arg['Alter_no'],arg['Email'],arg['WebSite'],arg['Capital_Cash'],arg['Capital_Metal'],arg['Cr_Cash'],arg['Cr_Metal'],arg['Advance_Cash'],arg['Advance_Metal']], function(err) {
      if (err) {
        // return console.error(err.message);
        throw err;
      }
      console.log(`Rows inserted ${this.changes}`);
    });
    db.closeDatabase(con);
  }