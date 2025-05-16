package me.cozease.bookstorebackend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 用户认证实体类
 */
@NoArgsConstructor
@Data
@Entity
@Table(name = "user_auth")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class UserAuth {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonBackReference
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(name = "is_admin", nullable = false)
    private Boolean isAdmin = false;
}
