var express = require('express');
var request = require('request');
var mysql = require('mysql');
var fs = require('fs');
var add_goods = function(filename,file,name,callback){
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
				"err":true,
				"result":"连接数据库失败"
			}
			callback(result);
		}
		else{
			connection.query('select * from goods where name=?',[name],function(err,result){
				if(err){
					result = {
						err:true,
						result:"货物查询失败"
					}
					callback(result);
				}
				else{
					if(result.length==0){
						connection.query("INSERT INTO goods(name,filename,hot)VALUES (?,?,?)",[name,filename,0],function(err,result){
							if(err){
								result ={
									err:true,
									result:"保存信息失败"
								}
								console.log(err);
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
					else{
						result = {
							err:true,
							result:"该数据已经存在"
						}
						callback(result);
					}
				}
			})
		}
	})

}	
module.exports = add_goods;