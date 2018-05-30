var express = require('express');
var router = express.Router();
var app= express();
var querystring= require('querystring');
var Register = require('./register/register.js');
var Vcode = require('./register/vcode.js');
var Login = require('./login/login.js');
var Check = require('./administrator/check.js');
var Rank = require('./administrator/rank.js');
var Change_personal = require('./all/change_personal.js');
var Change_phone = require('./all/change_phone.js');
var Cipher = require('./all/cipher.js');
var Find_personal = require('./all/find_personal.js');
var Administrator_change_password = require('./administrator/change_password.js');
var Vcipher = require('./user/vcipher')
function returnJson(req,res,result){
	 	if(req.jsonp){
	 		res.jsonp(result);
	 	}
	 	else{
	 		res.json(result);
	 	}
}
///注册验证码短信接口
router.use('/vcode',function(req,res){1
	var a=4;
	var vcode,phone;
	if(req.body.phone){
		phone = req.body.phone;
	}
	else if(req.query.phone){
		phone = req.query.phone;
	}
	Vcode(phone,function(result){
		returnJson(req,res,result);
	})
},)
//注册上传的接口
router.use('/register',function(req,res){
	var phone,password,name,vcode;
	if(req.body.phone){
		phone = req.body.phone;
		password = req.body.password;
		name = req.body.name;
		vcode  = req.body.vcode;
	}
	else if(req.query.phone){
		phone = req.query.phone;
		password = req.query.password;
		name = req.query.name;
		vcode = req.query.vcode; 
	}
	Register(phone,password,name,vcode,function(result){
		returnJson(req,res,result);
	})
})
///用户登录的接口
router.use('/login',function(req,res){
		var phone,password,grade;
		if(req.body.phone){
			phone = req.body.phone;
			password = req.body.password; 
			grade = req.body.grade;
		}
		else if(req.query.phone){
			phone = req.query.phone;
			password = req.query.password;
			grade = req.query.grade;
		}
		Login(req,phone,password,grade,function(result){
			returnJson(req,res,result);
		})
})
//一级和二级管理员同意和回驳用户的注册信息
router.use('/check',function(req,res){
	var str = req.session.user;
	var arr = querystring.parse(str,"&","=");
	//第一个phone,第二个管理等级，第三个随机数
	var session,phone,agree;
	if(req.body.phone){
		phone =req.body.phone;
		agree = req.body.agree;//1为同意注册，0为不同意注册并且删除
		session = req.body.session;
	}
	else if(req.query.phone){
		phone = req.query.phone;
		agree = req.query.agree;
		session = req.query.session;
	}
	if(session == req.session.user&&arr[1]>=2)
	{
		Check(phone,agree,function(result){
			returnJson(req,res,result)
		})
	}
	else{
		result = {
			"err":true,
			"result":"session验证失败"
		}
		returnJson(req,res,result);
	}
})
///管理员管理二级管理权限grade1为下发普通用户，2为下发一级管理
router.use('/rank',function(req,res){
	var session,phone,password,name;
	var str = req.session.user;
	arr = querystring.parse(str,"&","=");
	if(req.body.phone){
		phone = req.body.phone;
		grade = req.body.grade;
	}
	else if(req.query.phone){
		phone = req.query.phone;
		grade = req.query.grade;
	}
	if(req.session.user==session&&arr[1]==3){
		Rank(phone,grade,function(result){
			returnJson(req,res,result);
		})
	}
	else{
		result = {
			"err":true,
			"result":"session比对失败"
		}
		returnJson(req,res,result);
	}
})
router.use('/close',function(req,res){
	var session,result;
	if(req.body.session){
		session = req.body.session;
	}
	else if(req.query.session){
		session = req.query.session; 
	}
	if(session!=req.session.user){
		result = {
			err:true,
			result:"前端session和后端session不同，或session已经被清除"
		}
		returnJson(req,res,result);
	}
	else if(session==req.session.user){
		req.session.user = null;
		result = {
			err:true,
			result:"已经退出登录"
		} 
	}
	returnJson(req,res,result);
})
///查找个人信息
router.use('/find_personal',function(req,res){
	var phone;
	str = req.session.user;
	var arr = querystring.parse(str,"&","=");
	if(req.body.session){
		session = req.body.session;
	}
	else if(req.query.session){
		session = req.query.session
	}
	if(req.session.user==session){
		if(arr[1]==1)
		{
			phone = arr[0];
			Find_personal(phone,function(result){
				returnJson(req,res,result);
			})
		}
		else{
			result ={
				err:true,
				result:"session比对出错"
			}
			returnJson(result);
		}
	}
	else{
		result= {
			err:true,
			result:"session比对出错"
		}
		returnJson(result);
	}
},function(res,res){
	var session,str,arr;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	if(req.body.session){
		session = req.body.session;
	}
	else if(req.query.session){
		session = req.query.session;
	}
	if(session==req.session.user){
		if(arr[1]==3){
			Find_all(function(result){
				returnJson(result);
			})
		}
		else{
			result = {
				err:true,
				result:"权限不匹配"
			}
			returnJson(result);
		}
	}
	else{
		result = {
			err:true,
			result:"session比对出错"
		}
		returnJson(result);
	}

},function(req,res){
	var session,str,arr;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	if(req.body.session){
		session = req.body.session;
	}
	else if(req.query.session){
		session = req.query.session;
	}
	if(session==req.session.user){
		if(arr[1]==2){
			Find_all(function(result){
				returnJson(result);
			})
		}
		else{
			result = {
				err:true,
				result:"权限不匹配"
			}
			returnJson(result);
		}
	}
	else{
		result= {
			err:true,
			result:"session比对出错",
		}
		returnJson(result);
	}
})
//修改密码
router.use('/cipher',function(res,req){
	var session,phone,arr,str;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	if(req.body.session){
		session = req.body.session;
	}
	else if(req.query.session){
		session = req.query.session;
	}
	//管理修改密码,直接重置密码
	if(req.session.user==session){
		if(arr[1]==3){
			administrator_change_password(phone,function(result){
				returnJson(result);
			});
		}
		else{
			result ={
				err:true,
				result:"权限不匹配"
			}
		}
	}
	else{
		result = {
			err:true,
			result:"session比对出错"
		}
	}
	next();
},function(req,res){
	//用户修改密码
	//kind 1按密码修改,2按短信验证修改
	var session,phone,password,npassword,kind,arr,str;
	str = req.session.user;
	arr = querystring.parse(str,'&','=');
	if(req.body.session){
		session = req.body.session;
		kind = req.body.kind;
		password = req.body.password;
		npassword = req.body.npassword;
	}
	else if(req.query.session){
		session = req.query.session;
		kind =req.query.kind;
		password = req.query.password;
		npassword = req.query.npassword;
	}
	if(req.session.user==session){
		if(arr[1]==1){
			Cipher(arr[0],password,npassword,kind,function(result){
				returnJson(result);
			})
		}
		else{
			result = {
				err:true,
				result:"权限不匹配"
			}
		}
	}
	else{
		result = {
			err:true,
			result:"session比对出错"
		}
		callback(result);
	}
})
//普通用户验证码修改密码
router.use('/vcipher',function(req,res){
	var session,npassword,vcode,str,arr;
	if(req.body.session){
		session = req.body.session;
		npassword = req.body.npassword;
		vcode = req.body.vcode;
	}
	else if(req.query.session){
		session = req.query.session;
		npassword = req.query.npassword;
		vcode = req.query.vcode;
	}
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	if(req.session.user==session){
		if(arr[3]==vcode){
			Vcipher(req,phone,npassword,function(result){
				returnJson(result);
			})
		}
		else{
			result = {
				err:true,
				result:"验证码错误"
			}
			returnJson(result);
		}
	}
	else{
		result = {
			err:true,
			result:"session比对出错"
		}
		returnJson(result);
	}
})
//修改手机号发送验证码
router.use('/bind',function(req,res){
	var session,phone,str,arr,vcode;
	str = req.session.usr;
	arr = querystring.parse(str,"&","=");
	if(req.body.session){
		session = req.body.session;
	}
	else if(req.query.session){
		session = req.query.session;
	}
	if(session==req.session.user){
		phone = arr[0];
		vcode = Math.round(Math.random() * (9999-1000)) + 1000;
		req.session.user = req.session.user + "&pvcode="+vcode; 
		///////发送验证码给手机


	}
	else{
		result = {
			err:true,
			result:"session比对出错"
		}
		returnJson(result);
	}

})
//修改手机号绑定
router.use('/bind',function(req,res){
	var session,phone,nphone,vcode,str,arr;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	if(req.body.session){
		//用户验证码修改手机号绑定
		session = req.body.session;
		phone = req.body.phone;
		nphone = req.body.nphone;
		vcode = req.body.vcode;
	}
	else if(req.query.session){
		session = req.query.session;
		phone = req.query.phone;
		nphone= req.query.nphone;
		vcode = req,query.phone;
	}
	if(req.session.user==session){
		if(vcode==arr[3]&&phone==arr[0])
		{
			Ubind(phone,nphone,function(result){
				returnJson(result);
			})
		}
		else{
			result = {
				err:true,
				result:"验证码错误"
			}
			returnJson(result);
		}
	}
	else{
		result = {
			err:true,
			result:"session比对出错"
		}
		returnJson(result);
	}
})
router.use('',function(req,res){
})
module.exports = router;