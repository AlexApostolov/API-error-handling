var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// Express middleware to prep things to be JSON formated
app.use(bodyParser.json());
// then ignore anything that isn't arrays and strings
app.use(bodyParser.urlencoded({extended: false}));

var PORT = 3000;

var ingredients = [
  {
    "id": "232kAk",
    "text": "Eggs"
  },
  {
    "id": "dkP345",
    "text": "Milk"
  },
  {
    "id": "dkcuu7",
    "text": "Bacon"
  },
  {
    "id": "73hdy",
    "text": "Frogs Legs"
  }
];

app.get('/ingredients', function(req, res) {
  res.send(ingredients);
});

app.post('/ingredients', function(req, res) {
  // save the ingredient sent by the user with Express
  var ingredient = req.body;
  // check if no ingredient is provided: null, undefined, or empty
  if (!ingredient || ingredient.text === "") {
    // send the appropriate response with a status and error key
    res.status(500).send({error: "Your ingredient must have text"});
  } else {
    // add to "ingredients" list
    ingredients.push(ingredient);
    // explicit success message with ingredient
    res.status(200).send(ingredient);
  }
});

app.put('/ingredients/:ingredientId', function(req, res) {
  var newText = req.body.text;

  // error handling for "text"
  if (!newText || newText === "") {
    res.status(500).send({error: "You must provide ingredient text"})
  } else {
    // find the ingredient to change
    var objectFound = false;
    for (var x = 0; x < ingredients.length; x++) {
      var ing = ingredients[x];
      if (ing.id === req.params.ingredientId) {
        ingredients[x].text = newText;
        objectFound = true;
        break;
      }
    }

    if (!objectFound) {
      res.status(500).send({error: "ingredient id not found"});
    } else {
      res.send(ingredients);
    }
  }
});

app.listen(PORT, function() {
  console.log("First API running on port " + PORT);
});
