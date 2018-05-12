# inventory_manager_NodeMySQL
 The app will take in orders from customers and deplete stock from the store's inventory.




This project includes:
1. A game that receives user input using the inquirer npm package.
2. This is a modular solution using three files

![????????](https://github.com/markcam1/liri-node-app/blob/master/media/liri_node.png)

---

## Setup
### Prerequisites
```
*	This is for those with intermediate JavaScript experience.
*	A basic knowledge of Node.js and the Command-line. 
```
### Installing
```
Clone this repo to your desktop.
```

The relevant JavaScript files:
1.	__Index.js__: The file containing the main logic of the game, which depends on _Word.js_ and:
    * Randomly selects a word and uses the Word constructor to store it,
    * Prompts the user for each guess and keeps track of the user's remaining guesses,
2. __Word.js__: Contains a constructor, _Word_ that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess.
3. __Letter.js__: Contains a constructor, _Letter_. This constructor displays an underlying character or a blank placeholder, depending on whether or not the user has guessed the letter.

```
Install Node Packages:
```
1. npm init -y
2. [inquirer](https://www.npmjs.com/package/inquirer) - A collection of common interactive command line user interfaces.

## Built With 
* [inquirer](https://www.npmjs.com/package/inquirer) - A collection of common interactive command line user interfaces.

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to me.

## Versioning
Use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/markcam1/node_word_guess/tags). 

## Authors
* **Mark Cameron** - *Initial work* - [Mark Cameron](https://markcam1.github.io/)

See also the list of [contributors](https://github.com/calendarapp1bootcamp/node_word_guess/graphs/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
* UC Berkeley Extension
* Teachers [David Blanchard](https://www.linkedin.com/in/dblanchard13/), [Rai Lee](https://www.linkedin.com/in/rai-lee-38061696/), [Emma Brown](https://github.com/EmmaEm),