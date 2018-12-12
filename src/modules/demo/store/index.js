import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions.js';
import mutations from './mutations.js'
import getters from './getters.js'
import flexible from '../../../common/utils/flexible.js';
import {getPlatform, getUrlKeyVal} from '../../../common/utils/base.js';
/*rem 布局
* 设计稿的实际宽度值  制作稿的最大宽度值
* */
flexible(750,750);
Vue.use(Vuex);
const state = {
    sellerData:{
       isSuccess: false,
       resData: {
           data:{
               list:[]
           }

       }
    },
    params:{
        type:'sale',
        itemName:null,
        author:null,
        press:null,
        itemSn:null,
        isbn:null,
        price_min:null,
        price_max:null,
        addTime_begin:null,
        addTime_end:null,
        soldTime_begin:null,
        soldTime_end:null,
        catId:null,
        myCatId:null,
        myCatIdName:null,
        quality:null,
        qualityName:null,
        isDiscount:false,
        noPic:false,
        noStock:false,
        freeShipping:false,
        noMouldId:false,
        complete:true,
        catName:null,
        mouldId:null,
        mouldName:null,
        pageShow:10,
        order_attr:null,
        order_sort:null
    },
    pager:{
        pageCurr: 1,
        pageShow: 10,
        pageNum: 1,
        recordCount: 0
    },
    tabs:[
        {name:'出售中',type:'sale',num:0,active:1},
        {name:'已下架',type:'haltsale',num:0,active:0},
        {name:'需审核',type:'uncertify',num:0,active:0}
    ],
    orders:[
        {name:'上书时间',sort:'desc',active:1},
        {name:'价格',sort:'asc',active:0},
        {name:'库存',sort:'asc',active:0}
    ]


}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});

