import express from 'express';
import session from 'express-session';
import cors from 'cors';
import configRouter from './routes/config';
import campsRouter from './routes/camps';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
}));

app.use(express.json());

app.use(session({
  secret: 'camp-agent-secret-key-change-in-production',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: undefined,
  },
}));

app.use('/api/config', configRouter);
app.use('/api/camps', campsRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 CampAgent Server running on http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api/health`);
});
