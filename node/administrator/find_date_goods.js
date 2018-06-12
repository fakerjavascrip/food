var express = require('express');
var request = require('request');
var mysql = require('mysql');
var find_date_goods = function(date,callback){
	var result;
	//获取date
	pool = ({
		port:3306,
		host:"localhost",
		database:"food",
		user:"root",
		password:"15596009908"
	})
	mysql.createPool(function(err,connection){
		if(err){ 
			result= {
				err:true,
				result:"连接数据库失败"
			}
			callback(result);
		}
		else{
				connection.query("select * from user where date = ?",[date],function(err,result){
					if(err){
						result = {
							err:true,
							result:"查找某一天数据失败"
						}
					}
					else{
						result = {
							err:false,
							result:"查找某一天的所有数据成功"
						}
					}
					callback(result);
				})
		}

	})
}	
module.exports = find_date_goods;