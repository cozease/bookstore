import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import data from '../assets/data.json';

const { Title } = Typography;
const { Meta } = Card;

const HomePage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    setBooks(data.books);
  }, []);

  return (
    <div>
      <Title level={2}>精选书籍</Title>
      <Row gutter={[16, 16]}>
        {books.map(book => (
          <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={book.title} src={book.cover} />}
              actions={[
                <Button type="primary" icon={<ShoppingCartOutlined />}>
                  加入购物车
                </Button>
              ]}
            >
              <Meta title={book.title} description={`作者: ${book.author}`} />
              <div style={{ marginTop: '10px', color: '#f50' }}>
                ¥{book.price}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomePage;
