package me.cozease.bookstorebackend.controller;

import me.cozease.bookstorebackend.dto.ApiResponse;
import me.cozease.bookstorebackend.entity.CartItem;
import me.cozease.bookstorebackend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 购物车控制器
 */
@RestController
@RequestMapping("/cart")
public class CartController {
    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    /**
     * 添加商品到购物车
     */
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<CartItem>> addToCart(
            @RequestParam Long userId,
            @RequestParam Long bookId,
            @RequestParam Integer quantity) {
        try {
            CartItem cartItem = cartService.addToCart(userId, bookId, quantity);
            return ResponseEntity.ok(ApiResponse.success(cartItem));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, e.getMessage()));
        }
    }

    /**
     * 获取用户的购物车列表
     */
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<List<CartItem>>> getCartItems(@PathVariable Long userId) {
        try {
            List<CartItem> cartItems = cartService.getCartItems(userId);
            return ResponseEntity.ok(ApiResponse.success(cartItems));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, e.getMessage()));
        }
    }

    /**
     * 更新购物车商品数量
     */
    @PutMapping("/update/{cartItemId}")
    public ResponseEntity<ApiResponse<CartItem>> updateCartItemQuantity(
            @PathVariable Long cartItemId,
            @RequestParam Integer quantity) {
        try {
            CartItem cartItem = cartService.updateCartItemQuantity(cartItemId, quantity);
            return ResponseEntity.ok(ApiResponse.success(cartItem));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, e.getMessage()));
        }
    }

    /**
     * 从购物车中删除商品
     */
    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<ApiResponse<Void>> removeFromCart(@PathVariable Long cartItemId) {
        try {
            cartService.removeFromCart(cartItemId);
            return ResponseEntity.ok(ApiResponse.success());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, e.getMessage()));
        }
    }

    /**
     * 清空用户的购物车
     */
    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<ApiResponse<Void>> clearCart(@PathVariable Long userId) {
        try {
            cartService.clearCart(userId);
            return ResponseEntity.ok(ApiResponse.success());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, e.getMessage()));
        }
    }
}
