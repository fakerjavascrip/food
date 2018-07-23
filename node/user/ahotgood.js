var express = require('express');
var request = require('request');
var mysql = require('mysql');
var ahotgood = function(name,callback){
	var result;
	pool = mysql.createPool({
		host: 'localhost',
		port: 3306,
		database: "food",
		user: "root",
		password: "15596009908"
	})
	pool.getConnection(function(err,connection){
		if(err){
			result= {
				"err":true,
				"result":"连接数据库失败"
			}
			callback(result);
		}
		else{
			//先查找再给热度加一
			connection.query("select * from goods where name = ?",[name],function(err,result){
				if(err){
					result ={
						err:true,
						result:"查询信息失败"
					}
					callback(result);
				}
				else{
					if(result.length==0){
						result= {
							err:true,
							result:"没有查找的商品"
						}
						callback(result);
					}
					else if(result.length==1){
						//更新热度
						connection.query('update goods set hot=hot+1 where name = ?',[name],function(err,result){
							if(err){
								result={
									err:true,
									result:"热度更新问题"
								}
							}
							else{
								result= {
									err:false,
									result:"热度已经更新"
								}
							}
							callback(result);
						})
					}
					else{
						result ={
							err:true,
							result:"数据库问题"
						}
						callback(result);
					}
				}
			})
		}
	})

}	
module.exports = ahotgood;