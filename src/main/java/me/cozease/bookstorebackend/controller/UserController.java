package me.cozease.bookstorebackend.controller;

import me.cozease.bookstorebackend.dto.ApiResponse;
import me.cozease.bookstorebackend.dto.ChangePasswordRequest;
import me.cozease.bookstorebackend.dto.LoginRequest;
import me.cozease.bookstorebackend.dto.RegisterRequest;
import me.cozease.bookstorebackend.dto.UserResponseDTO;
import me.cozease.bookstorebackend.entity.User;
import me.cozease.bookstorebackend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * 用户控制器
 */
@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * 用户登录
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<UserResponseDTO>> login(@RequestBody LoginRequest loginRequest) {
        return userService.login(loginRequest)
                .map(user -> ResponseEntity.ok(ApiResponse.success(convertToDTO(user))))
                .orElse(ResponseEntity.badRequest().body(ApiResponse.error(401, "用户名或密码错误")));
    }

    /**
     * 用户注册
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponseDTO>> register(@RequestBody RegisterRequest registerRequest) {
        try {
            User user = userService.register(registerRequest);
            return ResponseEntity.ok(ApiResponse.success(convertToDTO(user)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, e.getMessage()));
        }
    }

    /**
     * 获取用户信息
     */
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponseDTO>> getUserInfo(@PathVariable Long userId) {
        return userService.getUserById(userId)
                .map(user -> ResponseEntity.ok(ApiResponse.success(convertToDTO(user))))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * 更新用户信息
     */
    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponseDTO>> updateUser(@PathVariable Long userId, @RequestBody User userDetails) {
        try {
            User updatedUser = userService.updateUser(userId, userDetails);
            return ResponseEntity.ok(ApiResponse.success(convertToDTO(updatedUser)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, e.getMessage()));
        }
    }

    /**
     * 获取所有用户（管理员功能）
     */
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<List<UserResponseDTO>>> getAllUsers() {
        List<UserResponseDTO> users = userService.getAllUsers().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(ApiResponse.success(users));
    }

    /**
     * 更新用户权限（管理员功能）
     */
    @PutMapping("/{userId}/role")
    public ResponseEntity<ApiResponse<UserResponseDTO>> updateUserRole(
            @PathVariable Long userId,
            @RequestParam Boolean isAdmin) {
        try {
            User updatedUser = userService.updateUserRole(userId, isAdmin);
            return ResponseEntity.ok(ApiResponse.success(convertToDTO(updatedUser)));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, e.getMessage()));
        }
    }

    /**
     * 修改密码
     */
    @PutMapping("/{userId}/password")
    public ResponseEntity<ApiResponse<Void>> changePassword(
            @PathVariable Long userId,
            @RequestBody ChangePasswordRequest request
    ) {
        try {
            userService.changePassword(userId, request);
            return ResponseEntity.ok(ApiResponse.success());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, e.getMessage()));
        }
    }

    /**
     * 将User实体转换为UserResponseDTO
     */
    private UserResponseDTO convertToDTO(User user) {
        return new UserResponseDTO(
                user.getId(),
                user.getUsername(),
                user.getEmail(),
                user.getPhone(),
                user.getAddress(),
                user.getUserAuth() != null ? user.getUserAuth().getIsAdmin() : false
        );
    }
}
