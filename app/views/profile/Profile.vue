<template>
    <el-main class="main">
        <h1>亲爱的{{$store.state.user.nickname}}，{{why}}</h1>
        <div>
            <el-row class="rowrow">
                <el-col :span="4">
                    更改昵称
                </el-col>
                <el-col :span="8">
                    {{$store.state.user.nickname}}
                </el-col>
                <el-col :span="8"></el-col>
            </el-row>
            <el-row class="rowrow">
                <el-col :span="4">
                    更改头像
                </el-col>
                <el-col :span="16">
                    <img class="avatartar" :src="`http://127.0.0.1:3000/avatars/${$store.state.user.avatar}`" alt="">
                    <el-button style="margin-left:20px;">更改头像...</el-button>
                </el-col>
                <el-col :span="2"></el-col>
            </el-row>
        </div>
    </el-main>
</template>

<script>
    export default {
        computed: {
            // 问候语
            why(){
                // 系统小时数
                var h = new Date().getHours();

                if(h < 2){
                    return '凌晨了，赶紧睡吧，小心猝死，猝死公司不赔偿';
                }else if(h < 4){
                    return '天都快亮了，快睡吧';
                }else if(h < 6){
                    return '天都快亮了，快睡吧';
                }else if(h < 8){
                    return '这么早就上班了，记得吃早点哦！';
                }else if(h < 10){
                    return '上午要努力哦！KPI达不到扣工资哦！';
                }else if(h < 10){
                    return '别这么着急定买卖！';
                }else if(h < 12){
                    return '中午吃好饭哦，一天要喝8杯水哦';
                }else if(h < 24){
                    return '一天要喝8杯水哦';
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .main{
        width: 800px;
        margin:40px auto;
        overflow: hidden;
        background:rgb(248, 250, 228);

        .rowrow{
            padding: 20px 0;
        }
        .avatartar{
            width: 160px;
            height: 160px;
        }
    }
</style>