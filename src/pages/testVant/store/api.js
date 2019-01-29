import {ApiPost,ApiGet} from '@/api/base'
import config from '@/config/config'
export default{
	getMyPrize(params,successCb,errorCb){
		return ApiGet(`${config.base_url_api}/topic/api/E19Reopen/myPrize`,params,successCb,errorCb)
	},
	getLuck(params,successCb,errorCb) {
		return ApiPost(`${config.base_url_api}/topic/api/E19Reopen/luck`,params,successCb,errorCb)
    },
    getWxShareInfo(params,successCb,errorCb){
        return ApiGet(`${config.base_url_api}/topic/api/E19Reopen/myPrize`,params,successCb,errorCb)
    }
}