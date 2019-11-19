<template>
    <el-container>
        <el-header>
            <el-menu :default-active="1" class="el-menu-demo" mode="horizontal"  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
                <el-menu-item index="1">处理中心</el-menu-item>
                <el-menu-item index="2">处理中心</el-menu-item>
                <el-menu-item index="3">处理中心</el-menu-item>
                <el-menu-item index="4">处理中心</el-menu-item>
            </el-menu>
        </el-header>
        <router-view></router-view>
        <el-footer style="text-align:center;">小米科技版权所有</el-footer>
    </el-container>
</template>

<script>
    export default {
        
    }
</script>

<style lang="less">
    *{
        margin: 0;
        padding:0;
    }
    header{
        padding:0 !important;
    }
</style>