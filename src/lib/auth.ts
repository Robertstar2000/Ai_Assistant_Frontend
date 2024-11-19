import { UserMetadata } from '../types/auth';

interface StoredUser {
  id: string;
  email: string;
  metadata: UserMetadata;
}

interface AuthStore {
  users: StoredUser[];
  currentUser: StoredUser | null;
}

const STORE_KEY = 'auth_store';

function getStore(): AuthStore {
  const stored = localStorage.getItem(STORE_KEY);
  return stored ? JSON.parse(stored) : { users: [], currentUser: null };
}

function saveStore(store: AuthStore) {
  localStorage.setItem(STORE_KEY, JSON.stringify(store));
}

export async function signUp(email: string, password: string, userData: UserMetadata): Promise<void> {
  const store = getStore();
  
  if (store.users.some(user => user.email === email)) {
    throw new Error('User already exists');
  }

  const newUser: StoredUser = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    metadata: userData,
  };

  store.users.push(newUser);
  store.currentUser = newUser;
  saveStore(store);
}

export async function signIn(email: string, password: string): Promise<StoredUser> {
  const store = getStore();
  const user = store.users.find(u => u.email === email);
  
  if (!user) {
    throw new Error('Invalid email or password');
  }

  store.currentUser = user;
  saveStore(store);
  return user;
}

export async function signOut(): Promise<void> {
  const store = getStore();
  store.currentUser = null;
  saveStore(store);
}

export function getCurrentUser(): StoredUser | null {
  return getStore().currentUser;
}

export function updateUserMetadata(userId: string, metadata: Partial<UserMetadata>): void {
  const store = getStore();
  const user = store.users.find(u => u.id === userId);
  
  if (user) {
    user.metadata = { ...user.metadata, ...metadata };
    if (store.currentUser?.id === userId) {
      store.currentUser = user;
    }
    saveStore(store);
  }
}