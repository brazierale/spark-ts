import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, 'saved-data');
const DATA_FILE = path.join(DATA_DIR, 'testcases.json');

// Ensure the directory and file exist
if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR);
}
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]');
}

export default defineConfig({
    plugins: [
        react(),
        {
            name: 'file-persistence',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url === '/api/storage') {
                        if (req.method === 'GET') {
                            const data = fs.readFileSync(DATA_FILE, 'utf-8');
                            res.setHeader('Content-Type', 'application/json');
                            res.end(data);
                            return;
                        }
                        if (req.method === 'POST') {
                            let body = '';
                            req.on('data', (chunk) => {
                                body += chunk;
                            });
                            req.on('end', () => {
                                fs.writeFileSync(DATA_FILE, body);
                                res.end('ok');
                            });
                            return;
                        }
                    }
                    next();
                });
            },
        },
    ],
});
