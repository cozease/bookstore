package me.cozease.bookstorebackend.dao.impl;

import me.cozease.bookstorebackend.dao.OrderDAO;
import me.cozease.bookstorebackend.entity.Order;
import me.cozease.bookstorebackend.entity.User;
import me.cozease.bookstorebackend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class OrderDAOImpl implements OrderDAO {
    private final OrderRepository orderRepository;

    @Autowired
    public OrderDAOImpl(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    @Override
    public Optional<Order> findById(Long id) {
        return orderRepository.findById(id);
    }

    @Override
    public List<Order> findByUserOrderByCreatedAtDesc(User user) {
        return orderRepository.findByUserOrderByCreatedAtDesc(user);
    }

    @Override
    public Order save(Order order) {
        return orderRepository.save(order);
    }
}
