export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export interface Address {
  id: string;
  formattedAddress: string;
  rawText: string;
  latitude?: number;
  longitude?: number;
  orderIndex: number;
  comment?: string;
}

export interface AddressList {
  id: string;
  label: string;
  startingNote?: string;
  addresses: Address[];
}
