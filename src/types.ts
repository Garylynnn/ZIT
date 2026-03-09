export type DeviceStatus = 'Online' | 'Offline' | 'Maintenance';
export type Severity = 'Low' | 'Medium' | 'High' | 'Critical';
export type TicketStatus = 'Open' | 'In Progress' | 'Waiting' | 'Closed';
export type GatepassStatus = 'Draft' | 'Pending Manager Approval' | 'Pending Employee Signature' | 'Pending Security Signature' | 'Approved' | 'Out' | 'Returned' | 'Closed' | 'Rejected';

export interface Device {
  id: string;
  name: string;
  assetTag: string;
  status: DeviceStatus;
  group: string;
  type: string;
  user: string;
  emailId?: string;
  branch: string;
  os: string;
  score: number;
  reachability: number;
  lastSeen: string;
  cpu: number;
  memory: number;
  disk: number;
  hardwareSpecs?: {
    cpu: string;
    ram: string;
    storage: string;
    gpu: string;
  };
  installedSoftware?: {
    name: string;
    version: string;
  }[];
}

export interface Ticket {
  id: string;
  title: string;
  user: string;
  priority: Severity;
  status: TicketStatus;
  assignee: string;
  deviceId?: string;
  createdAt: string;
  description: string;
}

export interface Alert {
  id: string;
  type: string;
  severity: Severity;
  deviceId: string;
  deviceName: string;
  branch: string;
  time: string;
  status: 'Open' | 'Acknowledged' | 'Resolved';
  description: string;
}

export interface StockItem {
  id: string;
  name: string;
  category: string;
  branch: string;
  available: number;
  reserved: number;
  issued: number;
  reorderLevel: number;
  status: 'Healthy' | 'Low Stock' | 'Out of Stock';
}

export interface Gatepass {
  id: string;
  assetId: string;
  assetName: string;
  employeeName: string;
  employeeEmail: string;
  branch: string;
  purpose: string;
  status: GatepassStatus;
  managerSign?: { name: string; date: string; remarks: string };
  employeeSign?: { name: string; date: string };
  securitySign?: { name: string; date: string; outTime?: string; inTime?: string; remarks: string };
  createdAt: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  department: string;
  assets: {
    id: string;
    name: string;
    type: string;
    hardware: string;
    os: string;
    software: string[];
  }[];
}

export interface Department {
  id: string;
  name: string;
  head: string;
  employeeCount: number;
  assetsCount: number;
}

export interface Requirement {
  id: string;
  employeeName: string;
  type: 'Hardware' | 'Software' | 'Access';
  description: string;
  priority: Severity;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Fulfilled';
  createdAt: string;
}

export interface DeploymentGroup {
  id: string;
  name: string;
  description: string;
  deviceCount: number;
  lastUpdate: string;
  status: 'Active' | 'Paused' | 'Archived';
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'Pending' | 'In Progress' | 'Completed';
  dueDate: string;
  assignedTo: string;
}
