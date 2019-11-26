<template>
    <el-container>
        <el-header>
            <div class="logo">
                小米进销存<small>V1.0.0</small>
            </div>

           <div class="avatar">
               <el-dropdown placement="bottom" @change="alert(123)">
                    <span>
                        <el-avatar v-if="avatar != ''" :src="'http://127.0.0.1:3000/avatars/' + $store.state.user.avatar"   ></el-avatar>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <router-link :to="{'name': 'profile'}">
                                更改个人资料
                            </router-link>
                        </el-dropdown-item>
                        <el-dropdown-item @click="tuichu">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
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
                <el-menu-item index="renwu">任务</el-menu-item>
            </el-menu>
           
        </el-header>
        <router-view></router-view>
        <el-footer style="text-align:center;">&copy; 小米科技版权所有</el-footer>
    </el-container>
</template>

<script>
    import {get} from '../http/http.js';


    export default {
        data() {
            return {
                avatar: ''
            }
        },
        async created(){
            // console.log(this.$route.meta.A);
            // 请求一下
            const {avatar, nickname} = await get('userinfo').then(data => data.data);
            this.avatar = avatar;

            this.$store.state.user.avatar = avatar;
            this.$store.state.user.nickname = nickname;
        },
        methods: {
            tuichu(){
                get('tuichu');
                this.$router.push({
                    'name': 'login'
                });
            },
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
        .avatar{
            margin-right: 60px;
            margin-top: 10px;
            float: right;
            width: 60px;
            height: 60px;
            cursor: pointer;
        }
    }
    .el-footer{
        font-size:14px;
        padding-top: 100px;
    }
</style>