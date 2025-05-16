package me.cozease.bookstorebackend.service;

import me.cozease.bookstorebackend.entity.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 订单服务类
 */
@Transactional
public interface OrderService {
    /**
     * 创建订单
     */
    Order createOrder(Long userId, String shippingAddress);

    /**
     * 获取用户的所有订单
     */
    List<Order> getUserOrders(Long userId);

    /**
     * 获取订单详情
     */
    Order getOrderById(Long orderId);

    /**
     * 更新订单状态
     */
    Order updateOrderStatus(Long orderId, String status);
}
