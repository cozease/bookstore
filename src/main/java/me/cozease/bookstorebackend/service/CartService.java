package me.cozease.bookstorebackend.service;

import me.cozease.bookstorebackend.entity.CartItem;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 购物车服务类
 */
@Transactional
public interface CartService {
    /**
     * 添加商品到购物车
     */
    CartItem addToCart(Long userId, Long bookId, Integer quantity);

    /**
     * 获取用户的购物车列表
     */
    List<CartItem> getCartItems(Long userId);

    /**
     * 更新购物车商品数量
     */
    CartItem updateCartItemQuantity(Long cartItemId, Integer quantity);

    /**
     * 从购物车中删除商品
     */
    void removeFromCart(Long cartItemId);

    /**
     * 清空用户的购物车
     */
    void clearCart(Long userId);
}
