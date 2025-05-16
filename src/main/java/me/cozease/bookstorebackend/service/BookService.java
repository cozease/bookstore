package me.cozease.bookstorebackend.service;

import me.cozease.bookstorebackend.entity.Book;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * 图书服务类
 */
@Transactional
public interface BookService {
    /**
     * 获取所有图书
     */
    List<Book> getAllBooks();

    /**
     * 根据ID获取图书
     */
    Optional<Book> getBookById(Long id);

    /**
     * 搜索图书（按标题、作者或出版社）
     */
    List<Book> searchBooks(String keyword);

    /**
     * 添加图书
     */
    Book addBook(Book book);

    /**
     * 更新图书
     */
    Book updateBook(Long id, Book bookDetails);

    /**
     * 删除图书
     */
    void deleteBook(Long id);

    /**
     * 检查图书库存
     */
    boolean checkStock(Long bookId, Integer quantity);

    /**
     * 更新图书库存
     */
    void updateStock(Long bookId, Integer quantity);
}
