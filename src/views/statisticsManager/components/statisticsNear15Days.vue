<template>
    <div style="width:100%; height:100%; " id="chart"></div>
</template>

<script>
    import echarts from 'echarts';
    import config from '../../../libs/config';

    export default {
        name: 'statisticsNear15Days',
        data () {
            return {
                chart: null,
                chartData: {
                    xValues: [],
                    yValues: []
                }

            };
        },
        methods: {
            init () {
                const option = {
                    color: ['#2D8CF0'],
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    grid: {

                        left: '2%',
                        right: '5%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis:
                        {
                            type: 'category',
                            data: this.chartData.xValues
                        },

                    yAxis:
                        {
                            type: 'value'
                        },

                    series: [
                        {
                            name: '月收入',
                            type: 'line',
                            barWidth: 60,
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    fontSize: 18,
                                    fontWeight: 600,
                                    color: '#F25E43',
                                    formatter: '{c}.00'
                                }
                            },
                            itemStyle: { //折线拐点标志的样式
                                normal: {
                                    borderColor: '#FF0000',
                                    borderWidth: 2,
                                    label: {
                                        show: true,
                                        textStyle: {
                                            color: '#FF0000'
                                        },
                                        position: 'top'
                                    }
                                }
                            },
                            data: this.chartData.yValues
                        }
                    ]
                };
                let statisticsCharts = echarts.init(document.getElementById('chart'));
                this.chart = statisticsCharts;
                statisticsCharts.setOption(option);

                window.addEventListener('resize', function () {
                    statisticsCharts.resize();
                });

                this.refresh();
            },
            refresh () {
                this.Http.post(config.service.getStatisticsByHalfOfMonth, '').then((res) => {
                    if (res.data.code == 100) {
                        let result = res.data.data;
                        var xValue = [];
                        var yValue = [];
                        for (var i = 0; i < result.length; i++) {
                            xValue.push(result[i].dateline);
                            yValue.push(result[i].total);
                        }
                        this.chartData.xValues = xValue;
                        this.chartData.yValues = yValue;
                        let titleLable = '近15天收入(单位:元)';
                        this.chart.setOption({
                            title: {
                                text: titleLable
                            },
                            xAxis: {
                                data: this.chartData.xValues
                            },
                            series: [{
                                name: '日收入',
                                type: 'line',
                                data: this.chartData.yValues
                            }]
                        });
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            }
        },
        mounted () {
            this.init();
        }
    };
</script>

<style scoped>

</style>
