import qs from  'qs'
import Axios from 'axios'
// import { ZHEURL } from '../../common/utils/base'
import Jsonp from '../../../common/utils/jsonp'


//Axios.defaults.withCredentials = true;
const actions = {
    /*获取商品列表*/
    getItemList({ commit, state}, payload) {
        return new Promise((resolve, reject) => {
            state.sellerData.isSuccess = false;
            Axios.get('/api-seller/pc/item/unsoldList', {
                params: state.params
            }).then(function (res) {
                if(res.data.status){
                    commit('setSellerData',{
                        isSuccess: true,
                        resData: res.data
                    });
                    commit('setItemNum',res.data.data.stat);
                    commit('setPage',res.data.data.pager);
                    resolve(res);
                }else{
                    reject(res);
                    commit('setSellerData',{
                        isSuccess: true,
                        resData: {data:{list:[]}}
                    })
                }
            }).catch(function (error) {
                commit('setSellerData',{
                    isSuccess: true,
                    resData: {data:{list:[]}}
                })
                reject(error);
            });
        })
    },
    /*搜索*/
    search({ commit, state},payload){
        commit('search',payload);
    },
    /*切换tab*/
    letTabChange({ commit, state},payload){
        commit('tabChange',payload);
    },
    /*改变排序*/
    letListOrder({ commit, state},payload){
        commit('listOrder',payload);
    },
    /*筛选*/
    screen({ commit, state},payload){
        commit('screen',payload);
    },
    /*上架*/
    onsale({ commit, state},payload){
        return new Promise((resolve, reject) => {
            Axios({
                url:'/api-seller/pc/item/update',
                method:'post',
                data:qs.stringify(payload.params),
                responseType: 'json'
            }).then(function (res) {
                if(res.data.status){
                    commit('onsale',payload.index);
                }
                resolve(res);
            }).catch(function (error) {
                reject(error);
            });
        })
    },
    /*下架*/
    haltsale({ commit, state},payload){
        return new Promise((resolve, reject) => {
            Axios({
                url:'/api-seller/pc/item/update',
                method:'post',
                data:qs.stringify(payload.params),
                responseType: 'json'
            }).then(function (res) {
                if(res.data.status){
                    commit('haltsale',payload.index);
                }
                resolve(res);
            }).catch(function (error) {
                reject(error);
            });
        })
    },
    /*删除商品*/
    delete({ commit, state},payload){
        return new Promise((resolve, reject) => {
            Axios({
                url:'/api-seller/pc/item/update',
                method:'post',
                data:qs.stringify(payload.params),
                responseType: 'json'
            }).then(function (res) {
                if(res.data.status){
                    commit('delete',payload.index);
                }
                resolve(res);
            }).catch(function (error) {
                reject(error);
            });
        })
    },
    /*批量操作*/
    batchOperateAction({ commit, state},payload){
        return new Promise((resolve, reject) => {
            Axios({
                url:'/api-seller/pc/item/update',
                method:'post',
                data:qs.stringify(payload.params),
                responseType: 'json'
            }).then(function (res) {
                resolve(res);
            }).catch(function (error) {
                reject(error);
            });
        })
    },
    /*复审*/
    applyApproved({ commit, state},payload){
        return new Promise((resolve, reject) => {
            Axios({
                url:'/api-seller/pc/item/applyApproved/',
                method:'get',
                params:payload.params,
                responseType: 'json'
            }).then(function (res) {
                if(res.data.status){
                    commit('applyApproved',payload.index);
                }
                resolve(res);
            }).catch(function (error) {
                reject(error);
            });
        })
    },
    prevPage({ commit, state},payload){
        commit('prevPage',payload);
    },
    nextPage({ commit, state},payload){
        commit('nextPage',payload);
    },
    pagerSkip({ commit, state},payload){
        commit('pagerSkip',payload);
    }
}


export default actions;
