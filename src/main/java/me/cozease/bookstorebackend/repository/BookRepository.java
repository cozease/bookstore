package me.cozease.bookstorebackend.repository;

import me.cozease.bookstorebackend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * 图书数据访问接口
 */
public interface BookRepository extends JpaRepository<Book, Long> {
    /**
     * 根据出版社查找图书
     */
    List<Book> findByPublisher(String publisher);

    /**
     * 根据标题模糊查找图书
     */
    List<Book> findByTitleContaining(String title);

    /**
     * 根据作者模糊查找图书
     */
    List<Book> findByAuthorContaining(String author);

    /**
     * 根据出版社模糊查找图书
     */
    List<Book> findByPublisherContaining(String publisher);

    /**
     * 获取库存不足的图书
     */
    @Query("SELECT b FROM Book b WHERE b.stock < :threshold")
    List<Book> findBooksWithLowStock(@Param("threshold") Integer threshold);
}
