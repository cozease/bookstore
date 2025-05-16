package me.cozease.bookstorebackend.dto;

import lombok.Data;

/**
 * 用户注册请求DTO
 */
@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String email;
    private String phone;
    private String address;
    private Boolean isAdmin = false; // 默认为普通用户
}
