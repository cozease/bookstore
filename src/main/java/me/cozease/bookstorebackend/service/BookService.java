package me.cozease.bookstorebackend.service;

import me.cozease.bookstorebackend.entity.Book;
import me.cozease.bookstorebackend.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * 图书服务类
 */
@Service
@Transactional
public class BookService {
    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    /**
     * 获取所有图书
     */
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    /**
     * 根据ID获取图书
     */
    public Optional<Book> getBookById(Long id) {
        return bookRepository.findById(id);
    }

    /**
     * 搜索图书（按标题、作者或出版社）
     */
    public List<Book> searchBooks(String keyword) {
        Set<Book> resultSet = new HashSet<>();
        resultSet.addAll(bookRepository.findByTitleContaining(keyword));
        resultSet.addAll(bookRepository.findByAuthorContaining(keyword));
        resultSet.addAll(bookRepository.findByPublisherContaining(keyword));
        return new ArrayList<>(resultSet);
    }

    /**
     * 添加图书
     */
    public Book addBook(Book book) {
        return bookRepository.save(book);
    }

    /**
     * 更新图书
     */
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

    /**
     * 删除图书
     */
    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }

    /**
     * 检查图书库存
     */
    public boolean checkStock(Long bookId, Integer quantity) {
        return bookRepository.findById(bookId)
                .map(book -> book.getStock() >= quantity)
                .orElse(false);
    }

    /**
     * 更新图书库存
     */
    public void updateStock(Long bookId, Integer quantity) {
        bookRepository.findById(bookId).ifPresent(book -> {
            book.setStock(book.getStock() - quantity);
            bookRepository.save(book);
        });
    }
}
