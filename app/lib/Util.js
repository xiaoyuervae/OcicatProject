let Util = {
    //验证是否是邮箱
    checkEmail(str) {
        let re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        return re.test(str) ? true : false;
    },

    isNotBlank(str) {
        return (str == null || str == undefined || str == "") ? true : false;
    }

};
export default Util;