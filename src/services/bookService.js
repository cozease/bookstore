import request from './request';

export const BookService = {
    // 获取所有图书
    getAllBooks: async () => {
        return request('/books');
    },

    // 获取图书详情
    getBookById: async (id) => {
        return request(`/books/${id}`);
    },

    // 搜索图书
    searchBooks: async (keyword) => {
        return request(`/books/search?keyword=${encodeURIComponent(keyword)}`);
    },

    // 更新图书信息（管理员功能）
    updateBook: async (id, bookData) => {
        return request(`/books/${id}`, {
            method: 'PUT',
            body: JSON.stringify(bookData),
        });
    },

    // 添加新图书（管理员功能）
    addBook: async (bookData) => {
        return request('/books', {
            method: 'POST',
            body: JSON.stringify(bookData),
        });
    },

    // 删除图书（管理员功能）
    deleteBook: async (id) => {
        return request(`/books/${id}`, {
            method: 'DELETE',
        });
    },
};
