<style lang="less">
    .card-icon-con{
        height: 100%;
        color: white;
        border-radius: 3px 3px 0 0 ;
    }
    .height-100{
        height: 100%;
    }
    .card-con{
        cursor:pointer;
        height: 80px;
    }
    .intro-text{
        font-size:16px;
        font-weight:400;
        margin-top: 8px;
        color:#464c5b;
    }

</style>

<template>
    <Card :padding="0" :style="{width:width, height:height,backgroundColor: color, color: 'white'}">
        <div class="card-con">
            <Col class="card-icon-con" >
                <Row class="height-100" type="flex" align="middle" justify="center">
                    <Icon :type="iconType" :size="iconSize"></Icon>
                </Row>
                <Row type="flex" align="middle" justify="center" >
                    <p class="intro-text">{{ subTitle }}</p>
                </Row>
                <Row type="flex" align="middle" justify="center" >
                    <p class="intro-text">{{ title }}</p>
                </Row>
            </Col>
            <Col span="24">

            </Col>
        </div>
    </Card>
</template>

<script>
    export default {
        name: "infoPanel",
        props: {
            idName: String,
            endVal: Number,
            decimals: {
                type: Number,
                default: 2
            },

            unit: String,
            color: String,
            iconType: String,
            subTitle: {
                type: String,
                default: '副标题'
            },
            title: {
                type: String,
                default: '标题'
            },
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
            },
            width: {
                type: String,
                default: '120px'
            },
            height: {
                type: String,
                default: '120px'
            }


        }
    }
</script>

<style scoped>

</style>