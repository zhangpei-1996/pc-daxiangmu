<template>
    <el-container>
        <el-header>
            <div class="logo">
                小米进销存<small>V1.0.0</small>
            </div>
            <el-menu 
                :default-active="$route.meta.A" 
                class="el-menu-demo" 
                mode="horizontal"  
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                @select="selectHan"
            >
                <el-menu-item index="index">首页</el-menu-item>
                <el-menu-item index="caigou">采购管理</el-menu-item>
                <el-menu-item index="caiwu">财务管理</el-menu-item>
            </el-menu>
        </el-header>
        <router-view></router-view>
        <el-footer style="text-align:center;">&copy; 小米科技版权所有</el-footer>
    </el-container>
</template>

<script>
    export default {
        created(){
            console.log(this.$route.meta.A);
        },
        methods: {
            selectHan(v){
                this.$router.push({
                    name: v
                });
            }
        }
    }
</script>

<style lang="less">
    *{
        margin: 0;
        padding:0;
    }
    header{
        padding:0 !important;
        background-color: #545c64;
        overflow: hidden;
        .logo{
            float: left;
            padding-left: 40px;
            font-size:30px;
            color:white;
            line-height: 60px;
            height: 60px;
            small{
                font-size:14px;
            }
        }
        .el-menu-demo{
            float: right;
            padding-right: 30px;
        }
    }
    .el-footer{
        font-size:14px;
        padding-top: 100px;
    }
</style>