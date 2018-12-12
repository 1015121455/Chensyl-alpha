import Axios from 'axios';
import Jsonp from '../../../common/utils/jsonp'




//Axios.defaults.withCredentials = true;
const actions = {
    getYouhuiInfo({ commit, state }) {

    },
    /*获取商品列表*/
    getItemList({ commit, state}, payload) {
        Axios.get('/pc/item/unsoldList', {
            params: payload
        }).then(function (res) {
            commit('setSellerData',{
                isSuccess: true,
                resData: {
                    data : {
                        list: [
                            {
                                itemId: 249543344,
                                userId: 1004605,
                                bizType: 1,
                                catId: 10005006000000000,
                                myCatId: 2,
                                itemName: "香港佳士得亚洲当代艺术日间拍卖会 part 2. 2008.12.1",
                                author: "",
                                press: "佳士得香港有限公司",
                                price: "220.00",
                                yearsGroup: 0,
                                pubDate: "0000-00-00",
                                years: {
                                    id: "6000000000",
                                    name: "不详",
                                    level: 1,
                                    hasLeaf: 0
                                },
                                discount: 55,
                                number: 6,
                                isNewBook: 0,
                                quality: 95,
                                isOnSale: 1,
                                beginSaleTime: 1403494484,
                                endSaleTime: 2114352000,
                                oriPrice: 0,
                                itemSn: "17b",
                                isbn: "",
                                isRelatedISBN: 0,
                                isSyncISBN: 0,
                                booklibId: 0,
                                imgUrl: "G01/M01/57/BD/o4YBAFOnFxmANjirAANi3OonM4E404.jpg",
                                bgImgUrl: "",
                                isBuildIndex: 1,
                                isDelete: 0,
                                certifyStatus: "notCertified",
                                reCertifyStatus: 0,
                                repeatMd5: "3cf6947bbbea78d9e38d5802b6f102b1",
                                approach: 0,
                                isDraft: 0,
                                productArea: 1006000000,
                                bearShipping: "buyer",
                                isUseMould: 1,
                                mouldId: 0,
                                weight: 0,
                                weightPiece: 0,
                                isPreSale: 0,
                                preSaleNum: 0,
                                isFlashSale: 0,
                                startFlashSaleTime: 0,
                                endFlashSaleTime: 0,
                                limitBuyNum: 0,
                                addTime: 1403430555,
                                updateTime: "2018-03-07 21:47:47",
                                dynamicTableName: null,
                                tpl: 6,
                                catNames: [
                                    "期刊",
                                    "艺术收藏",
                                    "收藏"
                                ],
                                catName: "期刊 > 艺术收藏 > 收藏",
                                imgSrc: "//kfzimg.kfz.com/G01/M01/57/BD/o4YBAFOnFxmANjirAANi3OonM4E404_s.jpg",
                                imgSrcMiddle: "//kfzimg.kfz.com/G01/M01/57/BD/o4YBAFOnFxmANjirAANi3OonM4E404_n.jpg",
                                imgSrcBig: "//kfzimg.kfz.com/G01/M01/57/BD/o4YBAFOnFxmANjirAANi3OonM4E404_b.jpg",
                                qualityName: "九五品",
                                certifyStatusName: "待审核",
                                status: "出售中",
                                onsale: true,
                                shopId: 7215,
                                date: "2014-06-22",
                                time: "17:49",
                                update: {
                                    date: "2018-03-07",
                                    time: "21:47"
                                }
                            },
                            {
                                itemId: 249542283,
                                userId: 1004605,
                                bizType: 1,
                                catId: 10005006000000000,
                                myCatId: 33,
                                itemName: "香港佳士得亚洲当代艺术日间拍卖会 part 1 .2008.12.1",
                                author: "",
                                press: "佳士得香港有限公司",
                                price: "260.00",
                                yearsGroup: 0,
                                pubDate: "0000-00-00",
                                years: {
                                    id: "6000000000",
                                    name: "不详",
                                    level: 1,
                                    hasLeaf: 0
                                },
                                discount: 55,
                                number: 6,
                                isNewBook: 0,
                                quality: 95,
                                isOnSale: 1,
                                beginSaleTime: 1403494484,
                                endSaleTime: 2114352000,
                                oriPrice: 0,
                                itemSn: "17b",
                                isbn: "",
                                isRelatedISBN: 0,
                                isSyncISBN: 0,
                                booklibId: 0,
                                imgUrl: "G01/M00/52/1F/o4YBAFOm4wSATJIQAANbIihbOhU401.jpg",
                                bgImgUrl: "",
                                isBuildIndex: 1,
                                isDelete: 0,
                                certifyStatus: "failed",
                                reCertifyStatus: 0,
                                repeatMd5: "b13ba948cb61423de1c5a26198e3fcf0",
                                approach: 0,
                                isDraft: 0,
                                productArea: 1006000000,
                                bearShipping: "buyer",
                                isUseMould: 1,
                                mouldId: 0,
                                weight: 0,
                                weightPiece: 0,
                                isPreSale: 0,
                                preSaleNum: 0,
                                isFlashSale: 0,
                                startFlashSaleTime: 0,
                                endFlashSaleTime: 0,
                                limitBuyNum: 0,
                                addTime: 1403430384,
                                updateTime: "2018-03-07 21:47:52",
                                dynamicTableName: null,
                                tpl: 6,
                                catNames: [
                                    "期刊",
                                    "艺术收藏",
                                    "收藏"
                                ],
                                catName: "期刊 > 艺术收藏 > 收藏",
                                imgSrc: "//kfzimg.kfz.com/G01/M00/52/1F/o4YBAFOm4wSATJIQAANbIihbOhU401_s.jpg",
                                imgSrcMiddle: "//kfzimg.kfz.com/G01/M00/52/1F/o4YBAFOm4wSATJIQAANbIihbOhU401_n.jpg",
                                imgSrcBig: "//kfzimg.kfz.com/G01/M00/52/1F/o4YBAFOm4wSATJIQAANbIihbOhU401_b.jpg",
                                qualityName: "九五品",
                                certifyStatusName: "驳回",
                                status: "出售中",
                                onsale: true,
                                shopId: 7215,
                                date: "2014-06-22",
                                time: "17:46",
                                update: {
                                    date: "2018-03-07",
                                    time: "21:47"
                                }
                            },
                            {
                                itemId: 249542074,
                                userId: 1004605,
                                bizType: 1,
                                catId: 6001003000000000,
                                myCatId: 33,
                                itemName: "领英 A walk of ten thousand miles: The Equitable Bank story",
                                author: "不详",
                                press: "The Bank",
                                price: "120.00",
                                yearsGroup: 0,
                                pubDate: "2000-00-00",
                                years: {
                                    id: "1002000000",
                                    name: "2000年代 (2000-2009)",
                                    start: "20000101",
                                    end: "20091231",
                                    level: 2,
                                    hasLeaf: 0
                                },
                                discount: 55,
                                number: 6,
                                isNewBook: 0,
                                quality: 85,
                                isOnSale: 1,
                                beginSaleTime: 1403494352,
                                endSaleTime: 2114352000,
                                oriPrice: 0,
                                itemSn: "17b",
                                isbn: "",
                                isRelatedISBN: 0,
                                isSyncISBN: 0,
                                booklibId: 0,
                                imgUrl: "G01/M00/57/9C/o4YBAFOnFcaAR990AANsKLIvJoU771.jpg",
                                bgImgUrl: "",
                                isBuildIndex: 1,
                                isDelete: 0,
                                certifyStatus: "waitApproved",
                                reCertifyStatus: 0,
                                repeatMd5: "0afff67f7310761019bd72af4059527f",
                                approach: 0,
                                isDraft: 0,
                                productArea: 1006000000,
                                bearShipping: "buyer",
                                isUseMould: 1,
                                mouldId: 0,
                                weight: 0,
                                weightPiece: 0,
                                isPreSale: 0,
                                preSaleNum: 0,
                                isFlashSale: 0,
                                startFlashSaleTime: 0,
                                endFlashSaleTime: 0,
                                limitBuyNum: 0,
                                addTime: 1403430218,
                                updateTime: "2018-03-07 21:47:52",
                                dynamicTableName: null,
                                tpl: 14,
                                catNames: [
                                    "外文原版",
                                    "英文书",
                                    "历史"
                                ],
                                catName: "外文原版 > 英文书 > 历史",
                                imgSrc: "//kfzimg.kfz.com/G01/M00/57/9C/o4YBAFOnFcaAR990AANsKLIvJoU771_s.jpg",
                                imgSrcMiddle: "//kfzimg.kfz.com/G01/M00/57/9C/o4YBAFOnFcaAR990AANsKLIvJoU771_n.jpg",
                                imgSrcBig: "//kfzimg.kfz.com/G01/M00/57/9C/o4YBAFOnFcaAR990AANsKLIvJoU771_b.jpg",
                                qualityName: "八五品",
                                certifyStatusName: "等待复审",
                                status: "出售中",
                                onsale: true,
                                shopId: 7215,
                                date: "2014-06-22",
                                time: "17:43",
                                update: {
                                    date: "2018-03-07",
                                    time: "21:47"
                                }
                            },
                            {
                                itemId: 249537623,
                                userId: 1004605,
                                bizType: 1,
                                catId: 6001003000000000,
                                myCatId: 33,
                                itemName: "彩绘 纹身Tatt Book: Visionaries of Tattoo by Joseph Ari Aloi and Carlo McCormick",
                                author: "Joseph Ari Aloi and Carlo McCormick",
                                press: "Joseph Ari Aloi and Carlo McCormick",
                                price: "159.00",
                                yearsGroup: 0,
                                pubDate: "2008-00-00",
                                years: {
                                    id: "1002000000",
                                    name: "2000年代 (2000-2009)",
                                    start: "20000101",
                                    end: "20091231",
                                    level: 2,
                                    hasLeaf: 0
                                },
                                discount: 55,
                                number: 6,
                                isNewBook: 0,
                                quality: 85,
                                isOnSale: 1,
                                beginSaleTime: 1403494351,
                                endSaleTime: 2114352000,
                                oriPrice: 0,
                                itemSn: "17b",
                                isbn: "",
                                isRelatedISBN: 0,
                                isSyncISBN: 0,
                                booklibId: 0,
                                imgUrl: "G01/M01/56/F2/o4YBAFOnD4eALIQCAAN2CuUeHOM926.jpg",
                                bgImgUrl: "",
                                isBuildIndex: 1,
                                isDelete: 0,
                                certifyStatus: "frozen",
                                reCertifyStatus: 0,
                                repeatMd5: "9b0069d4da2bc737132c0be2b6e43f3d",
                                approach: 0,
                                isDraft: 0,
                                productArea: 1006000000,
                                bearShipping: "buyer",
                                isUseMould: 1,
                                mouldId: 0,
                                weight: 0,
                                weightPiece: 0,
                                isPreSale: 0,
                                preSaleNum: 0,
                                isFlashSale: 0,
                                startFlashSaleTime: 0,
                                endFlashSaleTime: 0,
                                limitBuyNum: 0,
                                addTime: 1403429040,
                                updateTime: "2018-03-07 21:47:52",
                                dynamicTableName: null,
                                tpl: 14,
                                catNames: [
                                    "外文原版",
                                    "英文书",
                                    "历史"
                                ],
                                catName: "外文原版 > 英文书 > 历史",
                                imgSrc: "//kfzimg.kfz.com/G01/M01/56/F2/o4YBAFOnD4eALIQCAAN2CuUeHOM926_s.jpg",
                                imgSrcMiddle: "//kfzimg.kfz.com/G01/M01/56/F2/o4YBAFOnD4eALIQCAAN2CuUeHOM926_n.jpg",
                                imgSrcBig: "//kfzimg.kfz.com/G01/M01/56/F2/o4YBAFOnD4eALIQCAAN2CuUeHOM926_b.jpg",
                                qualityName: "八五品",
                                certifyStatusName: "冻结",
                                status: "出售中",
                                onsale: true,
                                shopId: 7215,
                                date: "2014-06-22",
                                time: "17:24",
                                update: {
                                    date: "2018-03-07",
                                    time: "21:47"
                                }
                            }
                        ],
                        conf:{
                            site: {
                                _self_: "http://item.kfz.com/",
                                dav: "http://dav.kfz.com/",
                                img0: "http://img0.kfz.com/",
                                www: "http://www.kfz.com/",
                                help: "http://help.kfz.com/",
                                user: "http://user.kfz.com/",
                                pm: "http://www.kfz.cn/",
                                shop: "http://shop.kfz.com/",
                                order: "http://order.kfz.com/",
                                cart: "http://cart.kfz.com/",
                                book: "http://book.kfz.com/",
                                search: "http://search.kfz.com/",
                                kfzsearch: "http://kfzsearch.kfz.com/",
                                userApi: "http://userapi.kfz.com/",
                                login: "http://login.kfz.com/",
                                xiaoxi: "http://message.kfz.com/",
                                message: "http://message.kfz.com/",
                                pmgs: "http://pmgs.kfz.com/",
                                pay: "http://pay.kfz.com/",
                                tan: "http://tan.kfz.com/",
                                bq: "http://bq.kfz.com/",
                                tousu: "http://tousu.kfz.com/",
                                xinyu: "http://xinyu.kfz.com/",
                                xinyuApi: "http://xinyuapi.kfz.com/",
                                union: "http://union.kfz.com/",
                                shequ: "http://www.gujiushu.com/",
                                wuliu: "http://wuliu.kfz.com/",
                                tg: "http://tg.kfz.com/",
                                sms: "http://sms.kfz.com/",
                                zixun: "http://zixun.kfz.com/",
                                lib: "http://lib.kfz.com/",
                                booklib: "http://booklib.kfz.com/",
                                tongji: "http://tongji.kfz.com/",
                                app: "http://app.kfz.com/",
                                shufang: "http://shufang.kfz.com/",
                                shequlogin: "http://login.kfz.com/",
                                jiaocai: "http://jiaocai.kfz.com/",
                                tejiashu: "http://tejiashu.kfz.com/",
                                service: "http://service.kfz.com/",
                                res2: "//res2.kfz.com/",
                                item: "http://item.kfz.com/",
                                store: "http://store.kfz.com/",
                                seller: "http://seller.kfz.com/",
                                m: "http://m.kfz.com/",
                                mshop: "http://mshop.kfz.com/",
                                mbook: "http://mbook.kfz.com/",
                                msearch: "http://msearch.kfz.com/",
                                mlogin: "http://mlogin.kfz.com/",
                                muser: "http://muser.kfz.com/",
                                mpays: "http://mpay.kfz.com/",
                                mpay: "http://mpay.kfz.com/",
                                mbq: "http://mbq.kfz.com/",
                                mpm: "http://m.kfz.cn/",
                                mxinyu: "http://mxinyu.kfz.com/",
                                mmessage: "http://mmessage.kfz.com/",
                                mres: "//res2.kfz.com/",
                                mtousu: "http://mtousu.kfz.com/",
                                mzixun: "http://mzixun.kfz.com/",
                                mbooklib: "http://booklib.kfz.com/",
                                admin: "http://admin.kfz.com/",
                                userAdmin: "http://useradmin.kfz.com/",
                                shopAdmin: "http://shopadmin.kfz.com/",
                                tanAdmin: "http://shopadmin.kfz.com/",
                                pmAdmin: "http://pmadmin.kfz.com/",
                                payAdmin: "http://payadmin.kfz.com/",
                                pmgsAdmin: "http://pmgsadmin.kfz.com/",
                                messageAdmin: "http://messageadmin.kfz.com/",
                                shopimg: "//shopimg.kfz.com.cn/",
                                tanimg: "//shopimg.kfz.com.cn/",
                                pmimg: "//img.kfz.cn/",
                                auctionimg: "http://auctionimg.kfz.com.cn/",
                                auctionimgcc: "http://auctionimg2.kongfz.cc/",
                                img1: "http://img1.kfz.com.cn/",
                                img2: "http://img2.kfz.com.cn/",
                                res: "//res.kfz.com/",
                                booklibimg: "http://booklibimg.kfz.com/",
                                booklibimg2: "http://booklibimg.kfzimg.com/data/book_lib_img_v2/",
                                imgkey: "http://seller.kfz.com/kfzimg-key?type=book",
                                imgup: "http://seller.kfz.com/kfzimg-upload",
                                davUpload: "//image-upload.kfz.com",
                                img: "//kfzimg.kfz.com/",
                                img3: "http://img3.kfzimg.com/",
                                img4: "http://img4.kfzimg.com/",
                                img5: "http://img5.kfzimg.com/",
                                img6: "http://img6.kfzimg.com/",
                                img7: "http://img7.kfzimg.com/",
                                img8: "http://img8.kfzimg.com/",
                                img9: "http://img9.kfzimg.com/",
                                order_service: "http://order_service.kfz.com/",
                                gateway_service: "http://192.168.220.10:5555/"
                            }
                        }

                    }
                }
            });
            commit('setItemNum',{
                sale: 9795,
                haltsale: 6,
                unsold: 10400,
                draft: 1540,
                uncertify: 599
            });
            commit('setPage',{
                pageCurr: 1,
                pageShow: 10,
                pageNum: 0 ,
                recordCount: 9795
            })
        }).catch(function (error) {
            commit('setSellerData',{
                isSuccess: false
            });
        });
    },
    /*切换tab*/
    LetTabChange({ commit, state},payload){
        commit('tabChange',payload);
    },
    /*改变排序*/
    letListOrder({ commit, state},payload){
        commit('listOrder',payload);
    },
    /*克隆*/
    clone({ commit, state},payload){
        console.log('克隆');
    },
    /*上架*/
    onsale({ commit, state},payload){
        console.log('上架');
    },
    /*下架*/
    haltsale({ commit, state},payload){
        console.log('下架');
    },
    /*删除商品*/
    delete({ commit, state},payload){
        console.log('删除');
    },
    /*编辑*/
    edit({ commit, state},payload){
        console.log('编辑');
    },
    /*复审*/
    applyApproved({ commit, state},payload){
        console.log('复审');
    }
}


export default actions;
