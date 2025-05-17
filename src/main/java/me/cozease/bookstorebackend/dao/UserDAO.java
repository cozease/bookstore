package me.cozease.bookstorebackend.dao;

import me.cozease.bookstorebackend.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserDAO {
    Optional<User> findById(Long id);

    List<User> findAll();

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);

    User save(User user);
}
