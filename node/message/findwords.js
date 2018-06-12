var express = require("express");
var mysql = require('mysql');
var findwords = function(mark,callback){
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
					result: "查找留言失败" 
				}
				callback(result);
			}
			else{
				connection.query("select * from respondent where mark = ?",[mark],function(err,result){
					if(err){
						result= {
							err:true,
							result:"回复留言数据库查找失败"
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
module.exports = findwords;