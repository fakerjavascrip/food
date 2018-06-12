var express = require('express');
var request = require('request');
var mysql = require('mysql');
var add_goods = function(name,callback){
	var result;
	pool = {
		host: 'localhost',
		port: 3306,
		database: "food",
		user: "root",
		password: "15596009908"
	}
	pool.getConnection(function(err,connection){
		if(err){
			result= {
				"err":true,
				"result":"连接数据库失败"
			}
			callback(result);
		}
		else{
			query.connection("select * from goods where name = ?",[name],function(err,result){
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
module.exports = add_goods;