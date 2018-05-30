<template>
	<div>
		<div class="middle_index">
			<router-view/>
		</div>
		<div class="mark" style="position:fixed;">
	      <router-link tag="p" to="/">
	        <p class="mark_child" >商品</p>
	      </router-link>
	      <router-link tag="p" to="/message">
	        <p class="mark_child" >订单</p>
	      </router-link>
	      <router-link tag="p" to="/personal">
	        <p class="mark_child" >个人信息</p>
	      </router-link>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default{
		name:"important",
		data(){
			return{}
		}
	} 
</script>
<style type="text/css">
	.mark{
		z-index:10;
		width: 100%;
		height: 6vh;
		background-color: #e0e0e0;
		overflow: hidden;
		top: 94vh;
	}
	.mark_child{
		position: relative;
		width: 33.333333333333vw;
		height: 6%;
		text-align: center;
		line-height: 6vh;
		font-size: 25px;
		float: left;
		color: #5b5b5b;		
	}
</style>