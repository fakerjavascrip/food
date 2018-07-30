var express = require('express');
var request = require('request');
var mysql = require('mysql');
var user_update_address = function(address,person,callback){
	var result;
	//获取date
	pool = mysql.createPool({
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
				connection.query("select * from register where phone =? ",[person],function(err,result){
					if(err){
						result = {
							err:true,
							result:"查找个人数据失败"
						}
						callback(result);
					}
					else{
						if(result[0].address==null){
							connection.query('update  register set address=? where phone=?',[address,person],function(err,result){
								if(err){
									result ={
										err:true,
										result:"数据库更新失败"
									}
									console.log(err);
								}
								else{
									result ={
										err:false,
										result:"地址数据更新成功"
									}
								}
								callback(result);
							})
						}
						else{
							result = {
								err:true,
								result:"数据已经存在"
							}
							callback(result);
						}
					}
				})
		}

	})
}	
module.exports = user_update_address;