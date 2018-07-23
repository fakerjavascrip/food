var express = require('express');
var request = require('request');
var mysql= require('mysql');
login = function(req,phone,password,callback){
	//grade 1用户，2和3为管理员
	pool = mysql.createPool({
		host: "localhost",
		port: 3306,
		database:"food",
		user:"root",
		password:"15596009908"
	})
	pool.getConnection(function(err,connection){
		if(err){
			result = {
				"err":true,
				"result":"连接数据库失败"
			}
			callback(result);
		}
		else{
			connection.query("select * from register WHERE phone = ? AND password = ?",[phone,password],function(err,result){
				if(err){
					result = {
						err:true,
						result:"登录信息查询失败"
					}
					callback(result);
				}
				else{
					if(result.length==0){
						result = {
							err:true,
							result:"没有当前用户或者密码错误"
						}
					}
					else if(result.length==1){
						if(result[0].grade==1){
							//用户session下发
							var t = Math.random();
							req.session.user = "user="+phone+"&grade=1&juck="+t;
							result = {
								err: false,
								result: "用户session下发"
							}
						}
						else if(result[0].grade==2){
							//二级管理session下发
							var t = Math.random();
							req.session.user = "user="+phone+"&grade=2&juck="+t;
							result = {
								err: false,
								result: "二级管理session下发"
							}
						}
						else if(result[0].grade==3){
							//一级管理session下发
							var t = Math.random();
							req.session.user = "user="+phone+"&grade=3&juck="+t;
							result = {
								err: false,
								result: "一级管理session下发"
							}
						}
						//下发session和cookie
					}
					else{
						result = {
							err:true,
							result:"数据异常，用户登录数据库异常"
						}
					}
				}
				callback(result);
			})
		}
	})
}
module.exports = login;