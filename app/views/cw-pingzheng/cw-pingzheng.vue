<template>
    <div>
        <p>请上传身份证正面（人像面）照片：</p>
        <div>
            <up-box />
        </div>
        <p>请上传身份证背面（国徽面）照片：</p>
        <div>
            <up-box />
        </div>
    </div>
</template>

<script>
    import upBox from './up-box.vue';

    export default {
        components: {
            'up-box': upBox
        }
    }
</script>

<style lang="less" scoped>
    p{
        line-height: 300%;
    }
</style>