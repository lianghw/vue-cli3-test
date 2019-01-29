
import Vuex from 'vuex'
import api from './api'

const SET_PRIZE='SET_PRIZE'
const SET_USER_PRIZE='SET_USER_PRIZE'
const SET_STATUS='SET_STATUS'
const MSG='MSG'
const SET_MESSAGE='SET_MESSAGE'
const SET_ERR5008='SET_ERR5008'

const store = new Vuex.Store({
    state:{
        err5008:false,
        showStatusMsg:false,
        has_prize:999,
        status:999,
        message:'',
        user_prize:{
            description:'',
            prize_name:'',
            prize_type:'',
            redpack:'',
            status:0,
        }
    },
    getters:{
        'err5008':state=>state.err5008,
       'getUserPrize':state=>state.user_prize,
       'getHasPrize':state=>state.has_prize,
       'getStatus':state=>state.status,
       'getShowMsg':state=>state.showStatusMsg,
       'message':state=>state.message,
    },
    actions:{
        hideMsg({commit}){
            commit(MSG,false);
        },
        getInfoPrize({commit},params){
            api.getMyPrize(params,function(res){
                commit(SET_PRIZE,res.has_prize);
                commit(SET_USER_PRIZE,res.user_prize);
                if(agho&&res.wx_share){

                    let share_info={
                        'title': res.wx_share.title,
                        'description':res.wx_share.content,
                        'url': encodeURI(window.location.href),
                        'imgUrl':res.wx_share.icon 
                    }
                    new agho.WxShare({
                        'share_info':share_info,
                        'allowShare': true,//是否启用分享
                        'wx_jsApiList': ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'hideAllNonBaseMenuItem','chooseWXPay'],
                    });
                }
                
                
            },function(err){
                var errno=err.data.errno;
                if(errno==5008){

                    commit(SET_ERR5008,true);
                }
                console.log(err,'获取信息失败,"getInfoPrize"')
            })
        },
        apiGetMyPrize({commit},params){
            api.getMyPrize(params,function(res){
                commit(SET_PRIZE,res.has_prize);
                
                commit(SET_STATUS,res.config.status);
                commit(SET_MESSAGE,res.config.message);

                if(res.config.status==1){
                    let _user_prize=res.user_prize||{};
                    _user_prize.status=0
                    commit(SET_USER_PRIZE,_user_prize);
                }

                if(res.config.status==0){
                    commit(MSG,true);
                }else{
                    commit(MSG,false);
                }
            },function(err){
                console.log(err,'获取信息失败,"apiGetMyPrize"')
            })
        },
        apiGetLuck({commit},params){
            api.getLuck(params,function(res){
                let _userPrize=res.userPrize
                _userPrize.status=1;
                commit(SET_USER_PRIZE,_userPrize)
            },function(err){
                console.log(err,'获取信息失败,"apiGetLuck"')
            })
        },
    },
    mutations:{
        [SET_PRIZE](state,data) {
            state.has_prize = data;
        },
        [SET_USER_PRIZE](state,data) {
            state.user_prize = data;
        },
        [SET_STATUS](state,data) {
            state.status = data;
        },
        [MSG](state,data) {
            state.showStatusMsg = data;
        },
        [SET_MESSAGE](state,data){
            state.message = data;
        },
        [SET_ERR5008](state,data){
            state.err5008 = true;
            state.has_prize=0
        },
    },
})
export default store;
