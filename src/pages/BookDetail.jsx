import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Button, Row, Col, Card, message, Modal } from 'antd';
import { ShoppingCartOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { BookService } from '../services/bookService';
import { CartService } from '../services/cartService';
import noCoverImage from '../assets/nocover.png';

const { Title, Text } = Typography;

const BookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await BookService.getBookById(id);
        setBook(data);
      } catch (error) {
        message.error('获取图书信息失败');
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        navigate('/login');
        return;
      }
      await CartService.addToCart(user.id, book.id, 1);
      setIsModalVisible(true);
    } catch (error) {
      message.error(error.message || '添加失败');
    }
  };

  const handleViewCart = () => {
    navigate('/cart');
  };

  if (loading) {
    return <div>加载中...</div>;
  }

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

  return (
    <div className="book-detail">
      <Button icon={<ArrowLeftOutlined />} style={{ marginBottom: '20px' }} onClick={() => navigate('/')}>
        返回首页
      </Button>

      <Card>
        <Row gutter={24}>
          <Col span={8}>
            <img src={book.coverUrl || noCoverImage} alt={book.title} style={{ width: '100%' }} />
          </Col>
          <Col span={16}>
            <Title level={2}>{book.title}</Title>
            <p><Text strong>作者：</Text>{book.author}</p>
            <p><Text strong>出版社：</Text>{book.publisher}</p>
            <p><Text strong>价格：</Text>￥{(book.price / 100).toFixed(2)}</p>
            <p><Text strong>库存：</Text>{book.stock}</p>
            <p><Text strong>简介：</Text>{book.description}</p>
            
            <Button 
              type="primary" 
              icon={<ShoppingCartOutlined />} 
              size="large"
              onClick={handleAddToCart}
              disabled={book.stock <= 0}
            >
              {book.stock > 0 ? '加入购物车' : '暂时缺货'}
            </Button>
          </Col>
        </Row>
      </Card>

      <Modal
        title="添加成功"
        open={isModalVisible}
        onOk={handleViewCart}
        onCancel={() => setIsModalVisible(false)}
        okText="查看购物车"
        cancelText="继续购物"
      >
        <p>《{book?.title}》已成功添加到购物车！</p>
      </Modal>
    </div>
  );
};

export default BookDetail;

