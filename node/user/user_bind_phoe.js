var express = require('express');
var request = require('request');
var mysql = require('mysql');
var user_bind_phone = function(phone,nphone,callback){
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
				result:"数据库连接失败"
			}
			callback(result);
		}
		else{
			connection.query('update register set phone = ? where phone = ?',[nphone,phone],function(err,result){
				if(err){
					result = {
						err:true,
						result:"数据库更新失败"
					}
				}
				else{
					req.session.user = "user="+phone+"&grade=1&juck="+t;
					result ={
						err:false,
						result:"密码修改成功"
					}
				}
				callback(result);
			})
		}
	})
}
module.exports = user_bind_phone;