<template>
    <div class="rc_wrap">
        <h1>我是日常采购栏目</h1>
        <el-form :model="ruleForm" :rules="rules" ref="myform" label-width="100px" class="demo-ruleForm">
            <el-form-item label="姓名" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-row>
                    <el-col :span="16">
                        <el-input v-model="ruleForm.phone"></el-input>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <el-button @click="sendMsg" v-show="countdown == 0">发送验证码</el-button>
                        <el-button :disabled="true" v-show="countdown != 0">已经发送请等待（{{countdown}}）</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="手机验证码" prop="yzm">
                <el-row>
                    <el-input v-model="ruleForm.yzm"></el-input>
                </el-row>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="ruleForm.nickname" placeholder="昵称最少2位最多6位，不能有怪异字符"></el-input>
            </el-form-item>
            <el-form-item  >
                <el-button @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {get} from '../../http/http.js';
    export default {
        data() {
            return {
                ruleForm: {},
                countdown: 0,
                rules: {
                    name: [
                        { required: true, message: '你瞎啊，有个星星看不到么？', trigger: 'blur' },
                        { pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/, message: '姓名不符合规则', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '你瞎啊，有个星星看不到么？', trigger: 'blur' },
                        { pattern: /^\d{11}$/, message: '手机号不符合规则', trigger: 'blur' }
                    ],
                    nickname: [
                        { required: true, message: '你瞎啊，有个星星看不到么？', trigger: 'blur' },
                        { trigger: 'blur', validator (rule, value, callback) {
                            if(/[\#\$\%\<\>]/.test(value)) {
                                callback(new Error('昵称不符合规则'))
                            }else{
                                callback();
                            }
                        }},
                        { min:2, max: 6, message: '昵称长度必须是2~6位', trigger: 'blur' },
                        { trigger: 'blur', async validator (rule, value, callback) {
                            const { isExist } = await get('checknickname', {nickname: value}).then(data => data.data);
                            // console.log(isExist);
                            if(isExist) {
                                callback(new Error('昵称已经被占'));
                            }else{
                                callback();
                            }
                        }},
                    ]
                }
            }
        },
        methods: {
            sendMsg(){
                var self = this;
                // 校验正则
                this.$refs.myform.validateField('phone', async function(err){
                    if ( err === '') {
                        // countdown改变
                        self.countdown = 6;
                        // 定时器
                        self.timer = setInterval(function(){
                            self.countdown --;

                            if(self.countdown == 0){
                                clearTimeout(self.timer);
                            }
                        }, 1000);

                        const token = await get('sendMsg', { 'phone': self.ruleForm.phone }).then(data => data.data);
                        // console.log(token);
                        localStorage.setItem('token', token);
                    }
                });
            },
            submit() {
                var self = this;
                this.$refs.myform.validate(async function(isHefa){
                    if(isHefa){
                        // 合法情况下，检查验证码
                        const isok = await get('chaYzm', {
                            token: localStorage.getItem('token'),
                            yanzhengma: self.ruleForm.yzm
                        }).then(data => data.data);

                        if(isok == 'nook') {
                            self.$message({
                                message: '验证码不对',
                                type: 'warning'
                            });
                        } else if(isok == 'ok') {
                            self.$message({
                                message: '恭喜，表单已经成功提交',
                                type: 'success'
                            });
                        }
                    }
                });
            }
        }
    }
</script>

<style lang="less" scoped>
    h1{
        margin-bottom: 30px;
    }
    .rc_wrap{
        width: 500px;
    }
</style>