package me.cozease.bookstorebackend.dto;

/**
 * 修改密码请求DTO
 */
public class ChangePasswordRequest {
    private String oldPassword;
    private String newPassword;

    // Getters and Setters
    public String getOldPassword() {
        return oldPassword;
    }

    public void setOldPassword(String oldPassword) {
        this.oldPassword = oldPassword;
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }
}
