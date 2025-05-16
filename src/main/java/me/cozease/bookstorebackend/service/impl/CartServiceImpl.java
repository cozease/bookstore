package me.cozease.bookstorebackend.service.impl;

import me.cozease.bookstorebackend.entity.Book;
import me.cozease.bookstorebackend.entity.CartItem;
import me.cozease.bookstorebackend.entity.User;
import me.cozease.bookstorebackend.repository.BookRepository;
import me.cozease.bookstorebackend.repository.CartItemRepository;
import me.cozease.bookstorebackend.repository.UserRepository;
import me.cozease.bookstorebackend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CartServiceImpl implements CartService {
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;

    @Autowired
    public CartServiceImpl(CartItemRepository cartItemRepository,
                       UserRepository userRepository,
                       BookRepository bookRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public CartItem addToCart(Long userId, Long bookId, Integer quantity) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new RuntimeException("图书不存在"));

        // 检查库存
        if (book.getStock() < quantity) {
            throw new RuntimeException("库存不足");
        }

        // 检查购物车是否已有此商品
        return cartItemRepository.findByUserIdAndBookId(userId, bookId)
                .map(cartItem -> {
                    cartItem.setQuantity(cartItem.getQuantity() + quantity);
                    return cartItemRepository.save(cartItem);
                })
                .orElseGet(() -> {
                    CartItem cartItem = new CartItem();
                    cartItem.setUser(user);
                    cartItem.setBook(book);
                    cartItem.setQuantity(quantity);
                    return cartItemRepository.save(cartItem);
                });
    }

    @Override
    public List<CartItem> getCartItems(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        return cartItemRepository.findByUser(user);
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, Integer quantity) {
        return cartItemRepository.findById(cartItemId)
                .map(cartItem -> {
                    // 检查库存
                    if (cartItem.getBook().getStock() < quantity) {
                        throw new RuntimeException("库存不足");
                    }
                    cartItem.setQuantity(quantity);
                    return cartItemRepository.save(cartItem);
                })
                .orElseThrow(() -> new RuntimeException("购物车项不存在"));
    }

    @Override
    public void removeFromCart(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public void clearCart(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        cartItemRepository.deleteByUser(user);
    }
}
