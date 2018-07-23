<template>
<!-- 		提交订单的按钮 -->
		<div class="pay_prove" v-show="plus">
			<div class="pay_prove_ok" @click ="confirmappear">
				<div class="pay_shopping">
					<div class="pay_shopping_num">{{amount}}</div>
					<div class="pay_shopping_inside">
						<img src="../assets/shopping.png">
					</div>
				</div>
			</div>
			<div class="pay_prove_prove" @click = "prove">去结算</div>
		</div>
</template>
<script type="text/javascript">
	import { mapState} from 'vuex'
	import { mapGetters} from 'vuex'
	import { mapMutations } from 'vuex'
	import { mapActions } from 'vuex'
	export default{
		data(){
			return{}
		},
		computed: {
            ...mapState([
           	'plus',
           	'amount',
           	'confirmshow'
            ]),
        }, 
        methods:{
		    confirmappear:function(){
		    	this.$store.commit('changeconfirm');		    
		    },
		    prove:function(){
		    	this.$router.push('/prove');
		    }
        }, 
	}
</script>
<style type="text/css">
	.pay_prove{
		position:fixed;
		width: 100%;
		height: 12.8vw;
		z-index: 50;
		bottom: 0px;
		background-color: white;
		z-index: 600;
	}
	.pay_prove_ok{
		position: relative;
		width: 72%;
		height: 12.8vw;
		float: left;
		font-size: 18px;
		line-height: 12.8vw;
		color: white;
		background-color: rgba(61,61,63,0.9);
		text-align: center;
	}
	.pay_shopping{
		position: relative;
		width: 13.8vw;
		height: 13.8vw;
		background-color: #444;
		border-radius: 13.8vw;
		left: 4vw;
		bottom: 2.8vw;
	}
	.pay_shopping_num{
		position: relative;
		width: 4.2vw;
		height: 4.2vw;
		background-color: red;
		border-radius: 4.2vw;
		color: white;
		text-align: center;
		line-height: 4.2vw;
		font-size: 12px;
		left: 8vw;
		z-index: 6;

	}
	.pay_shopping_inside{
		position: relative;
		width: 11.5vw;
		height: 11.5vw;
		background-color: #444;
		border-radius: 10.8vw;
		background-color: #3190e8;
		left: 1vw;
		top: -2vw;
		z-index: 5;
	}
	.pay_shopping_inside img{
		margin-top: 2.4vw;
		width: 7.2vw;
		height: 7.2vw;
	}
	.pay_prove_prove{
		position: relative;
		width: 28%;
		height: 12.8vw;
		float: right;
		font-size: 16px;
		line-height: 12.8vw;
		color: white;
		background-color: #38ca73;
		text-align: center;
		float: left;
		font-weight: 700;
	}
</style>