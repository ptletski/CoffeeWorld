'use strict';

var menuJson = require('../Menu.json');

/**
 * Retrieve the menu for JavaLand.
 * Retrieve the menu for JavaLand. Includes beverages, condiments and prices by size.
 *
 * returns Menu
 **/
exports.getMenu = function() {
  return new Promise(function(resolve, reject) {
    resolve(menuJson);
  });
}

