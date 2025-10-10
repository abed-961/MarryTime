export interface Review {
  id: number;
  client_id: number;
  vendor_id: number;
  category_id: number;
  ration: 'Bad' | 'Good' | 'Excellent';
  comment: string;
  created_at: string;
  vendor?: {
    id: number;
    company_name: string;
    user?: {
      name: string;
    };
  };
  category?: { id: number; name: string };
  client: { id: number; name: string };
}
