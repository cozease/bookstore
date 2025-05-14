import request from './request';

export const OrderService = {
    // 创建订单
    createOrder: async (userId, shippingAddress) => {
        return request(`/orders/create?userId=${userId}&shippingAddress=${encodeURIComponent(shippingAddress)}`, {
            method: 'POST'
        });
    },

    // 获取用户的订单列表
    getUserOrders: async (userId) => {
        return request(`/orders/user/${userId}`);
    },

    // 获取订单详情
    getOrderById: async (orderId) => {
        return request(`/orders/${orderId}`);
    },

    // 更新订单状态
    updateOrderStatus: async (orderId, status) => {
        return request(`/orders/${orderId}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status }),
        });
    },
};
