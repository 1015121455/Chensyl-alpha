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
    tabChange(state,payload) {
        state.tabs.map(function (tab, index) {
            tab.active = payload == index ? 1 : 0;
        });
        state.params.type = state.tabs[payload].type;
        state.orders = [
            {name:'上书时间',sort:'desc',active:1},
            {name:'价格',sort:'asc',active:0},
            {name:'库存',sort:'asc',active:0}
        ];
    },
    listOrder(state,payload) {
        state.orders.map(function (order, index) {
            order.active = payload.name == order.name ? 1 : 0;
            order.sort = payload.name == order.name ? order.sort == 'desc' ? 'asc' : 'desc' : 'asc'
        });
    }
}

export default mutations;