var express = require("express");
var mysql = require('mysql');
var register = function(phone,password,name,vcode,callback){
	var vcode_node;
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
				connection.query("select vcode from vcode where phone = ?",[phone],function(err,result){
					if(err){
						result= {
							err:true,
							result:"验证码数据库查找失败"
						}
						callback(result);
					}
					else{
						vcode_node = result[0].vcode;
						if(vcode==vcode_node){
							connection.query("INSERT INTO register(phone,password,name,prove,grade)VALUES(?,?,?,?,?)",[phone,password,name,0,1],function(err,result){
								if(err){
									result= {
										err:true,
										result:"上传数据失败"
									}
								}
								else{
									result = {
										err:false,
										result:"数据初步存入数据库开启验证"
									}
								}
								callback(result);
							})
						}
						else{
							result={
								err: true,
								result:"验证码匹配错误"
							}
							callback(result);
						}
					}
				})
			}
		})
}
module.exports = register;