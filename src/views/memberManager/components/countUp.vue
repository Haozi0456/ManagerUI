<template>
    <div>
        <p :class="className" :style="{textAlign: 'center', color: color, fontSize: countSize, fontWeight: countWeight}"><span v-cloak :id="idName">{{ startVal }}</span><span :style="{fontSize: unitSize}">{{ unit }}</span></p>
        <slot name="intro"></slot>
    </div>
</template>

<script>
import CountUp from 'countup';

function transformValue (val, unitLable) {
    // let endVal = 0.00;
    let unit = unitLable;
    // if (val < 10000) {
    let endVal = parseFloat(val).toFixed(2);
    // } else if (val >= 10000 && val < 1000000) {
    //     endVal = parseInt(val / 1000);
    //     unit = 'K+';
    // } else if (val >= 1000000 && val < 10000000000) {
    //     endVal = parseInt(val / 1000000);
    //     unit = 'M+';
    // } else {
    //     endVal = parseInt(val / 1000000000);
    //     unit = 'B+';
    // }

    return {
        val: endVal,
        unit: unit
    };
}

export default {
    data () {
        return {
            unit: '',
            demo: {}
        };
    },
    name: 'countUp',
    props: {
        idName: String,
        className: String,
        unitLable: String,
        startVal: {
            type: Number,
            default: 0
        },
        endVal: {
            type: Number,
            required: true
        },
        decimals: {
            type: Number,
            default: 2
        },
        duration: {
            type: Number,
            default: 2
        },
        delay: {
            type: Number,
            default: 500
        },
        options: {
            type: Object,
            default: () => {
                return {
                    useEasing: true,
                    useGrouping: true,
                    separator: ',',
                    decimal: '.'
                };
            }
        },
        color: String,
        countSize: {
            type: String,
            default: '30px'
        },
        unitSize: {
            type: String,
            default: '18px'
        },
        countWeight: {
            type: Number,
            default: 700
        },
        introText: [String, Number]
    },
    mounted () {
        this.$nextTick(() => {
            setTimeout(() => {
                let res = transformValue(this.endVal, this.unitLable);
                let endVal = res.val;
                this.unit = res.unit;
                let demo = {};
                this.demo = demo = new CountUp(this.idName, this.startVal, endVal, this.decimals, this.duration, this.options);
                if (!demo.error) {
                    demo.start();
                }
            }, this.delay);
        });
    },
    watch: {
        endVal (val) {
            let res = transformValue(val);
            let endVal = res.val;
            this.unit = res.unit;
            this.demo.update(endVal);
        }
    }
};
</script>
