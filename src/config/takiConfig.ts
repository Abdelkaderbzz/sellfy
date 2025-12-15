import { TakiPopups } from 'taki-popups-plugin-dev';

interface UserData {
  name: string;
  memberId: string;
}

// Generate random name from a predefined list
const generateRandomName = (): string => {
  const names = [
    'Alex',
    'Jordan',
    'Taylor',
    'Morgan',
    'Casey',
    'Riley',
    'Avery',
    'Quinn',
    'Sage',
    'River',
    'Phoenix',
    'Rowan',
    'Blake',
    'Cameron',
    'Drew',
    'Emery',
    'Finley',
    'Harper',
    'Hayden',
    'Indigo',
    'Kai',
    'Lane',
    'Marley',
    'Nova',
    'Ocean',
    'Parker',
    'Reese',
    'Skylar',
    'Tatum',
    'Vale',
  ];
  return names[Math.floor(Math.random() * names.length)];
};

// Generate random member ID (6-digit number)
const generateRandomMemberId = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Get or create user data from localStorage
const getUserData = (): UserData => {
  const STORAGE_KEY = 'taki_user_data';

  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      const userData = JSON.parse(stored) as UserData;
      // Validate stored data
      if (userData.name && userData.memberId) {
        return userData;
      }
    }
  } catch (error) {
    console.warn('Failed to parse stored user data:', error);
  }

  // Generate new user data for first-time visitors
  const newUserData: UserData = {
    name: generateRandomName(),
    memberId: generateRandomMemberId(),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUserData));
  } catch (error) {
    console.warn('Failed to store user data:', error);
  }

  return newUserData;
};

export const initializeTakiPopups = () => {
  const userData = getUserData();

  TakiPopups({
    name: userData.name,
    memberId: userData.memberId,
    appId: '6940706aed2c55006df6289e',
    lang: 'en',
    meta_data: {
      age: 18,
      state: 'Manouba',
      phoneNumber: '5289452343',
    },
  });
};
