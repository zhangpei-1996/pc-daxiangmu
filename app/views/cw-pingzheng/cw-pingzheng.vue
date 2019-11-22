<template>
    <div>
        <input type="file" ref="kuang">
        <el-button type="success" @click="up">异步上传</el-button>
        
        <form action="1.php" method="post" enctype="multipart/form-data">
            <input type="file">
            <input type="submit">
        </form>
    </div>
</template>

<script>
    import http from '../../http/http.js';

    export default {
        methods: {
            up () {
                // 创建虚拟表单
                var fd = new FormData();
                // 追加图片文件
                fd.append('tupian', this.$refs.kuang.files[0]);
                // Ajax上传，上传的不是图片，而是虚拟表单
                http.post(
                    'http://127.0.0.1:3000/upload', 
                    fd,
                    {
                        headers: {'Content-Type': 'multipart/form-data'}
                    }
                );
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>