<template>
    <div>
        <div class="cutpic" :style="{'width': calcWidth + 'px', 'height': calcHeight + 'px', 'border': '1px solid #333'}">
            <img :width="calcWidth" :height="calcHeight" :src="`http://127.0.0.1:3000/uploads/${serverFileName}`" />
                <VueDragResize 
                    :isActive="true" 
                    :w="100" 
                    :h="100" 
                    :parentLimitation="true" 
                    :aspectRatio="true" 
                    @resizing="resize" @dragging="resize"
                    :minw="20"
                    :minh="20"
                >
                </VueDragResize>
        </div>
        <el-button type="success" style="margin-top: 10px;" @click="doCut">确定裁切</el-button>
        {{width}} {{height}} {{top}} {{left}}
        <div class="right">
            <div class="da" :style="{
                'background-image': `url(http://127.0.0.1:3000/uploads/${serverFileName})`,
                'background-size': calcWidth / width * 140 + 'px ' + calcHeight / height * 140 + 'px',
                'background-position': -left / width * 140 + 'px ' + -top / height * 140 + 'px'
            }"></div>

            <div class="zhong" :style="{
                'background-image': `url(http://127.0.0.1:3000/uploads/${serverFileName})`,
                'background-size': calcWidth / width * 100 + 'px ' + calcHeight / height * 100 + 'px',
                'background-position': -left / width * 100 + 'px ' + -top / height * 100 + 'px'
            }"></div>


            <div class="xiao" :style="{
                'background-image': `url(http://127.0.0.1:3000/uploads/${serverFileName})`,
                'background-size': calcWidth / width * 60 + 'px ' + calcHeight / height * 60 + 'px',
                'background-position': -left / width * 60 + 'px ' + -top / height * 60 + 'px'
            }"></div>
        </div>
    </div>
</template>

<script>
    import VueDragResize from 'vue-drag-resize';
    import {get} from '../../http/http.js';
 
    export default {
        data() {
            return {
                width: 100,
                height: 100,
                top: 0,
                left: 0,
            }
        },
        components: {
            VueDragResize
        },
        props: ['serverFileName', 'picRealHeight', 'picRealWidth'],
        computed: {
            calcWidth() {
                if(this.picRealWidth > 360) {
                    return 360;
                } else {
                    return this.picRealWidth;
                }
            },
            calcHeight() {
                return this.picRealHeight / this.picRealWidth  * this.calcWidth;
            }
        },
        methods: {
            resize(newRect) {
                this.width = newRect.width;
                this.height = newRect.height;
                this.top = newRect.top;
                this.left = newRect.left;
            },
            doCut(){
                var self = this;
                var bili = this.picRealWidth / this.calcWidth;
                get('cut', {
                    x: this.left * bili,
                    y: this.top * bili,
                    w: this.width * bili,
                    h: this.height * bili,
                    filename: this.serverFileName
                }).then(data => {
                     self.$emit('okla');
                });
               
            }
        }
    }
</script>

<style lang="less" scoped>
    .cutpic{
        position: relative;
        .mask{
            position: absolute;
            width:100%;
            height:100%;
            top:0;
            left:0;
            background:rgba(0,0,0,.74);
        }
        .cut {
            position: absolute;
            width: 100px;
            height: 100px;
            top:0;
            left:0;
            border: 1px solid #000;
        }
    }
    .right{
        position: absolute;
        top:0;
        right:30px;
        width: 140px;     
        padding-top: 10px;
        .da{
            width:140px;
            height:140px;
            border: 1px solid #000;
            margin-bottom: 10px;
        }
        .zhong{
            width:100px;
            height:100px;
            border: 1px solid #000;
            margin-bottom: 10px;
        }

        .xiao{
            width:60px;
            height:60px;
            border: 1px solid #000;
            margin-bottom: 10px;
        }
    }
</style>