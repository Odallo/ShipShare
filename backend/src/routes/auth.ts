import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

const router = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface SignupRequest {
  name: string;
  email: string;
  phone: string;
  password: string;
  location?: string;
  userType?: 'individual' | 'business';
  businessName?: string;
  businessRegistration?: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const body: SignupRequest = req.body;

    if (!body.name || !body.email || !body.password || !body.phone) {
      return res.status(400).json({ error: 'Name, email, password, and phone are required' });
    }

    if (!body.email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (body.password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    if (body.name.length < 2) {
      return res.status(400).json({ error: 'Name must be at least 2 characters' });
    }

    if (body.userType === 'business') {
      if (!body.businessName || !body.businessRegistration) {
        return res.status(400).json({ error: 'Business name and registration number are required for business accounts' });
      }
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        password: hashedPassword,
        location: body.location || '',
        userType: body.userType || 'individual',
        businessName: body.businessName,
        businessRegistration: body.businessRegistration,
      },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({ user: userWithoutPassword, token, message: 'Signup successful' });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const body: LoginRequest = req.body;

    if (!body.email || !body.password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    if (!body.email.includes('@')) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isValidPassword = await bcrypt.compare(body.password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '24h' });

    const { password: _, ...userWithoutPassword } = user;

    res.json({ user: userWithoutPassword, token, message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/logout', (req: Request, res: Response) => {
  res.json({ message: 'Logout successful' });
});

export default router;
