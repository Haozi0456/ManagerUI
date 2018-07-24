<template>
    <div style="width:100%; height:100%; " id="chart"></div>
</template>

<script>
    import echarts from 'echarts';
    import config from '../../libs/config';

    export default {
        name: "statisticsNear30Days",
        data () {
            return {
                chart:null,
                chartData:{
                    xValues:[],
                    yValues:[]
                }

            };
        },
        methods:{
          init() {
                const option = {
                    color: ['#3398DB'],
                    title:{
                      text:''
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
                        right: '2%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis:
                        {
                            type: 'category',
                            data:this.chartData.xValues
                        }
                    ,
                    yAxis:
                        {
                            type: 'value'
                        }
                    ,
                    series: [
                        {
                            name: '月收入',
                            type: 'line',
                            barWidth: 60,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    fontSize:18,
                                    fontWeight:600,
                                    color:'#ff0000',
                                    formatter: '{c}.00'
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
                this.Http.post(config.service.getStatisticsByNearOneMonth, '').then((res) => {
                    if (res.data.code == 100) {
                        let result = res.data.data;
                        var xValue =[];
                        var yValue =[];
                        for (var i = 0; i < result.length; i++) {
                            xValue.push(result[i].dateline);
                            yValue.push(result[i].total);
                        }
                        this.chartData.xValues = xValue;
                        this.chartData.yValues = yValue;
                        let titleLable ='近30天收入(单位:元)';
                        this.chart.setOption({
                            title:{
                                text:titleLable
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