<template>
    <div style="width:100%; height:100%; " id="monthOfYearChart"></div>
</template>

<script>
    import echarts from 'echarts';
    import config from '../../../libs/config';

    export default {
        name: "statisticsMonthOfYear",
        data () {
            return {
                year:2018,
                chart:null,
                chartData:{
                    datelines:[],
                    totals:[],
                    counts:[]
                }

            };
        },
        props:{
          yearVal:{
              type:Number,
              required:true,
              default:2018
          }
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
                            type: 'bar',
                            barWidth: 40,
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
                let statisticsCharts = echarts.init(document.getElementById('monthOfYearChart'));
                this.chart = statisticsCharts;
                statisticsCharts.setOption(option);

                window.addEventListener('resize', function () {
                    statisticsCharts.resize();
                });

              let dateValue = new Date().format("yyyy");
              this.refresh(dateValue);
            },
            refresh (val) {
                let data = {
                    year: val
                };
                this.Http.post(config.service.getStatisticsByMonthInYear, data).then((res) => {
                    if (res.data.code == 100) {
                        let result = res.data.data;
                        var datelines =[];
                        var totals =[];
                        var counts = [];
                        for (var i = 0; i < result.length; i++) {
                            datelines.push(result[i].dateline);
                            totals.push(result[i].total);
                            counts.push(result[i].count);
                        }
                        this.chartData.datelines = datelines;
                        this.chartData.totals = totals;
                        this.chartData.counts = counts;
                        let titleLable = val+'年月收入(单位:元)';
                        this.chart.setOption({
                            title:{
                                text:titleLable
                            },
                            xAxis: {
                                data: this.chartData.datelines
                            },
                            series: [{
                                name: '月收入',
                                type: 'bar',
                                data: this.chartData.totals
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
        },
        watch: {
            yearVal (val) {
                this.refresh(val);
            }
        }
    };
</script>

<style scoped>

</style>