<template>
	<div>
		<div class="timely_box">
			<div class="timely_now">
				<div class="timely_img">
					<img src="../assets/find.png">
				</div>
				<p>查找<span>"{{goodname}}"</span></p>
			</div>
		</div>
	</div>
</template>
<script type="text/javascript"> 
	import { mapState} from 'vuex'
	export default{
		data(){
			return{
			}
		},
		method:{

		},
		mounted:function(){

		},
		computed:{
            ...mapState([
            	'goodname'
            ]),
		}
	}
</script>
<style type="text/css">
	.timely_box{
		width: 100%;
		height: auto;
		margin: auto;
		position: relative;
		margin-top: 10px;
	}
	.timely_now{
		position: relative;
		width: 95%;
		height: 40px;
	}
	.timely_img{
		position: relative;
		width: 18px;
		height: 18px;
		margin-top: 11px;
		margin-left: 20px;
		margin-right: 5px;
		float: left;
	}
	.timely_img img{
		width: 100%;
		height: 100%;
	}
	.timely_now p{
		float: left;
		width: auto;
		height: 40px;
		line-height: 40px;
		text-indent: 10px;
		font-size: 16px;
		color:#999;
	}
	.timely_now p span{
		color: black;
	}
</style>