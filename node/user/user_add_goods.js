var express = require('express');
var request = require('request');
var mysql = require('mysql');
var user_add_goods = function(vegetables,time,person,callback){
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
				err:true,
				result:"连接数据库失败"
			}
			callback(result);
		}
		else{
			for(let i=0;i<vegetables.length;i++){
			//查找库中是否存在
				connection.query('select * from user where name = ? and person =? and date=? and unit=?',[vegetables[i].name,person,time,vegetables[i].select],function(err,result){
					if(err){
						result = {
							err:true,
							result:"查询数据失败"
						}
						callback(result);
					}
					else{
						if(result.length==0){
							//数据库中增加商品
							connection.query("INSERT INTO user(name,num,person,date,unit)VALUES(?,?,?,?,?)",[vegetables[i].name,vegetables[i].number,person,time,vegetables[i].select],function(err,result){
								if(err&&i==0){
									result = {
										err:true,
										result:"数据库出现问题"
									}
									callback(result)
								}
								else if(i==0){
									result = {
										err:false,
										result:"商品更新成功"
									}
									callback(result);
								}
							})
						}
						else if(result.length==1){
							//已存在商品改变数量
							vegetables[i].number = vegetables[i].number +result[0].num;
							connection.query("update user set num = ? where name =? and person =? and date=?",[vegetables[i].number,vegetables[i].name,person,time],function(err,result){
								if(err&&i==0){
									result ={
										err:true,
										result:"数据库出现问题"
									}
									callback(result);
								}
								else if(i==0){
									result = {
										err:false,
										result:"商品更新成功"
									}
									callback(result);
								}
							})
						}
						else{
							result = {
								err:true,
								result:"数据库出现问题"
							}
							callback(result);
						}
					}
				})
			}
		}

	})
}	
module.exports = user_add_goods;