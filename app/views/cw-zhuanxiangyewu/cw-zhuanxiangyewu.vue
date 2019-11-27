<template>
    <div>
        <el-dialog
            title="你希望哪家工厂发货？"
            :visible.sync="dialogVisible"
            width="500px"
        >
            <dialogInn v-if="dialogVisible" :nowobj="nowobj" :nowchanpin="nowchanpin"/>   

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

      
        <el-tabs  v-model="activeName">
            <el-tab-pane v-for="(v,k) in chanpin" :label="k" :name="k">
                <div class="grid" v-for="item in v" :key="item.name" @click="gridClickHan(item)">
                    <p>
                        <img :src="`http://127.0.0.1:3000/productpics/${item.pic}`" alt="">
                    </p>
                    <p>
                        {{item.name}}  {{item.price}}元
                    </p>
                    <p>
                        {{item.factory}}
                    </p>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import {get} from '../../http/http.js';
    import dialogInn from './dialog-inn.vue';

    export default {
        components: {
            dialogInn
        },
        methods: {
            gridClickHan(obj) {
                this.nowobj = obj;
                this.dialogVisible = true;
            }
        },
        data() {
            return {
                nowobj: null,
                dialogVisible: false,
                chanpin: [],
                activeName: '健康坚果',
                nowchanpin: [
                    {
                        "pname": "手剥松子",
                        "belonginPurchlist": 299523527742,
                        "pfactory": "F",
                        "pprice": 722,
                        "pnumber": 12,
                        "ptotal": 8889264,
                        "shop": "爱奇艺商城",
                        "storage": "香港特别行政区九龙它细增仓库",
                        "time": "1570023344000",
                    },
                    {
                        "pname": "手剥松子",
                        "belonginPurchlist": 299523527742,
                        "pfactory": "C",
                        "pprice": 722,
                        "pnumber": 34,
                        "ptotal": 225576215904,
                        "shop": "爱奇艺商城",
                        "storage": "香港特别行政区九龙它细增仓库",
                        "time": "1570023344000",
                    },
                    {
                        "pname": "混合果仁小包装零食大礼包送礼",
                        "belonginPurchlist": 299523527742,
                        "pfactory": "B",
                        "pprice": 470,
                        "pnumber": 3242342,
                        "ptotal": 1523900740,
                        "shop": "爱奇艺商城",
                        "storage": "香港特别行政区九龙它细增仓库",
                        "time": "1570023344000"
                    }
                ]
            }
        },
        async created(){
            await get('chanpin').then(data => {
                this.chanpin = data.data.chanpin
            });
        }    
    }
</script>

<style lang="less" scoped>
    .grid{
        float: left;
        width: 200px;
        height:248px;
        border:1px solid #eee;
        padding: 10px;
        box-sizing: border-box;
        margin-right: 10px;
        margin-bottom: 10px;
        font-size: 14px;
    }
</style>