<template>
    <div>
        <div class="topbox">
            <el-button type="warning" @click="isShowDialog = true">增加任务</el-button>
        </div>
        <el-dialog
            title="增加任务"
            :visible.sync="isShowDialog"
            width="800px"
            @on-close="isShowDialog = false"
        >
            <AddRw ref="addrw"/>

            <span slot="footer" class="dialog-footer">
                <el-button>取 消</el-button>
                <el-button type="primary" @click="dialogOkHan">确 定</el-button>
            </span>
        </el-dialog>

        <div class="row">
            <h4>共{{total}}个任务符合要求</h4>
            <div class="toolbox">
                筛选状态：
                <el-tag
                    type="info"
                    effect="dark"
                    @click="changeType('')"
                    :class="{'cur': type == ''}"
                >
                    全部
                </el-tag>
                <el-tag
                    type=""
                    effect="dark"
                    @click="changeType(1)"
                    :class="{'cur': type == '1'}"
                >
                    进行中
                </el-tag>
                <el-tag
                    type="success"
                    effect="dark"
                    @click="changeType(2)"
                    :class="{'cur': type == '2'}"
                >
                    已完成
                </el-tag>
                <el-tag
                    type="danger"
                    effect="dark"
                    @click="changeType(3)"
                    :class="{'cur': type == '3'}"
                >
                    已超期
                </el-tag>
            </div>
            <el-date-picker
                class="cdp"
                v-model="deadline"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
            >
            </el-date-picker>
        </div>
        <el-table
            v-loading="loading"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
        >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column
                label="任务id"
                prop="id"
            >
            </el-table-column>
            <el-table-column
                label="执行人"
            >
                <template slot-scope="scope">
                    <span class="itemspan" v-for="item in scope.row.executor" :key="item.id">
                        <el-tooltip class="item" effect="dark" :content="item.nickname" placement="top-start">
                            <img class="itemavatar" :src="`http://127.0.0.1:3000/avatars/${item.avatar}`" alt="">
                        </el-tooltip>
                    </span>
                </template>
            </el-table-column>
            <el-table-column
                label="简介"
                prop="title"
                width="300"
            >
            </el-table-column>
            <el-table-column
                width="220"
                label="截止时间"
            >
                <template slot-scope="scope">
                    {{ moment(scope.row.deadline).format('YYYY年M月DD日 hh:mm:ss') }}
                </template>
            </el-table-column>
            <el-table-column
                label="状态"
            >
                <template slot-scope="scope">
                    <el-tag
                        :type="gettype(scope.row.done, scope.row.deadline).cl"
                        effect="dark">
                        {{ gettype(scope.row.done, scope.row.deadline).cn }}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>
        <div class="kong"></div>
        <el-pagination
            class="pagibox"
            layout="prev, pager, next"
            :total="total"
            @current-change="changeCurrent"
            :current-page="page"
        >
        </el-pagination>
        <div class="piliangbox">
            <el-button type="success" @click="piliangHan">批量设置打钩的{{}}个任务为完成状态</el-button>
        </div>
    </div>
</template>

<script>
    import {get, post} from '../../http/http.js';
    import moment from 'moment';
    import AddRw from './AddRw.vue';

 
    export default {
        components: {
            AddRw
        },
        data () {
            return {
                isShowDialog: false,
                loading: false,
                yixuan: [],
                tableData: [],
                // 存放两个日期对象的数组，去http里面才是时间戳数组呢。
                deadline: [],
                total: 0,
                page: 1,
                // 筛选类型，type1 进行中，type2已完成  type3 超期
                type: '',
                pickerOptions: {
                shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', [new Date(), new Date()]);
                        }
                    }, {
                        text: '今年至今',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date(new Date().getFullYear(), 0);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近六个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setMonth(start.getMonth() - 6);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setDate(start.getDate() - 3);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                }
            }
        },
        watch: {
            deadline(v){
                this.page = 1;
                this.loadData();
            }
        },
        methods: {
            moment,
            dialogOkHan(){
                console.log(this.$refs.addrw);
                post('addrw', {
                    title: this.$refs.addrw.title,
                    detail: this.$refs.addrw.detail,
                    executors: this.$refs.addrw.executors.map(item => item.id),
                    deadline: Date.parse(this.$refs.addrw.deadline)
                });
            },
            handleSelectionChange(val){
                this.yixuan = val.map(item => item.id);
            },
            piliangHan(){
                
                 this.$confirm('你正要将个任务批量设置为已完成，举动危险！操作不可逆！请确认！', '提示', {
                        confirmButtonText: '是的，我明白我在做什么，真的要设置',
                        cancelButtonText: '不设置',
                        type: 'warning'
                    }).then(() => {
                        get('setdone', {yixuan: this.yixuan}).then(()=>{
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        })
                        
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });          
                    });
            },
            changeCurrent(page){
                this.page = page;
                this.loadData();
            },
            async loadData(){
                this.loading = true;
                const {rws, total}  = await get('allrw', {page: this.page, deadline: this.deadline, type: this.type}).then(data => data.data);
                this.loading = false;
                this.tableData = rws;
                this.total = total
            },
            gettype(done, deadline){
                if(done){
                    return {
                        'cl': 'success',
                        'cn': '已完成'
                    };
                }else{
                    var today = Date.parse(new Date());
                    if(deadline > today) {
                        return {
                            'cl': '',
                            'cn': '进行中'
                        };
                    }else {
                        return {
                            'cl': 'danger',
                            'cn': '已经超期'
                        };
                    }
                }
                
            },
            changeType(type){
                this.type= type;
                this.page = 1;
                this.loadData();
            }
        },
         created (){
            this.loadData();
        }, 
    }
</script>

<style lang="less" scoped>
    .itemspan{
        margin-right: 10px;
        cursor: pointer;
    } 
    .itemavatar{
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    .kong{
        height:20px;
    }
    .cdp{
        float:right;
    }
    h4{
        float: left;
        margin-right: 20px;
        line-height: 30px;
    }
    .toolbox{
        float: left;
        .el-tag{
            margin-right:10px;
            cursor: pointer;
            &.cur{
                border:2px solid red;
            }
        }
    }
    .pagibox{
        float: right;
    }
    .piliangbox{
        float: left;
    }
    .row{
        overflow: hidden;
    }
</style>