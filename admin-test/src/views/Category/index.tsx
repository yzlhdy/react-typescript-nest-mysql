import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Table, Modal, Form, Input, DatePicker, message
} from 'antd'

import { PlusOutlined } from '@ant-design/icons'
import {
  categoryList,
  ArcionData,
  createCategory,
  Create,
  updateCategory,
  UpdateCategory,
  deleteCategory
} from '../../api/user'

import { Container } from './styles';

interface Category {
  id: number;
  category_name: string;
  createTime: string;
}

const Category: React.FC = () => {

  const [categoryLists, setCategoryLists] = useState<Category[]>([])
  const [showStatus, setShowStatus] = useState<number>(0)
  const [name, setName] = useState<string>('')
  const [time, setTimes] = useState<string>('')
  const [id, setId] = useState<number>(0)

  const getCategory = (params: ArcionData) => {
    categoryList(params).then(res => {
      if (res.data.code === 200) {
        setCategoryLists(res.data.data.categoryList)
      }

    })
  }

  const addCategory = (params: Create) => {

    createCategory(params).then(res => {
      if (res.data.code === 200) {
        message.success('添加成功')
        getCategory({ pageSize: 10, pageIndex: 1 })
        setName('')
      }

    })
  }

  const updateCategorys = (params: UpdateCategory) => {
    updateCategory(params).then(res => {
      if (res.data.code === 200) {
        message.success('修改成功')
        getCategory({ pageSize: 10, pageIndex: 1 })
      }
    })
  }

  useEffect(() => {
    getCategory({ pageSize: 10, pageIndex: 1 })
    return () => {
    }
  }, [])

  const extra = (
    <Button icon={<PlusOutlined />} type="primary" onClick={() => setShowStatus(1)}>添加分类</Button>
  )

  const columns = [
    {
      title: '序号',
      dataIndex: 'id'
    },
    {
      title: '分类名称',
      dataIndex: 'category_name',

    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
    },
    {
      title: '操作',
      render: (rowData: any) => {
        return (
          <span>
            <Button type="primary" onClick={() => editCategory(rowData)} >修改分类</Button>
            <Button type="primary" onClick={() => deleteCategorys(rowData)}>删除分类</Button>
          </span>
        )
      }
    }
  ];

  const editCategory = (rowData: any) => {
    setName(rowData.category_name)
    setTimes(rowData.createTime)
    setId(rowData.id)
    setShowStatus(2)
  }
  const deleteCategorys = (rowData: any) => {
    deleteCategory({ id: Number(rowData.id) }).then(res => {
      if (res.data.code === 200) {
        message.success('删除成功')
        getCategory({ pageSize: 10, pageIndex: 1 })
      }
    })
  }

  const handleOk = () => {
    if (showStatus === 1) {
      addCategory({ name, time })

    } else if (showStatus === 2) {
      updateCategorys({ id: id, name, time })
    }
    setShowStatus(0)
  }
  const handleCancel = () => {

    setShowStatus(0)
  }

  const onChange = (value: any, dateString: string) => {
    console.log('Selected Time: ', value);
    // console.log('Formatted Selected Time: ', dateString);
    setTimes(dateString)
  }
  const onOk = (value: any) => { console.log('onOk: ', value); }
  return (
    <Container>
      <Card title="分类列表" extra={extra}>
        <Table
          columns={columns}
          dataSource={categoryLists}
          rowKey="id"
          bordered
          pagination={{ defaultPageSize: 7, showQuickJumper: true }}
        />,
      </Card>
      <Modal
        title={showStatus === 1 ? '添加分类' : '修改分类'}
        visible={showStatus !== 0}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form >
          <Form.Item label="名称">
            <Input placeholder="请输入名称" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)} value={name} />
          </Form.Item>
          <Form.Item label="日期">
            <DatePicker showTime format="YYYY-MM-DD HH:mm" onChange={onChange} onOk={onOk} />
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  );
};

export default Category;
