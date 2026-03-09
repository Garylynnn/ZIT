import { Device, Ticket, Alert, StockItem, Gatepass, Employee, Department, Requirement, DeploymentGroup } from './types';

export const MOCK_DEVICES: Device[] = [
  {
    id: '1',
    name: 'AD Server',
    assetTag: 'ZL-1001',
    status: 'Online',
    group: 'Internal',
    type: 'SERVER',
    user: 'System',
    branch: 'HO Bangalore',
    os: 'Windows Server 2022',
    score: 85,
    reachability: 100,
    lastSeen: 'Just now',
    cpu: 12,
    memory: 45,
    disk: 30,
  },
  {
    id: '2',
    name: 'support.zbl-2047',
    assetTag: 'ZL-2047',
    status: 'Online',
    group: 'Support',
    type: 'WS',
    user: 'gani@company.com',
    branch: 'Support Office - Bangalore',
    os: 'Ubuntu 22.04',
    score: 92,
    reachability: 100,
    lastSeen: '2 mins ago',
    cpu: 5,
    memory: 60,
    disk: 75,
  },
  {
    id: '3',
    name: 'marketing.zbl-3012',
    assetTag: 'ZL-3012',
    status: 'Offline',
    group: 'Marketing',
    type: 'Laptop',
    user: 'priya@company.com',
    branch: 'Mumbai Branch',
    os: 'macOS Sonoma',
    score: 78,
    reachability: 0,
    lastSeen: '3 hours ago',
    cpu: 0,
    memory: 0,
    disk: 40,
  }
];

export const MOCK_TICKETS: Ticket[] = [
  {
    id: 'IT-2031',
    title: 'VPN not connecting',
    user: 'gani',
    priority: 'Medium',
    status: 'Open',
    assignee: 'Network Team',
    deviceId: '2',
    createdAt: '2024-03-08 10:30',
    description: 'VPN client fails to authenticate after the latest OS update.'
  },
  {
    id: 'IT-2032',
    title: 'Monitor flickering',
    user: 'priya',
    priority: 'Low',
    status: 'In Progress',
    assignee: 'Hardware Support',
    deviceId: '3',
    createdAt: '2024-03-08 11:15',
    description: 'External monitor flickers randomly when connected via HDMI.'
  }
];

export const MOCK_ALERTS: Alert[] = [
  {
    id: 'AL-101',
    type: 'Antivirus Disabled',
    severity: 'High',
    deviceId: '2',
    deviceName: 'support.zbl-2047',
    branch: 'Support',
    time: '12:40',
    status: 'Open',
    description: 'Real-time protection was disabled by the user.'
  },
  {
    id: 'AL-102',
    type: 'High CPU Usage',
    severity: 'Medium',
    deviceId: '1',
    deviceName: 'AD Server',
    branch: 'HO Bangalore',
    time: '14:20',
    status: 'Acknowledged',
    description: 'CPU usage exceeded 90% for more than 5 minutes.'
  }
];

export const MOCK_STOCK: StockItem[] = [
  {
    id: 'S-001',
    name: 'Dell Latitude 5440',
    category: 'Laptop',
    branch: 'HO Bangalore',
    available: 14,
    reserved: 3,
    issued: 26,
    reorderLevel: 5,
    status: 'Healthy'
  },
  {
    id: 'S-002',
    name: 'Logitech MX Master 3S',
    category: 'Peripherals',
    branch: 'Support Office - Bangalore',
    available: 2,
    reserved: 0,
    issued: 15,
    reorderLevel: 5,
    status: 'Low Stock'
  }
];

export const MOCK_GATEPASSES: Gatepass[] = [
  {
    id: 'GP-2031',
    assetId: '2',
    assetName: 'support.zbl-2047',
    employeeName: 'Gani',
    employeeEmail: 'gani@company.com',
    branch: 'Support',
    purpose: 'Repair / VPN Issue',
    status: 'Approved',
    managerSign: { name: 'IT Manager', date: '2024-03-08 09:00', remarks: 'Approved for repair' },
    employeeSign: { name: 'Gani', date: '2024-03-08 09:15' },
    createdAt: '2024-03-08 08:30'
  }
];

export const MOCK_DEPARTMENTS: Department[] = [
  { id: 'dept-1', name: 'Support', head: 'Muhammed Gani', employeeCount: 12, assetsCount: 15 },
  { id: 'dept-2', name: 'Marketing', head: 'Priya Sharma', employeeCount: 8, assetsCount: 10 },
  { id: 'dept-3', name: 'IT', head: 'Rahul Kumar', employeeCount: 25, assetsCount: 45 },
  { id: 'dept-4', name: 'Finance', head: 'Anjali Singh', employeeCount: 10, assetsCount: 12 },
];

export const MOCK_REQUIREMENTS: Requirement[] = [
  { id: 'REQ-001', employeeName: 'Muhammed Gani', type: 'Hardware', description: 'Need a second monitor for monitoring dashboard', priority: 'Medium', status: 'Pending', createdAt: '2024-03-08 09:00' },
  { id: 'REQ-002', employeeName: 'Priya Sharma', type: 'Software', description: 'Adobe Premiere Pro license for video editing', priority: 'High', status: 'Approved', createdAt: '2024-03-07 14:30' },
  { id: 'REQ-003', employeeName: 'Rahul Kumar', type: 'Access', description: 'Production DB read-only access', priority: 'Critical', status: 'Fulfilled', createdAt: '2024-03-06 11:00' },
];

export const MOCK_DEPLOYMENT_GROUPS: DeploymentGroup[] = [
  { id: 'grp-1', name: 'HO Bangalore - Windows', description: 'All Windows workstations in Bangalore Head Office', deviceCount: 45, lastUpdate: '2024-03-08 10:00', status: 'Active' },
  { id: 'grp-2', name: 'Mumbai - macOS', description: 'Marketing team laptops in Mumbai', deviceCount: 12, lastUpdate: '2024-03-07 16:45', status: 'Active' },
  { id: 'grp-3', name: 'Remote - Linux', description: 'Support team remote workstations', deviceCount: 28, lastUpdate: '2024-03-05 09:15', status: 'Paused' },
];

export const MOCK_EMPLOYEES: Employee[] = [
  {
    id: 'emp-1',
    name: 'Muhammed Gani',
    email: 'muhammed.gani@zerodha.com',
    department: 'Support',
    assets: [
      {
        id: 'ast-1',
        name: 'Dell Latitude 5440',
        type: 'Laptop',
        hardware: 'Intel i7 13th Gen, 32GB RAM, 1TB SSD',
        os: 'Ubuntu 22.04 LTS',
        software: ['VS Code', 'Slack', 'Docker', 'Chrome']
      }
    ]
  },
  {
    id: 'emp-2',
    name: 'Priya Sharma',
    email: 'priya.sharma@zerodha.com',
    department: 'Marketing',
    assets: [
      {
        id: 'ast-2',
        name: 'MacBook Pro M3',
        type: 'Laptop',
        hardware: 'Apple M3 Pro, 18GB RAM, 512GB SSD',
        os: 'macOS Sonoma',
        software: ['Adobe Creative Cloud', 'Slack', 'Canva']
      }
    ]
  },
  {
    id: 'emp-3',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@zerodha.com',
    department: 'IT',
    assets: [
      {
        id: 'ast-3',
        name: 'Custom PC',
        type: 'Workstation',
        hardware: 'AMD Ryzen 9, 64GB RAM, 2TB SSD, RTX 4080',
        os: 'Windows 11 Pro',
        software: ['Visual Studio 2022', 'SQL Server', 'Hyper-V']
      }
    ]
  }
];
