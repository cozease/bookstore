package me.cozease.bookstorebackend.service;

import me.cozease.bookstorebackend.entity.*;
import me.cozease.bookstorebackend.repository.BookRepository;
import me.cozease.bookstorebackend.repository.OrderRepository;
import me.cozease.bookstorebackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 订单服务类
 */
@Service
@Transactional
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final CartService cartService;

    @Autowired
    public OrderService(OrderRepository orderRepository,
                       UserRepository userRepository,
                       BookRepository bookRepository,
                       CartService cartService) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.cartService = cartService;
    }

    /**
     * 创建订单
     */
    public Order createOrder(Long userId, String shippingAddress) {
        User user = userRepository.findById(userId)
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
            bookRepository.save(book);

            // 计算总金额（单位：分）
            totalAmount += book.getPrice() * cartItem.getQuantity();
        }
        order.setTotalAmount(totalAmount);

        // 保存订单
        Order savedOrder = orderRepository.save(order);

        // 清空购物车
        cartService.clearCart(userId);

        return savedOrder;
    }

    /**
     * 获取用户的所有订单
     */
    public List<Order> getUserOrders(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        return orderRepository.findByUserOrderByCreatedAtDesc(user);
    }

    /**
     * 获取订单详情
     */
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("订单不存在"));
    }

    /**
     * 更新订单状态
     */
    public Order updateOrderStatus(Long orderId, String status) {
        return orderRepository.findById(orderId)
                .map(order -> {
                    order.setStatus(status);
                    return orderRepository.save(order);
                })
                .orElseThrow(() -> new RuntimeException("订单不存在"));
    }
}
