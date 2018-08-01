
export const serverColumns = [
    {
        type:"index",
        width:80,
        align:'center',
        title: '序号'
    },
    {
        key: 'title',
        title: '服务项目'
    },
    {
        key: 'result',
        title: '单价(元)',
        render: function (h, params) {
            let price = parseFloat(params.row.result).toFixed(2);
            return h('div', price);
            /*这里的this.row能够获取当前行的数据*/
        }
    },
    {
        title: '操作',
        align: 'center',
        width: 160,
        key: 'handle',
        // handle: ['delete'],
        render: (h, params) => {
            let currentRow = params.row;
            return h('div', [
                h('Button', {
                    props: {
                        type: 'primary',
                        size: 'small'
                    },
                    style: {
                        marginRight: '8px'
                    },
                    on: {
                        click: () => {
                            this.show(params.index)
                        }
                    }
                }, '编辑'),
                h('Poptip', {
                    props: {
                        confirm: true,
                        title: '您确定要删除这条数据吗?',
                        transfer: true
                    },
                    on: {
                        'on-ok': () => {
                            this.toDelete(currentRow)
                        }
                    }
                }, [
                    h('Button', {
                        style: {
                            margin: '0 5px'
                        },
                        props: {
                            type: 'error',
                            size: 'small',
                            placement: 'top'
                        }
                    }, '删除')
                ])
            ]);
        }
    }
];


const tableData = {
    serverColumns:serverColumns
};

export default tableData;
