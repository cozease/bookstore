import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, InputNumber, message, Space } from 'antd';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { BookService } from '../services/bookService';

const BookManagePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [form] = Form.useForm();

  // 加载图书数据
  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await BookService.getAllBooks();
      setBooks(data);
    } catch (error) {
      message.error('加载图书失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // 当表单显示时，确保表单有正确的值
  useEffect(() => {
    if (isModalVisible) {
      form.resetFields();
      if (editingBook) {
        form.setFieldsValue({
          ...editingBook
        });
      }
    }
  }, [isModalVisible, editingBook, form]);

  // 处理表单提交
  const handleSubmit = async (values) => {
    try {
      const bookData = {
        ...values,
        price: parseInt(values.price) // 确保价格是整数
      };

      if (editingBook) {
        await BookService.updateBook(editingBook.id, bookData);
        message.success('更新成功');
      } else {
        await BookService.addBook(bookData);
        message.success('添加成功');
      }
      setIsModalVisible(false);
      loadBooks();
    } catch (error) {
      message.error(error.message);
    }
  };

  // 删除图书
  const handleDelete = async (id) => {
    try {
      await BookService.deleteBook(id);
      message.success('删除成功');
      loadBooks();
    } catch (error) {
      message.error(error.message);
    }
  };

  // 打开编辑模态框
  const showEditModal = (record) => {
    setEditingBook(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  // 打开添加模态框
  const showAddModal = () => {
    setEditingBook(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const columns = [
    {
      title: '书名',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '出版社',
      dataIndex: 'publisher',
      key: 'publisher',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `￥${(price / 100).toFixed(2)}`,
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
          >
            编辑
          </Button>
          <Button 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="book-manage-page">
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showAddModal}
        >
          添加图书
        </Button>
      </div>

      <Table
        loading={loading}
        columns={columns}
        dataSource={books}
        rowKey="id"
      />

      <Modal
        title={editingBook ? '编辑图书' : '添加图书'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="书名"
            rules={[{ required: true, message: '请输入书名' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="author"
            label="作者"
            rules={[{ required: true, message: '请输入作者' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入描述' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item              
            name="publisher"
            label="出版社"
            rules={[{ required: true, message: '请输入出版社' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="price"
            label="价格 (分)"
            rules={[
              { required: true, message: '请输入价格' },
              { type: 'integer', message: '价格必须是整数' },
              { min: 0, type: 'integer', message: '价格不能小于0' }
            ]}
          >
            <InputNumber
              min={0}
              precision={0}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="stock"
            label="库存"
            rules={[{ required: true, message: '请输入库存' }]}
          >
            <InputNumber
              min={0}
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item
            name="coverUrl"
            label="封面URL"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default BookManagePage;
