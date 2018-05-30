//可以查询各种信息，反正验证是一级管理员
var express = require('express');
var request = require('request');
var mysql = require('mysql');
var find_personal =function(callback){
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
		}
		else{
			connection.query('select * from register',[],function(err,result){
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