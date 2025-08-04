export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'employee';
  createdAt: Date;
  updatedAt: Date;
}

export interface Employee {
  _id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  salary: number;
  hireDate: Date;
  birthDate: Date;
  address: string;
  photoUrl?: string;
  status: 'active' | 'inactive' | 'terminated';
  benefits: {
    healthInsurance: boolean;
    vacation: number;
    bonus: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface FinanceRecord {
  _id: string;
  type: 'income' | 'expense';
  category: string;
  amount: number;
  description: string;
  date: Date;
  reference?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HRRecord {
  _id: string;
  employeeId: string | Employee;
  type: 'attendance' | 'evaluation' | 'vacation' | 'event';
  date: Date;
  status?: string;
  notes?: string;
  rating?: number;
  data?: any;
  createdAt: Date;
  updatedAt: Date;
}

export interface ServiceProvider {
  _id: string;
  name: string;
  type: 'telecom';
  contactInfo: {
    email: string;
    phone: string;
    address: string;
  };
  contractDetails: {
    startDate: Date;
    endDate: Date;
    monthlyFee: number;
    services: string[];
  };
  status: 'active' | 'inactive' | 'expired';
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  totalRevenue: number;
  totalExpenses: number;
  monthlyGrowth: number;
  pendingEvaluations: number;
  upcomingVacations: number;
  expiredContracts: number;
}
