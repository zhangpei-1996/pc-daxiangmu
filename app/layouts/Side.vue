<template>
    <div class="side_wrap">
        <div class="side">
            <el-menu
                default-active="1"
                class="el-menu-vertical-demo"
            >
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">哈哈哈</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">哈哈哈</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">哈哈哈</span>
                </el-menu-item>
                <el-menu-item index="2">
                    <i class="el-icon-menu"></i>
                    <span slot="title">哈哈哈</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="content_box">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/">活动管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>
            <div class="feng"></div>
            <router-view />
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less" scoped>
    .side_wrap{
        padding-left: 240px;
        position: relative;
        .side{
            position: absolute;
            top:0;
            left:0;
            width: 220px;
            background:orange;
        }

        .feng{
            height:30px;
        }

        .content_box{
            min-height: 300px;
            padding:10px;
            padding-top: 30px;
        }
    }
    
</style>