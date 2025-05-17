package me.cozease.bookstorebackend.service.impl;

import me.cozease.bookstorebackend.dao.BookDAO;
import me.cozease.bookstorebackend.dao.CartItemDAO;
import me.cozease.bookstorebackend.dao.UserDAO;
import me.cozease.bookstorebackend.entity.Book;
import me.cozease.bookstorebackend.entity.CartItem;
import me.cozease.bookstorebackend.entity.User;
import me.cozease.bookstorebackend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class CartServiceImpl implements CartService {
    private final CartItemDAO cartItemDAO;
    private final UserDAO userDAO;
    private final BookDAO bookDAO;

    @Autowired
    public CartServiceImpl(CartItemDAO cartItemDAO,
                           UserDAO userDAO,
                           BookDAO bookDAO) {
        this.cartItemDAO = cartItemDAO;
        this.userDAO = userDAO;
        this.bookDAO = bookDAO;
    }

    @Override
    public CartItem addToCart(Long userId, Long bookId, Integer quantity) {
        User user = userDAO.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        Book book = bookDAO.findById(bookId)
                .orElseThrow(() -> new RuntimeException("图书不存在"));

        // 检查库存
        if (book.getStock() < quantity) {
            throw new RuntimeException("库存不足");
        }

        // 检查购物车是否已有此商品
        return cartItemDAO.findByUserIdAndBookId(userId, bookId)
                .map(cartItem -> {
                    cartItem.setQuantity(cartItem.getQuantity() + quantity);
                    return cartItemDAO.save(cartItem);
                })
                .orElseGet(() -> {
                    CartItem cartItem = new CartItem();
                    cartItem.setUser(user);
                    cartItem.setBook(book);
                    cartItem.setQuantity(quantity);
                    return cartItemDAO.save(cartItem);
                });
    }

    @Override
    public List<CartItem> getCartItems(Long userId) {
        User user = userDAO.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        return cartItemDAO.findByUser(user);
    }

    @Override
    public CartItem updateCartItemQuantity(Long cartItemId, Integer quantity) {
        return cartItemDAO.findById(cartItemId)
                .map(cartItem -> {
                    // 检查库存
                    if (cartItem.getBook().getStock() < quantity) {
                        throw new RuntimeException("库存不足");
                    }
                    cartItem.setQuantity(quantity);
                    return cartItemDAO.save(cartItem);
                })
                .orElseThrow(() -> new RuntimeException("购物车项不存在"));
    }

    @Override
    public void removeFromCart(Long cartItemId) {
        cartItemDAO.deleteById(cartItemId);
    }

    @Override
    public void clearCart(Long userId) {
        User user = userDAO.findById(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));
        cartItemDAO.deleteByUser(user);
    }
}
