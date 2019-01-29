
import qs from 'query-string' 
import axios from 'axios'

// axios 配置
axios.defaults.timeout = 300000

// axios.defaults.headers = {
//     'X-Requested-With': 'XMLHttpRequest'
// }
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL_API

axios.interceptors.request.use(
    config => {
        
        return config;
    },
)
// http response 拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.errno == 302||response.data.errno == 401) {
            let currentLink = encodeURIComponent(window.location.href);
            let hasParams=response.data.body.location.indexOf('?')!==-1;
            let caslogin = hasParams?response.data.body.location + '&redirect=' + currentLink:response.data.body.location + '?redirect=' + currentLink;
            window.location.href = caslogin+("&t="+parseInt(Math.random()*999)+new Date().getTime())
            return
        }
        if (response.data.errno == 410) {
            let msg=response.data.error
            let obj={
                code:410,
                msg:msg
            }
            if(window.HTTPSTATUS){
                window.HTTPSTATUS.$emit('HTTPSCODE',obj)
            }
            return
        }
        return response;
    },
);
const httpGet = (url, params) => {
    return axios.get(url, {
        params: params
    })
}
const httpPost = (url, formData, qsParams) => {
    if (qsParams) {
        url += '?' + qs.stringify(qsParams)
    }
    return axios.post(url, qs.stringify(formData))
}

const ApiPost = (url, formData,successCb,errorCb) => {
    axios.post(url, qs.stringify(formData)).then((res) => {
        if (res.data.errno == 0) {
            successCb(res.data.body)
        } else {
            errorCb(res)
        }
    }).catch(err => {
        errorCb(err)
    })
}
const ApiGet = (url, params,successCb,errorCb) => {
    axios.get(url, {
        params: params
    }).then((res) => {
        if (res.data.errno == 0) {
            successCb(res.data.body)
        } else {
            errorCb(res)
        }
    }).catch(err => {
        errorCb(err)
    })
}


export {
    ApiGet,
    ApiPost,
    httpGet,
    httpPost,
}