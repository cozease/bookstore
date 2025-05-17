package me.cozease.bookstorebackend.dao;

import me.cozease.bookstorebackend.entity.CartItem;
import me.cozease.bookstorebackend.entity.User;

import java.util.List;
import java.util.Optional;

public interface CartItemDAO {
    List<CartItem> findByUser(User user);

    Optional<CartItem> findById(Long id);

    Optional<CartItem> findByUserIdAndBookId(Long userId, Long bookId);

    void deleteByUser(User user);

    void deleteById(Long id);

    CartItem save(CartItem cartItem);
}
