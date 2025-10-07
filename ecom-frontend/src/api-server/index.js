const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let cart = [];

app.get("/api/products", (req, res) => {
  let products = [
    {
      productID: "P001",
      productTitle: "HP Pavilion 15",
      image: "assets/images/Hp-pavilon.png",
      category: "laptop",
      productPrice: "9500 ",
      quantity: 5,
      favorite: false,
      colors: ['white', 'red', 'gray', 'black']
    },
    {
      productID: "P002",
      productTitle: "MacBook Air M2",
      image: "assets/images/m2-macbook-air.png",
      category: "laptop",
      productPrice: "14000 ",
      quantity: 2,
      favorite: false,
      colors: ['white', 'red', 'gray', 'black']
    },
    {
      productID: "P003",
      productTitle: "hp mouse",
      image: "assets/images/mouse-hp.png",
      category: "accessory",
      productPrice: "360 ",
      quantity: 30,
      favorite: false,
      colors: ['white', 'red', 'gray', 'black']
    },
    {
      productID: "P08703",
      productTitle: "imprimante HP",
      image: "assets/images/imprim-hp.png",
      category: "printer",
      productPrice: "1200 ",
      quantity: 15,
      favorite: false,
      colors: ['white', 'red', 'gray', 'black']
    },
    {
      productID: "P087e03",
      productTitle: "Toshiba",
      image: "assets/images/toushiba.png",
      category: "laptop",
      productPrice: "9999 ",
      quantity: 18,
      favorite: false,
      colors: ['white', 'red', 'gray', 'black']
    },
    {
      productID: "P001",
      productTitle: "HP Pavilion 15",
      image: "assets/images/Hp-pavilon.png",
      category: "laptop",
      productPrice: "9500 ",
      quantity: 5,
      favorite: false,  colors: ['white', 'red', 'gray', 'black']

    },
    {
      productID: "P002",
      productTitle: "MacBook Air M2",
      image: "assets/images/m2-macbook-air.png",
      category: "laptop",
      productPrice: "14000 ",
      quantity: 2,
      favorite: false,
      colors: ['white', 'red', 'gray', 'black']
    },
    {
      productID: "P003",
      productTitle: "hp mouse",
      image: "assets/images/mouse-hp.png",
      category: "accessory",
      productPrice: "360 ",
      quantity: 30,
      favorite: false,  colors: ['white', 'red', 'gray', 'black']

    },
    {
      productID: "P08703",
      productTitle: "imprimante HP",
      image: "assets/images/imprim-hp.png",
      category: "printer",
      productPrice: "1200 ",
      quantity: 15,
      favorite: false,  colors: ['white', 'red', 'gray', 'black']
    }
  ];
  res.send(products);
});

app.post("/api/cart", (req, res) => {
  cart = req.body;
  setTimeout(() => res.status(201).send(), 20);
});

app.get("/api/cart", (req, res) => res.send(cart));

const port = 3001;
app.listen(port, () => console.log(`API Server listening on port ${port}`));
