export interface Appointment {
  id: number;
  client : {id : number , name : string },
  category : {id : number , name : string },
  client_id?: number;
  vendor_id: number;
  category_id: number;
  appointment_date: string;
  location: string;
  guests: number;
  tables: number;
  status: 'pending' | 'completed' | 'cancelled';
  notes: string;
}
