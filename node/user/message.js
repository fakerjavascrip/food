var express = require('express');
var request = require('request');
var mysql = require('mysql');
var Upload_message = function(name,message,date,callback){
	pool = mysql.createPool({
		host: 'localhost',
		port: 3306,
		database: "food",
		user: "root",
		password: "15596009908"
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
			connection.query('select * from message where name=? and date=?',[name,date],function(err,result){
				if(err){
					result = {
						err:true,
						result:"数据库查找失败"
					}
					callback(result);
				}
				else{
					if(result.length==0){
						//创建新的数据
						connection.query("insert into message (name,message,date) values (?,?,?)",[name,message,date],function(err,result){
							if(err){
								result = {
									err:true,
									result:"数据库存入出错"
								}
							}
							else{
								result ={
									err:false,
									result:"添加订单备注信息成功"
								}
							}
							callback(result);
						})
					}
					else if(result.length==1){
						//后缀在之前的数据里
						message = result[0].message+message;
						connection.query('update message set message = ? where name =?and date = ?',[message,name,date],function(err,result){
							if(err){
								result = {
									err:true,
									result:"更新存入数据库失败"
								}
							}
							else{
								result = {
									err:false,
									result:"的更新添加数据库成功"
								}
							}
							callback(result);
						})	
					}
					else{
						result = {
							err:true,
							result:"数据库可能出现问题"
						}
						callback(result);
					}
				}
			})
		}
	})
}
module.exports = Upload_message;