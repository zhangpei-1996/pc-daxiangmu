<template>
    <div>
        <div v-for="factoryname in nowobj.factory" :key="factoryname">
            {{factoryname}}工厂：
            <el-input :value="getValue(factoryname)" @input="changeHan($event, factoryname)"/>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['nowobj', 'nowchanpin'],
        methods: {
            getValue(factoryname) {
               
                return this[factoryname];
            },
            changeHan(v, k){
               
                this[k] = v;
            }
        },
        data() {
            var obj = {};
            this.nowobj.factory.forEach(factoryname => {
                var pnumber = 0;
                for(let i = 0; i < this.nowchanpin.length; i++) {
                    if(this.nowchanpin[i].pname == this.nowobj.name && this.nowchanpin[i].pfactory == factoryname ){
                        pnumber = this.nowchanpin[i].pnumber;
                    }
                }

                obj[factoryname] = pnumber;
            });
            console.log(obj)
            return obj;
        } 
    }
</script>

<style lang="scss" scoped>

</style>