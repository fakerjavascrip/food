var express = require('express');
var request = require('request');
var mysql = require('mysql');
var vcipher = function(phone,nphone,callback){
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
				result:"数据库连接失败"
			}
			callback(result);
		}
		connection.query('update from register phone = ? where phone = ?',[npassword,phone],function(err,result){
			if(err){
				result = {
					err:true,
					result:"数据库更新失败"
				}
			}
			else{
				var t = Math.random()
				req.session.user = "user="+phone+"&grade=1&juck="+t;
				result ={
					err:false,
					result:"密码修改成功"
				}
			}
			callback(result);
		})
	})
}
module.exports = vcipher;