var express = require('express');
var request = require('request');
var mysql = require('mysql');
var find_goods_all = function(callback){
	var result;
	pool = mysql.createPool({
		host: 'localhost',
		port: 3306,
		database: "food",
		user: "root",
		password: "15596009908"
	})
	pool.getConnection(function(err,connection){
		if(err){
			result= {
				"err":true,
				"result":"连接数据库失败"
			}
			callback(result);
		}
		else{
			connection.query("select * from goods",function(err,result){
				if(err){
					result ={
						err:true,
						result:"查询信息失败"
					}
					callback(result);
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
module.exports = find_goods_all;