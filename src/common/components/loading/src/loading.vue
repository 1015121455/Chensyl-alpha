<template>
    <div class="loader_box" v-show="!hide">
        <div class="loader"></div>
    </div>
</template>

<script>
    import './loading.css';

    export default {
        name: "loading",
        props: {
            "hide": {
                type: Boolean,
                default: false
            }
        }
    }
</script>