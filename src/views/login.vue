<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
    import Cookies from 'js-cookie';
    import config from '../libs/config';
    import {Message} from 'iview';

    export default {
        data() {
            return {
                form: {
                    userName: 'admin',
                    password: ''
                },
                rules: {
                    userName: [
                        {required: true, message: '账号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            handleSubmit() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        let userName = this.form.userName;
                        let password = this.form.password;
                        var data = {
                            account: userName,
                            password: password
                        };

                        this.Http.post(config.service.loginUrl, data).then((res) => {
                            if (res.data.code == 100) {
                                let user = res.data.data;
                                Message.success({
                                    content: '登录成功!',
                                    duration: 2
                                });
                                Cookies.set('user', user.name);
                                Cookies.set('password', this.form.password);
                                Cookies.set('lastTime',user.lastVisitTime);
                                Cookies.set('role',user.role);
                                Cookies.set('phone',user.phone);
                                Cookies.set('userId',user.id);
                                this.$store.commit('setAvator', '../../images/ic-manager.png');
                                if (this.form.userName === 'admin') {
                                    Cookies.set('access', 0);
                                    // Cookies.set('role', "超级管理员");
                                } else {
                                    Cookies.set('access', 1);
                                    // Cookies.set('role', "员工");
                                }
                                this.$router.push({
                                    name: 'home_index'
                                });
                            } else {
                                Message.error({
                                    content: res.data.msg,
                                    duration: 2
                                });
                            }
                        });
                    }
                });
            }
        }
    };
</script>

<style>

</style>
