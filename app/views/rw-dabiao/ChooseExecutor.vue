<template>
    <div>
        <div class="b_wrap">
            <el-tree
                lazy
                show-checkbox
                :load="loadNode"
                :props="props"
                ref="tree"
                node-key="id"
            >
            </el-tree>
           
        </div>
         <el-button @click="okHan">确定</el-button>
    </div>
</template>

<script>
    import {get} from '../../http/http.js';

    export default {
        props: ['executors'],
        data() {
            return {
                showuser: [],
                props: {
                    'isLeaf': 'leaf'
                }
            }
        },
        async created(){
            const {allbm} = await get('allbm').then(data => data.data);
 
            this.data = allbm.map(item => ({
                label: item,
                children: item
            }));
        },
        methods: {
            okHan(){
                var checkedIds = this.$refs.tree.getCheckedKeys(true);
                var showuserresult = this.showuser.filter(item => checkedIds.includes(item.id));
                var liucunresult = this.executors.filter(item => {
                    // 标记、旗帜
                    var flag = false;
                    for(let i = 0; i < this.showuser.length;i++){
                        if(this.showuser[i].id == item.id) {
                            flag = true;
                        }
                    }
                    return !flag;
                });
                var result = [...showuserresult, ...liucunresult];

                result = result.sort((a,b) => a.id - b.id);

                this.$emit('ok', {result});
            },
            loadNode(node, resolve){
                const h = this.$createElement;

                if(node.level == 0){
                    get('allbm').then(data => {
                        resolve(data.data.allbm.map(item => ({
                            label: item
                        })));
                    });
                }else if(node.level == 1){
                    get('alluser', {'bm': node.data.label}).then(data => {
                        // 改变showuser数组
                        this.showuser = [...this.showuser, ...data.data.alluser];

                        resolve(data.data.alluser.map(item => ({
                            id: item.id,
                            label: h('div', [
                                h('img', {
                                    attrs: {
                                        'src': `http://127.0.0.1:3000/avatars/${item.avatar}`
                                    },
                                    style: {
                                        borderRadius: '50%',
                                        width: '22px',
                                        height:'22px'
                                    }
                                }),
                                h('span', {
                                    style: {
                                        paddingLeft: '10px',
                                        position: 'relative',
                                        top: '-6px',
                                        width: '30px'
                                    }
                                } , item.nickname)
                            ]),
                            leaf: true
                        })));
                        
                        // 综合根据当前已经设置的、父亲传入的，设置打钩
                        var checkedIds = this.$refs.tree.getCheckedKeys(true);
                        this.$refs.tree.setCheckedKeys([...this.executors.map(item => item.id), ...checkedIds]);
                    });
                }
            }
        }
    }
</script>

<style lang="less" scoped>
    .b_wrap{
        height: 250px;
        overflow-y: scroll;
    }
   
        
</style>