import request from 'supertest';
import express from 'express';
import authRoutes from '../src/routes/auth.route';
import workspaceRoutes from '../src/routes/workspace.route';
import projectRoutes from '../src/routes/project.route';
import taskRoutes from '../src/routes/task.route';

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/workspaces', workspaceRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

describe('Task Integration Tests', () => {
  let authToken: string;
  let workspaceId: string;
  let projectId: string;

  beforeAll(async () => {
    const registerResponse = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'task-test@example.com',
        password: 'password123',
        name: 'Task Test User'
      });
    
    authToken = registerResponse.body.token;

    const workspaceResponse = await request(app)
      .post('/api/workspaces/create')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Task Test Workspace' });
    
    workspaceId = workspaceResponse.body.workspace._id;

    const projectResponse = await request(app)
      .post(`/api/projects/workspace/${workspaceId}/create`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ name: 'Task Test Project' });
    
    projectId = projectResponse.body.project._id;
  });

  describe('Task Management Flow', () => {
    let taskId: string;

    it('should create task with all required fields', async () => {
      const taskData = {
        title: 'Test Task',
        description: 'Test task description',
        priority: 'high',
        status: 'backlog',
        dueDate: '2024-12-31'
      };

      const response = await request(app)
        .post(`/api/tasks/project/${projectId}/workspace/${workspaceId}/create`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(taskData)
        .expect(201);

      taskId = response.body.task._id;
      expect(response.body.task.title).toBe(taskData.title);
      expect(response.body.task.taskCode).toMatch(/TASK-\d+/);
    });

    it('should retrieve all tasks with filtering', async () => {
      const response = await request(app)
        .get(`/api/tasks/workspace/${workspaceId}/all?status=backlog&priority=high`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(Array.isArray(response.body.tasks)).toBe(true);
    });

    it('should update task status and priority', async () => {
      const updateData = {
        status: 'in_progress',
        priority: 'medium'
      };

      const response = await request(app)
        .put(`/api/tasks/${taskId}/project/${projectId}/workspace/${workspaceId}/update`)
        .set('Authorization', `Bearer ${authToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.task.status).toBe('in_progress');
    });
  });
});