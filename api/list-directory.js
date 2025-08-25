const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    // Get directory path from query parameter
    const { dir } = req.query;
    
    if (!dir) {
        return res.status(400).json({ error: 'Directory parameter required' });
    }
    
    try {
        // Check if we're in a serverless environment (Vercel, Netlify, etc.)
        // Vercel sets VERCEL=1, also check for other serverless indicators
        const isServerless = process.env.VERCEL || 
                            process.env.VERCEL_ENV || 
                            process.env.AWS_LAMBDA_FUNCTION_NAME || 
                            process.env.FUNCTION_NAME ||
                            process.env.NETLIFY ||
                            !process.env.NODE_ENV || // Often undefined in serverless
                            process.env.LAMBDA_TASK_ROOT; // AWS Lambda indicator
        
        if (isServerless) {
            // In serverless environments, static files are not accessible via filesystem
            // Return a response indicating folder scanning is not available
            return res.status(503).json({ 
                error: 'Folder scanning not available in serverless environment',
                message: 'Using static catalog instead'
            });
        }
        
        // Construct the full directory path
        // This only works in local/traditional server environments
        const fullDirPath = path.join(process.cwd(), dir);
        
        // Read the directory
        fs.readdir(fullDirPath, { withFileTypes: true }, (error, entries) => {
            if (error) {
                console.error('Directory read error:', error);
                // If directory not found, likely in serverless environment - return fallback response
                return res.status(503).json({ 
                    error: 'Folder scanning not available in this environment',
                    message: 'Using static catalog instead'
                });
            }
            
            // Separate directories and files
            const result = {
                directories: entries.filter(entry => entry.isDirectory()).map(entry => entry.name),
                files: entries.filter(entry => entry.isFile()).map(entry => entry.name)
            };
            
            res.status(200).json(result);
        });
        
    } catch (error) {
        console.error('API error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}