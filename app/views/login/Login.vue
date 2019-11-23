<template>
    <div class="loginwrap">
        <h1>我是登录页面</h1>
        <div class="inner">
            <div>
                用户名：
                <el-input v-model="username" />
            </div>
            <div>
                密码：
                <el-input v-model="password" />
            </div>
            <div>
                <el-button type="success" @click="login">
                    登录
                </el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {post} from '../../http/http.js';
    
    export default {
        data() {
            return {
                username: 'xiaohong',
                password: '123456'
            }
        },
        methods: {
            async login(){
                const username = this.username;
                const password = this.password;
                // 检查非空
                if(username == '' || password == '') {
                    this.$message({
                        'message': '必须填写用户名和密码',
                        'type': 'warning'
                    })
                    return;
                } 

                const {login} = await post('login', {
                    username,
                    password
                }).then(data => data.data);

                if(login) {
                    this.$message({
                        'message': '登录成功，跳转到首页',
                        'type': 'success'
                    });
                    this.$router.push({
                        name: 'profile'
                    });
                }else{
                    this.$message({
                        'message': '用户名或密码错误',
                        'type': 'error'
                    });
                }
                 
            }
        }
    }
</script>

<style lang="less" scoped>
    .loginwrap{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        background: #eee;

        .inner {
            padding:20px;
            width: 400px;
            height: 200px;
            background:white;
            position: absolute;
            top:50%;
            left:50%;
            transform:translate(-50%, -50%);

            &>div {
                padding-top:10px;
                font-size: 14px;
            }
        }
    }
</style>