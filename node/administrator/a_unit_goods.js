var express = require('express');
var request = require('request');
var mysql = require('mysql');
var a_change_goods = function(name,person,date,unit,callback){
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
				connection.query("update from user unit =? where person=? and name =? and date = ?",[unit,person,name,date],function(err,result){
					if(err){
						result = {
							err:true,
							result:"刷新数据数据库失败"
						}
					}
					else{
						result = {
							err:false,
							result:"更新商品单位成功"
						}
					}
					callback(result);
				})
		}

	})
}	
module.exports = a_change_goods;