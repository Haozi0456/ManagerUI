<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        <Icon type="person-stalker"></Icon>
                        会员办理
                    </p>
                    <!--<a type="text" slot="extra" @click.prevent="modal = true">-->
                        <!--<Icon type="plus-round"></Icon>-->
                        <!--添加会员-->
                    <!--</a>-->
                    <Row >
                        <Col span="16" >
                        <Form ref="memberItem" :model="memberItem" :label-width="80" :rules="ruleCustom">
                            <FormItem label="会员姓名">
                                <Input v-model="memberItem.name" placeholder="请输入姓名..."></Input>
                            </FormItem>
                            <FormItem label="手机号码" prop="phone">
                                <Input v-model="memberItem.phone" placeholder="请输入手机号码(会员号)..."></Input>
                            </FormItem>
                            <FormItem label="车牌号码" prop="carnum">
                                <Input v-model="memberItem.carnum" placeholder="请输入车牌号码..."></Input>
                            </FormItem>
                            <FormItem label="支付方式">
                                <Select v-model="accountItem.type" value="1" placeholder="请选择...">
                                    <Option value="1">支付宝</Option>
                                    <Option value="2">微信</Option>
                                    <Option value="3">现金</Option>
                                    <Option value="4">其它</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="充值金额">
                                <InputNumber
                                        :max="5000"
                                        :min="0"
                                        :step="5"
                                        v-model="accountItem.money"></InputNumber>
                            </FormItem>
                            <FormItem label="赠送金额">
                                <InputNumber
                                        :max="5000"
                                        :min="0"
                                        :step="5"
                                        v-model="accountItem.submoney"></InputNumber> <span style="margin-left: 5px; color:#9ea7b4; ">选填，不赠送即为0.</span>
                            </FormItem>
                            <FormItem label="备注">
                                <Input v-model="accountItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入备注信息..."></Input>
                            </FormItem>

                            <FormItem align="right">
                                <Button type="ghost" style="margin-right: 15px">取消</Button>
                                <Button type="primary" :loading="isLoading" @click="onOK('memberItem')">
                                    <span v-if="!isLoading">添加</span>
                                    <span v-else>提交中...</span>
                                </Button>
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
        name: 'member-add',
        data () {
            const validatePhone = (rule, value, callback) => {
                if (value != '') {
                    if (!utils.phoneVerify(value)) {
                        callback(new Error('请输入正确的手机号码'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            const validateCarNum = (rule, value, callback) => {
                if (value != '') {
                    if (!utils.carNumberVerify(value)) {
                        callback(new Error('请输入正确的车牌号码'));
                    } else {
                        callback();
                    }
                } else {
                    callback();
                }
            };
            return {
                ruleCustom: {
                    phone: [
                        {required: true, validator: validatePhone, trigger: 'blur'}
                    ],
                    carnum: [
                        {validator: validateCarNum, trigger: 'blur'}
                    ]
                },
                modal: false,
                isLoading: false,
                memberItem: {
                    name: '',
                    phone: '',
                    carnum: '',
                    carmake: ''
                },
                accountItem: {
                    money: 100,
                    submoney: 0,
                    type: '1',
                    operator: '',
                    operation: 1,
                    remark: ''
                }
            };
        },
        methods: {
            onOK (name) {
                this.isLoading = true;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.memberItem.phone == '' && this.memberItem.carnum == '') {
                            this.$Message.info('请输入手机号码或车牌号!');
                            this.isLoading = false;
                            return;
                        }

                        let user = Cookies.get('user');
                        this.accountItem.operator = user;

                        let data = {
                            user: this.memberItem,
                            account: this.accountItem
                        };
                        this.Http.postJson(config.service.addMember, data).then((res) => {
                            if (res.data.code == 100) {
                                this.$Message.success({
                                    content: '添加成功!',
                                    duration: 2
                                });
                                this.isLoading = false;

                                this.memberItem = {
                                    name: '',
                                    phone: '',
                                    carnum: ''
                                };
                                this.accountItem = {
                                    money: 100,
                                    submoney: 0,
                                    type: '1',
                                    remark: ''
                                };
                            } else {
                                this.isLoading = false;
                                this.$Message.error({
                                    content: res.data.msg,
                                    duration: 2
                                });
                            }
                        });
                    } else {
                        this.isLoading = false;
                    }
                });
            },
            onCancel () {
                this.$Message.info('取消添加!');
                this.modal = false;
            }
        }
    };
</script>

<style scoped>

</style>