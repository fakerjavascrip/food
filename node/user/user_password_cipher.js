var express = require('express');
var request = require('request');
var mysql = require('mysql');
var change_password = function(person,password,npassword,callback){
	var result;
	pool =mysql.createPool({
		port:3306,
		host:"localhost",
		database:"food",
		user:"root",
		password:"15596009908"
	})
	pool.getConnection(function(err,connection){
		if(err){
			result= {
				err:true,
				result:"连接数据库失败"
			}
			callback(result);
		}
		else{
			//按密码修改
			connection.query('select * from register where password=? and phone=?',[password,person],function(err,result){
				if(err){
					result = {
						err:true,
						result:"原密码查找失败"
					}
				}
				else{
					if(result.length==1){
						if(password==npassword){
							result = {
								err:false,
								result:"原密码和旧密码重复"
							}
							callback(result);
						}
						else{
							connection.query('update register set password=? where phone=?',[npassword,person],function(err,result){
								if(err){
									result ={
										err:true,
										result:"密码修改失败"
									}
								}
								else{
									result ={
										err:false,
										result:"密码已经修改"
									}
								}
								callback(result);
							})
						}
					}
					else{
						result ={
							err:true,
							result:"原密码错误"
						}
						callback(result);
					}
				}
			})
		}

	})
}	
module.exports = change_password;