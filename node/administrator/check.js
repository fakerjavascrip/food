var express = require('express');
var request = require('request');
var mysql = require('mysql');
var agree = function(phone,agree,callback){
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
			if(agree==0){
				connection.query('delect * from register where phone = ? and prove=0',[phone],function(err,result){
					if(err){
						result = {
							err:true,
							result:"数据删除失败"
						}
					}
					else{
						result= {
							err:false,
							result:"回驳用户注册成功"
						}
					}
					callback(result);
				})

			}
			else if(agree==1)
			{
				connection.query('update register set prove =1 where phone = ?',[phone],function(err,result){
					if(err){
						result = {
							err:true,
							result:"更新注册数据时数据库失败"
						}
					}
					else{
						result = {
							err:false,
							result:"同意注册成功"
						}
					}
					callback(result);
				})
			}
			else{
				result = {
					err:false,
					result:"数据异常,可能管理员接口泄露被刷"
				}
				callback(result);
			}
		}
	})

}	
module.exports = agree;