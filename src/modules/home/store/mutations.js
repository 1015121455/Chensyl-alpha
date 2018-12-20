const mutations = {
    setSellerData(state,payload)  {
		state.sellerData = payload;
	},
    setItemNum(state,payload){
        state.tabs[0].num = payload.sale;
        state.tabs[1].num = payload.haltsale;
        state.tabs[2].num = payload.uncertify;
    },
    setPage(state,payload){
        payload.pageNum = Math.ceil(payload.recordCount/payload.pageShow);
        state.pager = payload;
    },
    search(state,payload){
        let keyword = payload.replace(' ','').replace('-','');
        if(/^978[0-9]{10}$/.test(keyword) || /^979[0-9]{10}$/.test(keyword) || /^[0-9]{9}[xX]{1}$/.test(keyword) || /^[0-9]{10}$/.test(keyword)){
            state.params.isbn = keyword;
            state.params.itemName = '';
        }else{
            state.params.itemName = keyword;
            state.params.isbn = '';
        }
        if(keyword == ''){
            state.params.itemName = '';
            state.params.isbn = '';
        }
    },
    tabChange(state,payload) {
        state.tabs.map(function (tab, index) {
            tab.active = payload == index ? 1 : 0;
        });
        state.orders = [
            {name:'上书时间',type:'addTime',sort:'desc',active:1},
            {name:'价格',type:'price',sort:'desc',active:0},
            {name:'库存',type:'number',sort:'desc',active:0}
        ];
        state.params.type = state.tabs[payload].type;
        state.params.order_attr = 'addTime';
        state.params.order_sort = 'desc';
        state.params.pageCurr = 1;

    },
    listOrder(state,payload) {
        state.orders.map(function (order, index) {
            order.active = payload.name == order.name ? 1 : 0;
            order.sort = payload.name == order.name ? (order.sort == 'desc' ? 'asc' : 'desc') : 'desc'
        });
        state.params.order_attr = payload.type;
        state.params.order_sort = payload.sort;
        state.params.pageCurr = 1;
    },
    screen(state,payload){
        state.isScreen = payload.isScreen
        state.params = Object.assign(state.params,payload.params);
    },
    onsale(state,payload){
        state.sellerData.resData.data.list.splice(payload,1);
        state.tabs[2].num++;
        state.tabs[1].num--;
    },
    haltsale(state,payload){
        state.sellerData.resData.data.list.splice(payload,1);
        state.tabs[0].num--;
        state.tabs[1].num++;
    },
    delete(state,payload){
        state.sellerData.resData.data.list.splice(payload,1);
        state.tabs.map(function (tab, index) {
            tab.num = tab.type == state.params.type ? tab.num-1 : tab.num;
        });
    },
    applyApproved(state,payload){
        state.sellerData.resData.data.list[payload].certifyStatus = 'waitApproved';
        state.sellerData.resData.data.list[payload].certifyStatusName = '等待复审';
    },
    prevPage(state,payload){
        state.params.pageCurr--;
    },
    nextPage(state,payload){
        state.params.pageCurr++;
    },
    pagerSkip(state,payload){
        state.params.pageCurr = payload || 1;
    }
}

export default mutations;