var express = require('express');
var request = require('request');
var mysql = require('mysql');
var a_change_goods = function(name,num,person,date,callback){
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
				connection.query("update from user num =? where person=? and name =? and date = ?",[num,person,name,date],function(err,result){
					if(err){
						result = {
							err:true,
							result:"刷新数据数据库失败"
						}
					}
					else{
						result = {
							err:false,
							result:"更新商品数量成功"
						}
					}
					callback(result);
				})
		}

	})
}	
module.exports = a_change_goods;