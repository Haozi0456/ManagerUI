export const columns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        key: 'itemName',
        title: '维修项目'
    },
    {
        key: 'itemType',
        title: '配件名称(型号)'
    },
    {
        key: 'itemCount',
        title: '数量(个)'
    },
    {
        key: 'itemPrice',
        title: '单价(元)'
    },
    {
        key: 'itemWorkPrice',
        title: '工时费(元)'
    },
    {
        key: 'itemTotalPrice',
        title: '金额(元)'
    },
    {
        title: '操作',
        align: 'center',
        width: 120,
        key: 'handle',
        handle: ['delete']
    }
];

export const serverColumns = [
    {
        key: 'itemName',
        title: '服务项目'
    },
    {
        key: 'itemPrice',
        title: '单价'
    }
];

export const itemColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        key: 'type',
        title: '型号'
    },
    {
        key: 'outPrice',
        title: '单价(元)'
    },
    {
        key: 'workPrice',
        title: '工时费(元)'
    },
    {
        key: 'stockCount',
        title: '库存(个)'
    }
    // ,
    // {
    //     title: '操作',
    //     align: 'center',
    //     width: 120,
    //     key: 'handle',
    //     handle: ['delete']
    // }

];

export const showCurrentColumns = [
    {
        title: '序号',
        type: 'index',
        width: 80,
        align: 'center'
    },
    {
        key: 'itemName',
        title: '维修项目'
    },
    {
        key: 'itemType',
        title: '配件名称(型号)'
    },
    {
        key: 'itemCount',
        title: '数量(个)'
    },
    {
        key: 'itemPrice',
        title: '单价(元)'
    },
    {
        key: 'itemWorkPrice',
        title: '工时费(元)'
    },
    {
        key: 'itemTotalPrice',
        title: '金额(元)'
    }
];

const tableData = {
    serverColumns: serverColumns,
    table1Columns: columns,
    table2Columns: itemColumns,
    showCurrentColumns: showCurrentColumns
};

export default tableData;
