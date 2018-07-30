var express = require('express');
var request = require('request');
var mysql = require('mysql');
var find_person =function(person,callback){
	var result;
	pool = mysql.createPool({
		port:3306,
		host:"localhost",
		database:"food",
		user:"root",
		password:"15596009908"
	})
	pool.getConnection(function(err,connection){
		if(err){
			result = {
				err:true,
				result:"连接数据库失败"
			}
			callback(result);
		}
		else{
			//phone就是判断个人信息的唯一标准,name店铺名,grade验证是否通过,address地址
			connection.query('select phone,name,address from register where phone = ?',[person],function(err,result){
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
module.exports = find_person;