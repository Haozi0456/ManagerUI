<style lang="less">
    @import './styles/member-infor-card.less';
</style>

<template>
    <Card :padding="0">
        <div class="member-infor-card-con">
            <Col class="member-infor-card-icon-con" :style="{backgroundColor: color, color: 'white'}" span="8">
                <Row class="member-height-100" type="flex" align="middle" justify="center">
                    <Icon :type="iconType" :size="iconSize"></Icon>
                </Row>
            </Col>
            <Col span="16" class="member-height-100">
                <Row type="flex" align="middle" justify="center" class="height-100">
                    <count-up 
                        class="member-infor-card-count user-created-count"
                        :id-name="idName" 
                        :end-val="endVal"
                        :decimals="decimals"
                        :unitLable="unit"
                        :color="color"
                        :countSize="countSize"
                        :countWeight="countWeight"
                    >
                        <p class="member-infor-intro-text" slot="intro">{{ introText }}</p>
                    </count-up>
                </Row>
            </Col>
        </div>
    </Card>
</template>

<script>
import countUp from './countUp.vue';

export default {
    name: 'inforCard',
    components: {
        countUp
    },
    props: {
        idName: String,
        endVal: Number,
        decimals:{
            type: Number,
            default: 2
        },
        unit:String,
        color: String,
        iconType: String,
        introText: String,
        countSize: {
            type: String,
            default: '30px'
        },
        countWeight: {
            type: Number,
            default: 700
        },
        iconSize: {
            type: Number,
            default: 40
        }
    }
};
</script>

