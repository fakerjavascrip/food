var express = require('express');
var request = require('request');
var mysql= require('mysql');
login = function(req,phone,password,grade,callback){
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
			if(grade==1)
			{
				connection.query("select * from register WHERE phone = ? AND password = ?and prove=1",[phone,password],function(err,result){
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
							//下发session和cookie
							result = {
								err: false,
								result: "成员下发session"
							}
							var t = Math.random();
							req.session.user = "user="+phone+"&grade=1&juck="+t;
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
			else if(grade==2){
				connection.query('slect * from register where phone = ? and password =? and grade =2 and prove=1',[phone,password],function(err,result){
					if(err){
						result = {
							err:true,
							result:"查找数据库失败"
						}
					}
					else{
						if(result.length==0){
							result = {
								err:true,
								result:"二级管理登录密码或账号错误"
							}
						}
						else if(result.length==1){
							result = {
								err:false,
								result:"二级管理登录成功"
							}
							//下发session
							var t = Math.random()
							req.session.user = "user="+phone+"&grade=2&juck="+t;
						}
						else{
							result = {
								err:true,
								result:"异常错误，二级登录数据库异常"
							}
						}
					}
					callback(result);
				})
			}
			else if(grade==3){
				connection.query('select * from register where phone =? and password = ? and grade =3 and prove =1',[phone,password],function(err,result){
					if(err){
						result={
							err:true,
							result:"连接数据库失败"
						}
					}
					else{
						if(result.length ==0){
							result = {
								err:true,
								result:"一级管理登录密码或账号错误"
							}
						}
						else if(result.length==1){
							result = {
								err:false,
								result:"一级管理登录成功"
							}
							//下发session
							var t = Math.random()
							req.session.user = "user="+phone+"&grade=3&juck="+t;

						}
						else{
							result = {
								err:true,
								result:"异常错误,一级登录数据库出错"
							}
						}
					}
					callback(result);
				})
			}
			else{
				result ={
					err:true,
					result:"被人搞了接口,或者数据异常错误"
				}
				callback(result);
			}
		}
	})
}
module.exports = login;