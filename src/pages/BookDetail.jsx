import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Row, Col, Table, Card } from 'antd';
import { ShoppingCartOutlined, ArrowLeftOutlined, ShoppingOutlined } from '@ant-design/icons';
import data from '../assets/data.json';

const { Title } = Typography;

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = data.books.find(book => book.id === parseInt(id));

    if (!book) {
        return (
            <div>
                <Button icon={<ArrowLeftOutlined />} style={{ marginBottom: '20px' }} onClick={() => navigate('/')}>
                    返回首页
                </Button>
                <div>Oops! 书籍未找到</div>
            </div>
        );
    }

  const columns = [
    {
      title: '项目',
      dataIndex: 'item',
      key: 'item',
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    }
  ];

  const tableData = [
    { key: '1', item: '书名', content: book.title },
    { key: '2', item: '作者', content: book.author },
    { key: '3', item: '出版社', content: book.publisher },
    { key: '4', item: '价格', content: `¥${book.price}` },
    { key: '5', item: '库存', content: `${book.stock}本` },
  ];

  return (
    <div>
      <Button 
        icon={<ArrowLeftOutlined />} 
        style={{ marginBottom: '20px' }}
        onClick={() => navigate('/')}
      >
        返回首页
      </Button>
      
      <Row gutter={[24, 24]}>
        <Col xs={24} md={9}>
          <div style={{ 
            height: '100%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            background: '#fafafa',
            border: '1px solid #f0f0f0',
            borderRadius: '2px'
          }}>
            <img 
              src={book.cover} 
              alt={book.title}
              style={{
                objectFit: 'contain'
              }}
            />
          </div>
        </Col>
        <Col xs={24} md={15}>
          <Table 
            columns={columns} 
            dataSource={tableData} 
            pagination={false}
            bordered
          />
        </Col>
      </Row>

      <Card
        title="书籍简介"
        style={{ marginTop: '24px', marginBottom: '24px' }}
      >
        <p>{book.description || '暂无简介'}</p>
      </Card>

      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <Button 
          type="primary" 
          icon={<ShoppingCartOutlined />} 
          size="large"
          style={{ marginRight: '15vw' }}
        >
          加入购物车
        </Button>
        <Button 
          type="primary" 
          icon={<ShoppingOutlined />} 
          size="large"
          danger
        >
          立即购买
        </Button>
      </div>
    </div>
  );
};

export default BookDetail;

