package me.cozease.bookstorebackend.service;

import me.cozease.bookstorebackend.dto.ChangePasswordRequest;
import me.cozease.bookstorebackend.dto.LoginRequest;
import me.cozease.bookstorebackend.dto.RegisterRequest;
import me.cozease.bookstorebackend.entity.User;
import me.cozease.bookstorebackend.entity.UserAuth;
import me.cozease.bookstorebackend.repository.UserRepository;
import me.cozease.bookstorebackend.repository.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * 用户服务类
 */
@Service
@Transactional
public class UserService {
    private final UserRepository userRepository;
    private final UserAuthRepository userAuthRepository;

    @Autowired
    public UserService(UserRepository userRepository, UserAuthRepository userAuthRepository) {
        this.userRepository = userRepository;
        this.userAuthRepository = userAuthRepository;
    }

    /**
     * 用户登录
     */
    public Optional<User> login(LoginRequest loginRequest) {
        return userAuthRepository.findByUser_UsernameAndPassword(
                loginRequest.getUsername(), 
                loginRequest.getPassword())
            .map(UserAuth::getUser);
    }

    /**
     * 用户注册
     */
    public User register(RegisterRequest registerRequest) {
        // 检查用户名是否已存在
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("用户名已存在");
        }

        // 检查邮箱是否已存在
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new RuntimeException("邮箱已被注册");
        }

        // 创建新用户
        User user = new User();
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPhone(registerRequest.getPhone());
        user.setAddress(registerRequest.getAddress());

        // 创建用户认证信息
        UserAuth userAuth = new UserAuth();
        userAuth.setUser(user);
        userAuth.setPassword(registerRequest.getPassword());
        userAuth.setIsAdmin(registerRequest.getIsAdmin());

        // 设置双向关系
        user.setUserAuth(userAuth);

        // 保存用户信息
        return userRepository.save(user);
    }

    /**
     * 更新用户信息
     */
    public User updateUser(Long userId, User userDetails) {
        return userRepository.findById(userId)
                .map(user -> {
                    user.setPhone(userDetails.getPhone());
                    user.setAddress(userDetails.getAddress());
                    // 更新其他可修改的字段
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("用户不存在"));
    }

    /**
     * 获取用户信息
     */
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    /**
     * 更新用户权限
     */
    public User updateUserRole(Long userId, Boolean isAdmin) {
        return userRepository.findById(userId)
                .map(user -> {
                    user.getUserAuth().setIsAdmin(isAdmin);
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("用户不存在"));
    }

    /**
     * 获取所有用户
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    /**
     * 修改密码
     */
    public void changePassword(Long userId, ChangePasswordRequest request) {
        UserAuth userAuth = userAuthRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        // 验证旧密码
        if (!userAuth.getPassword().equals(request.getOldPassword())) {
            throw new RuntimeException("当前密码错误");
        }

        // 更新密码
        userAuth.setPassword(request.getNewPassword());
        userAuthRepository.save(userAuth);
    }
}
