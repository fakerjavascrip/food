var express =require('express');
var request = require('request');
var mysql = require('mysql');
var rank = function(phone,grade,callback){
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
			connection.query('update register set grade= ? where phone = ?',[grade,phone],function(err,result){
				if(err){
					result = {
						err:true,
						result:"修改二级管理失败"
					}
					callback(result);
				}
				else{
					result = {
						err:false,
						result:"修改二级管理员成功"
					}
				}
				callback(result);
			})
		}
	})
}
module.exports = rank;