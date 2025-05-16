package me.cozease.bookstorebackend.service;

import me.cozease.bookstorebackend.dto.ChangePasswordRequest;
import me.cozease.bookstorebackend.dto.LoginRequest;
import me.cozease.bookstorebackend.dto.RegisterRequest;
import me.cozease.bookstorebackend.entity.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * 用户服务类
 */
@Transactional
public interface UserService {
    /**
     * 用户登录
     */
    Optional<User> login(LoginRequest loginRequest);

    /**
     * 用户注册
     */
    User register(RegisterRequest registerRequest);

    /**
     * 更新用户信息
     */
    User updateUser(Long userId, User userDetails);

    /**
     * 获取用户信息
     */
    Optional<User> getUserById(Long userId);

    /**
     * 更新用户权限
     */
    User updateUserRole(Long userId, Boolean isAdmin);

    /**
     * 获取所有用户
     */
    List<User> getAllUsers();

    /**
     * 修改密码
     */
    void changePassword(Long userId, ChangePasswordRequest request);
}
