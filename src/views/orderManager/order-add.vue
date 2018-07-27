<style lang="less">
    @import "./components/styles/order.less";
    @import "../../styles/common.less";


</style>
<template>
    <div>
        <Row :gutter="10" class="margin-top-8">
            <Col :md="24" :lg="24" :style="{marginBottom: '8px'}">
                <Card>
                    <Row>
                        <Col span="24" style="padding-right:10px">
                            <Select
                                    v-model="model"
                                    filterable
                                    remote
                                    placeholder="请输入会员手机号码..."
                                    style="width: 300px"
                                    :remote-method="remoteMethod"
                                    :loading="loading">
                                <Option v-for="(option, index) in options1" :value="option.value" :key="index">
                                    {{option.label}}
                                </Option>
                            </Select>
                        </Col>
                    </Row>
                    <div class="divide_line"></div>
                    <Row>
                        <Col span="24">
                            <Row type="flex">
                                <Col span="24" :md="24" :lg="24" class="grid_border">
                                    <Row class-name="made-child-con-middle" type="flex" align="middle">
                                        <Col>
                                            <img class="header-img" src='../../images/ic_member.png'/>
                                        </Col>
                                        <Col span="20">
                                            <Row >
                                                <Col span="4">1 | order-4</Col>
                                                <Col span="8">2 | order-3</Col>
                                                <Col span="4">3 | order-2</Col>
                                                <Col span="8">4 | order-1</Col>
                                            </Row>
                                            <div class="divide_line"></div>
                                            <Row >
                                                <Col span="4">1 | order-4</Col>
                                                <Col span="8">2 | order-3</Col>
                                                <Col span="4">3 | order-2</Col>
                                                <Col span="8">4 | order-1</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <div class="divide_line"></div>
                    <p slot="title" class="card-title">
                        <Icon type="android-map"></Icon>
                        会员查找
                    </p>
                    <a type="text" slot="extra" @click.prevent="isShow = true">
                        <Icon type="plus-round"></Icon>
                        添加订单
                    </a>
                    <Row class="margin-top-10 searchable-table-con1">


                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "add-order",
        data() {
            return {
                model: '',
                loading: false,
                options: [],
                list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming']
            }
        },
        methods: {
            remoteMethod(query) {
                if (query !== '') {
                    this.loading = true;
                    setTimeout(() => {
                        this.loading = false;
                        const list = this.list.map(item => {
                            return {
                                value: item,
                                label: item
                            };
                        });
                        this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.options1 = [];
                }
            }
        }
    }
</script>
