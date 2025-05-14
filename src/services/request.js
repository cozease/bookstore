const API_BASE_URL = 'http://localhost:8080';

// 封装请求方法
async function request(url, options = {}) {
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
        },
    };

    // 添加认证token
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        defaultOptions.headers['Authorization'] = `Bearer ${user.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
        ...defaultOptions,
        ...options,
    });

    const responseData = await response.json();

    if (!response.ok) {
        // 处理401未授权错误
        if (response.status === 401) {
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        throw new Error(responseData.message || '请求失败');
    }

    return responseData.data;
}

export default request;
