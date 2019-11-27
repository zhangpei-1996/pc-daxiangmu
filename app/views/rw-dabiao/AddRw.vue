<template>
    <div style="position:relative;">
        <el-row>
            <el-col :span="16">
                <div class="gg">
                    标题：
                    <el-input v-model="title" />
                </div>
                <div class="gg">
                    描述：
                    <el-input type="textarea" v-model="detail"></el-input>
                </div>
            </el-col>
            <el-col :span="7" :offset="1">
                <div class="gg">
                    执行者：
                    <span class="el-icon-circle-plus-outline jh" @click="jhHan"></span>

                    <div>
                        <span class="itemspan" v-for="item in executors" :key="item.id">
                            <el-tooltip class="item" effect="dark" :content="item.nickname" placement="top-start">
                                <img class="itemavatar" :src="`http://127.0.0.1:3000/avatars/${item.avatar}`" alt="">
                            </el-tooltip>
                        </span>
                    </div>
                    
                    <div class="menu" v-if="isShowMenu">
                        <ChooseExecutor @ok="okHan" :executors="executors" />
                    </div>
                </div>
                <div class="gg">
                    截止时间
                    <el-date-picker v-model="deadline" />
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import ChooseExecutor from './ChooseExecutor.vue';

    export default {
        props: ['nowModifyObj'],
        data() {
            if(this.nowModifyObj == null){
                return {
                     isShowMenu: false,
                    executors:  [],
                    title:  '',
                    detail:   '',
                    deadline:   ''
                }
            }
            return {
                isShowMenu: false,
                executors: this.nowModifyObj.executor  ,
                title: this.nowModifyObj.title ,
                detail:  this.nowModifyObj.detail ,
                deadline: new Date(this.nowModifyObj.deadline) 
            }
        },
        components: {
            ChooseExecutor
        },
        methods: {
            jhHan(){
                this.isShowMenu = true;
            },
            okHan({result}){
                console.log(result);
                this.executors = result;
                this.isShowMenu = false;
            }
        }
    }
</script>

<style lang="less" scoped>
    .gg{
        padding:10px 0;
    }
    .jh{
        width: 30px;
        height: 30px;
        font-size:30px;
        cursor: pointer;
        display: inline-block;
       
    }
     .menu{
        position: absolute;
        top: 30px;
        right: -104px;
        width: 250px;
        height: 320px;
        border: 1px solid rgba(202, 202, 202, 0.664);
        background: white;
        box-shadow: 1px 1px 4px rgba(83, 81, 81, 0.575);
        padding:10px;
        box-sizing: border-box;
        z-index: 9999;
     }
      .itemspan{
        margin-right: 10px;
        cursor: pointer;
    } 
    .itemavatar{
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
</style>