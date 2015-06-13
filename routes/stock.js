/**
 * @author tuananh
 * Copyright(c) Greenline Synergy Co., Ltd. All rights reserved.
 * Created by tuananh on 6/13/15.
 */
var express = require('express');
var router = express.Router();
var Firebase = require("firebase");

var VoteCtrl = require('../lib/VoteCtrl');

/*
  /stock/upvote?username=XXX&stock_code=ptt&date=20150614
 */
router.post('/upvote', function(req, res, next) {
  var username = req.query.username;
  var stock_code = req.query.stock_code;
  var date = req.query.date;

  console.log('[/upvote] username = ' + username
  + ', stock_code = ' + stock_code + ', date = '+ date);

  VoteCtrl.upvote(username, stock_code, date).then(
    function(resp) {
      res.json({success:true, message: resp});
    },
    function(err) {
      // TODO: write more meaningful message
      res.json({success: false, message:'Error ' + err});
    }
  );

});

router.post('/downvote', function(req, res, next) {

  var username = req.query.username;
  var stock_code = req.query.stock_code;
  var date = req.query.date;

  console.log('[/downvote] username = ' + username
  + ', stock_code = ' + stock_code + ', date = '+ date);


  VoteCtrl.downvote(username, stock_code, date).then(
    function(resp) {
      res.json({success:true, message: resp});
    },
    function(err) {
      // TODO: write more meaningful message
      res.json({success: false, message:'Error ' + err});
    }
  );

  //res.json({success: true, message: 'To be implemented'});
});

module.exports = router;
