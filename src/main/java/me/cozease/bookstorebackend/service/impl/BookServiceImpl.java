package me.cozease.bookstorebackend.service.impl;

import me.cozease.bookstorebackend.dao.BookDAO;
import me.cozease.bookstorebackend.entity.Book;
import me.cozease.bookstorebackend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class BookServiceImpl implements BookService {
    private final BookDAO bookDAO;

    @Autowired
    public BookServiceImpl(BookDAO bookDAO) {
        this.bookDAO = bookDAO;
    }

    @Override
    public List<Book> getAllBooks() {
        return bookDAO.findAll();
    }

    @Override
    public Optional<Book> getBookById(Long id) {
        return bookDAO.findById(id);
    }

    @Override
    public List<Book> searchBooks(String keyword) {
        Set<Book> resultSet = new HashSet<>();
        resultSet.addAll(bookDAO.findByTitleContaining(keyword));
        resultSet.addAll(bookDAO.findByAuthorContaining(keyword));
        resultSet.addAll(bookDAO.findByPublisherContaining(keyword));
        return new ArrayList<>(resultSet);
    }

    @Override
    public Book addBook(Book book) {
        return bookDAO.save(book);
    }

    @Override
    public Book updateBook(Long id, Book bookDetails) {
        return bookDAO.findById(id)
                .map(book -> {
                    book.setTitle(bookDetails.getTitle());
                    book.setAuthor(bookDetails.getAuthor());
                    book.setDescription(bookDetails.getDescription());
                    book.setPublisher(bookDetails.getPublisher());
                    book.setPrice(bookDetails.getPrice());
                    book.setStock(bookDetails.getStock());
                    book.setCoverUrl(bookDetails.getCoverUrl());
                    return bookDAO.save(book);
                })
                .orElseThrow(() -> new RuntimeException("图书不存在"));
    }

    @Override
    public void deleteBook(Long id) {
        bookDAO.deleteById(id);
    }

    @Override
    public boolean checkStock(Long bookId, Integer quantity) {
        return bookDAO.findById(bookId)
                .map(book -> book.getStock() >= quantity)
                .orElse(false);
    }

    @Override
    public void updateStock(Long bookId, Integer quantity) {
        bookDAO.findById(bookId).ifPresent(book -> {
            book.setStock(book.getStock() - quantity);
            bookDAO.save(book);
        });
    }
}
