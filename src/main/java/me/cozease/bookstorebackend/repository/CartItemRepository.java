package me.cozease.bookstorebackend.repository;

import me.cozease.bookstorebackend.entity.CartItem;
import me.cozease.bookstorebackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * 购物车项数据访问接口
 */
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    /**
     * 查找用户的所有购物车项
     */
    List<CartItem> findByUser(User user);

    /**
     * 根据用户ID和图书ID查找购物车项
     */
    Optional<CartItem> findByUserIdAndBookId(Long userId, Long bookId);

    /**
     * 删除用户的所有购物车项
     */
    void deleteByUser(User user);
}
