import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// configuração do Vite para desenvolvimento do frontend React
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // quando o frontend chamar /api/persons, o Vite encaminha para o backend
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        // remove /api antes de enviar para o backend, que usa /persons
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
