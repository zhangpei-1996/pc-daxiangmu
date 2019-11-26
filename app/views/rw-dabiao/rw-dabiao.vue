<template>
    <div>
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
      
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
                    </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {get} from '../../http/http.js';
    import moment from 'moment';

   

    export default {
        data () {
            return {
                tableData: []
            }
        },
        methods: {
            moment
        },
        created (){
            get('allrw', {page: 1}).then(data => {
                this.tableData = data.data.rws
            });
        }    
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
</style>