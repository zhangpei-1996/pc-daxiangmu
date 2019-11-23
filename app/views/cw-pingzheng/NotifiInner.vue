<template>
    <div>
       
        <div>
            <el-row>
                <el-col :span="8">
                    <img width="80" height="80" :src="zhengmianbase64" alt="">
                </el-col>
                <el-col :span="16">
                    <el-progress :text-inside="true" :stroke-width="14" :percentage="p1" status="success"></el-progress>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="8">
                    <img width="80" height="80" :src="fanmianbase64" alt="">
                </el-col>
                <el-col :span="16">
                     <el-progress :text-inside="true" :stroke-width="14" :percentage="p2" status="success"></el-progress>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import http from '../../http/http.js';

    export default {
        data() {
            return {
                p1: 0,
                p2: 0
            }
        },
        props: ['fanmian', 'zhengmian', 'zhengmianbase64', 'fanmianbase64'],
        created() {
            var self = this;
            // 创建虚拟表单
            let form1 = new FormData();
            
            var yiwenjianming = '';
            var erwenjianming = '';
             
            // 在虚拟表单中追加图片
            form1.append('tupian', this.zhengmian);
            // 提交虚拟表单
            http.post('/api/upload', form1, {
                // 头部
                headers: {'Content-Type': 'multipart/form-data'},
                // 进度
                onUploadProgress: progressEvent => {
                    let complete = progressEvent.loaded / progressEvent.total * 100;
                    self.p1 = complete;
                }
            }).then(data => {
                yiwenjianming = data.data.filename;

                if(erwenjianming !== '') {
                    self.$emit('alldone', {
                        yiwenjianming ,
                        erwenjianming 
                    })
                }
            });

            // 创建虚拟表单
            let form2 = new FormData();
            // 在虚拟表单中追加图片
            form2.append('tupian', this.fanmian);
            // 提交虚拟表单
            http.post('/api/upload', form2, {
                // 头部
                headers: {'Content-Type': 'multipart/form-data'},
                // 进度
                onUploadProgress: progressEvent => {
                    let complete = progressEvent.loaded / progressEvent.total * 100;
                    self.p2 = complete;
                }
            }).then(data => {
                erwenjianming = data.data.filename;

                if(yiwenjianming !== '') {
                     self.$emit('alldone', {
                        yiwenjianming ,
                        erwenjianming 
                    })
                }
            })
        }
    }
</script>

<style lang="scss" scoped>

</style>