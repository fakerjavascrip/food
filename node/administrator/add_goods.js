var express = require('express');
var request = require('request');
var mysql = require('mysql');
var add_goods = function(filename,file,name,num,callback){
	var result;
	pool = {
		host: 'localhost',
		port: 3306,
		database: "food",
		user: "root",
		password: "15596009908"
	}
	pool.getConnection(function(err,connection){
		if(err){
			result= {
				"err":true,
				"result":"连接数据库失败"
			}
			callback(result);
		}
		else{
			query.connection("INSERT INTO goods(name,filename,num)VALUES(?,?,?)",[name,filename,num],function(err,result){
				if(err){
					result ={
						err:true,
						result:"保存信息失败"
					}
					callback(result);
				}
				else{
				  	fs.readFile(file.path,function(err,data){
					  	if(err){
					  		result = {
					  			err:true,
					  			result:"打开文件失败"
					  		}
					  		callback(result);
					  	}
					  	else{
						  fs.writeFile(filename,data,function(err){
						  	if(err){
						  		result = {
						  			err:true,
						  			result:"写文件失败"
						  		}
						  	}
						  	else{
						  		result = {
						  			err:false,
						  			result:"上传文件成功"
						  		}
						  	}
						  	callback(result); 
						  })
					  	}
					})
				}
			})
		}
	})

}	
module.exports = add_goods;