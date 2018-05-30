var express = require('express');
var request = require('request');
var mysql = require('mysql');
var change_password = function(phone,callback){
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
			result= {
				err:true,
				result:"连接数据库失败"
			}
			callback(result);
		}
		else{
			connection.query('update from register password = 000000 where phone =?',[phone],function(err,result){
				if(err){
					result = {
						err:true,
						result:"数据库更新数据失败"
					}
				}
				else{
					result ={
						err:false,
						result:"重置密码成功"
					}
				}
				callback(result);
			})
		}
	})
}	
module.exports = change_password;