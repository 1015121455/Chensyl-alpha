<template>
    <div id="app">
        <list></list>
    </div>
</template>
<script>
    import {mapState, mapGetters} from 'vuex'
    import EventBus from '../EventBus.js'
    import _ from 'lodash'
    import '../../../common/css/base.css';
    import '../../../fonts/iconfont.css';
    import '../css/shop.css';
    import list from './list';
    import KfzJSBridge from '../../../common/utils/KfzJsBridge';

    export default {
        components: {
            list
        },
        data() {
            return {

            }
        },
        computed: {},
        mounted() {

        },
        methods: {

        }
    }
</script>
