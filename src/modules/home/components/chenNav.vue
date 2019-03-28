<style src="../css/nav.less"></style>
<template>
    <div class="chens-nav-box">{{name}}</div>
    <ul class="chens-list">
        <li class="chens-list" v-for="(item,index) in list">
            {{item}}
        </li>
    </ul>
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
                name:'晨霜阁',
                list:['纤云弄巧，','飞星传恨，','银汉迢迢暗度。','金风玉露一相逢，','便胜却人间无数。']
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
