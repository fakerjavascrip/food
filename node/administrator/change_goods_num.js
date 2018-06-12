var express = require("express");
var mysql = require('mysql');
var change_goods_num= function(name,num,callback){
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
				connection.query("update from goods num =? where name =?",[num,name],function(err,result){
					if(err){
						result= {
							err:true,
							result:"商品数量数据库修改失败"
						}
						callback(result);
					}
					else{
						result = {
							err:false,
							result:"修改商品数量成功"
						}
					}
					callback(result);
				})
			}
		})
}
module.exports = change_goods_num;