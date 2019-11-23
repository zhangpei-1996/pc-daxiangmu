<template>
    <div class="index_wrap">
        <h1>你好我是首页，{{a}}</h1>
    </div>
</template>

<script>
    import {get} from '../../http/http.js'
    export default {
        data() {
            return {
                a: 0
            }
        },
        async created(){
            const {a} = await get('test').then(data => data.data);

            this.a = a;
        }
    }
</script>

<style lang="less" scoped>
    .index_wrap{
        height: 200px;
        text-align: center;
        line-height: 100px;
    }
</style>