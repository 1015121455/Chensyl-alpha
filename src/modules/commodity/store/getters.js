const getters = {
    getterParams: state => state.params,
    getterDataSuccess: state => state.sellerData.isSuccess,
    getterIsScreen: state => state.isScreen,
    getterList: state => state.sellerData.resData.data.list,
    getterConf: state => state.sellerData.resData.data.conf,
    getterSite: state => state.sellerData.resData.data.conf.site,
    getterPage: state => state.pager,
    getterTabs: state => state.tabs,
    getterOrders: state => state.orders,
}
export default getters;