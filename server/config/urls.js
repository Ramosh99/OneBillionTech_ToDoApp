const BASE_URL = `https://todoserver-g7dfdncwfzehc2by.southeastasia-01.azurewebsites.net` || 'http://localhost:3000';

export const frontendUrls = {
    resetPassword: (token) => `${BASE_URL}/reset-password/${token}`,
    // login: `${BASE_URL}/login`,
    // register: `${BASE_URL}/register`
};
