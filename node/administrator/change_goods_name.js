var express = require("express");
var mysql = require('mysql');
var change_goods_name= function(name,nname,callback){
	var result;
	pool = mysql.createPool({
		host : "localhost",
		port : 3306,
		database: 'food',
		user : "root",
		password : '15596009908' 
	})
		pool.getConnection(function(err,connection){
			if(err){
				result={
					err: true,
					result: "查找匹配注册失败" 
				}
				callback(result);
			}
			else{
				connection.query("update from goods name =? where name =?",[name,nname],function(err,result){
					if(err){
						result= {
							err:true,
							result:"商品名数据库修改失败"
						}
						callback(result);
					}
					else{
						result = {
							err:false,
							result:"修改名字成功"
						}
					}
					callback(result);
				})
			}
		})
}
module.exports = change_goods_name;