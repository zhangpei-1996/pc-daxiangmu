<template>
    <div class="side_wrap">
        <div class="side">
            <el-menu
                :default-active="B"
                class="el-menu-vertical-demo"
                @select="selectHan"
                v-show="A == 'caigou'"
            >
                <el-menu-item index="richang">
                    <i class="el-icon-menu"></i>
                    <span slot="title">日常采购</span>
                </el-menu-item>
                <el-menu-item index="jinhuo">
                    <i class="el-icon-menu"></i>
                    <span slot="title">进货</span>
                </el-menu-item>
                <el-menu-item index="tuihuo">
                    <i class="el-icon-menu"></i>
                    <span slot="title">退货</span>
                </el-menu-item>
            </el-menu>

            <el-menu
                :default-active="B"
                class="el-menu-vertical-demo"
                @select="selectHan"
                v-show="A == 'caiwu'"
            >
               
                <el-menu-item index="pingzheng">
                    <i class="el-icon-menu"></i>
                    <span slot="title">凭证管理</span>
                </el-menu-item>
                 <el-menu-item index="zhuanxiangyewu">
                    <i class="el-icon-menu"></i>
                    <span slot="title">专项业务管理</span>
                </el-menu-item>
            </el-menu>

             <el-menu
                :default-active="B"
                class="el-menu-vertical-demo"
                @select="selectHan"
                v-show="A == 'renwu'"
            >
                <el-menu-item index="dabiao">
                    <i class="el-icon-menu"></i>
                    <span slot="title">任务大表</span>
                </el-menu-item>
            </el-menu>
        </div>

        <div class="content_box">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <router-link :to="{ name: 'index' }">首页</router-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    <router-link :to="{ name: A }">
                        {{A_chinese}}
                    </router-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item>
                    {{B_chinese}}
                </el-breadcrumb-item>
            </el-breadcrumb>
            <div class="feng"></div>
            <router-view />
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        computed: {
            A(){
                return this.$route.meta.A;
            },
            B(){
                return this.$route.meta.B;
            },
            A_chinese(){
                if(this.A == 'caiwu') {
                    return '财务';
                }else if(this.A == 'caigou') {
                    return '采购';
                }else if(this.A == 'renwu') {
                    return '任务';
                }
            },
            B_chinese(){
                if(this.B == 'jinhuo') {
                    return '进货管理';
                }else if(this.B == 'richang') {
                    return '日常管理';
                }else if(this.B == 'tuihuo') {
                    return '退货管理';
                }else if(this.B == 'pingzheng') {
                    return '凭证管理';
                }else if(this.B == 'zhuanxiangyewu') {
                    return '专项业务管理';
                }else if(this.B == 'dabiao') {
                    return '任务大表';
                }
            }
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
    .side_wrap{
        padding-left: 240px;
        position: relative;
        .side{
            position: absolute;
            top:0;
            left:0;
            width: 220px;
            
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
    .el-menu-item.is-active {
        color: #fefeff;
        background: #03A9F4;
    }
    .el-menu-vertical-demo{
        width: 220px !important;
        min-height: 330px;
    }
    .el-breadcrumb__inner a{
        color:#03A9F4 !important;
        text-decoration: underline;
        cursor: pointer !important;
    }
</style>