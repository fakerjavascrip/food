var express = require('express');
var request = require('request');
var mysql = require('mysql');
var change_password = function(phone,password,npassword,kind,callback){
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
			//按密码修改
			if(kind==1){
				connection.query('update from register password = ? where password=? and phone=?',[npassword,password,phone],function(err,result){
					if(err){
						result = {
							err:true,
							result:"更新数据数据库失败"
						}
					}
					else{
						result = {
							err:false,
							result:"密码修改完成"
						}
					}
				})
			}
			//短信验证下发验证码
			else if(kind==2){
				var vcode = Math.round(Math.random() * (9999-1000)) + 1000;
				//修改session
				req.session.user = req.session.user+"&vcode="vcode;
				//发送短信验证码给phone

				result = {
					err:false,
					result:"验证码已经发送"
				}
				callback(result);
			}
		}

	})
}	
module.exports = change_password;