new Vue({
  el:'#container',
  data:{
    addressList:[],
    limitNum:3,
    currentIndex:0,
    delFlag:false,
    currAddr:'',
    addFlag:false,            
    addAddress:'',            //
    shippingMethod:1          //配送方式
  },
  mounted:function(){
    this.$nextTick(function() {
      // body...
      this.getAddr();
    })
  },
  methods:{
    getAddr:function(){
      var _this = this;
      this.$http.get('data/address.json').then( respones => {
        var res = respones.body;
        if(res.status == '0'){
          _this.addressList = res.result;
        }
      })
    },
    loadMore:function(){
      this.limitNum = this.addressList.length;
    },
    setDefault:function(addressId) {
      this.addressList.forEach(function(address,index){
        if(address.addressId == addressId){
          address.isDefault = true
        }else{
          address.isDefault = false
        }
      })
    },
    delconfirm:function(item){
      this.delFlag = true
      this.currAddr = item
    },
    delAddr:function() {
      var index = this.addressList.indexOf(this.currAddr);
      this.currAddr=this.addressList.splice(index,1)
      this.delFlag = false
    },
    //添加新地址
    addAddr:function(aaa){
      this.addFlag = true
      this.addAddress = aaa
    }
  },
  computed:{
    filtAddr:function() {
      return this.addressList.slice(0,this.limitNum)
    }
  }
})