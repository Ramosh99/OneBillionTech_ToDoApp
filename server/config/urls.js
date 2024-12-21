const BASE_URL = `https://one-billion-tech-to-do-q4llw2kkh-yasiru-ramoshs-projects.vercel.app` || 'http://localhost:3000';

export const frontendUrls = {
    resetPassword: (token) => `${BASE_URL}/reset-password/${token}`,
};
