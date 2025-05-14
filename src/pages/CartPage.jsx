import React, { useState, useEffect } from 'react';
import { Table, Button, InputNumber, Space, message, Card, Modal } from 'antd';
import { DeleteOutlined, ShoppingOutlined } from '@ant-design/icons';
import { CartService } from '../services/cartService';
import { OrderService } from '../services/orderService';
import noCoverImage from '../assets/nocover.png';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  // 加载购物车数据
  const loadCartItems = async () => {
    try {
      setLoading(true);
      const data = await CartService.getCartItems(user.id);
      setCartItems(data);
    } catch (error) {
      message.error('加载购物车失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCartItems();
  }, []);

  // 更新商品数量
  const handleQuantityChange = async (id, quantity) => {
    try {
      await CartService.updateCartItem(id, quantity);
      await loadCartItems();
      message.success('数量已更新');
    } catch (error) {
      message.error(error.message || '更新数量失败');
    }
  };

  // 删除商品
  const handleDelete = async (id) => {
    try {
      await CartService.removeFromCart(id);
      message.success('删除成功');
      await loadCartItems();
    } catch (error) {
      message.error(error.message || '删除失败');
    }
  };

  // 结算
  const handleCheckout = async () => {
    try {
      await OrderService.createOrder(user.id, user.address);
      message.success('下单成功！');
      await loadCartItems();
      setCheckoutModalVisible(false);
    } catch (error) {
      message.error(error.message || '下单失败');
    }
  };

  const columns = [
    {
      title: '图书',
      dataIndex: 'book',
      key: 'book',
      render: (book) => (
        <Space>
          <img 
            src={book.coverUrl || noCoverImage} 
            alt={book.title} 
            style={{ width: 50 }}
          />
          <div>
            <div>{book.title}</div>
            <div style={{ color: '#666' }}>{book.author}</div>
          </div>
        </Space>
      ),
    },
    {
      title: '单价',
      dataIndex: ['book', 'price'],
      key: 'price',
      render: (price) => `￥${(price / 100).toFixed(2)}`,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (quantity, record) => (
        <InputNumber
          min={1}
          max={record.book.stock}
          value={quantity}
          onChange={(value) => handleQuantityChange(record.id, value)}
        />
      ),
    },
    {
      title: '小计',
      key: 'subtotal',
      render: (_, record) => `￥${((record.book.price * record.quantity) / 100).toFixed(2)}`,
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
        >
          删除
        </Button>
      ),
    },
  ];

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.book.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <Card title="购物车">
        <Table
          loading={loading}
          columns={columns}
          dataSource={cartItems}
          rowKey="id"
          pagination={false}
        />
        
        <div style={{ textAlign: 'right', marginTop: 20 }}>
          <Space>
            <span style={{ fontSize: '16px' }}>
              总计: <span style={{ color: '#f50', fontWeight: 'bold' }}>￥{(totalAmount / 100).toFixed(2)}</span>
            </span>
            <Button
              type="primary"
              icon={<ShoppingOutlined />}
              onClick={() => setCheckoutModalVisible(true)}
              disabled={cartItems.length === 0}
              size="large"
            >
              结算
            </Button>
          </Space>
        </div>
      </Card>

      <Modal
        title="确认订单"
        open={checkoutModalVisible}
        onOk={handleCheckout}
        onCancel={() => setCheckoutModalVisible(false)}
        destroyOnClose
      >
        <div style={{ marginBottom: 16 }}>
          <h4>收货地址：</h4>
          <p>{user.address}</p>
        </div>
        <div style={{ marginBottom: 16 }}>
          <h4>订单商品：</h4>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.book.title} × {item.quantity}
              </li>
            ))}
          </ul>
        </div>
        <div style={{ fontSize: '16px', color: '#f50' }}>
          总金额：￥{(totalAmount / 100).toFixed(2)}
        </div>
        <p style={{ marginTop: 16 }}>确认要下单吗？</p>
      </Modal>
    </div>
  );
};

export default CartPage;

