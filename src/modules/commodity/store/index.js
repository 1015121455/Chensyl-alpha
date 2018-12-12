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
        itemName:'',
        author:'',
        press:'',
        itemSn:'',
        isbn:'',
        price_min:'',
        price_max:'',
        addTime_begin:'',
        addTime_end:'',
        soldTime_begin:'',
        soldTime_end:'',
        catId:'',
        catName:'',
        myCatId:'',
        myCatIdName:'',
        quality:'',
        qualityName:'',
        isDiscount:false,
        noPic:false,
        noStock:false,
        freeShipping:false,
        noMouldId:false,
        complete:true,
        mouldId:'',
        mouldName:'',
        pageCurr:1,
        pageShow:20,
        order_attr:'addTime',
        order_sort:'desc'
    },
    isScreen:false,
    pager:{
        pageCurr: 1,
        pageShow: 20,
        pageNum: 1,
        recordCount: 0
    },
    tabs:[
        {name:'出售中',type:'sale',num:0,active:1},
        {name:'已下架',type:'haltsale',num:0,active:0},
        {name:'需审核',type:'uncertify',num:0,active:0}
    ],
    orders:[
        {name:'上书时间',type:'addTime',sort:'desc',active:1},
        {name:'价格',type:'price',sort:'desc',active:0},
        {name:'库存',type:'number',sort:'desc',active:0}
    ]


}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});

