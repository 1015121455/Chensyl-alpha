<style src="../css/list.css"></style>
<template>
    <div>
        <div class="list">
            <div class="search-box">
                <form action="javascript:;" class="search-form" @submit="searchSubmit($event)">
                    <i class="iconfont icon-dianpushouyesousuo"></i>
                    <input type="search" name="search" class="search-input input" autocomplete="off" @focus="clearShow = true" @blur="searchItem()" v-model.trim="searchName" placeholder="请输入商品名称、ISBN编号">
                    <span class="clear-text" v-show="searchName != '' && clearShow" @mousedown.prevent="clearKeyword()">
                        <i class="iconfont icon-shanchu"></i>
                    </span>
                    <div v-show="!(searchName != '' && clearShow) && needShow" class="scan-code-box" @click="scanCode()">
                        <img src="/h5/seller/img/sao.png" class="scan-code" alt="扫码">
                    </div>
                </form>
                <span class="search-btn" @click="searchItem()">搜索</span>
            </div>

            <ul class="tabs">
                <li class="tab" :class="{'active':tab.active}" v-for="(tab, key) in getterTabs" @click="tabChange(key)">
                    <div>{{tab.name}}</div>
                    <div>({{tab.num}})</div>
                </li>
            </ul>
            <ul class="sort-list" :class="{'old-version':!needShow}">
                <li class="screen-btn" @click="batchOpen()">
                    <div class="screen-btn-box" :class="{'screen-btn-active':batchOperate}">
                        <span>批量</span>
                    </div>
                </li>
                <li class="sort-btn" :class="{'order-active':order.active}" v-for="(order, index) in getterOrders" @click="listOrder(order)">
                    <span>{{order.name}}</span>
                    <span class="sort-icon" :class="[order.sort == 'desc' ? 'order-desc' : 'order-asc']">
                    <i class="iconfont icon-shangshou"></i>
                    <i class="iconfont icon-xiala"></i>
                </span>
                </li>
                <li class="screen-btn" @click="screenOpen()" v-show="needShow">
                    <div class="screen-btn-box" :class="{'screen-btn-active':getterIsScreen}">
                        <span>筛选</span>
                        <i class="iconfont icon-shaixuan"></i>
                    </div>
                </li>
            </ul>
            <loading :hide="getterDataSuccess"></loading>
            <div v-show="getterDataSuccess && getterList.length == 0" class="noitem-box">
                <div v-show="!dataError">
                    <img class="img-noitem" v-show="(getterParams.itemName == '' && getterParams.isbn == '') && !getterIsScreen" src="/h5/seller/img/noitem.png" alt="">
                    <img class="img-search" v-show="(getterParams.itemName != '' || getterParams.isbn != '') && !getterIsScreen" src="/h5/seller/img/search.png" alt="">
                    <p v-show="(getterParams.itemName != '' || getterParams.isbn != '') && !getterIsScreen">抱歉,没有找到与 <i style="color: #8c222c;">{{getterParams.itemName || getterParams.isbn}}</i> 相关的商品</p>
                    <p v-show="getterIsScreen" style="margin-top: 1rem;">没有找到符合条件的商品</p>
                    <div v-show="(getterParams.itemName == '' && getterParams.isbn == '') && !getterIsScreen">
                        <p v-show="getterParams.type == 'sale'">没有在售商品,快去添加商品吧</p>
                        <p v-show="getterParams.type == 'haltsale'">没有已下架的商品</p>
                        <p v-show="getterParams.type == 'uncertify'">没有需审核的商品</p>
                        <div v-show="getterParams.type == 'sale'" class="up-book">
                            <span class="up-btn" @click="scanUpBook">扫码上书</span>
                            <span class="up-btn" @click="upBook">录入上书</span>
                        </div>
                    </div>
                </div>
                <div v-show="dataError">
                    <img class="img-wifi" src="/h5/seller/img/wifi.png" alt="">
                    <p>网络错误,获取商品列表失败</p>
                </div>


            </div>
            <ul class="item-list" v-show="getterDataSuccess && getterList.length > 0" :class="{'batch-operate':batchOperate}">
                <li class="item-box" v-for="(item,index) in getterList">
                    <div class="item" @click="itemDetail({shopId:item.shopId,itemId:item.itemId})">
                        <div class="item-checkbox" v-show="batchOperate" @click.stop="checkedItem(item.itemId)">
                            <i v-show="itemArr.indexOf(item.itemId)  == -1" class="iconfont icon-yuanxuankuang" style="color: #c5c7cc;"></i>
                            <i v-show="itemArr.indexOf(item.itemId)  != -1" class="iconfont icon-chenggong1" style="color: #6982b3;"></i>
                        </div>
                        <div class="item-info pull-right">
                            <a href="javascript:;" class="item-name">{{item.itemName}}</a>
                            <div class="item-content">
                                <div class="discount-price" v-if="item.discount < '100'">
                                    <span><i>￥</i>{{(item.price*item.discount/100).toFixed(2)}}</span>
                                    <span class="discount-num">[{{(item.discount/10).toFixed(1)}}折]</span>
                                </div>
                                <div class="item-row">
                                    <span class="pull-left item-price" :class="{'prime-cost':item.discount < 100}"><i>￥</i>{{item.price}}</span>
                                    <span class="pull-right certify-status" :class="{'red': item.certifyStatus == 'failed' || item.certifyStatus == 'frozen'}" v-show="getterParams.type == 'uncertify'">{{item.certifyStatusName}}</span>
                                    <span class="pull-right" :class="[getterParams.type == 'uncertify' ? 'item-quality-mid' : 'item-quality']">{{item.qualityName}}</span>
                                </div>
                                <div class="item-row">
                                    <span class="pull-left">{{item.number == '0' ? '已订完' : '库存 ' + item.number}}</span>
                                    <span class="pull-right">{{item.date + ' ' +item.time}} 添加</span>
                                </div>
                            </div>
                        </div>
                        <a href="javascript:;" class="item-img pull-right">
                            <img :src="item.imgSrc" @error="imgError($event)" alt="">
                        </a>
                    </div>
                    <div class="operate-list">
                        <div class="operate-box":class="[getterParams.type == 'uncertify' ? 'operate-certified-box' : 'operate-box',{'disabled-box':operate.disabled}]" @click="operateEvent({operate:operate,itemId:item.itemId,index:index})" v-for=" operate in getterParams.type == 'uncertify' ? itemState.uncertify[item.certifyStatus] : itemState[getterParams.type] ">
                            <div class="operate-btn">{{operate.name}}</div>
                        </div>
                    </div>
                </li>
                <li class="no-more" v-if="getterPage.pageCurr == getterPage.pageNum">没有更多数据了</li>
            </ul>
            <div class="page-box" v-show="getterDataSuccess && getterPage.pageNum > 1 && !batchOperate">
                <span class="pull-left prev-page" :class="{'page-diabled': getterPage.pageCurr == 1}" @click="prevPager(getterPage.pageCurr == 1)">上一页</span>
                <span class="page-num">
                <form action="javascript:;" style="display: inline-block;">
                    <input type="tel":value="getterPage.pageCurr" @blur="pagerSkipSubmit($event)">
                </form>
                <span>{{' / ' + getterPage.pageNum }}</span></span>
                <span class="pull-right next-page" :class="{'page-diabled': getterPage.pageCurr == getterPage.pageNum}"@click="nextPager(getterPage.pageCurr == getterPage.pageNum)">下一页</span>
            </div>
            <div class="batch-operate-bottom" :class="{'batch-operate-bottom-ipx':isIpX}" v-show="batchOperate">
                <div class="checked-all" @click="checkedAll(itemArr.length  == getterList.length)">
                    <i v-show="itemArr.length  != getterList.length" class="iconfont icon-yuanxuankuang" style="color: #c5c7cc;"></i>
                    <i v-show="itemArr.length  == getterList.length" class="iconfont icon-chenggong1" style="color: #6982b3;"></i>
                    <span>全选</span>
                </div>
                <div class="batch-operate-box">
                    <span class="batch-operate-btn" :class="{'batch-operate-do-btn':itemArr.length != 0}" v-show="getterParams.type == 'sale'" @click="batchHaltsale()">批量下架</span>
                    <span class="batch-operate-btn" :class="{'batch-operate-do-btn':itemArr.length != 0}" v-show="getterParams.type == 'haltsale'" @click="batchOnsale()">批量上架</span>
                    <span class="batch-operate-btn" :class="{'uncertify-delete':getterParams.type == 'uncertify','batch-operate-do-btn':itemArr.length != 0}" @click="batchDelete()">批量删除</span>
                </div>
            </div>
            <goTop></goTop>
        </div>
        <screen :visible="screenShow" :closeScreen="closeScreen" :defaultSereen="defaultSereen"></screen>
    </div>

</template>
<script>
    import {mapState, mapGetters,mapActions} from 'vuex';
    import KfzJSBridge from '../../../common/utils/KfzJsBridge';
    import ownDialog from '../../../common/components/dialog/';
    import toast from '../../../common/components/toast/';
    import loading from '../../../common/components/loading';
    import goTop from '../../../common/components/goTop';
    import screen from './screen';
    export default {
        name: "list",
        components: {
            screen,
            ownDialog,
            loading,
            goTop,
            KfzJSBridge
        },
        data() {
            return {
                version:{
                    android:'2.0.20',
                    ios:'2.0.20'
                },
                needShow:false,
                scrollTop:'',
                dataError:false,
                searchName:'',
                clearShow:false,
                screenShow:false,
                batchOperate:false,
                isIpX:window.navigator.userAgent.indexOf('iPhone X') != -1,
                itemArr:[],
                itemState:{
                    sale:[{name:'克隆',type:'clone',disabled:0},{name:'下架',type:'haltsale',disabled:0},{name:'删除',type:'delete',disabled:0},{name:'编辑',type:'edit',disabled:0}],
                    haltsale:[{name:'克隆',type:'clone',disabled:0},{name:'上架',type:'onsale',disabled:0},{name:'删除',type:'delete',disabled:0},{name:'编辑',type:'edit',disabled:0}],
                    uncertify:{
                        notCertified:[{name:'克隆',type:'clone',disabled:0},{name:'删除',type:'delete',disabled:0},{name:'编辑',type:'edit',disabled:0}],
                        failed:[{name:'复审',type:'applyApproved',disabled:0},{name:'删除',type:'delete',disabled:0},{name:'编辑',type:'edit',disabled:0}],
                        waitApproved:[{name:'克隆',type:'clone',disabled:1},{name:'删除',type:'delete',disabled:0},{name:'编辑',type:'edit',disabled:0}],
                        frozen:[{name:'克隆',type:'clone',disabled:1},{name:'删除',type:'delete',disabled:0},{name:'编辑',type:'edit',disabled:1}],
                    },
                },
                defaultSereen:true
            }
        },
        mounted() {
            this.needShow = this.cprVersion(this.getVersion().version,this.version[this.getVersion().type]);
            Array.prototype.indexOf = function(val) {
                for (var i = 0; i < this.length; i++) {
                    if (this[i] == val) return i;
                }
                return -1;
            };
            Array.prototype.remove = function(val) {
                var index = this.indexOf(val);
                if (index > -1) {
                    this.splice(index, 1);
                }
            };
        },
        computed: {
            ...mapGetters({
                getterParams:'getterParams',
                getterList: 'getterList',
                getterSite: 'getterSite',
                getterPage: 'getterPage',
                getterTabs: 'getterTabs',
                getterOrders: 'getterOrders',
                getterIsScreen:'getterIsScreen',
                getterDataSuccess:'getterDataSuccess'
            })
        },
        methods: {
            ...mapActions([
                'getItemList',
                'search',
                'screen',
                'letTabChange',
                'letListOrder',
                'prevPage',
                'nextPage',
                'pagerSkip',
                'onsale',
                'haltsale',
                'delete',
                'applyApproved',
                'batchOperateAction'
            ]),
            getList(){
                let that = this;
                that.itemArr = [];
                that.batchOperate = false;
                that.getItemList().then(function (res) {
                    that.dataError = false;
                }).catch(function (err) {
                    if(err.data && err.data.message == '请登录'){
                        location.href = 'https://m.kongfz.com/m/?mustLogin=1&returnUrl=' + location.href;
                    }else{
                        that.dataError = true;
                    }
                });
            },
            scanCode(){
                var that = this;
                KfzJSBridge.methods.openScanCode(function (res) {
                    var time = res;
                    if(typeof res == 'string'){time = JSON.parse(res)}
                    that.searchName = time.data.value;
                    that.searchItem();
                });
            },
            searchSubmit(e){
                e.target.children[1].blur();
            },
            searchItem(){
                this.clearShow = false;
                this.search(this.searchName);
                this.getList();
            },
            clearKeyword(){
                this.searchName = '';
            },
            screenOpen(){
                this.screenShow = true;
                if(window.navigator.userAgent.indexOf('MI-ONE') == -1){
                    document.body.className = 'overflow-hide';
                }
            },
            closeScreen(){
                this.screenShow = false;
                if(window.navigator.userAgent.indexOf('MI-ONE') == -1){
                    document.body.className = '';
                }
            },
            tabChange(index){
                this.defaultSereen = !(this.defaultSereen);
                this.letTabChange(index);
                this.screen({params:{
                    author:'',
                    press:'',
                    itemSn:'',
                    price_min:'',
                    price_max:'',
                    addTime_begin:'',
                    addTime_end:'',
                    catId:'',
                    catName:'',
                    myCatId:'',
                    myCatIdName:'',
                    mouldId:'',
                    mouldName:'',
                    quality:'',
                    qualityName:'',
                    isDiscount:false,
                    noPic:false,
                    noStock:false,
                    freeShipping:false,
                    noMouldId:false,
                    pageCurr:1,
                },isScreen:false});
                this.getList();
            },
            listOrder(order){
                this.letListOrder(order);
                this.getList();
            },
            batchOpen(){
                if(this.batchOperate){
                    this.itemArr = [];
                }
                this.batchOperate = !this.batchOperate;
            },
            itemDetail(params){
                KfzJSBridge.methods.toDetail(params);
            },
            prevPager(disabled){
                if(disabled){return false;}
                this.prevPage();
                this.getList();
            },
            nextPager(disabled){
                if(disabled){return false;}
                this.nextPage();
                this.getList();
            },
            pagerSubmit(e){
                e.target.firstChild.blur();
            },
            pagerSkipSubmit(e){
                let that = this;
                e.target.value = e.target.value == '' ? that.getterPage.pageCurr : e.target.value
                if(e.target.value != that.getterPage.pageCurr){
                    e.target.value = e.target.value > that.getterPage.pageNum ? that.getterPage.pageNum : e.target.value;
                    that.pagerSkip(e.target.value);
                    that.getList();
                }
            },
            imgError(e){
                if(e.target.src == (this.getterSite.m + 'h5/seller/img/error.jpg')){
                    return;
                }else{
                    e.target.src = this.getterSite.m + 'h5/seller/img/error.jpg';
                }
            },
            upBook(){
                let that = this;
                KfzJSBridge.methods.toAddBook({"cmd":"add","addWay":"manual_input"});
                KfzJSBridge.methods.viewDidAppear(function(){
                    that.getList();
                });
            },
            scanUpBook(){
                let that = this;
                KfzJSBridge.methods.toAddBook({"cmd":"add","addWay":"scan"});
                KfzJSBridge.methods.viewDidAppear(function(){
                    that.getList();
                });
            },
            goBottm(e){
                /*let input = e.target;
                    this.timerId = setTimeout(function () {
                        input.scrollIntoViewIfNeeded();
                },400);*/
            },
            toNum(str){
                var a= str.toString();
                //也可以这样写 var c=a.split(/\./);
                var c=a.split('.');
                var num_place=["","0","00","000","0000"],r=num_place.reverse();
                for (var i=0;i<c.length;i++){
                    var len=c[i].length;
                    c[i]=r[len]+c[i];
                }
                var res= c.join('');
                return res;
            },
            cprVersion(a,b){
                var _a=this.toNum(a),_b=this.toNum(b);
                if(_a==_b) return true;
                if(_a>_b) return true;
                if(_a<_b) return false;
            },
            getVersion(){
                var param = {
                    version : '',
                    type : 'ANDROID'
                };
                let userAgent = window.navigator.userAgent;
                if(userAgent.indexOf('ANDROID') != -1){
                    param.type = 'android';
                    param.version = userAgent.split('ANDROID_KFZ_COM_')[1].split('_')[0];
                }else if(userAgent.indexOf('IOS') != -1){
                    param.type = 'ios';
                    param.version = userAgent.split('IOS_KFZ_COM_')[1].split('_')[0];
                }
                return param;
            },
            checkedAll(close){
                let that = this;
                if(close){
                    that.itemArr = [];
                }else{
                    that.getterList.forEach(function (item,index) {
                        if(that.itemArr.indexOf(item.itemId) == -1){
                            that.itemArr.push(item.itemId)
                        }
                    });
                }
            },
            /*批量操作商品的选择*/
            checkedItem(itemId){
                if(this.itemArr.indexOf(itemId) == -1){
                    this.itemArr.push(itemId);
                }else{
                    this.itemArr.remove(itemId);
                }
            },
            /*商品的批量上架操作*/
            batchOnsale(){
                let that = this;
                if(that.itemArr.length != 0){
                    that.batchOperateAction({params:{fields: {isOnSale: 1}, itemIds: that.itemArr}})
                        .then(function (res) {
                            if(res.data.status){
                                toast('上架成功',{delay:1500});
                                that.getList();
                            }else{
                                toast(res.data.message||'上架失败',{delay:1500});
                            }
                        }).catch(function () {
                        toast('上架失败,请稍候再试',{delay:1500});
                    });
                }

            },
            /*商品的批量下架操作*/
            batchHaltsale(){
                let that = this;
                if(that.itemArr.length != 0){
                    that.batchOperateAction({params:{fields: {isOnSale: 0}, itemIds: that.itemArr}})
                        .then(function (res) {
                            if(res.data.status){
                                toast('下架成功',{delay:1500});
                                that.getList();
                            }else{
                                toast(res.data.message||'下架失败',{delay:1500})
                            }
                        }).catch(function () {
                        toast('下架失败,请稍候再试',{delay:1500})
                    });
                }
            },
            /*商品的批量删除操作*/
            batchDelete(){
                let that = this;
                if(that.itemArr.length != 0){
                    ownDialog({
                        title: '确定删除选中的商品?',
                        okText: '确定',
                        cancelText: '取消',
                        showCancel:true,
                        cbOk: () => {
                            that.batchOperateAction({params:{fields: {isDelete: 1}, itemIds: that.itemArr}})
                                .then(function (res) {
                                    if(res.data.status){
                                        toast('删除成功',{delay:1500});
                                        that.getList();
                                    }else{
                                        toast(res.data.message||'删除失败',{delay:1500})
                                    }
                                }).catch(function () {
                                toast('删除失败,请稍候再试',{delay:1500})
                            });
                            ownDialog.close();
                        },
                        cbCancel: () => {
                            ownDialog.close();
                        }
                    })
                }
            },
            /*商品的操作事件*/
            operateEvent(param) {
                let that = this;
                if(param.operate.disabled){
                    return;
                }
                switch (param.operate.type){
                    case 'clone':
                        KfzJSBridge.methods.toAddBook({"cmd":"clone","itemId":param.itemId});
                        KfzJSBridge.methods.viewDidAppear(function(){
                            that.getList();
                        });
                        break;
                    case 'onsale':
                        this.onsale({params:{fields: {isOnSale: 1}, itemIds: [param.itemId]},index:param.index})
                            .then(function (res) {
                                if(res.data.status){
                                    toast('上架成功',{delay:1500})
                                }else{
                                    toast(res.data.message||'上架失败',{delay:1500})
                                }
                            }).catch(function () {
                            toast('上架失败,请稍候再试',{delay:1500})
                        });
                        break;
                    case 'haltsale':
                        this.haltsale({params:{fields: {isOnSale: 0}, itemIds: [param.itemId]},index:param.index})
                            .then(function (res) {
                                if(res.data.status){
                                    toast('下架成功',{delay:1500})
                                }else{
                                    toast(res.data.message||'下架失败',{delay:1500})
                                }
                            }).catch(function () {
                            toast('下架失败,请稍候再试',{delay:1500})
                        });
                        break;
                    case 'delete':
                        ownDialog({
                            title: '确定删除这件商品?',
                            okText: '确定',
                            cancelText: '取消',
                            showCancel:true,
                            cbOk: () => {
                                this.delete({params:{fields: {isDelete: 1}, itemIds: [param.itemId]},index:param.index})
                                    .then(function (res) {
                                        if(res.data.status){
                                            toast('删除成功',{delay:1500})
                                        }else{
                                            toast(res.data.message||'删除失败',{delay:1500})
                                        }
                                }).catch(function () {
                                    toast('删除失败,请稍候再试',{delay:1500})
                                });
                                ownDialog.close();
                            },
                            cbCancel: () => {
                                ownDialog.close();
                            }
                        })
                        break;
                    case 'edit':
                        KfzJSBridge.methods.toAddBook({"cmd":"edit","itemId":param.itemId});
                        KfzJSBridge.methods.viewDidAppear(function(){
                            that.getList();
                        });
                        break;
                    case 'applyApproved':
                        this.applyApproved({params:{itemId: param.itemId},index:param.index})
                            .then(function (res) {
                                if(res.data.status){
                                    toast('申请复审成功',{delay:1500})
                                }else{
                                    toast(res.data.message||'申请复审失败',{delay:1500})
                                }
                            }).catch(function () {
                            toast('申请复审失败,请稍候再试',{delay:1500})
                        });
                        break;
                }
            }
        },
        created() {
            let that = this;
            that.getList();
        }
    }

</script>