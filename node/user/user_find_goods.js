var express = require('express');
var request = require('request');
var mysql = require('mysql');
var user_find_goods = function(date,person,callback){
	var result;
	//获取date
	pool = mysql.createPool({
		port:3306,
		host:"localhost",
		database:"food",
		user:"root",
		password:"15596009908"
	})
	pool.getConnection(function(err,connection){
		if(err){ 
			result= {
				err:true,
				result:"连接数据库失败"
			}
			callback(result);
		}
		else{
				connection.query("select * from user where date=? and person =? ",[date,person],function(err,result){
					if(err){
						result = {
							err:true,
							result:"查找个人数据失败"
						}
					}
					else{
						result = {
							err:false,
							result:result
						}
					}
					callback(result);
				})
		}

	})
}	
module.exports = user_find_goods;