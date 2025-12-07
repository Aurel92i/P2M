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
