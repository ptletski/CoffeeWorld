// Orders.js

var menuJson = require('../Menu.json');

var Size = ["small", "medium", "large"];
var Status = ["waiting", "prepping", "ready"];

var Menu = menuJson;
/*
var Menu = {
    coffees : [
        { name : "Dark Roast", prices : {small : 0.99, medium : 1.59, large : 2.49}, description : "Dark and mysterious in its flavor." },
        { name : "Decaf", prices : {small : 1.05, medium : 1.69, large : 2.69}, description : "Great taste - no jitters."  },
        { name : "Espresso", prices : {small : 1.99, medium : 2.59, large : 3.49}, description : "Strong and delightful on the tongue."  },
        { name : "House Blend", prices : {small :  0.89, medium : 1.49, large : 2.39}, description : "The best in the world." }
    ],

    condiments : [
        { name : "Mocha", prices : {small : 0.20, medium : 0.59, large : 1.09}, description : "Choclatey goodness."  }, 
        { name : "Soy", prices : {small :  0.15, medium : 0.49, large : 1.05}, description : "Good for your heart."  }, 
        { name : "Steamed Milk", prices : {small : 0.10, medium : 0.49, large : 1.09}, description : "Perfectly warmed, frothy milk." }, 
        { name : "Whip", prices : {small :  0.10, medium : 0.49, large : 1.09}, description : "Whip - mmmmmmmm." }
    ]
};
*/

// =================================================
// Beverage
var Beverage = function(size, coffee, condiments) {
    this.size = size;
    this.coffee = coffee;
    this.condiments = condiments;
}

Beverage.prototype.findCoffeeMenuItem = function(coffee) {
    for (bIndex=0; bIndex < Menu.coffees.length; bIndex++) {
        if (Menu.coffees[bIndex].name == coffee) {
            return Menu.coffees[bIndex];
        }
    }
    
    throw("Item not on menu");
    return undefined;
}

Beverage.prototype.findCondimentMenuItem = function(condiment) {
    for (bIndex=0; bIndex < Menu.condiments.length; bIndex++) {
        if (Menu.condiments[bIndex].name == condiment) {
            return Menu.condiments[bIndex];
        }
    }
    
    throw("Item not on menu");
    return undefined;
}

Beverage.prototype.calcPrice = function(price) {
    var coffeeMenuItem = this.findCoffeeMenuItem(this.coffee);
    
    price = coffeeMenuItem.prices[this.size];

    for (var cIndex=0; cIndex < this.condiments.length; cIndex++) {
        var condimentMenuItem = this.findCondimentMenuItem(this.condiments[cIndex]);
        price += condimentMenuItem.prices[this.size];
    }

    return price;
}

// =================================================
// Order
var Order = function() {
    this.beverages = [];
    this.price = 0;
    this.status = Status[0];
    this.id = undefined;
}

Order.prototype.setBeverages = function(beverages) {
    var beverage = null;

    for (var bIndex=0; bIndex < beverages.length; bIndex++) {
        var bevItem = beverages[bIndex];
        var beverage = new Beverage(bevItem.size, bevItem.coffee, bevItem.condiments);

        this.beverages.push(beverage);
    }
}

Order.prototype.calculatePrice = function() {
    this.price = 0;

    for (var bIndex=0; bIndex < this.beverages.length; bIndex++) {
        this.price += this.beverages[bIndex].calcPrice(this.price);
    }
}

Order.prototype.setStatusWaiting = function() {
    this.status = Status[0];
}

Order.prototype.setStatusPrepping = function() {
    this.status = Status[1];
}

Order.prototype.setStatusReady = function() {
    this.status = Status[2];
}

// =================================================
// Orders
var Orders = function() {
    this.orderMap = new Map();
}

Orders.prototype.defineId = function(order) {
    var orderId = Math.random();

    if (this.orderMap.get(orderId) == undefined) {
        order.id = orderId;
    }
    else {
        console.log("Already There")
        throw("Can't create unique orderId");
    }
}

Orders.prototype.addOrder = function(beverages) {
    var newOrder = new Order();

    this.defineId(newOrder);

    newOrder.setStatusWaiting();
    newOrder.setBeverages(beverages);
    newOrder.calculatePrice();          // validates content of order and menu
      
    this.orderMap.set(newOrder.id, newOrder);

    return newOrder;  
}

Orders.prototype.deleteOrder = function(orderID) {
    this.orderMap.delete(orderId);
}

Orders.prototype.getOrder = function(orderId) {
    return this.orderMap.get(orderId);
}

// =================================================

module.exports = Orders;