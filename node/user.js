//grade=0待通过注册,grade=1普通用户,grade=2二级管理,grade=1一级管理;
var express = require('express');
var router = express.Router();
var app= express();
var multer = require('multer');
var upload = multer({dest:'uploads/'})
var querystring= require('querystring');
var Register = require('./register/register.js');
var Vcode = require('./register/vcode.js');
var Login = require('./login/login.js');
var Find_personal = require('./all/find_personal.js');
var Bind = require('./all/bind.js');
//按商品的名字查找商品
var Find_goods_name = require('./all/find_goods_name.js');
var Vcipher = require('./user/vcipher');
//给热度商品加1热度
var Ahotgood = require('./user/ahotgood.js');
//查找热度商品
var Fhotgood  =require('./user/Fhotgood.js');
//上传订单的信息
var Upload_message = require('./user/message.js');
//增加商品
var Check = require('./administrator/check.js');
var Rank = require('./administrator/rank.js');
var Add_goods = require('./administrator/add_goods.js')
var Change_goods_num = require('./administrator/change_goods_num.js');
var Change_goods_name = require('./administrator/change_goods_name.js');
var Change_goods_photo  = require('./administrator/change_goods_photo.js');
var Find_goods_all = require('./administrator/find_goods_all.js');
var Find_goods_num = require('./administrator/find_goods_num.js');
var Find_person_goods = require('./administrator/find_person_goods.js');
//用户添加商品
var User_add_goods = require('./user/user_add_goods.js');
//用户修改当天商品数量
var User_change_goods = require('./user/user_change_goods.js');
//用户查找自己哪些日期有订单
var User_find_date = require('./user/user_find_date');
//用户查找某日期下提交的订单
var User_find_goods = require('./user/user_find_goods');
var A_change_goods = require('./administrator/a_change_goods.js');
var A_unit_goods = require('./administrator/a_unit_goods.js');
var A_delete_goods = require('./administrator/a_delete_goods.js');
var Sendwords = require('./message/sendwords.js');
var Receivewords = require('./message/receivewords.js');
var Findmessage=require('./message/findmessage.js');
var Findwords = require('./message/findwords.js');
//返回result给前端函数
function returnJson(req,res,result){
	 	if(req.jsonp){
	 		res.jsonp(result);
	 	}
	 	else{
	 		res.json(result);
	 	}
}
//验证手机号的正则
function isPhone(text){
	//手机号格式  
	var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
    if (!myreg.test(text)) {  
        return false;  
    } 
    else{  
        return true;  
    }  
} 
//验证名字的正则
function isName(text){
	//名字可以有外国名
	var myreg=/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/  ;  
    if (!myreg.test(text)) {  
        return false;  
    } 
    else{  
        return true;  
    }
}
//验证短信验证码的正则
function isVcode(text){
	//四位整数  
	var myreg=/^\d{4}$/;  
    if (!myreg.test(text)) {  
        return false;  
    } 
    else{  
        return true;  
    }  
} 
//验证mark的正则
function isMark(text){
	//浮点数的正则
	var myreg=/^(\-|\+)?\d+(\.\d+)?$/;
    if (!myreg.test(text)) {  
        return false;  
    } 
    else{  
        return true;  
    }  
}
//验证密码的正则
function isPassword(text){
	//6到12为数字和的字母的组合
	var myreg= /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
    if (!myreg.test(text)) {  
        return false;  
    } 
    else{  
        return true;  
    }  
}
//验证留言的正则
function isWords(text){
	//1到150个字符不加/
	var myreg=/[^/]{1,150}$/;
    if (!myreg.test(text)) {  
        return false;  
    } 
    else{  
        return true;  
    }
}
//验证等级
function isGrade(text){
	//0到n的整数
	var myreg=/^[0-9]*[0-9][0-9]*$/;
    if (!myreg.test(text)) {  
        return false;  
    } 
    else{  
        return true;  
    }  
}
//商品名字
function isGoods(text){
	//商品名字不超过15个字
	var myreg=/[^/]{1,15}$/;
    if (!myreg.test(text)) {
        return false;  
    } 
    else{  
        return true;  
    }  
}
//验证时间
function isTime(text){
		var date = new Date();
		var time1 = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
		//正则判断
		if(text ==time1){
			return true;
		} 
		else{
			return false;
		}
}
//验证session中间件
function Session(req,res,next){
	if(req.cookies.session_from_lb){
		next();
	}
	else{
		result = {
			err:false,
			result:"session匹配失败"
		}
		returnJson(req,res,result);
	}
}
function owner(req,res,next){
	//验证一级管理员
	var str,arr;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
		if(arr[1]==3){
			next();
		}
		else{
			result = {
				err:"true",
				result:"权限不匹配"
			}
			returnJson(req,res,result);
		}
}
function administrator(req,res,next){
	//验证二级管理员
	var str,arr;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
		if(arr[1]==2){
			next();
		}
		else{
			result = {
				err:"true",
				result:"权限不匹配"
			}
			returnJson(req,res,result);
		}
}
function customer(req,res,next){
	//验证用户以及以上
	var str,arr;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
		if(arr[1]>=1){
			next();
		}
		else{
			result = {
				err:"true",
				result:"权限不匹配"
			}
			returnJson(req,res,result);
		}
}
router.use('/vcode',function(req,res){
	var phone;
	if(req.body.phone){
		phone = req.body.phone;
	}
	else if(req.query.phone){
		phone = req.query.phone;
	}
	if(isPhone(phone)){
		Vcode(phone,function(result){
			returnJson(req,res,result);
		})
	}
	else{
		result = {
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result);
	}
})
//注册上传的接口
//grade的等级为0就是连普通用户也不算
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
	if(isPhone(phone)&&isPassword(password)&&isName(name)&&isVcode(vcode)){
		Register(phone,password,name,vcode,function(result){
			returnJson(req,res,result);
		})
	}
	else{
		result={
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result);
	}	
})
///用户登录的接口
router.use('/login',function(req,res){
	var phone,password,grade;
    if(req.body.phone){
		phone = req.body.phone;
		password = req.body.password; 
	}
	else if(req.query.phone){
		phone = req.query.phone;
		password = req.query.password;
	}
	if(isPhone(phone)&&isPassword(password)){
		Login(req,phone,password,function(result){
			returnJson(req,res,result);
		})
	}
	else{
		result={
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result);
	}
})
//一级和二级管理员同意和回驳用户的注册信息
router.use('/check',Session,function(req,res){
	var str,arr,phone,agree,canrun;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	//第一个phone,第二个管理等级，第三个随机数
	if(req.body.phone){
		phone =req.body.phone;
		agree = req.body.agree;//1为同意注册，0为不同意注册并且删除
	}
	else if(req.query.phone){
		phone = req.query.phone;
		agree = req.query.agree;
	}
	if(isphone(phone)){
		if(arr[1]==3)
		{
			Check(phone,agree,function(result){
				returnJson(req,res,result)
			})
		}
		else{
			result = {
				err:true,
				result:"权限不匹配"
			}
			returnJson(req,res,result);
		}
	}
	else{
		result = {
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result)
	}
})
///管理员管理二级管理权限grade1为下发普通用户，2为下发一级管理
router.use('/rank',Session,function(req,res){
	var phone,password,name;
	var str = req.session.user;
	var arr = querystring.parse(str,"&","=");
	if(req.body.phone){
		phone = req.body.phone;
		grade = req.body.grade;
	}
	else if(req.query.phone){
		phone = req.query.phone;
		grade = req.query.grade;
	}
	if(isphone(phone)&&isGrade(grade)){
		if(arr[1]==3){
			Rank(phone,grade,function(result){
				returnJson(req,res,result);
			})
		}
		else{
			result = {
				err:true,
				result:"权限不匹配"
			}
			returnJson(req,res,result);
		}
	}
	else{
		result = {
			err:true,
			result:"正则不匹配"
		}
	}
})
//退出登录
router.use('/close',Session,function(req,res){
	var result;
		req.session.user = null;
		result = {
			err:true,
			result:"已经退出登录"
		} 
	returnJson(req,res,result);
})
//修改密码
router.use('/cipher',Session,function(res,req,next){
	var phone,arr,str;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	//管理修改密码,直接重置密码
		if(arr[1]==3){
			administrator_change_password(phone,function(result){
				returnJson(req,res,result);
			});
		}
		else{
			next();
		}
},function(req,res){
	//用户修改密码
	//kind 1按密码修改,2按短信验证修改
	var session,phone,password,npassword,kind,arr,str;
	str = req.session.user;
	arr = querystring.parse(str,'&','=');
	if(req.body.kind){
		kind = req.body.kind;
		password = req.body.password;
		npassword = req.body.npassword;
	}
	else if(req.query.kind){
		kind =req.query.kind;
		password = req.query.password;
		npassword = req.query.npassword;
	}
	if(isPassword(password)&&isPassword(npassword)){
		if(arr[1]==1){
			Cipher(arr[0],password,npassword,kind,function(result){
				returnJson(req,res,result);
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
			result:"正则不匹配"
		}
		returnJson(req,res,result)
	}
})
//普通用户短信验证码修改密码
router.use('/vcipher',Session,function(req,res){
	var npassword,vcode,str,arr;
	if(req.body.vcode){
		npassword = req.body.npassword;
		vcode = req.body.vcode;
	}
	else if(req.query.vcode){
		npassword = req.query.npassword;
		vcode = req.query.vcode;
	}
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	if(isPassword(npassword)&&isVcode(vcode)){
		if(arr[3]==vcode){
			Vcipher(req,phone,npassword,function(result){
				returnJson(req,res,result);
			})
		}
		else{
			result = {
				err:true,
				result:"验证码错误"
			}
			returnJson(req,res,result);
		}
	}
	else{
		result = {
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result);
	}
})
//修改手机号发送验证码
router.use('/bind',Session,function(req,res){
	var phone,str,arr,vcode;
	str = req.session.usr;
	arr = querystring.parse(str,"&","=");
		phone = arr[0];
		vcode = Math.round(Math.random() * (9999-1000)) + 1000;
		req.session.user = req.session.user + "&pvcode="+vcode; 
		///////发送验证码给手机

		result ={
			err:false,
			result:"发送验证码成功"
		}
		returnJson(req,res,result);
})
//修改手机号绑定
router.use('/ubind',Session,function(req,res){
	var phone,nphone,vcode,str,arr;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	if(req.body.phone){
		//用户验证码修改手机号绑定
		phone = req.body.phone;
		nphone = req.body.nphone;
		vcode = req.body.vcode;
	}
	else if(req.query.phone){
		phone = req.query.phone;
		nphone= req.query.nphone;
		vcode = req.query.vcode;
	}
	if(isphone(phone)&&isphone(nphone)&&isVcode(vcode)){
		if(vcode==arr[3]&&phone==arr[0])
		{
			Bind(phone,nphone,function(result){
				returnJson(req,res,result);
			})
		}
		else{
			result = {
				err:true,
				result:"验证码错误"
			}
			returnJson(req,res,result);
		}
	}
	else{
		result = {
			err:true,
			result:"正则不匹配"
		}
	}
})
//一级管理直接修改手机号
router.use('/abind',Session,function(req,res){
	var phone,nphone;
	var str,arr;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	if(req.body.phone){
		phone = req.body.phone;
		nphone = req.body.nphone;
	}
	else if(req.query.phone){
		phone = req.query.phone;
		nphone = req.query.nphone;
	}
	if(isphone(phone)&&isphone(nphone)){
		if(arr[1]==3){
			Bind(phone,nphone,function(result){
					returnJson(req,res,result);
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
		result= {
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result)
	}
})
///查找个人信息
router.use('/ufperson',Session,function(req,res,next){
	var phone,str,arr;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
		if(arr[1]==1)
		{
			phone = arr[0];
			Find_personal(phone,function(result){
				returnJson(req,res,result);
			})
		}
		// else if(arr[1]==2||arr[1]==3){
		// 	Find_personal(phone,function(result){
		// 		returnJson(req,res,result)
		// 	})
		// }
})
//查看所有人的个人信息
router.use('/findall',Session,function(res,res){
	var str,arr;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	if(arr[1]==3||arr[1]==2){
		Find_all(function(result){
			returnJson(req,res,result);
		})
	}
	else{
		result = {
			err:true,
			result:"权限不匹配"
		}
		returnJson(req,res,result);
	}
})
//管理员查找某个人的信息
router.use('afperson',function(req,res){
	var str,arr,person;
	str = req.session.user;
	arr = querystring.parse(str,'&','=');
	if(req.body.person){
		person = req.body.person;
	} 
	else if(req.query.person){
		person = req.query.person;
	}
	if(arr.user==person){

	}
	else if(){

	}
})
//管理员上传物品文件信息 
router.use('/addgoods', upload.single('file'),Session,administrator,function(req,res){
	var name,unit;
	var file = req.file;
	var filename = "../static/"+file.filename+".png"
	// var filedownload = "static/"+file.filename+".png"
    if(req.body.name){
  		name = req.body.name;
    } 
    else if(req.query.name){
  		name = req.query.name;
  	}
	if(isGoods(name)){
		Add_goods(filename,file,name,function(result){
	  	returnJson(req,res,result);	
	  	});
	}
	else{
		result = {
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result);
	}
})
//修改物品数量
router.use('/cgnum',Session,owner,function(req,res){
	var name,num;
	if(req.body.num){
		num = req.body.num;
		name = req.body.name;
	}
	else if(req.query.num){
		num = req.query.num;
		name = req.query.name;
	}
	if(isGoods(name)&&isGrade(num)){
		Change_goods_num(name,num,function(result){
			returnJson(req,res,result);
		});
	}
	else{
		result = {
			err:true,
			result:"正则不匹配"
		}
		returnJson(result);
	}
})
//改变商品名字
router.use('/cgname',Session,owner,function(req,res){
	var name,nname;
	//修改物品的名字
	if(req.body.name){
		name = req.body.name;
		nname = req.body.nname;
	}	
	else if(req.query.name){
		name = req.query.name;
		nname = req.query.nname;
	}
	if(isGoods(name)&&isGoods(nname)){
		change_goods_name(name,nname,function(result){
			returnJson(req,res,result)
		});
	}
	else{
		result ={
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result);
	}
})
//改变商品图片
router.use('/cgphoto',Session,owner,function(req,res){
	//管理员修改图片
	if(req.file){
		req.body.name= name;
		file = req.file;
		var filename = "./img/"+file.filename+".png";
		if(isGoods(name)){
			Change_goods_photo(filename,file,name,function(result){
				returnJson(req,res,result);
			})
		}
		else{
			result = {
				err:true,
				result:"正则不匹配"
			}
			returnJson(req,res,result)
		}
	}
	else{
		result ={
			err:true,
			result:"图片文件没上传"
		}
		returnJson(req,res,result);
	}
})
//按名字查询商品
router.use('/fgname',Session,function(req,res){
	var name;
	if(req.body.name){
		name = req.body.name;
	}
	else if(req.query.name){
		name = req.query.name;
	}
	if(isName(name)){
		Find_goods_name(name,function(result){
			returnJson(req,res,result);
		});
	}
	else{
		result ={
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result);
	}
})
//查询全部商品和为零的商品
router.use('/fgall',Session,function(req,res){
	//查找全部商品
		Find_goods_all(function(result){
			returnJson(req,res,result);
		})
})
//删除商品
router.use('/dgoods',Session,owner,function(req,res){
	var name;
	if(req.body.name){
		name = req.body.name;
	}  
	else if(req.query.name){
		name = req.query.name;
	}
	if(isName(name)){
		Delete_goods(name,function(result){
			returnJson(req,res,result);
		});
	}
	else{
		result={
			err:false,
			result:"正则不匹配"
		}
		returnJson(req,res,result);
	}
})
//用户添加商品
router.use('/customers',Session,function(req,res){
	//添加当天的商品信息
	//person从session中获取
	// var str,arr,name,num,person,date,unit;
	var goods;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	person = arr.user;
	if(req.body.goods){
		goods = req.body.goods;
		time = req.body.time;
	}
	else if(req.query.goods){
		goods = req.query.goods;
		time = req.query.time;
	}
	//将字符串解析为数组对象
	vegetables = JSON.parse(goods);
	//正则判断
	if(isTime(time)){
		User_add_goods(vegetables,time,person,function(result){
			returnJson(req,res,result);
		});
	}
	else{
		result= {
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result);
	}
})
//用户查找自己的购物日期
router.use('/ufdate',Session,function(req,res){
	var person,arr,str;
	str = req.session.user;
	arr = querystring.parse(str,'&','=');
	person = arr.user;
	User_find_date(person,function(result){
		returnJson(req,res,result);
	});
})
//用户查找自己某天的商品信息
router.use('/ufgdate',Session,function(req,res,next){
	var str,arr,person,date;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	person = arr.user;
		if(req.body.date){
			date = req.body.date;
		}
		else if(req.query.date){
			date = req.query.date;
		}
		User_find_goods(date,person,function(result){
			returnJson(req,res,result);
		})
})
//用户自己修改当天商品数量
router.use('/ucgnum',Session,customer,function(req,res){
	//修改数量
	var date = new Date();
	var time1 = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
	var name,ndaum,person,time;
	if(req.body.num){
		name = req.body.name;
		num = req.body.num;
		person = req.body.person;
		time =req.body.time;
		unit = req.body.unit;
	}
	else if(req.query.name){
		name = req.query.name;
		num = req.query.num;
		person = req.query.person;
		time = req.query.time;
		unit = req.query.unit;
	}
	if(isGrade(num)&&isGoods(name)&&isphone(person)&&isGrade(time)){
		if(time==time1){			
			if(arr[0]==person){
				User_change_goods(name,num,unit,person,time,function(result){
					returnJson(result);
				});
			}
			else{
				result = {
					err:true,
					result:"信息不匹配"
				}
			}
		}
		else{
			result={
				err:true, 
				result:"时间参数不匹配"
			}
		}
	}
	else{
		result = {
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result);
	}
})
//管理员查看信息按照日期
router.use('/afgdate',Session,function(req,res,next){
	var str,arr;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	var date;
	if(arr[1]>1){
		if(req.body.date){
			date = req.body.date;
		}
		else if(req.query.date){
			date = req.query.date;
		}
		if(isGoods(date)){
			Find_date_goods(date,function(result){
				returnJson(req,res,result);
			})
		}
		else{
			result = {
				err:true,
				result:"正则不匹配"
			}
			returnJson(req,res,result);
		}
	}
	else{
		result = {
			err:true,
			result:"权限不匹配"
		}
		returnJson(req,res,result);
	}
})
//管理员按人名查询商品
router.use('/afgname',Session,function(req,res,next){
	var str,arr,person;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	if(arr[1]>1){
		if(req.body.person){
			person = req.body.person;
		}
		else if(req.query.person){
			person = req.query.person;
		}
		if(isGoods(person)){
			Find_person_goods(person,function(result){
				returnJson(req,res,result);
			});
		}
		else{
			result = {
				err:true,
				result:"正则不匹配"
			}
			returnJson(req,res,result);
		}
	}
	else{
		result = {
			err:true,
			result:"权限不匹配"
		}
		returnJson(req,res,result);
	}
})
//管理员修改信息
router.use('/acgnum',Session,owner,function(req,res){
	//修改商品的多少
	var name,date,person,num;
	if(req.body.num){
		num = req.body.num;
		date = req.body.date;
		name = req.body.name;
		person = req.body.person;
	}
	else if(req.query.num){
		num = req.query.num;
		date = req.query.date;
		name = req.query.name;
		person = req.query.person;
	}
	if(isGrade(num)&&isGoods(date)&&isGoods(name)&&isphone(person)){
		A_change_goods(name,num,person,date,function(result){
			returnJson(req,res,result);
		});
	}
	else{
		result = {
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result);
	}
})
//管理员修改商品单位
router.use('acgunit',Session,owner,function(req,res){
	//修改商品单位
	var person,unit,date,name;
	if(req.body.unit){
		unit = req.body.unit;
		date = req.body.date;
		name = req.body.name;
		person = req.body.person;
	}
	else if(req.query.unit){
		unit = req.query.unit;
		date = req.query.date;
		name = req.query.name;
		person = req.query.person;
	}
	if(isphone(person)&&isGoods(unit)&&isGoods(date)&&isGoods(name)){
		A_unit_goods(name,person,date,unit,function(result){
			returnJson(res,req,result);
		})
	}
	else{
		result = {
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result);
	}
})
//删除某件商品
router.use('/acgdelete',Session,owner,function(req,res){
	//删除某个数据
	var name,date,person;
	if(req.body.name){
		name = req.body.name;
		date = req.body.date;
		person = req.body.person;
	}
	else if(req.query.name){
		name = req.query.name;
		date = req.query.date;
		person = req.query.person;
	}
	if(isphone(person)&&isGoods(date)&&isGoods(name)){
		A_delete_goods(name,date,person,function(result){
			returnJson(req,res,result);
		});
	}
	else{
		result ={
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result);
	}
})
//留言板

//上传留言
router.use('/sendwords',Session,function(req,res){
	//上传留言
	var phone,words,mark,str,arr;
	str = req.session.user;
	arr =querystring.parse(str,"&","=");
	if(req.body.phone){
		phone = arr[0];
		words = req.body.words;
	}
	else if(req.query.phone){
		phone = arr[0];
		words = req.query.words;
	}
	mark = Math.random()*100;
	if(isWords(words)){
		Sendwords(phone,words,mark,function(result){
			returnJson(req,res,result);
		});
	}
	else{
		result = {
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result);
	}
})

//回复留言
router.use('/receivewords',Session,function(req,res){
	//上传回复留言
	var sendphone,acceptphone,words,mark,acceptphone;
	var str,arr;
	arr = querystring.parse(str,"&","=");
	if(req.body.sendphone){
		sendphone = req.body.sendphone;
		words = req.body.words;
		acceptphone = req.body.acceptphone;
		mark = req.body.mark;
	}
	else if(req.query.sendphone){
		sendphone = req.query.sendphone;
		acceptphone = req.query.acceptphone;
		words = req.query.words;
		mark = req.query.mark;
	}
	if(arr[0]==sendphone&&isphone(acceptphone)&&isWords(words)&&isMark(mark)){
		Receivewords(sendphone,acceptphone,words,mark,function(result){
			returnJson(req,res,result);
		});
	}
	else{
		result = {
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result);
	}
})

//查看主留言
router.use('/findmessage',Session,function(req,res){
	//查看主留言
	var str,arr;
	arr = querystring.parse(str,"&","=");
	if(arr[1]>0){
		Findmessage(function(result){
			returnJson(req,res,result);
		});
	}
	else{
		result ={
			err:true,
			result:"权限不匹配"
		}
	}

})

//查看回复留言
router.use('/findwords',Session,function(req,res){
	//查看回复留言
	var str,arr,mark;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	if(str[1]>0){
		if(req.body.mark){
			mark = req.body.mark;
		}
		else if(req.query.mark){
			mark = req.query.mark;
		}
		if(isMark(mark)){
			Receivewords(mark,function(result){
				returnJson(req,res,result);
			});
		}
		else{
			result = {
				err:true,
				result:"正则不匹配"
			}
			returnJson(req,res,result);
		}
	}
	else{
		result = {
			err:true,
			result:"权限不匹配"
		}
		returnJson(req,res,result);
	}
})
//添加热门商品
router.use('/ahotgood',Session,function(req,res){
		var name;
		if(req.body.name){
			name = req.body.name;
		}
		else if(req.query.name){
			name = req.query.name;
		}
		//给热门的商品热度加1
		Ahotgood(name,function(result){
			returnJson(req,res,result);
		})
})
//查询热门商品
router.use('/fhotgood',Session,function(req,res){
	//查找商品
	Fhotgood(function(result){
		returnJson(req,res,result);
	})
})
//上传订单备注
//uploadmessage
router.use('/umessage',Session,function(req,res){
	var name,message,date;
	var arr,str;
	str = req.session.user;
	arr = querystring.parse(str,"&","=");
	name = arr.user;
	if(req.body.message){
		message = req.body.message;
		date = req.body.date;
	}
	else if(req.query.message){
		message = req.query.message;
		date = req.query.date;
	}
	if(isWords(message)&&isTime(date)){
		Upload_message(name,message,date,function(result){
			returnJson(req,res,result);
		});
	}
	else{
		result ={
			err:true,
			result:"正则不匹配"
		}
		returnJson(req,res,result);
	}
})
//查看订单备注
module.exports = router;