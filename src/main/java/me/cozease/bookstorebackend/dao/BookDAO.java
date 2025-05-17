package me.cozease.bookstorebackend.dao;

import me.cozease.bookstorebackend.entity.Book;

import java.util.List;
import java.util.Optional;

public interface BookDAO {
    List<Book> findAll();

    Optional<Book> findById(Long id);

    List<Book> findByTitleContaining(String title);

    List<Book> findByAuthorContaining(String author);

    List<Book> findByPublisherContaining(String publisher);

    Book save(Book book);

    void deleteById(Long id);
}
