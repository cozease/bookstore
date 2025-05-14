import request from './request';

export const UserService = {
    // 用户登录
    login: async (username, password) => {
        return request('/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });
    },

    // 用户注册
    register: async (userData) => {
        return request('/users/register', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    },

    // 获取用户信息
    getUserInfo: async (userId) => {
        return request(`/users/${userId}`);
    },

    // 更新用户信息
    updateUser: async (userId, userData) => {
        return request(`/users/${userId}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    },

    // 获取所有用户（管理员功能）
    getAllUsers: async () => {
        return request('/users/all');
    },

    // 更新用户权限（管理员功能）
    updateUserRole: async (userId, isAdmin) => {
        return request(`/users/${userId}/role?isAdmin=${isAdmin}`, {
            method: 'PUT'
        });
    },

    // 修改密码
    changePassword: async (userId, oldPassword, newPassword) => {
        return request(`/users/${userId}/password`, {
            method: 'PUT',
            body: JSON.stringify({ oldPassword, newPassword }),
        });
    },
};
