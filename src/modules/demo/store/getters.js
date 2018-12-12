const getters = {
    getterParams: state => state.params,
    getterList: state => state.sellerData.resData.data.list,
    getterSite: state => state.sellerData.resData.data.conf.site,
    getterPage: state => state.pager,
    getterTabs: state => state.tabs,
    getterOrders: state => state.orders,
}
export default getters;