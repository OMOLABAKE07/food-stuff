import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        tailwindcss(),
    ],
    server: {
        proxy: {
            // Proxy all these paths to Laravel backend
            '^/(api|sanctum|login|register|logout)': {
                target: 'http://localhost:8001',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});