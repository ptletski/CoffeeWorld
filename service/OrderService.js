'use strict';

var ServiceResult = require('../ServiceResult.js');
var Orders = require('./Orders.js');
var theOrders = new Orders();


function defineServiceResult(reply, resultCode, resultMessage) {
  var serviceResult = new ServiceResult(reply, resultCode, resultMessage);
  return serviceResult;
}

/**
 * Place your order from the menu.
 *
 * order Order Content of order. (optional)
 * returns Invoice
 **/
exports.createOrder = function(order) {
  return new Promise(function(resolve, reject) {
    try
    {
      var invoice = theOrders.addOrder(order);
      var serviceResult = defineServiceResult(invoice, 201, "Order created.");
      resolve(serviceResult);
    }
    catch(err)
    {
      if (err == "Item not on menu") {
        var serviceResult = defineServiceResult(null, 400, "Item not on menu.");
        reject(serviceResult);
      } else 
      {
        var serviceResult = defineServiceResult(null, 500, "Internal service error.");
        reject(serviceResult);        
      }
    }
  });
}


/**
 * Cancel the order.
 *
 * orderId Float ID of order returned by service.
 * no response value expected for this operation
 **/
exports.deleteOrder = function(orderId) {
  return new Promise(function(resolve, reject) {
    theOrders.deleteOrder(orderId);
    resolve();
  });
}


/**
 * Retrieve order and status.
 *
 * orderId Float ID of order to be returned by service.
 * returns Invoice
 **/
exports.getOrder = function(orderId) {
  return new Promise(function(resolve, reject) {
    var invoice = theOrders.getOrder(orderId);
    resolve(invoice);
  });
}

