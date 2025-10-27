import request from 'supertest';
import express from 'express';
import authRoutes from '../src/routes/auth.route';
import workspaceRoutes from '../src/routes/workspace.route';
import projectRoutes from '../src/routes/project.route';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/projects', projectRoutes);

describe('Project Integration Tests', () => {
  let authToken: string;
  let workspaceId: string;

  beforeAll(async () => {
    // Create test user and workspace
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'project-test@example.com',
        password: 'password123',
        name: 'Project Test User'
      });
    
    authToken = registerResponse.body.token;

    const workspaceResponse = await request(app)
      .post('/api/workspaces/create')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        name: 'Project Test Workspace',
        description: 'For project testing'
      });
    
    workspaceId = workspaceResponse.body.workspace._id;
  });

  describe('Project CRUD Operations', () => {
    let projectId: string;

    it('should create project in workspace', async () => {
      const projectData = {
        name: 'Integration Test Project',
        description: 'Test project description',
        emoji: '🚀'
      };

      const response = await request(app)
        .post(`/api/projects/workspace/${workspaceId}/create`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(projectData)
        .expect(201);

      projectId = response.body.project._id;
      expect(response.body.project.name).toBe(projectData.name);
    });

    it('should retrieve all projects in workspace', async () => {
      const response = await request(app)
        .get(`/api/projects/workspace/${workspaceId}/all`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body.projects)).toBe(true);
      expect(response.body.projects.length).toBeGreaterThan(0);
    });

    it('should update project details', async () => {
      const updateData = {
        name: 'Updated Project Name',
        description: 'Updated description'
      };

      const response = await request(app)
        .put(`/api/projects/${projectId}/workspace/${workspaceId}/update`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.project.name).toBe(updateData.name);
    });

    it('should get project analytics', async () => {
      const response = await request(app)
        .get(`/api/projects/${projectId}/workspace/${workspaceId}/analytics`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body.analytics).toHaveProperty('totalTasks');
      expect(response.body.analytics).toHaveProperty('completedTasks');
    });
  });
});