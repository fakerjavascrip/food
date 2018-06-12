var express = require('express');
var request = require('request');
var mysql = require('mysql');
var a_delete_goods = function(name,date,person,callback){
	var result;
	//获取date
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
				connection.query("delet * from user where name=? and date=? and person=?",[name,date,person],function(err,result){
					if(err){
						result = {
							err:true,
							result:"删除数据数据库失败"
						}
					}
					else{
						result = {
							err:false,
							result:"删除商品成功"
						}
					}
					callback(result);
				})
		}

	})
}	
module.exports = a_delete_goods;