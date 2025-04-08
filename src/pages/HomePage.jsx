import React, { useState, useEffect } from 'react';
import { Typography, Row, Col, Card, Button, Input, Carousel } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import data from '../assets/data.json';

const { Title } = Typography;
const { Meta } = Card;
const { Search } = Input;

const contentStyle = {
    height: '240px',
    color: '#fff',
    lineHeight: '240px',
    textAlign: 'center',
    background: '#364d79',
};

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setBooks(data.books);
  }, []);

  const handleCardClick = (bookId) => {
    navigate(`/book/${bookId}`);
  };

  return (
    <div>
      <Title level={2}>精选书籍</Title>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Search
                placeholder="input search text"
                allowClear
                enterButton="Search"
                size="large"
                style={{ marginBottom: 20 }}
                // onSearch={onSearch}
            />
        </div>
        <Carousel
            autoplay={{
                dotDuration: true,
            }}
            autoplaySpeed={5000}
            style={{ marginBottom: 20 }}
        >
            <div>
                <h3 style={contentStyle}>1</h3>
            </div>
            <div>
                <h3 style={contentStyle}>2</h3>
            </div>
            <div>
                <h3 style={contentStyle}>3</h3>
            </div>
            <div>
                <h3 style={contentStyle}>4</h3>
            </div>
        </Carousel>
      <Row gutter={[16, 16]}>
        {books.map(book => (
          <Col key={book.id} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              cover={<img alt={book.title} src={book.cover} />}
              onClick={() => handleCardClick(book.id)}
              actions={[
                <Button 
                  type="primary" 
                  icon={<ShoppingCartOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    // 这里添加加入购物车的逻辑
                  }}
                >
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

