<style lang="less">
    @import '../../styles/common.less';

    .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;

        .ivu-modal {
            top: 0;
        }
    }
</style>

<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="plus-round"></Icon>
                        添加收入/支出
                    </p>
                    <Row>
                        <Col span="12" :md="12" :lg="12" :sm="24" :xs="24">
                        <Form ref="inOut" :model="inOut" :label-width="80" >
                            <FormItem label="收支名称">
                                <Input v-model="inOut.des" placeholder="请输入收支名称..." ></Input>
                            </FormItem>
                            <FormItem label="类型">
                                <Select v-model="inOut.type" placeholder="请选择收支类型..." style="width:80px;">
                                    <Option v-for="item in types" :value="item.id" :key="item.id">{{ item.name }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="金额">
                                <InputNumber
                                        :min="0"
                                        :step="5"
                                        v-model="inOut.money"></InputNumber><label style="margin-left: 5px">元</label>
                            </FormItem>
                            <FormItem label="备注">
                                <Input v-model="inOut.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入备注信息..."></Input>
                            </FormItem>
                            <FormItem align="right">
                                <Button type="ghost" style="margin-right: 8px" @click="onCancel">取消</Button>
                                <Button type="primary" :loading="isLoading" @click="onOK">添加</Button>
                            </FormItem>
                        </Form>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
    import config from '../../libs/config';
    import utils from '../../libs/util';
    import Cookies from 'js-cookie';

    export default {
        name: 'inOut-add',
        data () {
            return {
                inOutType: 0,
                selectTypes: [{id: 0, name: '全部'}, {id: 1, name: '收入'}, {id: 2, name: '支出'}],
                types: [{id: 1, name: '收入'}, {id: 2, name: '支出'}],
                modal: false,
                isLoading: false,
                inOut: {
                    id: 0,
                    type: 0,
                    money: 0.00,
                    des: '',
                    remark: '',
                    operator: ''
                },
                page: {
                    pageNumber: 1,
                    pageSize: 10,
                    total: 10
                }
            };
        },
        methods: {
            init () {

            },
            onOK () {
                this.isLoading = true;
                if (this.inOut.des === '') {
                    this.$Message.info('请输入收支名称');
                    this.isLoading = false;
                    return;
                }

                if (this.inOut.money === 0) {
                    this.$Message.info('请输入金额');
                    this.isLoading = false;
                    return;
                }

                let user = Cookies.get('user');
                this.inOut.operator = user;

                this.Http.post(config.service.addInOut, this.inOut).then((res) => {
                    if (res.data.code === 100) {
                        this.$Message.success({
                            content: '添加成功!',
                            duration: 2
                        });
                        this.isLoading = false;
                        this.modal = false;
                        this.inOut = {
                            id: 0,
                            type: 1,
                            money: 0.00,
                            des: '',
                            remark: '',
                            operator: ''
                        };
                    } else {
                        this.isLoading = false;
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            },
            onCancel () {
                this.$Message.info('取消添加!');
                this.modal = false;
                this.isLoading = false;
            }
        },
        mounted () {
            this.init();
        }
    };
</script>
