package me.cozease.bookstorebackend.dao;

import me.cozease.bookstorebackend.entity.Order;
import me.cozease.bookstorebackend.entity.User;

import java.util.List;
import java.util.Optional;

public interface OrderDAO {
    Optional<Order> findById(Long id);

    List<Order> findByUserOrderByCreatedAtDesc(User user);

    Order save(Order order);
}
