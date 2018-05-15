// const mysql = require("mysql");
const inquirer = require("inquirer");
const connection = require("./connect.js");

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "",
//   database: "bamazon"
// });


connection.connect(function(err) {
    if (err) throw err;
    readInventory();
  });
  
  function readInventory() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price);
      }
      console.log("-----------------------------------");
      customerPrompt() 
    });
  }

  function customerPrompt() {
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
            message: "What is the item_id of the product you would like to buy?"
            },
            {
            name: "qty",
            type: "input",
            message: "How many would you like to buy?"
            }
        ])
        .then(function(answer) { 
          
          console.log(answer.choice);

            var chosenItem;
            for (var i = 0; i < results.length; i++) {
              if (results[i].product_name === answer.choice) {
                //dbQty = results[i].stock_quantity;
                chosenItem = results[i];
              }
            }
            if (chosenItem.stock_quantity - answer.qty >= 0){

      
                newProdSalesInt = parseInt(chosenItem.product_sales) ;
                let newQty = chosenItem.stock_quantity - answer.qty;
                let totalPrice = answer.qty * chosenItem.price;
                newProdSalesInt += parseInt(totalPrice);

                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                      {stock_quantity: newQty, product_sales : newProdSalesInt},
                      { item_id: chosenItem.item_id},
                    ],
                    function(error) {
                      if (error) throw err;
                      console.log("\n--------------------------\nYour order has been placed successfully!");
                      console.log("The total is: " + totalPrice);
                      console.log("\n--------------------------");
                      //start();
                      readInventory();
                    }
                  );
            }
            else{
                console.log("\nInsufficient quantity!");
                console.log("-----------------------------------");
                readInventory();
            }
            //connection.end();

        });
    });
  }