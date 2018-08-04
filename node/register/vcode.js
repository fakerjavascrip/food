var express = require('express');
var request = require('request');
var mysql = require('mysql');
var crypto = require('crypto');
var code = function(phone,callback){
	var result,canrun;
	pool = mysql.createPool({
		port:3306,
		host:'localhost',
		database:'food',
		user:'root',
		password:'15596009908'
	})
		var vcode = Math.round(Math.random() * (9999-1000)) + 1000; 
	    pool.getConnection(function(err,connection){
	    	if(err){
	    		result = {
	    			err:true,
	    			result:"获取验证码连接数据库失败"
	    		}
	    		callback(result);
	    	}
	    	else{
	    		///两个数据库的比对
	    		connection.query("select * from register where phone = ?",[phone],function(err,result){
	    			if(err){
	    				result = {
	    					err: true,
	    					result:"查询数据库失败1"  
	    				}
	    				callback(result);
	    			}
	    			else{
	    				if(result.length>0){
	    					result = {
	    						err:true,
	    						result:"已经注册过"
	    					}
	    					callback(result);
	    				}
	    				else{
                           		connection.query("Delete from vcode where phone = ?",[phone],function(err,result){
                                if(err){
                                    result={
                                        err:true,
                                        result:"数据的清理出现了问题"
                                    }
                                    callback(result);
                                }
                                else{
                                	connection.query("INSERT INTO vcode(vcode,phone)VALUES(?,?)",[vcode,phone],function(err,result){
                                    if(err){
                                    	result = {
                                    		err:true,
                                            result:"增加验证码时失败"
                                        }
                                    }
                                    else{
                                        result = {
                                            err:false,
                                            result:"获取验证码成功"
                                        }
                                        console.log(vcode);
                                    }
                                    if(result.err==false){
                                    	//发送短信验证码
										const SMSClient = require('@alicloud/sms-sdk')
										const accessKeyId = 'LTAILxAXARievXDH'
										const secretAccessKey = 'rJNOKuLLzGpMr7S0QrN7eYqZNuIquh'
										let smsClient = new SMSClient({accessKeyId, secretAccessKey})
										smsClient.sendSMS({
										    PhoneNumbers: phone,
										    SignName: '梁博',
										    TemplateCode: 'SMS_141206033',
										    TemplateParam:'{"code":"'+vcode+'"}'
										}).then(function (res) {
										    let {Code}=res
										    if (Code === 'OK') {
										    }
										}, function (err) {
										})
											result={
												result:"你好"
											}
                                    }
                                    callback(result);
                                	})
                              	}  
                              })
                          }
                      }

	    		})
	    	}
	    })
}
module.exports = code; 