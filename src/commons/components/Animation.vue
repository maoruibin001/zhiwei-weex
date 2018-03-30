<template>
    <div class="animationContainer" :style="{height: pageHeight}">
        <div class="imageBox" ref="imgBox"
             :style="{left: `${left}px`, top: `${top}px`, right: `${right}px`, bottom: `${bottom}px`}">
            <image style="width: 100px;height:100px;" class="img" src="/src/images/pan.jpg"></image>
        </div>
    </div>
</template>

<style>

    .animationContainer {
        /*background-color: red;*/
    }

    .imageBox {
        width: 100px;
        height: 100px;
        position: absolute;
        /*left: 0;*/
        /*top: 0;*/
    }
</style>

<script>

    const step = 40;
    const modal = weex.requireModule('modal');
    const animation = weex.requireModule('animation');

    import utils from '../utils/utils';

    export default {
        created() {
            modal.toast({
                message: `hello,  welcome. let's enjoy this game`,
                duration: 3
            })
        },
        mounted() {
            this.begin();
        },
        data() {
            return {
                pan: '/src/images/pan.jpg',
                pageHeight: utils.DEVICEHEIGHT,
                pageWidth: utils.DEVICEWIDTH,
                left: 0,
                top: 0,
                bottom: utils.DEVICEHEIGHT,
                right: utils.DEVICEWIDTH,
                isLeft: true,
                isBottom: true,
                offsetX: 0,
                offsetY: 0,
            }
        },
        methods: {
            begin() {
                let ref = this.$refs.imgBox;
                this.run(ref);
                this.run(ref);
                let self = this;
                animation.transition(ref, {
                    styles: {
                        transform: `translate(${self.offsetX}px, ${self.offsetY}px)`,
                    },
                    duration: 250,
                    delay: 0,
                }, () => {
                    this.offsetX = 0;
                    this.offsetY = 0;
                    self.begin();
                });
            },
            run(ref) {
                console.log(this.left);
                if (this.left <= step) {
                    this.isLeft = true;
                }
                if (this.left >= this.pageWidth - 100 - step) {
                    this.isLeft = false;
                }

                if (this.top <= step) {
                    this.isBottom = true;
                }

                if (this.top >= this.pageHeight - 150 - step) {
                    this.isBottom = false;
                }

                this.animate(ref);
            },

            animate(ref) {
                if (Math.random() > .5) {
                    if (this.isLeft) {
                        this.left += step;
                        this.offsetX = step;
                    } else {
                        this.left -= step;
                        this.offsetX = -step;
                    }

                }
                if (Math.random() > .5) {
                    if (this.isBottom) {
                        this.top += step;
                        this.offsetY = step;
                    } else {
                        this.top -= step;
                        this.offsetY = -step;
                    }

                }
            }
        }
    }
</script>