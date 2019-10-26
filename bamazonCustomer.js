var mysql = require('mysql');
var inquirer = require('inquirer');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "bamazon"
});

  inquirer
    .prompt([
      {
      name: 'menu',
      message: 'Welcome To bamazon',
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
          console.log(result);
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
          console.log(result);
          con.end();
        });
    };