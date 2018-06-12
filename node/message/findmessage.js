var express = require("express");
var mysql = require('mysql');
var findmessage = function(callback){
	var result;
	pool = mysql.createPool({
		host : "localhost",
		port : 3306,
		database: 'food',
		user : "root",
		password : '15596009908' 
	})
		pool.getConnection(function(err,connection){
			if(err){
				result={
					err: true,
					result: "查找匹配注册失败" 
				}
				callback(result);
			}
			else{
				connection.query("select * from initiator",[],function(err,result){
					if(err){
						result= {
							err:true,
							result:"验证码数据库查找失败"
						}
					}
					else{
						result = {
							err:true,
							result:result
						}
					}
					callback(result);
				})
			}
		})
}
module.exports = findmessage;