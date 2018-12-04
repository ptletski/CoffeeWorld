'use strict';

var utils = require('../utils/writer.js');
var Menu = require('../service/MenuService');

module.exports.getMenu = function getMenu (req, res, next) {
  Menu.getMenu()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
