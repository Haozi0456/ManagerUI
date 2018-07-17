export const columns1 = [
    {
        key: 'id',
        title: '编号'
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
        title: '查看详情',
        key: 'show_more',
        align: 'center',
        render: (h, params) => {
            return h('Button', {
                props: {
                    type: 'text',
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
            }, '了解详情');
        }
    }

];


export const searchTable2 = [
    {
        name: 'Aresn',
        tel: '17712345678',
        carNo:'鄂A23131'
    },
    {
        name: 'Lison',
        tel: '17787654321',
        carNo:'鄂A23131'
    },
    {
        name: 'Lili',
        tel: '12212345678',
        carNo:'鄂A23131'
    },
    {
        name: 'Lucy',
        tel: '13312345678',
        carNo:'鄂A23131'
    }
];


