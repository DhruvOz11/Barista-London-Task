// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  'https://barista-london-task-backend-production.up.railway.app'

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/user/login`,
  SIGNUP: `${API_BASE_URL}/user/signup`,
  TASKS: `${API_BASE_URL}/task`,
  TASK: (id) => `${API_BASE_URL}/task/${id}`,
}

export default API_BASE_URL
