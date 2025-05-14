import React, { useState, useEffect } from 'react';
import { Card, Input, Row, Col, message, Spin, Empty, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { BookService } from '../services/bookService';
import noCoverImage from '../assets/nocover.png';
import '../css/Home.css';

const { Search } = Input;
const { Meta } = Card;
const { Title } = Typography;

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();

  // 加载所有图书
  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await BookService.getAllBooks();
      setBooks(data);
    } catch (error) {
      message.error('获取图书列表失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  // 搜索图书
  const onSearch = async (keyword) => {
    setSearchKeyword(keyword);
    if (!keyword) {
      loadBooks();
      return;
    }
    try {
      setLoading(true);
      const data = await BookService.searchBooks(keyword);
      setBooks(data);
    } catch (error) {
      message.error('搜索失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-container">
      <div className="search-container">
        <Search
          placeholder="搜索书名、作者或出版社"
          allowClear
          enterButton={<>
            <SearchOutlined />
            &ensp;搜索
          </>}
          size="large"
          onSearch={onSearch}
          style={{ maxWidth: 600, margin: '20px auto' }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', margin: '50px' }}>
          <Spin size="large" />
        </div>
      ) : books.length === 0 ? (
        <Empty
          description={searchKeyword ? `没有找到与"${searchKeyword}"相关的图书` : "暂无图书"}
          style={{ margin: '50px' }}
        />
      ) : (
        <Row gutter={[16, 16]}>
          {books.map(book => (
            <Col xs={24} sm={12} md={8} lg={6} key={book.id}>
              <Card
                hoverable
                cover={
                  <div style={{ overflow: 'hidden', height: '300px' }}>
                    <img
                      alt={book.title}
                      src={book.coverUrl || noCoverImage}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                }
                onClick={() => navigate(`/book/${book.id}`)}
              >
                <Meta
                  title={<Title level={4} ellipsis>{book.title}</Title>}
                  description={
                    <>
                      <p style={{ marginBottom: 5 }}>作者：{book.author}</p>
                      <p style={{ marginBottom: 5 }}>出版社：{book.publisher}</p>
                      <p className="book-price" style={{ marginBottom: 5 }}>
                        价格：￥{(book.price / 100).toFixed(2)}
                      </p>
                      <p style={{ marginBottom: 10 }}>
                        库存：{book.stock > 0 ? book.stock : '暂时缺货'}
                      </p>
                    </>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default HomePage;

