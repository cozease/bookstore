package me.cozease.bookstorebackend.service.impl;

import me.cozease.bookstorebackend.dao.UserAuthDAO;
import me.cozease.bookstorebackend.dao.UserDAO;
import me.cozease.bookstorebackend.dto.ChangePasswordRequest;
import me.cozease.bookstorebackend.dto.LoginRequest;
import me.cozease.bookstorebackend.dto.RegisterRequest;
import me.cozease.bookstorebackend.entity.User;
import me.cozease.bookstorebackend.entity.UserAuth;
import me.cozease.bookstorebackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserServiceImpl implements UserService {
    private final UserDAO userDAO;
    private final UserAuthDAO userAuthDAO;

    @Autowired
    public UserServiceImpl(UserDAO userDAO, UserAuthDAO userAuthDAO) {
        this.userDAO = userDAO;
        this.userAuthDAO = userAuthDAO;
    }

    @Override
    public Optional<User> login(LoginRequest loginRequest) {
        return userAuthDAO.findByUser_UsernameAndPassword(
                        loginRequest.getUsername(),
                        loginRequest.getPassword())
                .map(UserAuth::getUser);
    }

    @Override
    public User register(RegisterRequest registerRequest) {
        // 检查用户名是否已存在
        if (userDAO.existsByUsername(registerRequest.getUsername())) {
            throw new RuntimeException("用户名已存在");
        }

        // 检查邮箱是否已存在
        if (userDAO.existsByEmail(registerRequest.getEmail())) {
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
        return userDAO.save(user);
    }

    @Override
    public User updateUser(Long userId, User userDetails) {
        return userDAO.findById(userId)
                .map(user -> {
                    user.setPhone(userDetails.getPhone());
                    user.setAddress(userDetails.getAddress());
                    // 更新其他可修改的字段
                    return userDAO.save(user);
                })
                .orElseThrow(() -> new RuntimeException("用户不存在"));
    }

    @Override
    public Optional<User> getUserById(Long userId) {
        return userDAO.findById(userId);
    }

    @Override
    public User updateUserRole(Long userId, Boolean isAdmin) {
        return userDAO.findById(userId)
                .map(user -> {
                    user.getUserAuth().setIsAdmin(isAdmin);
                    return userDAO.save(user);
                })
                .orElseThrow(() -> new RuntimeException("用户不存在"));
    }

    @Override
    public List<User> getAllUsers() {
        return userDAO.findAll();
    }

    @Override
    public void changePassword(Long userId, ChangePasswordRequest request) {
        UserAuth userAuth = userAuthDAO.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("用户不存在"));

        // 验证旧密码
        if (!userAuth.getPassword().equals(request.getOldPassword())) {
            throw new RuntimeException("当前密码错误");
        }

        // 更新密码
        userAuth.setPassword(request.getNewPassword());
        userAuthDAO.save(userAuth);
    }
}
