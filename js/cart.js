new Vue({
  el:"#app",
  data:{
    totalMoney:0,
    productList:[],
    checkFlag:false,
    totlePrice:0,
    delFlag:false,
    curProduct:''
  },
  filters:{
    formatMoney:function(value){
      return "￥" + value.toFixed(2);
    }
  },
  mounted:function() {
    this.$nextTick(function(){
      this.cartView();
    })
  },
  methods:{
    cartView:function() {
      // let _this = this;
      this.$http.get("data/cartData.json").then( res => {
        this.productList = res.body.result.list;
        this.totalMoney = res.body.result.totalMoney;
      })
    },
    changeMoney:function(product,way) {
      if(way>0){
        product.productQuantity++
      }else{
        product.productQuantity--
        if(product.productQuantity<1){
          product.productQuantity = 1
        }
      }
      this.calcTotlePrice();
    },
    selectedProduct:function (item) {
      if(typeof item.checked == 'undefined'){
        //Vue.set(item,'checked',true)
        this.$set(item,'checked',true)
      }else{
        item.checked = !item.checked;
      }
      this.calcTotlePrice();
    },
    checkAll:function () {
      let self = this;
      this.checkFlag = !this.checkFlag;
      this.productList.forEach(function(item,index){
        if(typeof item.checked == 'undefined'){
          self.$set(item,'checked',self.checkFlag)
        }else{
          item.checked = self.checkFlag;
        }
      })
      this.calcTotlePrice();
    },
    calcTotlePrice:function() {
      let self = this;
      this.totlePrice = 0;
      this.productList.forEach(function(item,index) {
        if(item.checked){
          self.totlePrice += item.productPrice*item.productQuantity
        }
      })
    },
    delconfirm:function(item) {
      this.delFlag = true;
      this.curProduct = item
    },
    delProduct:function() {
      var index = this.productList.indexOf(this.curProduct);
      this.productList.splice(index,1);
      this.delFlag = false;
    }
  }
});

Vue.filter("money", function(value,type){
  return "￥" + value.toFixed(2) + type;
})