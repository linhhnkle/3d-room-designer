const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3002;

const server = http.createServer((req, res) => {
    // Handle directory listing API requests
    if (req.url.startsWith('/api/list-directory/')) {
        const dirPath = decodeURIComponent(req.url.replace('/api/list-directory/', ''));
        const fullDirPath = path.join(__dirname, dirPath);
        
        fs.readdir(fullDirPath, { withFileTypes: true }, (error, entries) => {
            const corsHeaders = {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            };
            
            if (error) {
                res.writeHead(404, corsHeaders);
                res.end(JSON.stringify({ error: 'Directory not found' }));
            } else {
                const result = {
                    directories: entries.filter(entry => entry.isDirectory()).map(entry => entry.name),
                    files: entries.filter(entry => entry.isFile()).map(entry => entry.name)
                };
                res.writeHead(200, corsHeaders);
                res.end(JSON.stringify(result));
            }
        });
        return;
    }
    
    let filePath = path.join(__dirname, req.url === '/' ? 'desk-designer-enhanced.html' : req.url);
    
    const extname = path.extname(filePath).toLowerCase();
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.glb': 'model/gltf-binary',
        '.gltf': 'model/gltf+json',
        '.hdr': 'application/octet-stream'
    };

    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
        if (error) {
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('404: File Not Found', 'utf-8');
            } else {
                res.writeHead(500);
                res.end('Server Error: ' + error.code, 'utf-8');
            }
        } else {
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════╗
║       Room Designer Server Running!            ║
╠════════════════════════════════════════════════╣
║                                                ║
║  Open your browser and go to:                 ║
║  👉 http://localhost:${PORT}                      ║
║                                                ║
║  Press Ctrl+C to stop the server              ║
║                                                ║
╚════════════════════════════════════════════════╝
    `);
});