package me.cozease.bookstorebackend.dto;

import lombok.Data;

/**
 * 修改密码请求DTO
 */
@Data
public class ChangePasswordRequest {
    private String oldPassword;
    private String newPassword;
}
