package me.cozease.bookstorebackend.dao;

import me.cozease.bookstorebackend.entity.UserAuth;

import java.util.Optional;

public interface UserAuthDAO {
    Optional<UserAuth> findByUserId(Long userId);

    Optional<UserAuth> findByUser_UsernameAndPassword(String username, String password);

    UserAuth save(UserAuth userAuth);
}
