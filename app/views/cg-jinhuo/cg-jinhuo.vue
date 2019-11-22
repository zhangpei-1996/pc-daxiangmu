<template>
    <div>
        <h1>我是采购进货</h1>
        <el-checkbox-group v-model="color">
            <el-checkbox v-for="item in ['红', '黑', '白', '蓝']" :label="item"></el-checkbox>
        </el-checkbox-group>
        <el-table
            :data="arr"
        >
            <el-table-column
                label="图片"
                prop="img"
                width="200"
            >
                <div slot-scope="s">
                    <img :src="`http://aiqianduan.com:7897/images/carimages_small/${s.row.id}/view/${s.row.img}`" alt="">
                </div>
            </el-table-column>
            <el-table-column
                label="id"
                prop="id"
            >
            </el-table-column>
            <el-table-column
                label="品牌"
                prop="brand"
            >
            </el-table-column>
            <el-table-column
                label="车系"
                prop="series"
            >
            </el-table-column>
            <el-table-column
                label="价格"
                prop="price"
            >
            </el-table-column>
            <el-table-column
                label="颜色"
                prop="color"
            >
            </el-table-column>
            <el-table-column
                label="排放"
                prop="exhaust"
            >
            </el-table-column>
            <el-table-column
                label="发动机"
                prop="engine"
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import http from '../../http/http.js';
    export default {
        data() {
            return {
                arr: [],
                color: ['红', '蓝']
            }
        },
        created(){
            this.loadData();
        },
        methods: {
            loadData(){
                http.get('getCar',{color: this.color}, (data) => {
                    this.arr = data.data.results;
                });
            },
        },
        watch: {
           
            color(v){
                this.color = v;
                this.page = 1;
                this.loadData();
            }
        }
    }
</script>

<style lang="less" scoped>
    h1{
        padding-bottom: 40px;
    }
</style>