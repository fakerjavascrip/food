var express = require('express');
var request = require('request');
var mysql = require('mysql');
var fhotgood = function(callback){
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
			connection.query("select * from goods order by hot desc,name asc limit 10",[],function(err,result){
				if(err){
					result ={
						err:true,
						result:"查询信息失败"
					}
					callback(result);
				}
				else{
					if(result.length==0){
						result= {
							err:true,
							result:"没有查找的商品"
						}
					}
					else if(result.length>0){
						result = {
							err:false,
							result:result
						}
					}
				}
				callback(result);
			})
		}
	})

}	
module.exports = fhotgood;