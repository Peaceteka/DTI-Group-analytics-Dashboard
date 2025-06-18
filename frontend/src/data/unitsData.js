export const units = [
  {
    id: 1,
    name: 'Unit 1',
    manager: 'Brian',
    members: ['Rose', 'Vera', 'Jacky'],
    department: 'Sales',
    memberPins: {
      Brian: '1234',
      Rose: '5678',
      Vera: '9012',
      Jacky: '3456'
    }
  },
  {
    id: 2,
    name: 'Unit 2',
    manager: 'Kijala',
    members: ['Kevin', 'Christine', 'Cynthia'],
    department: 'Marketing',
    memberPins: {
      Kijala: '0000',
      Kevin: '0000',
      Christine: '0000',
      Cynthia: '0000'
    }
  },
  {
    id: 3,
    name: 'Unit 3',
    manager: 'Maureen',
    members: ['Ruth', 'Emmah'],
    department: 'Finance',
    memberPins: {
      Maureen: '0000',
      Ruth: '0000',
      Emmah: '0000'
    }
  },
  {
    id: 4,
    name: 'Unit 4',
    manager: 'Cooperate Unit',
    members: ['Bella', 'Faiza'],
    department: 'Operations',
    memberPins: {
      CooperateUnit: '0000',
      Bella: '0000',
      Faiza: '0000'
    }
  }
];

// Default PIN for managers (used when no specific PIN is set)
export const defaultPin = '0000';

export const departments = [
  {
    id: 5,
    name: 'Finance Department',
    manager: 'Finance Manager',
    members: ['Finance Team'],
    clients: []
  },
  {
    id: 6,
    name: 'CEO',
    manager: 'Dr. Murage',
    members: [],
    clients: []
  }
];

export const sessionTypes = [
  'Physical Class',
  'Online Class',
  'English Fluency',
  'Emotional Intelligence',
  'Public Speaking',
  'Leadership Development',
  'Business Communication'
];
