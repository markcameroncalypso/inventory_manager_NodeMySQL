const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("./connect.js");


connection.connect(function(err) {
    if (err) throw err;
    start();
  });
  
function start() {
inquirer
    .prompt({
    name: "manager",
    type: "rawlist",
    message: "Please choose an option:",
    choices: [ "View Products for Sale","View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
    })
    .then(function(answer) {
        if (answer.manager == "View Products for Sale") {
            readInventory();
        }
        if (answer.manager == "View Low Inventory") {
            lowInventory();
        }
        if (answer.manager == "Add to Inventory") {
            addInventory();
        }
        if (answer.manager == "Add New Product") {
            addProduct();
        }
        if (answer.manager == "Exit") {
            connection.end();
        }
    });
}

function readInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price  + " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------"); 
    });
    start()
}

const lowInventory = () => {
    connection.query("SELECT * FROM products where stock_quantity < 5", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | $" + res[i].price  + " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------"); 
    });
};


const addInventory = () => {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        
        inquirer
          .prompt([
              {
              name: "choice",
              type: "rawlist",
              choices: function() {
                  var choiceArray = [];
                  for (var i = 0; i < results.length; i++) {
                  choiceArray.push(results[i].product_name);
                  }
                  return choiceArray;
              },
              message: "Enter Item_ID to add more to the inventory?"
              },
              {
              name: "qty",
              type: "input",
              message: "How many to add?",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
              }
          ])
          .then(function(answer) {          
  
              var chosenItem;
              for (var i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.choice) {
                  chosenItem = results[i];
                }
              }

              let newQty = 0;
              if (answer.qty > 0){
                    newQty = parseInt(chosenItem.stock_quantity) 
                    newQty += parseInt(answer.qty);
                    console.log("\n--------------------------")
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {stock_quantity: newQty},
                            { item_id: chosenItem.item_id}
                        ],
                        function(error) {
                        if (error) throw err;
                            console.log("\n--------------------------\nInventory update was successfully!");
                            //start();
                            readInventory();
                        }
                    );
              }
              else{
                  console.log("\nInventory must be a positive whole number!");
                  console.log("-----------------------------------");
                  readInventory();
              }
          });
      });
    }
 
const addProduct = () => {
    inquirer
    .prompt([
        {
            name: "prod",
            type: "input",
            message: "Product name = "
        },
        {
            name: "department",
            type: "input",
            message: "Department = "
        },
        {
            name: "price",
            type: "input",
            message: "Unit wholesale price = ",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        },
        {
            name: "units",
            type: "input",
            message: "Number of units to add = ",
            validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
        },
    ])
    .then(function(answer) {
        var dbSql = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ?";
        var inputArr = [
            [answer.prod, answer.department, answer.price, answer.unit]
        ]
        connection.query(dbSql,[inputArr], function(err, res) {
            if (err) throw err;
            });
            start()
        });
  };