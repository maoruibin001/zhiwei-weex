<template>
    <scroller class="list" :style="{height: `${height}px`}">
        <div class="cell" v-for="num in l">
            <div class="panel">
                <text class="text">{{num}}</text>
            </div>
        </div>

        <loading class="loading" @loading="getData" :display="loading ? 'show' : 'hide'">
            <text class="indicator-text">Loading ...</text>
            <loading-indicator class="indicator"></loading-indicator>
        </loading>
    </scroller>
</template>
<style scoped>
    .list {
        position: relative;
        z-index: 100;
    }
    .loading {
         /*width: 750;*/
         display: -ms-flex;
         display: -webkit-flex;
         display: flex;
         -ms-flex-align: center;
         -webkit-align-items: center;
         -webkit-box-align: center;
         align-items: center;
     }
    .indicator-text {
        color: #888888;
        font-size: 42px;
        text-align: center;
    }
    .indicator {
        /*margin-top: 16px;*/
        height: 40px;
        width: 40px;
        color: blue;
    }
    .panel {
        /*width: 600px;*/
        height: 50px;
        /*margin-left: 75px;*/
        /*margin-top: 35px;*/
        /*margin-bottom: 35px;*/
        flex-direction: column;
        justify-content: center;
        border-width: 2px;
        border-style: solid;
        border-color: #DDDDDD;
        background-color: #F5F5F5;
    }
    .text {
        font-size: 50px;
        text-align: center;
        color: #41B883;
    }
</style>
<script>
    import utils from '../../../commons/utils/utils';
    const modal = weex.requireModule('modal');
    export default {
        props: ['height'],
        data() {
            return {
                l: [],
                num: 20,
                loading: false,
            }
        },

        created() {
            this.getData();
        },
        methods: {
            getData(pageNo, pageSize) {
                pageNo = pageNo || utils.PAGENO;
                pageSize = pageSize || utils.PAGESIZE;
                this.num += 10;
                this.loading = true;
                utils.ajax('http://httpbin.org/post', {
                    num: this.num
                }, (error, resp) => {
                    this.loading = false;
                    if(error) {
                        console.log('error: ', error);
                    } else {
                        let l = [];
                        let num = JSON.parse(resp.data).num;
                        for(let i = 0; i < num; i ++) {
                            l.push(i);
                        }
//                        modal.toast({
//                            message: l,
//                            duration: 3
//                        });
                        this.l = l;
                    }
                })
            },
        }
    }
</script>