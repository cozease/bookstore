package me.cozease.bookstorebackend.service.impl;

import me.cozease.bookstorebackend.entity.*;
import me.cozease.bookstorebackend.dao.BookDAO;
import me.cozease.bookstorebackend.dao.OrderDAO;
import me.cozease.bookstorebackend.dao.UserDAO;
import me.cozease.bookstorebackend.service.CartService;
import me.cozease.bookstorebackend.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {
    private final OrderDAO orderDAO;
    private final UserDAO userDAO;
    private final BookDAO bookDAO;
    private final CartService cartService;

    @Autowired
    public OrderServiceImpl(OrderDAO orderDAO,
                        UserDAO userDAO,
                        BookDAO bookDAO,
                        CartService cartService) {
        this.orderDAO = orderDAO;
        this.userDAO = userDAO;
        this.bookDAO = bookDAO;
        this.cartService = cartService;
    }

    @Override
    public Order createOrder(Long userId, String shippingAddress) {
        User user = userDAO.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        // 获取购物车项
        List<CartItem> cartItems = cartService.getCartItems(userId);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("购物车为空");
        }

        // 创建订单
        Order order = new Order();
        order.setUser(user);
        order.setStatus("pending");
        order.setShippingAddress(shippingAddress);

        // 计算总金额并创建订单项
        Integer totalAmount = 0;
        for (CartItem cartItem : cartItems) {
            // 检查库存
            Book book = cartItem.getBook();
            if (book.getStock() < cartItem.getQuantity()) {
                throw new RuntimeException("商品" + book.getTitle() + "库存不足");
            }

            // 创建订单项
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setBook(book);
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setPrice(book.getPrice());
            order.addOrderItem(orderItem);

            // 更新库存
            book.setStock(book.getStock() - cartItem.getQuantity());
            bookDAO.save(book);

            // 计算总金额（单位：分）
            totalAmount += book.getPrice() * cartItem.getQuantity();
        }
        order.setTotalAmount(totalAmount);

        // 保存订单
        Order savedOrder = orderDAO.save(order);

        // 清空购物车
        cartService.clearCart(userId);

        return savedOrder;
    }

    @Override
    public List<Order> getUserOrders(Long userId) {
        User user = userDAO.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        return orderDAO.findByUserOrderByCreatedAtDesc(user);
    }

    @Override
    public Order getOrderById(Long orderId) {
        return orderDAO.findById(orderId)
                .orElseThrow(() -> new RuntimeException("订单不存在"));
    }

    @Override
    public Order updateOrderStatus(Long orderId, String status) {
        return orderDAO.findById(orderId)
                .map(order -> {
                    order.setStatus(status);
                    return orderDAO.save(order);
                })
                .orElseThrow(() -> new RuntimeException("订单不存在"));
    }
}
