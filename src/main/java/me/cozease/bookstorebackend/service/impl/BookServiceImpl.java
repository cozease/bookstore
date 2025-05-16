package me.cozease.bookstorebackend.service.impl;

import me.cozease.bookstorebackend.entity.Book;
import me.cozease.bookstorebackend.repository.BookRepository;
import me.cozease.bookstorebackend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Service
@Transactional
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;

    @Autowired
    public BookServiceImpl(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    @Override
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    @Override
    public List<Book> searchBooks(String keyword) {
        Set<Book> resultSet = new HashSet<>();
        resultSet.addAll(bookRepository.findByTitleContaining(keyword));
        resultSet.addAll(bookRepository.findByAuthorContaining(keyword));
        resultSet.addAll(bookRepository.findByPublisherContaining(keyword));
        return new ArrayList<>(resultSet);
    }

    @Override
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public Book updateBook(Long id, Book bookDetails) {
        return bookRepository.findById(id)
                .map(book -> {
                    book.setTitle(bookDetails.getTitle());
                    book.setAuthor(bookDetails.getAuthor());
                    book.setDescription(bookDetails.getDescription());
                    book.setPublisher(bookDetails.getPublisher());
                    book.setPrice(bookDetails.getPrice());
                    book.setStock(bookDetails.getStock());
                    book.setCoverUrl(bookDetails.getCoverUrl());
                    return bookRepository.save(book);
                })
                .orElseThrow(() -> new RuntimeException("图书不存在"));
    }

    @Override
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    @Override
    public boolean checkStock(Long bookId, Integer quantity) {
        return bookRepository.findById(bookId)
                .map(book -> book.getStock() >= quantity)
                .orElse(false);
    }

    @Override
    public void updateStock(Long bookId, Integer quantity) {
        bookRepository.findById(bookId).ifPresent(book -> {
            book.setStock(book.getStock() - quantity);
            bookRepository.save(book);
        });
    }
}
