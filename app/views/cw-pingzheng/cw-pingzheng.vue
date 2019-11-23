<template>
    <div>
        <div v-show="isSuccess">
             <el-alert
                title="成功提示的文案"
                type="success"
                description="文字说明文字说明文字说明文字说明文字说明文字说明"
                show-icon>
            </el-alert>
        </div>

       <div v-show="!isSuccess">
            <p>请上传身份证正面（人像面）照片：</p>
            <div>
                <up-box ref="zheng"/>
            </div>
            <p>请上传身份证背面（国徽面）照片：</p>
            <div>
                <up-box ref="fan" />
            </div>
            <div style="padding-top: 20px;">
                <el-button @click="doup">上传</el-button>
            </div>
       </div>
    </div>
</template>

<script>
    import upBox from './up-box.vue';
    import NotifiInner from './NotifiInner.vue';

    export default {
        data() {
            return {
                isSuccess: false
            }
        },
        components: {
            'up-box': upBox,
            NotifiInner
        },
        methods: {
            doup() {
                var self = this;

                // 捞
                const zhengmian = this.$refs.zheng.file;
                const fanmian = this.$refs.fan.file;
                const zhengmianbase64 = this.$refs.zheng.base64;
                const fanmianbase64 = this.$refs.fan.base64;

            

                if(zhengmian === null || fanmian === null){
                    this.$message({
                        message: '请选择两个照片再点我',
                        type: 'warning'
                    })
                    return;
                }

                const h = this.$createElement;
                
                this.$notify({
                    title: '正在上传，请稍后',
                    message: h('NotifiInner', {
                        props: {
                            zhengmian,
                            fanmian,
                            zhengmianbase64,
                            fanmianbase64
                        },
                        on: {
                            alldone(obj) {
                                // alert('儿子说都完了');
                                console.log(obj);
                                self.isSuccess = true;
                            }
                        }
                    })
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    p{
        line-height: 300%;
    }
</style>