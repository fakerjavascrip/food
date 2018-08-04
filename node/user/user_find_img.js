var express = require('express');
var request = require('request');
var mysql = require('mysql');
var user_find_img = function(name,callback){
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
				connection.query("select filename from goods where name=? ",[name],function(err,result){
					if(err){
						result = {
							err:true,
							result:"查找商品图片失败"
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
module.exports = user_find_img;