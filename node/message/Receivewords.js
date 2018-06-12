var express = require("express");
var mysql = require('mysql');
var receivewords = function(sendphone,acceptphone,words,mark,callback){
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
					result: "链接数据库失败失败" 
				}
				callback(result);
			}
			else{
				connection.query("INSERT INTO user(sendphone,acceptphone,words,mark)VALUES(?,?,?,?)",[sendphone,acceptphone,words,mark],function(err,result){
					if(err){
						result= {
							err:true,
							result:"留言上传数据库失败"
						}
					}
					else{
						result = {
							err:true,
							result:"回复留言成功"
						}
					}
					callback(result);
				})
			}
		})
}
module.exports = receivewords;