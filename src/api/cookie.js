
/*
 * @Author: HW.Liang 
 * @Date: 2018-08-21 13:30:02 
 * @Last Modified by: HW.Liang
 * @Last Modified time: 2018-08-21 17:04:27
 */

const COOKIE={
    get(name){
        var v = document.cookie.match('(?:^|;)\\s*' + name + '=([^;]*)');
        return v ? decodeURIComponent(v[1]) : null;
    },
    set(name, value ,expires, path, domain){
        var str = name + "=" + encodeURIComponent(value);
        if (expires != null || expires != '') {
            if (expires == 0) {expires = 100*365*24*60;}
            var exp = new Date();
            exp.setTime(exp.getTime() + expires*60*1000);
            str += "; expires=" + exp.toGMTString();
        }
        if (path) {str += "; path=" + path;}
        if (domain) {str += "; domain=" + domain;}
        document.cookie = str;
    },
    del(name, path, domain){
        document.cookie = name + "=" +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}
export default COOKIE;