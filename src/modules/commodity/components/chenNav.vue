<style src="../css/nav.less"></style>
<template>
    <div>
        <div class="yl-nav-box">{{name}}</div>
        <ul class="yl-list">
            <li class="yl-item" v-for="(item,index) in list">
                {{item}}
            </li>
        </ul>
    </div>
</template>
<script>
    import {mapState, mapGetters,mapActions} from 'vuex';
    export default {
        name: "chenNav",
        components: {

        },
        props: {

        },
        data() {
            return {
                name:'炎凉宫',
                list:['柔情似水，','佳期如梦，','忍顾鹊桥归路。','两情若是久长时，','又岂在朝朝暮暮。']
            }
        },
        watch:{

        },
        mounted() {

        },
        computed: {

        },
        methods: {

        }
    }
</script>
