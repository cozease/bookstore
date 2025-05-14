package me.cozease.bookstorebackend.repository;

import me.cozease.bookstorebackend.entity.Order;
import me.cozease.bookstorebackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 订单数据访问接口
 */
public interface OrderRepository extends JpaRepository<Order, Long> {
    /**
     * 查找用户的所有订单，按创建时间降序排序
     */
    List<Order> findByUserOrderByCreatedAtDesc(User user);

    /**
     * 查找特定状态的订单
     */
    List<Order> findByStatus(String status);

    /**
     * 查找指定时间范围内的订单
     */
    @Query("SELECT o FROM Order o WHERE o.createdAt BETWEEN :startTime AND :endTime")
    List<Order> findOrdersByDateRange(
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime);
}
