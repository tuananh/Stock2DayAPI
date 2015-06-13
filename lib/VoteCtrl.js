/**
 * @author tuananh
 * Copyright(c) Greenline Synergy Co., Ltd. All rights reserved.
 * Created by tuananh on 6/13/15.
 */
var Firebase = require("firebase");
var Config = require('./Config');
var Q = require('q');
var baseUrl = 'https://' + Config.FIREBASE_APP + '.firebaseio.com/';

//{
//  "username": {
//    "upvoteList": {
//      "AAPL" : "20151010",
//      "AAPL" : "20151010",
//      "AAPL" : "20151010"
//    }
//  }
//}
var upvote = function (username, stock_code, date) {
  var deferred = Q.defer();

  console.log(baseUrl);
  var baseRef = new Firebase(baseUrl);

  if (!userAlreadyVoted(username, stock_code, date)) {
    baseRef.child('stockvotes').child(date).
      child(stock_code).child('bull').transaction(function(currentCount) {
        deferred.resolve(currentCount+1);
        return currentCount+1;
      });

    //TODO: add transaction to uservotes
  } else {
    deferred.reject('User already voted');
  }

  return deferred.promise;
};

/*
 http://localhost:3000/stock/downvote?username=anh&stock_code=ptt&date=20150613
 */
var downvote = function(username, stock_code, date) {
  var deferred = Q.defer();

  var baseRef = new Firebase(baseUrl);
  if (!userAlreadyVoted(username, stock_code, date)) {
    baseRef.child('stockvotes').child(date).
      child(stock_code).child('bear').transaction(function(currentCount) {
        deferred.resolve(currentCount+1);
        return currentCount+1;
      });

    //TODO: add transaction to uservotes
  } else {
    deferred.reject('User already voted');
  }

  return deferred.promise;
};

// Tests to see if `userId` has already vote for `stockCode` on `date`
function userAlreadyVoted(userId, stockCode, date) {
  var baseRef = new Firebase(baseUrl);
  baseRef.child('uservotes').child(date).
    child(userId).child('voted').child(stockCode)
    .once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
      return exists;
    //console.log(snapshot.val() + ' ' + exists);
  });
}

//userAlreadyVoted('anh', 'ptt', '20150613'); // true
//userAlreadyVoted('anh', 'ptt', '20150612'); // false
//userAlreadyVoted('anh2', 'ptt', '20150612'); // false

upvote('anh', 'ptt', '20150613');


exports.upvote = upvote;
exports.downvote = downvote;

//upvote('anh', 'ptt', '20150613');
//isAlreadyVoted('anh', 'ptt', '20150613');
//isAlreadyVoted('anh', 'AAPL', '20151011');
//isAlreadyVoted('anh', 'AAPL', '20151012');