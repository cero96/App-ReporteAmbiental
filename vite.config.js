import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    cors: true  // Esto habilita CORS para permitir solicitudes de otros orígenes
  }
  
});
