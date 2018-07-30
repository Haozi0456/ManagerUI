<style lang="less">
    @import '../../styles/common.less';
    @import './components/styles/table.less';

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
                        <Icon type="person-stalker"></Icon>
                        会员列表
                    </p>
                    <a type="text" slot="extra" @click.prevent="toAddMember">
                        <Icon type="plus-round"></Icon>
                        添加会员
                    </a>
                    <Modal
                            title="添加会员"
                            v-model="modal"
                            :mask-closable="false"
                            :closable="false"
                            class-name="vertical-center-modal">
                        <Form ref="memberItem" :model="memberItem" :label-width="80" :rules="ruleCustom">
                            <FormItem label="姓名">
                                <Input v-model="memberItem.name" placeholder="请输入姓名..."></Input>
                            </FormItem>
                            <FormItem label="手机号码" prop="phone">
                                <Input v-model="memberItem.phone" placeholder="请输入手机号码..."></Input>
                            </FormItem>
                            <FormItem label="车牌号码" prop="carnum">
                                <Input v-model="memberItem.carnum" placeholder="请输入车牌号码..."></Input>
                            </FormItem>
                            <FormItem label="账户操作">
                                <Select v-model="accountItem.type" value="1" placeholder="请选择...">
                                    <Option value="1">充值</Option>
                                    <Option value="2">录入</Option>
                                    <Option value="3">提现</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="金额">
                                <InputNumber
                                        :max="5000"
                                        :min="0"
                                        :step="5"
                                        v-model="accountItem.money"></InputNumber>
                            </FormItem>
                            <FormItem label="备注">
                                <Input v-model="accountItem.remark" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                       placeholder="请输入备注信息..."></Input>
                            </FormItem>
                        </Form>
                        <div slot="footer">
                            <Button type="ghost" style="margin-left: 8px" @click="onCancel">取消</Button>
                            <Button type="primary" :loading="isLoading" @click="onOK('memberItem')">添加</Button>
                        </div>
                    </Modal>

                    <Row>
                        <Input v-model="searchConName" @on-change="handleSearch" icon="search"
                               placeholder="请输入姓名搜搜..." style="width: 200px"/>
                        <Input v-model="searchConTel" @on-change="handleSearch" icon="search"
                               placeholder="请输入手机号搜搜..." style="width: 200px"/>
                        <Input v-model="searchCarNo" @on-change="handleSearch" icon="search" placeholder="请输入车牌号搜搜..."
                               style="width: 200px"/>
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table stripe :columns="columns" :data="data"></Table>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>

    import config from '../../libs/config';
    import utils from '../../libs/util';

    export default {
        name: 'member',
        data() {
            const validatePhone = (rule, value, callback) => {
                if (value != "") {
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
                if (value != "") {
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
                searchConName: '',
                searchConTel: '',
                searchCarNo: '',
                columns: [
                    {
                        title: '序号',
                        type: 'index',
                        width: 80,
                        align: 'center'
                    },
                    {
                        key: 'name',
                        title: '姓名'
                    },
                    {
                        key: 'phone',
                        title: '电话号码'
                    },
                    {
                        key: 'carnum',
                        title: '车牌号'
                    },
                    {
                        key: 'createtime',
                        title: '入会时间'
                    },
                    {
                        title: '查看详情',
                        key: 'show_more',
                        align: 'center',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        let query = {user_id: params.row.id};
                                        this.$router.push({
                                            name: 'member_details',
                                            query: query
                                        });
                                    }
                                }
                            }, '详情');
                        }
                    }

                ],
                ruleCustom: {
                    phone: [
                        {validator: validatePhone, trigger: 'blur'}
                    ],
                    carnum: [
                        {validator: validateCarNum, trigger: 'blur'}
                    ]
                },
                data: [],
                initTable: [],
                modal: false,
                isLoading: false,
                memberItem: {
                    name: '',
                    phone: '',
                    carnum: '鄂A',
                },
                accountItem: {
                    money: 100,
                    type: '1',
                    remark: ''
                }
            };
        },
        methods: {
            init() {
                this.Http.post(config.service.getAllMembers, "").then((res) => {
                    if (res.data.code == 100) {
                        this.data = this.initTable = res.data.data;
                    } else {
                        this.$Message.error({
                            content: res.data.msg,
                            duration: 2
                        });
                    }
                });
            },


            search(data, argumentObj) {
                let res = data;
                let dataClone = data;
                for (let argu in argumentObj) {
                    if (argumentObj[argu].length > 0) {
                        res = dataClone.filter(d => {
                            return d[argu].indexOf(argumentObj[argu]) > -1;
                        });
                        dataClone = res;
                    }
                }
                return res;
            },

            handleSearch() {
                this.data = this.initTable;
                this.data = this.search(this.data, {
                    name: this.searchConName,
                    phone: this.searchConTel,
                    carnum: this.searchCarNo
                });
            },
            onOK(name) {
                this.isLoading = true;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        if (this.memberItem.phone == "" && this.memberItem.carnum == "") {
                            this.$Message.info('请输入手机号码或车牌号!');
                            this.isLoading = false;
                            return;
                        }
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
                                this.modal = false;
                                //添加数据
                                this.data.unshift(res.data.data)

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
                })
            },
            onCancel() {
                this.$Message.info('取消添加!');
                this.modal = false;
            },
            toAddMember(){
                this.$router.push({
                    name: 'member_add'
                });
            }
        },
        mounted() {
            this.init();

        }
    };
</script>


