"use client";

import { useEffect, useState } from "react";
import { Company, Address } from "@/app/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Loader2 } from "lucide-react";
import { Plus } from "lucide-react";
import { databases } from "@/app/lib/appwrite-config";
import { ID, Models } from "appwrite";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COMPANIES_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;
const ADDRESSES_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_ADDRESSES_COLLECTION_ID;
const USERS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;
const MANAGEMENT_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_MANAGEMENT_COLLECTION_ID;
const PRIMARY_CONTACT_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_PRIMARY_CONTACT_COLLECTION_ID;
const OCCUPATIONAL_SAFETY_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_OCCUPATIONAL_SAFETY_COLLECTION_ID;
const FIRST_AIDERS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_FIRST_AIDERS_COLLECTION_ID;
const SAFETY_OFFICERS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_SAFETY_OFFICERS_COLLECTION_ID;
const FIRE_PROTECTION_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_FIRE_PROTECTION_COLLECTION_ID;
const COMPANY_DOCTORS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_COMPANY_DOCTORS_COLLECTION_ID;
const RESPONSIBLE_CONTACT_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_RESPONSIBLE_CONTACT_COLLECTION_ID;

interface Management {
  $id?: string;
  name: string;
  email?: string;
  phone?: string;
  location?: string;
}

interface PrimaryContact {
  $id?: string;
  name: string;
  email?: string;
  phone?: string;
  location?: string;
}

interface EditCompanyModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (id: string, data: Partial<Company>) => Promise<void>;
}

export function EditCompanyModal({
  company,
  isOpen,
  onClose,
  onUpdate,
}: EditCompanyModalProps) {
  const [formData, setFormData] = useState<Partial<Company>>({});
  const [loading, setLoading] = useState(false);
  const [changedFields, setChangedFields] = useState<Set<string>>(new Set());

  const [management, setManagement] = useState<Management[]>([]);
  const [primaryContacts, setPrimaryContacts] = useState<PrimaryContact[]>([]);
  const [occupationalSafety, setOccupationalSafety] = useState<Management[]>(
    []
  );
  const [firstAiders, setFirstAiders] = useState<Management[]>([]);
  const [safetyOfficers, setSafetyOfficers] = useState<Management[]>([]);
  const [fireProtection, setFireProtection] = useState<Management[]>([]);
  const [companyDoctors, setCompanyDoctors] = useState<Management[]>([]);
  const [responsibleContact, setResponsibleContact] = useState<Management[]>(
    []
  );
  const [users, setUsers] = useState<{ username: string; email: string }[]>([]);
  const [addresses, setAddresses] = useState<
    {
      street: string;
      city: string;
      postalCode: string;
      country?: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!company) {
        console.log("No company data available");
        return;
      }

      console.log("Initial company data:", company);

      // Set basic company data
      setFormData({
        name: company.name || "",
        logo: company.logo || "",
        description: company.description || "",
        dealValue: company.dealValue || 0,
      });
      console.log("Set form data:", formData);

      try {
        // Fetch users data
        if (company.users) {
          console.log("Setting users:", company.users);
          setUsers([
            {
              username: (company.users as any).username,
              email: (company.users as any).email,
            },
          ]);
        }

        // Fetch addresses data
        if (Array.isArray(company.addresses) && company.addresses.length > 0) {
          console.log("Setting addresses:", company.addresses);
          setAddresses(
            company.addresses.map((address: any) => ({
              street: address.street,
              city: address.city,
              postalCode: address.postalCode,
              country: address.country,
            }))
          );
        }

        // Fetch management data
        if (
          Array.isArray(company.management) &&
          company.management.length > 0
        ) {
          console.log("Setting management:", company.management);
          setManagement(
            company.management.map((item: any) => ({
              name: item.name,
              email: item.email,
              phone: item.phone,
              location: item.location,
            }))
          );
        }

        // Fetch primary contacts
        if (
          Array.isArray(company.primaryContact) &&
          company.primaryContact.length > 0
        ) {
          console.log("Setting primary contacts:", company.primaryContact);
          setPrimaryContacts(
            company.primaryContact.map((contact: any) => ({
              name: contact.name,
              email: contact.email,
              phone: contact.phone,
              location: contact.location,
            }))
          );
        }

        // Fetch occupational safety
        if (
          Array.isArray(company.occupationalSafety) &&
          company.occupationalSafety.length > 0
        ) {
          console.log(
            "Setting occupational safety:",
            company.occupationalSafety
          );
          setOccupationalSafety(
            company.occupationalSafety.map((safety: any) => ({
              name: safety.name,
              email: safety.email,
              phone: safety.phone,
              location: safety.location,
            }))
          );
        }

        // Fetch first aiders
        if (
          Array.isArray(company.firstAiders) &&
          company.firstAiders.length > 0
        ) {
          console.log("Setting first aiders:", company.firstAiders);
          setFirstAiders(
            company.firstAiders.map((aider: any) => ({
              name: aider.name,
              email: aider.email,
              phone: aider.phone,
              location: aider.location,
            }))
          );
        }

        // Fetch safety officers
        if (
          Array.isArray(company.safetyOfficers) &&
          company.safetyOfficers.length > 0
        ) {
          console.log("Setting safety officers:", company.safetyOfficers);
          setSafetyOfficers(
            company.safetyOfficers.map((officer: any) => ({
              name: officer.name,
              email: officer.email,
              phone: officer.phone,
              location: officer.location,
            }))
          );
        }

        // Fetch fire protection
        if (
          Array.isArray(company.fireProtection) &&
          company.fireProtection.length > 0
        ) {
          console.log("Setting fire protection:", company.fireProtection);
          setFireProtection(
            company.fireProtection.map((protection: any) => ({
              name: protection.name,
              email: protection.email,
              phone: protection.phone,
              location: protection.location,
            }))
          );
        }

        // Fetch company doctors
        if (
          Array.isArray(company.companyDoctors) &&
          company.companyDoctors.length > 0
        ) {
          console.log("Setting company doctors:", company.companyDoctors);
          setCompanyDoctors(
            company.companyDoctors.map((doctor: any) => ({
              name: doctor.name,
              email: doctor.email,
              phone: doctor.phone,
              location: doctor.location,
            }))
          );
        }

        // Fetch responsible contact
        if (
          Array.isArray(company.responsibleContact) &&
          company.responsibleContact.length > 0
        ) {
          console.log(
            "Setting responsible contact:",
            company.responsibleContact
          );
          setResponsibleContact(
            company.responsibleContact.map((contact: any) => ({
              name: contact.name,
              email: contact.email,
              phone: contact.phone,
              location: contact.location,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        console.error("Error details:", {
          DATABASE_ID,
          company,
          error,
        });
      }
    };

    fetchData();
  }, [company]);

  useEffect(() => {
    console.log("Current users state:", users);
  }, [users]);

  useEffect(() => {
    console.log("Current addresses state:", addresses);
  }, [addresses]);

  useEffect(() => {
    console.log("Current management state:", management);
  }, [management]);

  const addManagement = () => {
    setManagement([
      ...management,
      { name: "", email: "", phone: "", location: "" },
    ]);
    setChangedFields((prev) => new Set(prev).add("management"));
  };

  const removeManagement = (index: number) => {
    setManagement(management.filter((_, i) => i !== index));
    setChangedFields((prev) => new Set(prev).add("management"));
  };

  const handleChange = (field: keyof Company, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setChangedFields((prev) => new Set(prev).add(field));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company?.$id) return;

    setLoading(true);
    try {
      const updates: any = {};

      // Add basic company info if changed
      if (changedFields.has("name")) updates.name = formData.name;
      if (changedFields.has("logo")) updates.logo = formData.logo;
      if (changedFields.has("description"))
        updates.description = formData.description;
      if (changedFields.has("dealValue"))
        updates.dealValue = formData.dealValue;

      // Update users if changed
      if (changedFields.has("users") && users[0]) {
        const userDoc = await databases.updateDocument(
          DATABASE_ID!,
          USERS_COLLECTION_ID!,
          (company.users as any).$id,
          {
            username: users[0].username,
            email: users[0].email,
          }
        );
        updates.users = userDoc.$id;
      }

      // Update addresses if changed
      if (changedFields.has("addresses") && addresses[0]) {
        const addressDoc = await databases.updateDocument(
          DATABASE_ID!,
          ADDRESSES_COLLECTION_ID!,
          (company.addresses[0] as any).$id,
          {
            street: addresses[0].street,
            city: addresses[0].city,
            postalCode: addresses[0].postalCode,
            country: addresses[0].country,
          }
        );
        updates.addresses = [addressDoc.$id];
      }

      // Update management if changed
      if (changedFields.has("management") && management[0]) {
        const managementDoc = await databases.updateDocument(
          DATABASE_ID!,
          MANAGEMENT_COLLECTION_ID!,
          (company.management[0] as any).$id,
          {
            name: management[0].name,
            email: management[0].email,
            phone: management[0].phone,
            location: management[0].location,
          }
        );
        updates.management = [managementDoc.$id];
      }

      // Update primary contact if changed
      if (changedFields.has("primaryContact") && primaryContacts[0]) {
        const contactDoc = await databases.updateDocument(
          DATABASE_ID!,
          PRIMARY_CONTACT_COLLECTION_ID!,
          (company.primaryContact[0] as any).$id,
          {
            name: primaryContacts[0].name,
            email: primaryContacts[0].email,
            phone: primaryContacts[0].phone,
            location: primaryContacts[0].location,
          }
        );
        updates.primaryContact = [contactDoc.$id];
      }

      // Update occupational safety if changed
      if (changedFields.has("occupationalSafety") && occupationalSafety[0]) {
        const safetyDoc = await databases.updateDocument(
          DATABASE_ID!,
          OCCUPATIONAL_SAFETY_COLLECTION_ID!,
          (company.occupationalSafety[0] as any).$id,
          {
            name: occupationalSafety[0].name,
            email: occupationalSafety[0].email,
            phone: occupationalSafety[0].phone,
            location: occupationalSafety[0].location,
          }
        );
        updates.occupationalSafety = [safetyDoc.$id];
      }

      // Update first aiders if changed
      if (changedFields.has("firstAiders") && firstAiders[0]) {
        const aiderDoc = await databases.updateDocument(
          DATABASE_ID!,
          FIRST_AIDERS_COLLECTION_ID!,
          (company.firstAiders[0] as any).$id,
          {
            name: firstAiders[0].name,
            email: firstAiders[0].email,
            phone: firstAiders[0].phone,
            location: firstAiders[0].location,
          }
        );
        updates.firstAiders = [aiderDoc.$id];
      }

      // Update safety officers if changed
      if (changedFields.has("safetyOfficers") && safetyOfficers[0]) {
        const officerDoc = await databases.updateDocument(
          DATABASE_ID!,
          SAFETY_OFFICERS_COLLECTION_ID!,
          (company.safetyOfficers[0] as any).$id,
          {
            name: safetyOfficers[0].name,
            email: safetyOfficers[0].email,
            phone: safetyOfficers[0].phone,
            location: safetyOfficers[0].location,
          }
        );
        updates.safetyOfficers = [officerDoc.$id];
      }

      // Update fire protection if changed
      if (changedFields.has("fireProtection") && fireProtection[0]) {
        const protectionDoc = await databases.updateDocument(
          DATABASE_ID!,
          FIRE_PROTECTION_COLLECTION_ID!,
          (company.fireProtection[0] as any).$id,
          {
            name: fireProtection[0].name,
            email: fireProtection[0].email,
            phone: fireProtection[0].phone,
            location: fireProtection[0].location,
          }
        );
        updates.fireProtection = [protectionDoc.$id];
      }

      // Update company doctors if changed
      if (changedFields.has("companyDoctors") && companyDoctors[0]) {
        const doctorDoc = await databases.updateDocument(
          DATABASE_ID!,
          COMPANY_DOCTORS_COLLECTION_ID!,
          (company.companyDoctors[0] as any).$id,
          {
            name: companyDoctors[0].name,
            email: companyDoctors[0].email,
            phone: companyDoctors[0].phone,
            location: companyDoctors[0].location,
          }
        );
        updates.companyDoctors = [doctorDoc.$id];
      }

      // Update responsible contact if changed
      if (changedFields.has("responsibleContact") && responsibleContact[0]) {
        const contactDoc = await databases.updateDocument(
          DATABASE_ID!,
          RESPONSIBLE_CONTACT_COLLECTION_ID!,
          (company.responsibleContact[0] as any).$id,
          {
            name: responsibleContact[0].name,
            email: responsibleContact[0].email,
            phone: responsibleContact[0].phone,
            location: responsibleContact[0].location,
          }
        );
        updates.responsibleContact = [contactDoc.$id];
      }

      // Update the company document with all changes
      if (Object.keys(updates).length > 0) {
        await onUpdate(company.$id, updates);
      }

      onClose();
    } catch (error) {
      console.error("Error updating company:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-[#000a14]">
        <DialogHeader className="sticky top-0 z-50 bg-[#000a14] pb-4">
          <DialogTitle className="font-poppins font-bold text-2xl text-[#f0f1f2] text-center mb-6">
            Edit Company Details
          </DialogTitle>
          <X
            className="absolute right-4 top-4 h-4 w-4 cursor-pointer text-white hover:text-gray-300"
            onClick={onClose}
          />
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-8 pb-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 font-poppins">
              <Label htmlFor="name" className="font-semibold text-[#ffffff]">
                Company Name
              </Label>
              <Input
                id="name"
                className="bg-gray-700 text-white"
                value={formData.name || ""}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2 font-poppins">
              <Label htmlFor="logo" className="font-semibold text-[#ffffff]">
                Logo URL
              </Label>
              <Input
                id="logo"
                className="bg-gray-700 text-white"
                value={formData.logo || ""}
                onChange={(e) => handleChange("logo", e.target.value)}
              />
            </div>
            <div className="space-y-2 font-poppins col-span-2">
              <Label
                htmlFor="description"
                className="font-semibold text-[#ffffff]"
              >
                Description
              </Label>
              <Textarea
                id="description"
                className="bg-gray-700 text-white"
                value={formData.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>
            <div className="space-y-2 font-poppins">
              <Label
                htmlFor="dealValue"
                className="font-semibold text-[#ffffff]"
              >
                Deal Value
              </Label>
              <Input
                id="dealValue"
                className="bg-gray-700 text-white"
                type="number"
                value={formData.dealValue || ""}
                onChange={(e) =>
                  handleChange("dealValue", parseFloat(e.target.value))
                }
              />
            </div>
          </div>
          <div className="space-y-6">
            <Label className="font-poppins text-white text-lg">Users</Label>
            <div className="p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-poppins text-white">Username</Label>
                  <Input
                    required
                    className="bg-gray-700 text-white font-poppins"
                    value={users[0]?.username || ""}
                    onChange={(e) => {
                      const newUsers = [...users];
                      newUsers[0] = {
                        ...(newUsers[0] || {}),
                        username: e.target.value,
                      };
                      setUsers(newUsers);
                      setChangedFields((prev) => new Set(prev).add("users"));
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Email</Label>
                  <Input
                    type="email"
                    required
                    className="bg-gray-700 text-white font-poppins"
                    value={users[0]?.email || ""}
                    onChange={(e) => {
                      const newUsers = [...users];
                      newUsers[0] = {
                        ...(newUsers[0] || {}),
                        email: e.target.value,
                      };
                      setUsers(newUsers);
                      setChangedFields((prev) => new Set(prev).add("users"));
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Label className="font-poppins text-white text-lg">Addresses</Label>
            <div className="p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-poppins text-white">Street</Label>
                  <Input
                    required
                    className="bg-gray-700 text-white font-poppins"
                    value={addresses[0]?.street || ""}
                    onChange={(e) => {
                      const newAddresses = [...addresses];
                      newAddresses[0] = {
                        ...(newAddresses[0] || {}),
                        street: e.target.value,
                      };
                      setAddresses(newAddresses);
                      setChangedFields((prev) =>
                        new Set(prev).add("addresses")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">City</Label>
                  <Input
                    required
                    className="bg-gray-700 text-white font-poppins"
                    value={addresses[0]?.city || ""}
                    onChange={(e) => {
                      const newAddresses = [...addresses];
                      newAddresses[0] = {
                        ...(newAddresses[0] || {}),
                        city: e.target.value,
                      };
                      setAddresses(newAddresses);
                      setChangedFields((prev) =>
                        new Set(prev).add("addresses")
                      );
                    }}
                  />
                </div>

                <div>
                  <Label className="font-poppins text-white">Postal Code</Label>
                  <Input
                    required
                    className="bg-gray-700 text-white font-poppins"
                    value={addresses[0]?.postalCode || ""}
                    onChange={(e) => {
                      const newAddresses = [...addresses];
                      newAddresses[0] = {
                        ...(newAddresses[0] || {}),
                        postalCode: e.target.value,
                      };
                      setAddresses(newAddresses);
                      setChangedFields((prev) =>
                        new Set(prev).add("addresses")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Country</Label>
                  <Input
                    required
                    className="bg-gray-700 text-white font-poppins"
                    value={addresses[0]?.country || ""}
                    onChange={(e) => {
                      const newAddresses = [...addresses];
                      newAddresses[0] = {
                        ...(newAddresses[0] || {}),
                        country: e.target.value,
                      };
                      setAddresses(newAddresses);
                      setChangedFields((prev) =>
                        new Set(prev).add("addresses")
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Label className="font-poppins text-white text-lg">
              Management
            </Label>
            <div className="p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-poppins text-white">Name</Label>
                  <Input
                    required
                    className="bg-gray-700 text-white font-poppins"
                    value={management[0]?.name || ""}
                    onChange={(e) => {
                      const newManagement = [...management];
                      newManagement[0] = {
                        ...(newManagement[0] || {}),
                        name: e.target.value,
                      };
                      setManagement(newManagement);
                      setChangedFields((prev) =>
                        new Set(prev).add("management")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Email</Label>
                  <Input
                    type="email"
                    className="bg-gray-700 text-white font-poppins"
                    value={management[0]?.email || ""}
                    onChange={(e) => {
                      const newManagement = [...management];
                      newManagement[0] = {
                        ...(newManagement[0] || {}),
                        email: e.target.value,
                      };
                      setManagement(newManagement);
                      setChangedFields((prev) =>
                        new Set(prev).add("management")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Phone</Label>
                  <Input
                    className="bg-gray-700 text-white font-poppins"
                    value={management[0]?.phone || ""}
                    onChange={(e) => {
                      const newManagement = [...management];
                      newManagement[0] = {
                        ...(newManagement[0] || {}),
                        phone: e.target.value,
                      };
                      setManagement(newManagement);
                      setChangedFields((prev) =>
                        new Set(prev).add("management")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Location</Label>
                  <Input
                    className="bg-gray-700 text-white font-poppins"
                    value={management[0]?.location || ""}
                    onChange={(e) => {
                      const newManagement = [...management];
                      newManagement[0] = {
                        ...(newManagement[0] || {}),
                        location: e.target.value,
                      };
                      setManagement(newManagement);
                      setChangedFields((prev) =>
                        new Set(prev).add("management")
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Label className="font-poppins text-white text-lg">
              Primary Contact
            </Label>
            <div className="p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-poppins text-white">Name</Label>
                  <Input
                    required
                    className="bg-gray-700 text-white font-poppins"
                    value={primaryContacts[0]?.name || ""}
                    onChange={(e) => {
                      const newPrimaryContacts = [...primaryContacts];
                      newPrimaryContacts[0] = {
                        ...(newPrimaryContacts[0] || {}),
                        name: e.target.value,
                      };
                      setPrimaryContacts(newPrimaryContacts);
                      setChangedFields((prev) =>
                        new Set(prev).add("primaryContact")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Email</Label>
                  <Input
                    type="email"
                    className="bg-gray-700 text-white font-poppins"
                    value={primaryContacts[0]?.email || ""}
                    onChange={(e) => {
                      const newPrimaryContacts = [...primaryContacts];
                      newPrimaryContacts[0] = {
                        ...(newPrimaryContacts[0] || {}),
                        email: e.target.value,
                      };
                      setPrimaryContacts(newPrimaryContacts);
                      setChangedFields((prev) =>
                        new Set(prev).add("primaryContact")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Phone</Label>
                  <Input
                    className="bg-gray-700 text-white font-poppins"
                    value={primaryContacts[0]?.phone || ""}
                    onChange={(e) => {
                      const newPrimaryContacts = [...primaryContacts];
                      newPrimaryContacts[0] = {
                        ...(newPrimaryContacts[0] || {}),
                        phone: e.target.value,
                      };
                      setPrimaryContacts(newPrimaryContacts);
                      setChangedFields((prev) =>
                        new Set(prev).add("primaryContact")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Location</Label>
                  <Input
                    className="bg-gray-700 text-white font-poppins"
                    value={primaryContacts[0]?.location || ""}
                    onChange={(e) => {
                      const newPrimaryContacts = [...primaryContacts];
                      newPrimaryContacts[0] = {
                        ...(newPrimaryContacts[0] || {}),
                        location: e.target.value,
                      };
                      setPrimaryContacts(newPrimaryContacts);
                      setChangedFields((prev) =>
                        new Set(prev).add("primaryContact")
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Label className="font-poppins text-white text-lg">
              Occupational Safety
            </Label>
            <div className="p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-poppins text-white">Name</Label>
                  <Input
                    required
                    className="bg-gray-700 text-white font-poppins"
                    value={occupationalSafety[0]?.name || ""}
                    onChange={(e) => {
                      const newOccupationalSafety = [...occupationalSafety];
                      newOccupationalSafety[0] = {
                        ...(newOccupationalSafety[0] || {}),
                        name: e.target.value,
                      };
                      setOccupationalSafety(newOccupationalSafety);
                      setChangedFields((prev) =>
                        new Set(prev).add("occupationalSafety")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Email</Label>
                  <Input
                    type="email"
                    className="bg-gray-700 text-white font-poppins"
                    value={occupationalSafety[0]?.email || ""}
                    onChange={(e) => {
                      const newOccupationalSafety = [...occupationalSafety];
                      newOccupationalSafety[0] = {
                        ...(newOccupationalSafety[0] || {}),
                        email: e.target.value,
                      };
                      setOccupationalSafety(newOccupationalSafety);
                      setChangedFields((prev) =>
                        new Set(prev).add("occupationalSafety")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Phone</Label>
                  <Input
                    className="bg-gray-700 text-white font-poppins"
                    value={occupationalSafety[0]?.phone || ""}
                    onChange={(e) => {
                      const newOccupationalSafety = [...occupationalSafety];
                      newOccupationalSafety[0] = {
                        ...(newOccupationalSafety[0] || {}),
                        phone: e.target.value,
                      };
                      setOccupationalSafety(newOccupationalSafety);
                      setChangedFields((prev) =>
                        new Set(prev).add("occupationalSafety")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Location</Label>
                  <Input
                    className="bg-gray-700 text-white font-poppins"
                    value={occupationalSafety[0]?.location || ""}
                    onChange={(e) => {
                      const newOccupationalSafety = [...occupationalSafety];
                      newOccupationalSafety[0] = {
                        ...(newOccupationalSafety[0] || {}),
                        location: e.target.value,
                      };
                      setOccupationalSafety(newOccupationalSafety);
                      setChangedFields((prev) =>
                        new Set(prev).add("occupationalSafety")
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Label className="font-poppins text-white text-lg">
              First Aiders
            </Label>
            <div className="p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-poppins text-white">Name</Label>
                  <Input
                    required
                    className="bg-gray-700 text-white font-poppins"
                    value={firstAiders[0]?.name || ""}
                    onChange={(e) => {
                      const newFirstAiders = [...firstAiders];
                      newFirstAiders[0] = {
                        ...(newFirstAiders[0] || {}),
                        name: e.target.value,
                      };
                      setFirstAiders(newFirstAiders);
                      setChangedFields((prev) =>
                        new Set(prev).add("firstAiders")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Email</Label>
                  <Input
                    type="email"
                    className="bg-gray-700 text-white font-poppins"
                    value={firstAiders[0]?.email || ""}
                    onChange={(e) => {
                      const newFirstAiders = [...firstAiders];
                      newFirstAiders[0] = {
                        ...(newFirstAiders[0] || {}),
                        email: e.target.value,
                      };
                      setFirstAiders(newFirstAiders);
                      setChangedFields((prev) =>
                        new Set(prev).add("firstAiders")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Phone</Label>
                  <Input
                    className="bg-gray-700 text-white font-poppins"
                    value={firstAiders[0]?.phone || ""}
                    onChange={(e) => {
                      const newFirstAiders = [...firstAiders];
                      newFirstAiders[0] = {
                        ...(newFirstAiders[0] || {}),
                        phone: e.target.value,
                      };
                      setFirstAiders(newFirstAiders);
                      setChangedFields((prev) =>
                        new Set(prev).add("firstAiders")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Location</Label>
                  <Input
                    className="bg-gray-700 text-white font-poppins"
                    value={firstAiders[0]?.location || ""}
                    onChange={(e) => {
                      const newFirstAiders = [...firstAiders];
                      newFirstAiders[0] = {
                        ...(newFirstAiders[0] || {}),
                        location: e.target.value,
                      };
                      setFirstAiders(newFirstAiders);
                      setChangedFields((prev) =>
                        new Set(prev).add("firstAiders")
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Label className="font-poppins text-white text-lg">
              Safety Officers
            </Label>
            <div className="p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-poppins text-white">Name</Label>
                  <Input
                    required
                    className="bg-gray-700 text-white font-poppins"
                    value={safetyOfficers[0]?.name || ""}
                    onChange={(e) => {
                      const newSafetyOfficers = [...safetyOfficers];
                      newSafetyOfficers[0] = {
                        ...(newSafetyOfficers[0] || {}),
                        name: e.target.value,
                      };
                      setSafetyOfficers(newSafetyOfficers);
                      setChangedFields((prev) =>
                        new Set(prev).add("safetyOfficers")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Email</Label>
                  <Input
                    type="email"
                    className="bg-gray-700 text-white font-poppins"
                    value={safetyOfficers[0]?.email || ""}
                    onChange={(e) => {
                      const newSafetyOfficers = [...safetyOfficers];
                      newSafetyOfficers[0] = {
                        ...(newSafetyOfficers[0] || {}),
                        email: e.target.value,
                      };
                      setSafetyOfficers(newSafetyOfficers);
                      setChangedFields((prev) =>
                        new Set(prev).add("safetyOfficers")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Phone</Label>
                  <Input
                    className="bg-gray-700 text-white font-poppins"
                    value={safetyOfficers[0]?.phone || ""}
                    onChange={(e) => {
                      const newSafetyOfficers = [...safetyOfficers];
                      newSafetyOfficers[0] = {
                        ...(newSafetyOfficers[0] || {}),
                        phone: e.target.value,
                      };
                      setSafetyOfficers(newSafetyOfficers);
                      setChangedFields((prev) =>
                        new Set(prev).add("safetyOfficers")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Location</Label>
                  <Input
                    className="bg-gray-700 text-white font-poppins"
                    value={safetyOfficers[0]?.location || ""}
                    onChange={(e) => {
                      const newSafetyOfficers = [...safetyOfficers];
                      newSafetyOfficers[0] = {
                        ...(newSafetyOfficers[0] || {}),
                        location: e.target.value,
                      };
                      setSafetyOfficers(newSafetyOfficers);
                      setChangedFields((prev) =>
                        new Set(prev).add("safetyOfficers")
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Label className="font-poppins text-white text-lg">
              Fire Protection
            </Label>
            <div className="p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-poppins text-white">Name</Label>
                  <Input
                    required
                    className="bg-gray-700 text-white font-poppins"
                    value={fireProtection[0]?.name || ""}
                    onChange={(e) => {
                      const newFireProtection = [...fireProtection];
                      newFireProtection[0] = {
                        ...(newFireProtection[0] || {}),
                        name: e.target.value,
                      };
                      setFireProtection(newFireProtection);
                      setChangedFields((prev) =>
                        new Set(prev).add("fireProtection")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Email</Label>
                  <Input
                    type="email"
                    className="bg-gray-700 text-white font-poppins"
                    value={fireProtection[0]?.email || ""}
                    onChange={(e) => {
                      const newFireProtection = [...fireProtection];
                      newFireProtection[0] = {
                        ...(newFireProtection[0] || {}),
                        email: e.target.value,
                      };
                      setFireProtection(newFireProtection);
                      setChangedFields((prev) =>
                        new Set(prev).add("fireProtection")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Phone</Label>
                  <Input
                    className="bg-gray-700 text-white font-poppins"
                    value={fireProtection[0]?.phone || ""}
                    onChange={(e) => {
                      const newFireProtection = [...fireProtection];
                      newFireProtection[0] = {
                        ...(newFireProtection[0] || {}),
                        phone: e.target.value,
                      };
                      setFireProtection(newFireProtection);
                      setChangedFields((prev) =>
                        new Set(prev).add("fireProtection")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Location</Label>
                  <Input
                    className="bg-gray-700 text-white font-poppins"
                    value={fireProtection[0]?.location || ""}
                    onChange={(e) => {
                      const newFireProtection = [...fireProtection];
                      newFireProtection[0] = {
                        ...(newFireProtection[0] || {}),
                        location: e.target.value,
                      };
                      setFireProtection(newFireProtection);
                      setChangedFields((prev) =>
                        new Set(prev).add("fireProtection")
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Label className="font-poppins text-white text-lg">
              Company Doctors
            </Label>
            <div className="p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-poppins text-white">Name</Label>
                  <Input
                    required
                    className="bg-gray-700 text-white font-poppins"
                    value={companyDoctors[0]?.name || ""}
                    onChange={(e) => {
                      const newCompanyDoctors = [...companyDoctors];
                      newCompanyDoctors[0] = {
                        ...(newCompanyDoctors[0] || {}),
                        name: e.target.value,
                      };
                      setCompanyDoctors(newCompanyDoctors);
                      setChangedFields((prev) =>
                        new Set(prev).add("companyDoctors")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Email</Label>
                  <Input
                    type="email"
                    className="bg-gray-700 text-white font-poppins"
                    value={companyDoctors[0]?.email || ""}
                    onChange={(e) => {
                      const newCompanyDoctors = [...companyDoctors];
                      newCompanyDoctors[0] = {
                        ...(newCompanyDoctors[0] || {}),
                        email: e.target.value,
                      };
                      setCompanyDoctors(newCompanyDoctors);
                      setChangedFields((prev) =>
                        new Set(prev).add("companyDoctors")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Phone</Label>
                  <Input
                    className="bg-gray-700 text-white font-poppins"
                    value={companyDoctors[0]?.phone || ""}
                    onChange={(e) => {
                      const newCompanyDoctors = [...companyDoctors];
                      newCompanyDoctors[0] = {
                        ...(newCompanyDoctors[0] || {}),
                        phone: e.target.value,
                      };
                      setCompanyDoctors(newCompanyDoctors);
                      setChangedFields((prev) =>
                        new Set(prev).add("companyDoctors")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Location</Label>
                  <Input
                    className="bg-gray-700 text-white font-poppins"
                    value={companyDoctors[0]?.location || ""}
                    onChange={(e) => {
                      const newCompanyDoctors = [...companyDoctors];
                      newCompanyDoctors[0] = {
                        ...(newCompanyDoctors[0] || {}),
                        location: e.target.value,
                      };
                      setCompanyDoctors(newCompanyDoctors);
                      setChangedFields((prev) =>
                        new Set(prev).add("companyDoctors")
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <Label className="font-poppins text-white text-lg">
              Responsible Contact
            </Label>
            <div className="p-4 border rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-poppins text-white">Name</Label>
                  <Input
                    required
                    className="bg-gray-700 text-white font-poppins"
                    value={responsibleContact[0]?.name || ""}
                    onChange={(e) => {
                      const newResponsibleContact = [...responsibleContact];
                      newResponsibleContact[0] = {
                        ...(newResponsibleContact[0] || {}),
                        name: e.target.value,
                      };
                      setResponsibleContact(newResponsibleContact);
                      setChangedFields((prev) =>
                        new Set(prev).add("responsibleContact")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Email</Label>
                  <Input
                    type="email"
                    className="bg-gray-700 text-white font-poppins"
                    value={responsibleContact[0]?.email || ""}
                    onChange={(e) => {
                      const newResponsibleContact = [...responsibleContact];
                      newResponsibleContact[0] = {
                        ...(newResponsibleContact[0] || {}),
                        email: e.target.value,
                      };
                      setResponsibleContact(newResponsibleContact);
                      setChangedFields((prev) =>
                        new Set(prev).add("responsibleContact")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Phone</Label>
                  <Input
                    className="bg-gray-700 text-white font-poppins"
                    value={responsibleContact[0]?.phone || ""}
                    onChange={(e) => {
                      const newResponsibleContact = [...responsibleContact];
                      newResponsibleContact[0] = {
                        ...(newResponsibleContact[0] || {}),
                        phone: e.target.value,
                      };
                      setResponsibleContact(newResponsibleContact);
                      setChangedFields((prev) =>
                        new Set(prev).add("responsibleContact")
                      );
                    }}
                  />
                </div>
                <div>
                  <Label className="font-poppins text-white">Location</Label>
                  <Input
                    className="bg-gray-700 text-white font-poppins"
                    value={responsibleContact[0]?.location || ""}
                    onChange={(e) => {
                      const newResponsibleContact = [...responsibleContact];
                      newResponsibleContact[0] = {
                        ...(newResponsibleContact[0] || {}),
                        location: e.target.value,
                      };
                      setResponsibleContact(newResponsibleContact);
                      setChangedFields((prev) =>
                        new Set(prev).add("responsibleContact")
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              onClick={onClose}
              className="bg-red-800 hover:bg-red-700 font-poppins font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || changedFields.size === 0}
              className="bg-green-800 hover:bg-green-700 font-poppins font-semibold"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Updating...
                </div>
              ) : (
                "Update Company"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
