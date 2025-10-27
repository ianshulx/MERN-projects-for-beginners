import request from 'supertest';
import express from 'express';
import workspaceRoutes from '../src/routes/workspace.route';

const app = express();
app.use(express.json());
app.use('/api/workspaces', workspaceRoutes);

describe('Workspace Routes - Basic', () => {
  let authToken: string;

  beforeEach(async () => {
    // Setup test user and get token
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'workspace@example.com',
        password: 'password123',
        name: 'Workspace User'
      });
    
    authToken = registerResponse.body.token;
  });

  describe('POST /api/workspaces/create', () => {
    it('should create workspace with valid data', async () => {
      const workspaceData = {
        name: 'Test Workspace',
        description: 'Test Description'
      };

      const response = await request(app)
        .post('/api/workspaces/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send(workspaceData)
        .expect(201);

      expect(response.body.workspace.name).toBe(workspaceData.name);
      expect(response.body.workspace.owner).toBeDefined();
    });

    it('should reject workspace creation without name', async () => {
      await request(app)
        .post('/api/workspaces/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({ description: 'No name' })
        .expect(400);
    });
  });

  describe('GET /api/workspaces/all', () => {
    it('should return user workspaces', async () => {
      const response = await request(app)
        .get('/api/workspaces/all')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body.workspaces)).toBe(true);
    });
  });
});