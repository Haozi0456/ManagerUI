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
                        近15天每日收入统计
                    </p>
                    <div class="near_30_days">
                        <statisticsNear15Days></statisticsNear15Days>
                    </div>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import statisticsNear15Days from './components/statisticsNear15Days.vue';

    export default {
        name: 'statistics-15days',
        components: {
            statisticsNear15Days
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
