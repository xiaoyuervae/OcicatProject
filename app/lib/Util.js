let NetUtil = {
  //验证是否是邮箱
  checkEmail(str){
    var re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if(re.test(str)){
        return true;
      }else{
        return false;
      }
  }
}
export default NetUtil;