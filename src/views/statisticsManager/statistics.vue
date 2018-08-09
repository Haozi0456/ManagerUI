<style lang="less">
    @import "./styles/statistics.less";
    @import "../../styles/common.less";


</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="24" :style="{marginBottom: '8px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="podium"></Icon>
                        每月收入统计
                    </p>
                    <p slot="extra">
                        年份:
                        <DatePicker type="year" placement="bottom-end" :value="currentYear" :clearable="false"
                                    format="yyyy" @on-change="handleChange"
                                    :editable="false" placeholder="请选择年份" style="width: 200px"></DatePicker>
                    </p>
                    <div class="monthInYear">
                        <statisticsMonthOfYear :year-val='yearVal'></statisticsMonthOfYear>
                    </div>
                </Card>
            </Col>
        </Row>
        <Row :gutter="10">
            <Col :md="24" :lg="24" :style="{marginBottom: '8px'}">
                <Card>
                    <p slot="title" class="card-title">
                        <Icon type="podium"></Icon>
                        每月订单个数统计
                    </p>
                    <p slot="extra">
                        年份:
                        <DatePicker type="year" placement="bottom-end" :value="currentYear" :clearable="false"
                                    format="yyyy" @on-change="handleChange"
                                    :editable="false" placeholder="请选择年份" style="width: 200px"></DatePicker>
                    </p>
                    <div class="monthInYear">
                        <statisticsMonthOfYearOrderCount :year-val='yearVal'></statisticsMonthOfYearOrderCount>
                    </div>
                </Card>
            </Col>
        </Row>
        <!--<Row :gutter="10">-->
            <!--<Col :md="24" :lg="24" :style="{marginBottom: '8px'}">-->
                <!--<Card>-->
                    <!--<p slot="title" class="card-title">-->
                        <!--<Icon type="podium"></Icon>-->
                        <!--近30天每日收入统计-->
                    <!--</p>-->
                    <!--<div class="near_30_days">-->
                        <!--<statisticsNear30Days></statisticsNear30Days>-->
                    <!--</div>-->
                <!--</Card>-->
            <!--</Col>-->
        <!--</Row>-->
    </div>
</template>

<script>
    import statisticsMonthOfYear from './components/statisticsMonthOfYear.vue';
    import statisticsMonthOfYearOrderCount from './components/statisticsMonthOfYearOrderCount.vue';
    import statisticsNear30Days from './components/statisticsNear30Days.vue';

    export default {
        name: 'statistics',
        components: {
            statisticsMonthOfYear,
            statisticsMonthOfYearOrderCount,
            statisticsNear30Days
        },
        data () {
            return {
                todayYear: 2018,
                yearVal: 2018
            };
        },
        computed: {
            currentYear () {
                this.todayYear = new Date().format('yyyy');
                return this.todayYear;
            }
        },
        methods: {
            init () {

            },
            handleChange (daterange) {
                this.yearVal = parseInt(daterange);
            }
        },
        mounted () {
            this.init();
        }
    };
</script>

<style scoped>

</style>