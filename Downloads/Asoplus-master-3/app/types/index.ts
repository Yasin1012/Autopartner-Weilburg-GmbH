export interface Address {
  $id?: string;
  street: string;
  postalCode: string;
  city: string;
  country?: string;
}

export interface User {
  $id?: string;
  username: string;
  email: string;
}

export interface Company {
  documents?: Company[];
  $id?: string;
  logo: string;
  name: string;
  description: string;
  dealValue: number;
  addresses: string[];
  users: string;
  version: number;
  management: string[];
  primaryContact: string[];
  occupationalSafety: string[];
  firstAiders: string[];
  safetyOfficers: string[];
  fireProtection: string[];
  companyDoctors: string[];
  responsibleContact: string[];
}
