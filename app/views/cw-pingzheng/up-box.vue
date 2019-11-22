<template>
    <div>
        <input type="file" hidden ref="kuang" @change="changeHan">

        <div class="upbox" @click="clickUpBoxHan" :style="{'background-image': `url(${base64})`}">
            <i class="el-icon-plus"></i>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                base64: ''
            }
        },
        methods: {
            clickUpBoxHan () {
                // 创建一个事件
                let evt = document.createEvent('MouseEvents');
                // 初始化这个事件
                evt.initMouseEvent('click', false, false);
                // 发送给别人
                this.$refs.kuang.dispatchEvent(evt);
            },
            changeHan () {
                // 得到图片
                let thepic = this.$refs.kuang.files[0];
                // 上传前预览
                let fr = new FileReader();
                // 读取这个图片
                fr.readAsDataURL(thepic);
                // 读完了
                fr.onload = (e) => {
                    this.base64  = e.target.result;
                };
            }
        }
    }
</script>

<style lang="less" scoped>
    .upbox{
        width: 500px;
        height:300px;
        border: 1px solid #333;
        position: relative;
        cursor: pointer;
        background-size:cover;
        background-position:center center;
        background-repeat: no-repeat;
        i{
            position: absolute;
            font-size: 90px;
            top:50%;
            left:50%;
            transform: translate(-50%, -50%);
        }
    }
</style>