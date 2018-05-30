<template>
	<div class="background">
		<div class="personal_title">点击登陆</div>
		<div class="personal_name">
			<div class="personal_name_mark">名字:</div>
			<div class="personal_name_name">梁博</div>
		</div>
		<div class="personal_company">
			<div class="personal_company_mark">公司:</div>
			<div class="personal_company_company">西安邮电大学</div>
		</div>
		<div class="personal_phone">
			<div class="personal_phone_mark">电话号码:</div>
			<div class="personal_phone_phone">18149498392</div>
		</div>
		<div class="personal_change">
			<input type="button" value="修改电话" name="">
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:"personal",
		data(){
			return {}
		}
	}
</script>
<style type="text/css">
	.background{
		width: 100%;
		height: 1000px;
		background-color: #f0f0f0;
	}
	.personal_name{
		position: relative;
		width: 100%;
		height: 50px;
		background-color: white;
		overflow: hidden;
		top: 30px;
	}
	.personal_company{
		position: relative;
		top: 60px;
		width: 100%;
		height: 50px;
		background-color: white;
		overflow: hidden;
	}
	.personal_phone{
		position: relative;
		width: 100%;
		height: 50px;
		top: 90px;
		background-color: white;
		overflow: hidden;
	}
	.personal_name_mark{
		position: relative;
		width: 100px;
		height: 50px;
		font-size: 30px;
		text-align: center;
		line-height: 50px;
		overflow: hidden;
		float: left;
	}
	.personal_name_name{
		position: relative;
		width: auto;
		height: 50px;
		font-size: 25px;
		line-height: 50px;
		text-indent: 30px;
	}
	.personal_phone_mark{
		position: relative;
		width: 100px;
		height: 50px;
		font-size: 30px;
		text-align: center;
		line-height: 50px;
		overflow: hidden;
		float: left;
	}
	.personal_phone_phone{
		position: relative;
		width: auto;
		height: 50px;
		font-size: 30px;
		line-height: 50px;
		text-indent: 30px;
	}
	.personal_company_mark{
		position: relative;
		width: 100px;
		height: 50px;
		font-size: 30px;
		text-align: center;
		line-height: 50px;
		overflow: hidden;
		float: left;
	}
	.personal_company_company{
		position: relative;
		width: auto;
		height: 50px;
		font-size: 25px;
		line-height: 50px;
		text-indent: 30px;	
	}
	.personal_change{
		position: relative;
		width: 40%;
		height: 50px;
		top: 120px;
		margin-left: 50%;
	}
	.personal_change input{
		position: relative;
		width: 100%;
		height: 100%;
		background-color: white;
		font-size: 25px;
		line-height: 50px;
		text-align: center;
	}
	.personal_title{
		position: relative;
		width: 100%;
		height: 50px;
		text-align: center;
		line-height: 50px;
		font-size: 30px;
		background-color: #fcfcfc;
		color: #0080ff;
	}
</style>