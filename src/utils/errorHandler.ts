
export const setupGlobalErrorHandling = () => {
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    event.preventDefault();
    redirectToHome();
  });

  // Handle JavaScript errors
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    redirectToHome();
  });

  // Handle fetch errors globally
  const originalFetch = window.fetch;
  window.fetch = async (...args) => {
    try {
      const response = await originalFetch(...args);
      if (!response.ok && response.status >= 500) {
        throw new Error(`Server error: ${response.status}`);
      }
      return response;
    } catch (error) {
      console.error('Fetch error:', error);
      // Only redirect on server errors, not network issues
      if (error instanceof Error && error.message.includes('Server error')) {
        redirectToHome();
      }
      throw error;
    }
  };
};

const redirectToHome = () => {
  // Add a small delay to prevent rapid redirects
  setTimeout(() => {
    window.location.href = '/';
  }, 1000);
};
