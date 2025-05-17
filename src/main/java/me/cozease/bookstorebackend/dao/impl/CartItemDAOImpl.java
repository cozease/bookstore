package me.cozease.bookstorebackend.dao.impl;

import me.cozease.bookstorebackend.dao.CartItemDAO;
import me.cozease.bookstorebackend.entity.CartItem;
import me.cozease.bookstorebackend.entity.User;
import me.cozease.bookstorebackend.repository.CartItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class CartItemDAOImpl implements CartItemDAO {
    private final CartItemRepository cartItemRepository;

    @Autowired
    public CartItemDAOImpl(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    @Override
    public List<CartItem> findByUser(User user) {
        return cartItemRepository.findByUser(user);
    }

    @Override
    public Optional<CartItem> findById(Long id) {
        return cartItemRepository.findById(id);
    }

    @Override
    public Optional<CartItem> findByUserIdAndBookId(Long userId, Long bookId) {
        return cartItemRepository.findByUserIdAndBookId(userId, bookId);
    }

    @Override
    public void deleteByUser(User user) {
        cartItemRepository.deleteByUser(user);
    }

    @Override
    public void deleteById(Long id) {
        cartItemRepository.deleteById(id);
    }

    @Override
    public CartItem save(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }
}
