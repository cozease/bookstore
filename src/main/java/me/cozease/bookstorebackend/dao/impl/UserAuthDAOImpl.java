package me.cozease.bookstorebackend.dao.impl;

import me.cozease.bookstorebackend.dao.UserAuthDAO;
import me.cozease.bookstorebackend.entity.UserAuth;
import me.cozease.bookstorebackend.repository.UserAuthRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public class UserAuthDAOImpl implements UserAuthDAO {
    private final UserAuthRepository userAuthRepository;

    @Autowired
    public UserAuthDAOImpl(UserAuthRepository userAuthRepository) {
        this.userAuthRepository = userAuthRepository;
    }

    @Override
    public Optional<UserAuth> findByUserId(Long userId) {
        return userAuthRepository.findById(userId);
    }

    @Override
    public Optional<UserAuth> findByUser_UsernameAndPassword(String username, String password) {
        return userAuthRepository.findByUser_UsernameAndPassword(username, password);
    }

    @Override
    public UserAuth save(UserAuth userAuth) {
        return userAuthRepository.save(userAuth);
    }
}
