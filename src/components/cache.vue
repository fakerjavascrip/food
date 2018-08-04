<template>
	<div v-show="cacheshow" class="cache_box">
		<div class="cache_img">
			<img src="../assets/cache.gif">
		</div>
	</div>
</template>
<script type="text/javascript">
	import {mapState} from 'vuex'
	export default{
        data(){
	        return{
	        }
        }, 
    computed:{
        ...mapState([
        'cacheshow',
        ]),
    },
	}
</script>
<style type="text/css">
	.cache_box{
		position: fixed;
		top: 0px;
		width:100%;
		height: 100vh;
		z-index: 1000;
		background-color:white; 
	}
	.cache_img{
		position: absolute;
		width: 20vw;
		height: 20vw;
		left: 0;right: 0;top: 0;bottom: 0;
		margin: auto;
	}
	.cache_img img{
		width: 100%;
		height: auto;
	}
</style>