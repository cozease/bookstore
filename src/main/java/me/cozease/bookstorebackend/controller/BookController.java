package me.cozease.bookstorebackend.controller;

import me.cozease.bookstorebackend.dto.ApiResponse;
import me.cozease.bookstorebackend.entity.Book;
import me.cozease.bookstorebackend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 图书控制器
 */
@RestController
@RequestMapping("/books")
public class BookController {
    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    /**
     * 获取所有图书
     */
    @GetMapping
    public ResponseEntity<ApiResponse<List<Book>>> getAllBooks() {
        List<Book> books = bookService.getAllBooks();
        return ResponseEntity.ok(ApiResponse.success(books));
    }

    /**
     * 获取图书详情
     */
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Book>> getBookById(@PathVariable Long id) {
        return bookService.getBookById(id)
                .map(book -> ResponseEntity.ok(ApiResponse.success(book)))
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * 搜索图书
     */
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<Book>>> searchBooks(@RequestParam String keyword) {
        List<Book> books = bookService.searchBooks(keyword);
        return ResponseEntity.ok(ApiResponse.success(books));
    }

    /**
     * 添加图书
     */
    @PostMapping
    public ResponseEntity<ApiResponse<Book>> addBook(@RequestBody Book book) {
        try {
            Book newBook = bookService.addBook(book);
            return ResponseEntity.ok(ApiResponse.success(newBook));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, e.getMessage()));
        }
    }

    /**
     * 更新图书
     */
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<Book>> updateBook(@PathVariable Long id, @RequestBody Book bookDetails) {
        try {
            Book updatedBook = bookService.updateBook(id, bookDetails);
            return ResponseEntity.ok(ApiResponse.success(updatedBook));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, e.getMessage()));
        }
    }

    /**
     * 删除图书
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteBook(@PathVariable Long id) {
        try {
            bookService.deleteBook(id);
            return ResponseEntity.ok(ApiResponse.success());
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(ApiResponse.error(400, e.getMessage()));
        }
    }
}
