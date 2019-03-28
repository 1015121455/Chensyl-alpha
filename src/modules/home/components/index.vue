<style src="../css/index.less"></style>
<template>
    <div id="app">
        <div class="body-box">
            <chen-nav></chen-nav>
        </div>
    </div>
</template>
<script>
    import {mapState, mapGetters} from 'vuex'
    import EventBus from '../EventBus.js'
    import _ from 'lodash'
    import '../../../common/css/base.css';
    import '../../../fonts/iconfont.css';
    import ChenNav from "./chenNav";

    export default {
        components: {
            ChenNav
        },
        data() {
            return {

            }
        },
        computed: {},
        mounted() {

        },
        methods: {
            init(){
                console.log('11111111111111');
            }
        },
        created(){
            this.init();
        }
    }
</script>
