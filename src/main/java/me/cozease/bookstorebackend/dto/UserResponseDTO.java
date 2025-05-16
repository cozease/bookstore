package me.cozease.bookstorebackend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * 用户响应DTO
 */
@AllArgsConstructor
@Data
public class UserResponseDTO {
    private Long id;
    private String username;
    private String email;
    private String phone;
    private String address;
    private Boolean isAdmin;
}
