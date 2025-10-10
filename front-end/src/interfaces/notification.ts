export interface Notification {
  id: number;
  user_id: number;
  type: 'success' | 'error' | 'info' | 'warning';
  message: string;
  readed_it: boolean;
  created_at: string;
  updated_at: string;
}
