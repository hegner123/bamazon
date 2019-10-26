var mysql = require('mysql');
var inquirer = require('inquirer');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bamazon"
});

console.clear();
inquirer
  .prompt([
    {
    name: 'menu',
    message: 'Welcome To bamazon, would you like to shop?',
    type: 'list',
    choices: ['yes','no']
  }
])
  .then(answers => {
    if (answers.menu === 'yes'){
      testConnect();
    } else {
      console.log('goodbye');
    }
  });

  function testConnect(){
    con.connect(function(err) {
      if (err) throw err;
      con.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        console.clear();
        console.log(result[0].product_name);
        buy();
      });
    });
  };

  function buy(){
    inquirer
    .prompt([{
      name: 'buy',
      message: 'What Item do you want to buy?',
      type: 'number'
    }]).then(answers =>{
      dbSearch(answers.buy);
    });
  };

  function dbSearch(parm){
    con.query("SELECT * FROM products WHERE item_id=" + parm, function (err, result, fields) {
      if (err) throw err;
      console.log('----------------------------------------------');
      console.log(result[0].product_name  + ' | ' + result[0].department_name +  " | $" + result[0].price + ' | ' + result[0].stock_quantity);
      console.log('----------------------------------------------');
      con.end();
    });
  };