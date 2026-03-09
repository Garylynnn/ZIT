import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // Mock Salt API endpoints
  app.get('/api/salt/status', (req, res) => {
    res.json({
      master_status: 'Online',
      version: '3006.1',
      minions_count: 3,
      accepted_keys: 3,
      pending_keys: 1,
      rejected_keys: 0
    });
  });

  app.get('/api/salt/minions', (req, res) => {
    res.json([
      { id: 'AD-Server-01', status: 'Accepted', last_seen: 'Just now', os: 'Windows' },
      { id: 'Support-WS-2047', status: 'Accepted', last_seen: '2 mins ago', os: 'Ubuntu' },
      { id: 'Marketing-Mac-3012', status: 'Accepted', last_seen: '3 hours ago', os: 'macOS' },
      { id: 'New-Device-XYZ', status: 'Pending', last_seen: '10 mins ago', os: 'Unknown' },
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
