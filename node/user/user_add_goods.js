var express = require('express');
var request = require('request');
var mysql = require('mysql');
var user_add_goods = function(name,num,unit,person,time,callback){
	var result;
	var date = new Date();
	var time = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
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
			//查找库中是否存在
			connection.query('select * from user where name = ? and person =? and date=?',[name,person,time],function(err,result){
				if(err){
					result = {
						err:true,
						result:"查询数据失败"
					}
				}
				else{
					if(result[0].length==0){
						//数据库中增加商品
						connection.query("INSERT INTO user(name,num,person,date,unit)VALUES(?,?,?,?,?)",[name,num,person,time,unit],function(err,result){
							if(err){
								result = {
									err:true,
									result:"插入数据数据库失败"
								}
							}
							else{
								result = {
									err:false,
									result:"添加商品成功"
								}
							}
							callback(result);
						})
					}
					else if(result[0].length==1){
						//已存在商品改变数量
						num = num +result[0].num;
						connection.query("update from user num = ? where name =? and person =? and date=?",[num,name,person,time],function(err,result){
							if(err){
								result ={
									err:true,
									result:"商品数量增加失败"
								}
							}
							else{
								result = {
									err:false,
									result:"商品数量增加成功"
								}
							}
						})
					}
					else{
						result = {
							err:true,
							result:"数据库出现问题"
						}
					}
				}
			})
		}

	})
}	
module.exports = user_add_goods;