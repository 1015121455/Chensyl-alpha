<style src="../css/screen.css"></style>
<template>
    <div class="screen-box" v-show="visible">
        <div class="over-layer" @click="closeMyScreen"></div>
        <div class="select-over-layer" v-show="selectShow"></div>
        <ul class="select-list" v-show="selectShow">
            <li class="select-title"><i class="iconfont icon-you1" @click="selectShow=false"></i><h3>{{selectTitle}}</h3></li>
            <li class="select-item" :class="catChecked(item)" @click="selected(item)" v-for="(item, index) in selectList" :value="item.value ? item.value : item.mouldId">
                <div class="select-name">{{item.name ? item.name : item.mouldName}}</div>
                <i class="iconfont icon-check"></i>
            </li>
        </ul>
        <ul class="screen-list">
            <li class="screen-header">
                <h2 class="screen-title">筛选</h2>
            </li>
            <li class="screen-item-a">
                <span class="screen-label">作者</span>
                <input type="text" v-model="sereenParams.author">
            </li>
            <li class="screen-item-a">
                <span class="screen-label">出版社</span>
                <input type="text" v-model="sereenParams.press">
            </li>
            <li class="screen-item-a">
                <span class="screen-label">货号</span>
                <input type="text" v-model="sereenParams.itemSn">
            </li>
            <li class="screen-item-b">
                <span class="screen-label">价格</span>
                <input type="number" v-model="sereenParams.price_min">
                <span class="line"></span>
                <input type="number" v-model="sereenParams.price_max">
            </li>
            <li class="screen-item-b">
                <span class="screen-label">上书时间</span>
                <span class="add-time">
                    <div class="time-input" @click="addTimeBegin($event)">{{sereenParams.addTime_begin.replace(/-/g,'')}}</div>
                    <img src="/h5/seller/img/time.png" class="time-img" alt="上书时间">
                </span>
                <span class="line"></span>
                <span class="add-time">
                    <div class="time-input" @click="addTimeEnd($event)">{{sereenParams.addTime_end.replace(/-/g,'')}}</div>
                    <img src="/h5/seller/img/time.png" class="time-img" alt="上书时间">
                </span>
            </li>
            <li class="screen-item-c" @click="itemCat">
                <span class="screen-label">商品分类</span>
                <span class="cat-name">{{sereenParams.catName}}</span>
                <i class="iconfont icon-you1"></i>
            </li>
            <li class="screen-item-c" @click="myCat">
                <span class="screen-label">本店分类</span>
                <span class="cat-name">{{sereenParams.myCatIdName}}</span>
                <i class="iconfont icon-you1"></i>
            </li>
            <li class="screen-item-c" @click="shipping">
                <span class="screen-label">运费模板</span>
                <span class="cat-name">{{sereenParams.mouldName}}</span>
                <i class="iconfont icon-you1"></i>
            </li>
            <li class="screen-item-c quality" @click="qualityOpen = !qualityOpen" :class="{'open-icon':qualityOpen}">
                <span class="screen-label">品相</span>
                <span class="cat-name">{{sereenParams.qualityName}}</span>
                <i class="iconfont icon-you1"></i>
            </li>
            <li class="quality-list" v-show="qualityOpen">
                <div class="quality-box">
                    <span class="quality-btn" :class="{'checked-btn':item.quality == sereenParams.quality}" @click="qualityRadio($event)" v-for="item in qualityList" :quality="item.quality" :qualityName="item.qualityName">{{item.qualityName}}</span>
                </div>
            </li>
            <li class="screen-item-d">
                <span class="screen-label">其他</span>
                <div class="clear-both"></div>
                <div class="other-box">
                    <span class="other-btn" @click="sereenParams.isDiscount = !(sereenParams.isDiscount)" :class="{'checked-btn':sereenParams.isDiscount}">优惠</span>
                    <span class="other-btn" @click="sereenParams.noStock = !(sereenParams.noStock)" :class="{'checked-btn':sereenParams.noStock}">已订完</span>
                    <span class="other-btn" @click="sereenParams.noMouldId = !(sereenParams.noMouldId)" :class="{'checked-btn':sereenParams.noMouldId}">无运费模板</span>
                    <span class="other-btn" @click="sereenParams.noPic = !(sereenParams.noPic)" :class="{'checked-btn':sereenParams.noPic}">无图</span>
                    <span class="other-btn" @click="sereenParams.freeShipping = !(sereenParams.freeShipping)" :class="{'checked-btn':sereenParams.freeShipping}">包邮</span>
                </div>
            </li>
            <li class="btn-box">
                <span class="reset-btn" @click="reset()">重置</span>
                <span class="submit-btn" @click="screenSubmit()">确定</span>
            </li>
        </ul>
    </div>
</template>
<script>
    import {mapState, mapGetters,mapActions} from 'vuex';
    import KfzJSBridge from '../../../common/utils/KfzJsBridge';
    import toast from '../../../common/components/toast/';
    export default {
        name: "screen",
        components: {
            KfzJSBridge
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            },
            defaultSereen:{
                type:Boolean,
                default:true
            },
            closeScreen:{
                type:Function,
                default:function () {

                }
            }
        },
        data() {
            return {
                sereenParams:{
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
                },
                defaultParams:{
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
                },
                qualityOpen:false,
                selectShow:false,
                selectTitle:'',
                qualityList:[
                    {quality:'100',qualityName:'全新'},
                    {quality:'95',qualityName:'九五品'},
                    {quality:'90',qualityName:'九品'},
                    {quality:'85',qualityName:'八五品'},
                    {quality:'80',qualityName:'八品'},
                    {quality:'75',qualityName:'七五品'},
                    {quality:'70',qualityName:'七品'},
                    {quality:'65',qualityName:'六五品'},
                    {quality:'60',qualityName:'六品'},
                    {quality:'50',qualityName:'五品'},
                    {quality:'40',qualityName:'四品'},
                    {quality:'30',qualityName:'三品'},
                    {quality:'20',qualityName:'二品'},
                    {quality:'10',qualityName:'一品'},
                    ],
                selectList:[],
                catList:[
                    {value:'8000000000000000',name:'线装古籍'},
                    {value:'21000000000000000',name:'名人墨迹'},
                    {value:'37000000000000000',name:'名人字画'},
                    {value:'10000000000000000',name:'期刊'},
                    {value:'41000000000000000',name:'报纸'},
                    {value:'6000000000000000',name:'外文原版'},
                    {value:'43000000000000000',name:'小说'},
                    {value:'1000000000000000',name:'文学'},
                    {value:'13000000000000000',name:'语言文字'},
                    {value:'3000000000000000',name:'历史'},
                    {value:'23000000000000000',name:'地理'},
                    {value:'4000000000000000',name:'艺术'},
                    {value:'18000000000000000',name:'政治'},
                    {value:'5000000000000000',name:'法律'},
                    {value:'24000000000000000',name:'军事'},
                    {value:'44000000000000000',name:'哲学心理学'},
                    {value:'29000000000000000',name:'宗教'},
                    {value:'14000000000000000',name:'经济'},
                    {value:'7000000000000000',name:'社会文化'},
                    {value:'28000000000000000',name:'教育'},
                    {value:'25000000000000000',name:'管理'},
                    {value:'27000000000000000',name:'童书'},
                    {value:'26000000000000000',name:'生活'},
                    {value:'19000000000000000',name:'体育'},
                    {value:'11000000000000000',name:'工程技术'},
                    {value:'31000000000000000',name:'计算机与互联网'},
                    {value:'15000000000000000',name:'自然科学'},
                    {value:'17000000000000000',name:'医药卫生'},
                    {value:'20000000000000000',name:'综合性图书'},
                    {value:'12000000000000000',name:'国学古籍'},
                    {value:'59000000000000000',name:'收藏与鉴赏'},
                    {value:'34000000000000000',name:'红色文献'},
                    {value:'32000000000000000',name:'教材教辅考试'},
                    {value:'55000000000000000',name:'古旧地图'},
                    {value:'38000000000000000',name:'照片影像'},
                    {value:'35000000000000000',name:'连环画'},
                    {value:'56000000000000000',name:'版画宣传画'},
                    {value:'36000000000000000',name:'邮票税票'},
                    {value:'46000000000000000',name:'钱币'},
                    {value:'57000000000000000',name:'碑帖印谱'},
                    {value:'60000000000000000',name:'红色收藏'},
                    {value:'61000000000000000',name:'文房雅玩'},
                    {value:'62000000000000000',name:'玉石金银木器'},
                    {value:'63000000000000000',name:'漆器'},
                    {value:'64000000000000000',name:'陶器瓷器'},
                    {value:'65000000000000000',name:'工艺品'},
                    {value:'58000000000000000',name:'收藏杂项'},
                    {value:'66000000000000000',name:'笔墨'},
                    {value:'67000000000000000',name:'纸本'},
                    {value:'68000000000000000',name:'卡片'},
                    {value:'69000000000000000',name:'日历'},
                    {value:'70000000000000000',name:'包袋'},
                    {value:'71000000000000000',name:'壳套'},
                    {value:'72000000000000000',name:'摆件挂画'},
                    {value:'73000000000000000',name:'器皿'},
                    {value:'74000000000000000',name:'动漫影视周边'},





                ]
            }
        },
        watch:{
            defaultSereen(newval,oldval){
                this.reset();
            }
        },
        mounted() {

        },
        computed: {
            ...mapGetters({
                getterConf:'getterConf'
            }),
            userAgent(){
                /*获取版本号*/
                return window.navigator.userAgent;
            }
        },
        methods: {
            ...mapActions([
                'getItemList',
                'screen'
            ]),
            /*选中状态显示右侧蓝色小箭头*/
            catChecked(item){
                let checked = false;
                if(this.selectTitle == '商品分类' && this.sereenParams.catId == item.value){
                    checked = true;
                }else if(this.selectTitle == '本店分类' && this.sereenParams.myCatId == item.value){
                    checked = true;
                }else if(this.selectTitle == '运费模板' && this.sereenParams.mouldId == item.mouldId){
                    checked = true;
                }else{
                    checked = false;
                }
                return {
                    'cat-checked' : checked
                }
            },
            itemCat(){
                this.selectTitle = '商品分类';
                this.selectList = this.catList;
                this.selectShow = true;
            },
            myCat(){
                this.selectTitle = '本店分类';
                this.selectList = this.getterConf.myItemCats;
                this.selectShow = true;
            },
            shipping(){
                this.selectTitle = '运费模板';
                this.selectList = this.getterConf.newMouldList;
                this.selectShow = true;
            },
            qualityRadio(e){
                let quality = e.target.getAttribute('quality');
                let qualityname = e.target.getAttribute('qualityName')
                this.qualityOpen = false;
                this.sereenParams.quality = this.sereenParams.quality == quality ? '' : quality;
                this.sereenParams.qualityName = this.sereenParams.qualityName == qualityname ? '' : qualityname;
            },
            addTimeBegin(e){
                var that = this;
                KfzJSBridge.methods.openDatePicker({"type":2,"start":"2000-01-01","defaultVal":that.sereenParams.addTime_begin},function (res) {
                    var time = res;
                    if(typeof res == 'string'){time = JSON.parse(res)}
                    that.sereenParams.addTime_begin = time.data.value;
                });
            },
            addTimeEnd(e){
                var that = this;
                KfzJSBridge.methods.openDatePicker({"type":2,"start":"2000-01-01","defaultVal":that.sereenParams.addTime_end},function (res) {
                    var time = res;
                    if(typeof res == 'string'){time = JSON.parse(res)}
                    that.sereenParams.addTime_end = time.data.value;
                });
            },
            selected(item){
                if(this.selectTitle == '商品分类'){
                    this.sereenParams.catId = (this.sereenParams.catId == item.value ? '' : item.value);
                    this.sereenParams.catName = (this.sereenParams.catName == item.name ? '' : item.name);
                }else if(this.selectTitle == '本店分类'){
                    this.sereenParams.myCatId = (this.sereenParams.myCatId == item.value ? '' : item.value);
                    this.sereenParams.myCatIdName = (this.sereenParams.myCatIdName == item.name ? '' : item.name);
                }else{
                    this.sereenParams.mouldId = (this.sereenParams.mouldId == item.mouldId ? '' : item.mouldId);
                    this.sereenParams.mouldName = (this.sereenParams.mouldName == item.mouldName ? '' : item.mouldName);
                }
                this.selectShow = false;
            },
            reset(){
                this.sereenParams = {
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
                };
            },
            closeMyScreen(){
                let noChange = this.objEqual(this.sereenParams,this.defaultParams);
                this.closeScreen();
                this.screen({params:this.sereenParams,isScreen:!noChange});
                this.getItemList();
            },
            screenSubmit(){
                let noChange = this.objEqual(this.sereenParams,this.defaultParams);
                this.screen({params:this.sereenParams,isScreen:!noChange});
                this.closeScreen();
                this.getItemList();
            },
            /*判断两个对象的值是否都相等*/
            objEqual(a,b){
                var res = false;
                for(let k in a){
                 if(a[k] == b[k]  ){
                     res = true;
                 } else{
                     res = false;
                     break;
                 }
                }
                return res;
            }
        }
    }
</script>
