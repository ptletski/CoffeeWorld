'use strict';

var utils = require('../utils/writer.js');
var Order = require('../service/OrderService');
//var ServiceResult = require('../ServiceResult.js');

module.exports.createOrder = function createOrder (req, res, next) {
  var order = req.swagger.params['order'].value;
  Order.createOrder(order)
    .then(function (serviceResult) {     
      res.statusMessage = serviceResult.resultMessage;
      utils.writeJson(res, serviceResult.reply, serviceResult.resultCode);
     })
    .catch(function (serviceResult) {
      res.statusMessage = serviceResult.resultMessage;
      utils.writeJson(res, "", serviceResult.resultCode);
    });
};

module.exports.deleteOrder = function deleteOrder (req, res, next) {
  var orderId = req.swagger.params['orderId'].value;
  Order.deleteOrder(orderId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getOrder = function getOrder (req, res, next) {
  var orderId = req.swagger.params['orderId'].value;
  Order.getOrder(orderId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
