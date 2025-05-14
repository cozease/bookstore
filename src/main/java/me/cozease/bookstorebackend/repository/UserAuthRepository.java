package me.cozease.bookstorebackend.repository;

import me.cozease.bookstorebackend.entity.UserAuth;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 * 用户认证数据访问接口
 */
public interface UserAuthRepository extends JpaRepository<UserAuth, Long> {
    /**
     * 根据用户ID查找用户认证信息
     */
    Optional<UserAuth> findByUserId(Long userId);

    /**
     * 根据用户名和密码查找用户认证信息
     */
    Optional<UserAuth> findByUser_UsernameAndPassword(String username, String password);
}
