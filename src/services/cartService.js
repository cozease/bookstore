import request from './request';

export const CartService = {
    // 获取购物车列表
    getCartItems: async (userId) => {
        return request(`/cart/${userId}`);
    },

    // 添加商品到购物车
    addToCart: async (userId, bookId, quantity) => {
        return request(`/cart/add?userId=${userId}&bookId=${bookId}&quantity=${quantity}`, {
            method: 'POST'
        });
    },

    // 更新购物车商品数量
    updateCartItem: async (cartItemId, quantity) => {
        return request(`/cart/update/${cartItemId}?quantity=${quantity}`, {
            method: 'PUT'
        });
    },

    // 从购物车移除商品
    removeFromCart: async (cartItemId) => {
        return request(`/cart/${cartItemId}`, {
            method: 'DELETE',
        });
    },

    // 清空购物车
    clearCart: async (userId) => {
        return request(`/cart/clear/${userId}`, {
            method: 'DELETE',
        });
    },
};
