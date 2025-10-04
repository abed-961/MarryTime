export interface UserFullDetails {
  id: number;
  name: string;
  email: string;
  role: string;
  phone: string;
  photo: string;
  created_at: Date;
  vendor?: Vendor[]; // optional if the user might not be a vendor
}

export interface Vendor {
  availabilities: Availability[];
  company_name: string;
  location: string;
  price_range: string;
  services: Service[];
}

export interface Availability {
  id: number;
  date: Date;
  start_time: string;
  end_time: string;
  is_available: boolean;
}

export interface Service {
  id: number;
  category: Category;
  price: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}
