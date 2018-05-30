var express = require('express');
var request = require('request');
var mysql = require('mysql');
var find_personal =function(phone,callback){
	var result;
	pool = ({
		port:3306,
		host:"localhost",
		database:"food",
		user:"root",
		password:"15596009908"
	})
	mysql.createPool(function(err,connection){
		if(err){
			result = {
				err:true,
				result:"连接数据库失败"
			}
			callback(result);
		}
		else{
			connection.query('select phone,name,company,grade from register where phone = ?',[phone],function(err,result){
				if(err){
					result = {
						err:true,
						result:"查找信息数据库失败"
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
module.exports = find_personal;