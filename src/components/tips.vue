<template>
	<div  class="tips_box">
		<transition  name="fade">
			<div v-if="tipsshow" class="tips_show">{{tips}}</div>
		</transition>
	</div>
</template>
<script type="text/javascript">
	import {mapState} from 'vuex';
	export default{
		data(){
			return{
			}
		},
		methods:{

		},
		computed:{
            ...mapState([
            	'tipsshow',
            	'tips'
            ]),
		},
	}
</script>
<style type="text/css">
.fade-enter-active, .fade-leave-active {
  transition: opacity 1.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
	.tips_box{
		position: fixed;
		width: 100%;
		height:auto;
		line-height: 9vw;
		text-align: center;
		font-size: 14px;
		bottom:30vw;
	}
	.tips_show{
		position: relative;
		width: 36vw;
		height: 100%;
		margin: auto;
		border-radius: 5vw;
		color: white;
		background-color:rgba(61,61,63,0.9);
	}
</style>