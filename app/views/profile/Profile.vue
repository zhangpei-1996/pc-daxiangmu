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
                    <input type="file" hidden ref="file" @change="fileChangeHan">
                    <el-button style="margin-left:20px;" @click="changeAvatarBtnHan">更改头像...</el-button>
                </el-col>
                <el-col :span="2"></el-col>
            </el-row>
        </div>

        <el-dialog
            :visible.sync="isShowDialog1"
            width="30%"
            :show-close="false"
            title="正在上传您的头像，请稍后"
        >
            <el-progress :text-inside="true" :stroke-width="24" :percentage="p1" status="success"></el-progress>
        </el-dialog>

        <el-dialog
            :visible.sync="isShowDialog2"
            :width="calcWidth + 'px'"
            top="60px"
            :show-close="false"
            title="请裁切您的头像"
        >
            <CutPic :serverFileName="serverFileName" :picRealWidth="picRealWidth" :picRealHeight="picRealHeight" @okla="okHan"/>
        </el-dialog>
    </el-main>
</template>

<script>
    import http from '../../http/http.js';
    import CutPic from './CutPic.vue';

    export default {
        components: {
            CutPic
        },
        data() {
            return {
                isShowDialog1: false,
                isShowDialog2: false,
                picRealWidth: 0,
                picRealHeight: 0,
                serverFileName: '',
                p1: 0
            }
        },
        methods: {
            async okHan() {
                this.isShowDialog2 = false;
                // 重新拉取
                // 刷新当前页
                window.location.reload();

            },
            changeAvatarBtnHan() {
                // 创建一个事件
                let evt = document.createEvent('MouseEvents');
                // 初始化这个事件
                evt.initMouseEvent('click', false, false);
                // 发送给别人
                this.$refs.file.dispatchEvent(evt);
            },
            // 当用户选择了一个图片之后做的事情
            fileChangeHan(){
                // 显示对话框
                this.isShowDialog1 = true;
                // 创建虚拟表单
                let form = new FormData();
                // 备份
                var self = this;
                // 在虚拟表单中追加图片
                form.append('tupian', this.$refs.file.files[0]);
                // 提交虚拟表单
                http.post('/api/upload', form, {
                    // 头部
                    headers: {'Content-Type': 'multipart/form-data'},
                    // 进度
                    onUploadProgress: progressEvent => {
                        let complete = progressEvent.loaded / progressEvent.total * 100;
                        self.p1 = complete;
                    }
                }).then(data => {
                    self.serverFileName = data.data.filename;
                    self.picRealWidth = data.data.width;
                    self.picRealHeight = data.data.height;

                    // 关闭第一个对话框，打开第二个
                    self.isShowDialog1 = false;
                    self.isShowDialog2 = true;
                });
            }
        },
        computed: {
            // 算模态框2的宽度
            calcWidth() {
                if(this.picRealWidth > 360) {
                    return 580;
                } else {
                    return this.picRealWidth + 200;
                }
            },
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