import React, { useState, useEffect } from 'react'
import { useRequest } from 'ahooks';
import { Table, Tag, Space, message } from 'antd';

const ItemDetail = props => {
    const {detailData} = props;
    return (
        <div dangerouslySetInnerHTML={{ __html: detailData.data.content }}></div>
    )
}
const getTopicDetail = id => `https://cnodejs.org/api/v1/topic/${id}`;

export default function UseRequest() {
    const [showDetail, setShowDetail] = useState(false);
    
    // 用法 1
    // const { data, error, loading } = useRequest('https://cnodejs.org/api/v1/topics?page=1&tab=ask&limit=5');

    // 用法 2
    const { data, error, loading } = useRequest({
        url: 'https://cnodejs.org/api/v1/topics?page=1&tab=ask&limit=5',
        method: 'get'
    });


    // 用法 3
    // const { data, error, loading } = useRequest((userId)=> `/api/userInfo/${userId}`);
    const { data:detailData, run } = useRequest( id => getTopicDetail(id), {
        manual: true,
        onSuccess: (result, params) => {
            if (result.success) {
                message.success(`获取详情数据成功 ~`);
            }
        },
    });

    const detailHandler = id => {
        setShowDetail(true);
        run(id)
    }

    // 用法 4
    // const { loading, run } = useRequest((username) => ({
    //     url: '/api/changeUsername',
    //     method: 'post',
    //     data: { username },
    // }), {
    //     manual: true,
    // });
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title'
        },

        {
            title: '回复数量',
            dataIndex: 'reply_count',
            key: 'reply_count',
            render: count => {
                let color = count > 10 ? 'geekblue' : 'volcano';
                return (
                    <Tag color={color} key={count}>
                        {count}
                    </Tag>
                )
            }
        },
        {
            title: '浏览量',
            dataIndex: 'visit_count',
            key: 'visit_count',
            render: count => {
                let color = count > 10 ? 'geekblue' : 'volcano';
                return (
                    <Tag color={color} key={count}>
                        {count}
                    </Tag>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <a onClick={() => detailHandler(record.id)}>详情</a>
                </Space>
            ),
        },
    ];
    if (error) return <div>error</div>;

    if (loading) return <div>loading ...</div>;

    return (
        <div>
            {showDetail && detailData && <ItemDetail detailData={detailData}/>}

            <Table columns={columns} dataSource={data.data} rowKey="id" />
        </div>
    );
}
