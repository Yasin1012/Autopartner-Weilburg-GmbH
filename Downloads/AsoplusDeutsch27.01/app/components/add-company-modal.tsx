"use client";

import { useState } from "react";
import { Company, Address } from "@/app/types";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { databases, ID } from "@/app/lib/appwrite-config";
import { toast } from "@/app/hooks/use-toast";

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

interface AddCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

interface Management {
  name: string;
  email?: string;
  phone?: string;
  location?: string;
}

interface PrimaryContact {
  name: string;
  email?: string;
  phone?: string;
  location?: string;
}

export function AddCompanyModal({
  isOpen,
  onClose,
  onSuccess,
}: AddCompanyModalProps) {
  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Omit<Address, "$id">[]>([
    {
      street: "",
      postalCode: "",
      city: "",
      country: "",
    },
  ]);
  const [companyData, setCompanyData] = useState({
    logo: "",
    name: "",
    description: "",
    dealValue: 0,
    username: "",
    email: "",
  });

  const [management, setManagement] = useState<Management[]>([
    { name: "", email: "", phone: "", location: "" },
  ]);

  const [primaryContacts, setPrimaryContacts] = useState<PrimaryContact[]>([
    { name: "", email: "", phone: "", location: "" },
  ]);

  const [occupationalSafety, setOccupationalSafety] = useState([
    { name: "", email: "", phone: "", location: "" },
  ]);

  const [firstAiders, setFirstAiders] = useState([
    { name: "", email: "", phone: "", location: "" },
  ]);

  const [safetyOfficers, setSafetyOfficers] = useState([
    { name: "", email: "", phone: "", location: "" },
  ]);

  const [fireProtection, setFireProtection] = useState([
    { name: "", email: "", phone: "", location: "" },
  ]);

  const [companyDoctors, setCompanyDoctors] = useState([
    { name: "", email: "", phone: "", location: "" },
  ]);

  const [responsibleContact, setResponsibleContact] = useState([
    { name: "", email: "", phone: "", location: "" },
  ]);

  const addAddressField = () => {
    setAddresses([
      ...addresses,
      { street: "", postalCode: "", city: "", country: "" },
    ]);
  };

  const removeAddressField = (index: number) => {
    setAddresses(addresses.filter((_, i) => i !== index));
  };

  const updateAddress = (
    index: number,
    field: keyof Address,
    value: string
  ) => {
    const newAddresses = [...addresses];
    newAddresses[index] = { ...newAddresses[index], [field]: value };
    setAddresses(newAddresses);
  };

  const addManagement = () => {
    setManagement([
      ...management,
      { name: "", email: "", phone: "", location: "" },
    ]);
  };

  const removeManagement = (index: number) => {
    setManagement(management.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const addressPromises = addresses.map((address) =>
        databases.createDocument(
          DATABASE_ID!,
          ADDRESSES_COLLECTION_ID!,
          ID.unique(),
          address
        )
      );
      const createdAddresses = await Promise.all(addressPromises);

      const user = await databases.createDocument(
        DATABASE_ID!,
        USERS_COLLECTION_ID!,
        ID.unique(),
        {
          username: companyData.username,
          email: companyData.email,
        }
      );

      // Create documents for each section using their respective collection IDs
      const managementPromises = management.map((item) =>
        databases.createDocument(
          DATABASE_ID!,
          MANAGEMENT_COLLECTION_ID!,
          ID.unique(),
          item
        )
      );

      const primaryContactPromises = primaryContacts.map((item) =>
        databases.createDocument(
          DATABASE_ID!,
          PRIMARY_CONTACT_COLLECTION_ID!,
          ID.unique(),
          item
        )
      );

      const occupationalSafetyPromises = occupationalSafety.map((item) =>
        databases.createDocument(
          DATABASE_ID!,
          OCCUPATIONAL_SAFETY_COLLECTION_ID!,
          ID.unique(),
          item
        )
      );

      const firstAidersPromises = firstAiders.map((item) =>
        databases.createDocument(
          DATABASE_ID!,
          FIRST_AIDERS_COLLECTION_ID!,
          ID.unique(),
          item
        )
      );

      const safetyOfficersPromises = safetyOfficers.map((item) =>
        databases.createDocument(
          DATABASE_ID!,
          SAFETY_OFFICERS_COLLECTION_ID!,
          ID.unique(),
          item
        )
      );

      const fireProtectionPromises = fireProtection.map((item) =>
        databases.createDocument(
          DATABASE_ID!,
          FIRE_PROTECTION_COLLECTION_ID!,
          ID.unique(),
          item
        )
      );

      const companyDoctorsPromises = companyDoctors.map((item) =>
        databases.createDocument(
          DATABASE_ID!,
          COMPANY_DOCTORS_COLLECTION_ID!,
          ID.unique(),
          item
        )
      );

      const responsibleContactPromises = responsibleContact.map((item) =>
        databases.createDocument(
          DATABASE_ID!,
          RESPONSIBLE_CONTACT_COLLECTION_ID!,
          ID.unique(),
          item
        )
      );

      // Wait for all documents to be created
      const [
        managementDocs,
        primaryContactDocs,
        occupationalSafetyDocs,
        firstAidersDocs,
        safetyOfficersDocs,
        fireProtectionDocs,
        companyDoctorsDocs,
        responsibleContactDocs,
      ] = await Promise.all([
        Promise.all(managementPromises),
        Promise.all(primaryContactPromises),
        Promise.all(occupationalSafetyPromises),
        Promise.all(firstAidersPromises),
        Promise.all(safetyOfficersPromises),
        Promise.all(fireProtectionPromises),
        Promise.all(companyDoctorsPromises),
        Promise.all(responsibleContactPromises),
      ]);

      // Create the company document with all relationships
      await databases.createDocument(
        DATABASE_ID!,
        COMPANIES_COLLECTION_ID!,
        ID.unique(),
        {
          logo: companyData.logo,
          name: companyData.name,
          description: companyData.description,
          dealValue: companyData.dealValue,
          addresses: createdAddresses.map((addr) => addr.$id),
          users: user.$id,
          management: managementDocs.map((doc) => doc.$id),
          primaryContact: primaryContactDocs.map((doc) => doc.$id),
          occupationalSafety: occupationalSafetyDocs.map((doc) => doc.$id),
          firstAiders: firstAidersDocs.map((doc) => doc.$id),
          safetyOfficers: safetyOfficersDocs.map((doc) => doc.$id),
          fireProtection: fireProtectionDocs.map((doc) => doc.$id),
          companyDoctors: companyDoctorsDocs.map((doc) => doc.$id),
          responsibleContact: responsibleContactDocs.map((doc) => doc.$id),
          version: 1,
        }
      );

      toast({
        title: "Success",
        description: "Company added successfully",
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error details:", error);
      toast({
        title: "Error",
        description: "Failed to add company",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col p-0 bg-[#000a14]">
        <DialogHeader className="p-6 pb-2 stroke-white ">
          <DialogTitle className="font-poppins text-center text-white">
            Add New Company
          </DialogTitle>
          <X
            className="absolute right-4 top-4 h-4 w-4 cursor-pointer text-white hover:text-gray-300"
            onClick={onClose}
          />
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1">
          <div
            className="flex-1 overflow-y-auto px-6 py-4 space-y-6 [&::-webkit-scrollbar]:w-2
            [&::-webkit-scrollbar-track]:rounded-full
            [&::-webkit-scrollbar-track]:bg-gray-100
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-300
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
          >
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <Label htmlFor="logo" className="font-poppins text-white">
                  Logo URL
                </Label>
                <Input
                  id="logo"
                  value={companyData.logo}
                  className="bg-gray-700 text-white font-poppins"
                  onChange={(e) =>
                    setCompanyData({ ...companyData, logo: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="name" className="font-poppins text-white">
                  Company Name
                </Label>
                <Input
                  id="name"
                  required
                  className="bg-gray-700 text-white font-poppins"
                  value={companyData.name}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, name: e.target.value })
                  }
                />
              </div>
              <div className="col-span-2">
                <Label
                  htmlFor="description"
                  className="font-poppins text-white"
                >
                  Description
                </Label>
                <Textarea
                  id="description"
                  required
                  className="bg-gray-700 text-white font-poppins"
                  value={companyData.description}
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="dealValue" className="font-poppins text-white">
                  Deal Value
                </Label>
                <Input
                  id="dealValue"
                  type="number"
                  required
                  className="bg-gray-700 text-white font-poppins"
                  value={companyData.dealValue}
                  onChange={(e) =>
                    setCompanyData({
                      ...companyData,
                      dealValue: Number(e.target.value),
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="username" className="font-poppins text-white">
                  Username
                </Label>
                <Input
                  id="username"
                  required
                  className="bg-gray-700 text-white font-poppins"
                  value={companyData.username}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, username: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="email" className="font-poppins text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  required
                  className="bg-gray-700 text-white font-poppins"
                  value={companyData.email}
                  onChange={(e) =>
                    setCompanyData({ ...companyData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="font-poppins text-white">Addresses</Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAddressField}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Address
                </Button>
              </div>
              {addresses.map((address, index) => (
                <div key={index} className="p-4 border rounded-lg relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-2 hover:bg-red-600"
                    onClick={() => removeAddressField(index)}
                  >
                    <X className="h-4 w-4 text-white hover:text-black" />
                  </Button>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-poppins text-white">Street</Label>
                      <Input
                        required
                        className="bg-gray-700 text-white font-poppins"
                        value={address.street}
                        onChange={(e) =>
                          updateAddress(index, "street", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label className="font-poppins text-white">
                        Postal Code
                      </Label>
                      <Input
                        required
                        className="bg-gray-700 text-white font-poppins"
                        value={address.postalCode}
                        onChange={(e) =>
                          updateAddress(index, "postalCode", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label className="font-poppins text-white">City</Label>
                      <Input
                        required
                        className="bg-gray-700 text-white font-poppins"
                        value={address.city}
                        onChange={(e) =>
                          updateAddress(index, "city", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label className="font-poppins text-white">Country</Label>
                      <Input
                        className="bg-gray-700 text-white font-poppins"
                        value={address.country}
                        onChange={(e) =>
                          updateAddress(index, "country", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-poppins text-white">Management</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addManagement}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Management
                  </Button>
                </div>

                {management.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 hover:bg-red-600"
                      onClick={() => removeManagement(index)}
                    >
                      <X className="h-4 w-4 text-white hover:text-black" />
                    </Button>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="font-poppins text-white">Name</Label>
                        <Input
                          required
                          className="bg-gray-700 text-white font-poppins"
                          value={item.name}
                          onChange={(e) => {
                            const newManagement = [...management];
                            newManagement[index] = {
                              ...item,
                              name: e.target.value,
                            };
                            setManagement(newManagement);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">Email</Label>
                        <Input
                          type="email"
                          className="bg-gray-700 text-white font-poppins"
                          value={item.email}
                          onChange={(e) => {
                            const newManagement = [...management];
                            newManagement[index] = {
                              ...item,
                              email: e.target.value,
                            };
                            setManagement(newManagement);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">Phone</Label>
                        <Input
                          className="bg-gray-700 text-white font-poppins"
                          value={item.phone}
                          onChange={(e) => {
                            const newManagement = [...management];
                            newManagement[index] = {
                              ...item,
                              phone: e.target.value,
                            };
                            setManagement(newManagement);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">
                          Location
                        </Label>
                        <Input
                          className="bg-gray-700 text-white font-poppins"
                          value={item.location}
                          onChange={(e) => {
                            const newManagement = [...management];
                            newManagement[index] = {
                              ...item,
                              location: e.target.value,
                            };
                            setManagement(newManagement);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-poppins text-white">
                    Primary Contact
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setPrimaryContacts([
                        ...primaryContacts,
                        { name: "", email: "", phone: "", location: "" },
                      ])
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Primary Contact
                  </Button>
                </div>

                {primaryContacts.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 hover:bg-red-600"
                      onClick={() => {
                        const newPrimaryContacts = [...primaryContacts];
                        newPrimaryContacts.splice(index, 1);
                        setPrimaryContacts(newPrimaryContacts);
                      }}
                    >
                      <X className="h-4 w-4 text-white hover:text-black" />
                    </Button>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="font-poppins text-white">Name</Label>
                        <Input
                          required
                          className="bg-gray-700 text-white font-poppins"
                          value={item.name}
                          onChange={(e) => {
                            const newPrimaryContacts = [...primaryContacts];
                            newPrimaryContacts[index] = {
                              ...item,
                              name: e.target.value,
                            };
                            setPrimaryContacts(newPrimaryContacts);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">Email</Label>
                        <Input
                          type="email"
                          className="bg-gray-700 text-white font-poppins"
                          value={item.email}
                          onChange={(e) => {
                            const newPrimaryContacts = [...primaryContacts];
                            newPrimaryContacts[index] = {
                              ...item,
                              email: e.target.value,
                            };
                            setPrimaryContacts(newPrimaryContacts);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">Phone</Label>
                        <Input
                          className="bg-gray-700 text-white font-poppins"
                          value={item.phone}
                          onChange={(e) => {
                            const newPrimaryContacts = [...primaryContacts];
                            newPrimaryContacts[index] = {
                              ...item,
                              phone: e.target.value,
                            };
                            setPrimaryContacts(newPrimaryContacts);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">
                          Location
                        </Label>
                        <Input
                          className="bg-gray-700 text-white font-poppins"
                          value={item.location}
                          onChange={(e) => {
                            const newPrimaryContacts = [...primaryContacts];
                            newPrimaryContacts[index] = {
                              ...item,
                              location: e.target.value,
                            };
                            setPrimaryContacts(newPrimaryContacts);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Occupational Safety Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-poppins text-white">
                    Occupational Safety Specialist
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setOccupationalSafety([
                        ...occupationalSafety,
                        { name: "", email: "", phone: "", location: "" },
                      ])
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Specialist
                  </Button>
                </div>

                {occupationalSafety.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 hover:bg-red-600"
                      onClick={() =>
                        setOccupationalSafety(
                          occupationalSafety.filter((_, i) => i !== index)
                        )
                      }
                    >
                      <X className="h-4 w-4 text-white hover:text-black" />
                    </Button>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="font-poppins text-white">Name</Label>
                        <Input
                          required
                          className="bg-gray-700 text-white font-poppins"
                          value={item.name}
                          onChange={(e) => {
                            const newOccupationalSafety = [
                              ...occupationalSafety,
                            ];
                            newOccupationalSafety[index] = {
                              ...item,
                              name: e.target.value,
                            };
                            setOccupationalSafety(newOccupationalSafety);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">Email</Label>
                        <Input
                          type="email"
                          className="bg-gray-700 text-white font-poppins"
                          value={item.email}
                          onChange={(e) => {
                            const newOccupationalSafety = [
                              ...occupationalSafety,
                            ];
                            newOccupationalSafety[index] = {
                              ...item,
                              email: e.target.value,
                            };
                            setOccupationalSafety(newOccupationalSafety);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">Phone</Label>
                        <Input
                          className="bg-gray-700 text-white font-poppins"
                          value={item.phone}
                          onChange={(e) => {
                            const newOccupationalSafety = [
                              ...occupationalSafety,
                            ];
                            newOccupationalSafety[index] = {
                              ...item,
                              phone: e.target.value,
                            };
                            setOccupationalSafety(newOccupationalSafety);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">
                          Location
                        </Label>
                        <Input
                          className="bg-gray-700 text-white font-poppins"
                          value={item.location}
                          onChange={(e) => {
                            const newOccupationalSafety = [
                              ...occupationalSafety,
                            ];
                            newOccupationalSafety[index] = {
                              ...item,
                              location: e.target.value,
                            };
                            setOccupationalSafety(newOccupationalSafety);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* First Aiders Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-poppins text-white">
                    First Aiders
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFirstAiders([
                        ...firstAiders,
                        { name: "", email: "", phone: "", location: "" },
                      ])
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add First Aider
                  </Button>
                </div>

                {firstAiders.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 hover:bg-red-600"
                      onClick={() =>
                        setFirstAiders(
                          firstAiders.filter((_, i) => i !== index)
                        )
                      }
                    >
                      <X className="h-4 w-4 text-white hover:text-black" />
                    </Button>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="font-poppins text-white">Name</Label>
                        <Input
                          required
                          className="bg-gray-700 text-white font-poppins"
                          value={item.name}
                          onChange={(e) => {
                            const newFirstAiders = [...firstAiders];
                            newFirstAiders[index] = {
                              ...item,
                              name: e.target.value,
                            };
                            setFirstAiders(newFirstAiders);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">Email</Label>
                        <Input
                          type="email"
                          className="bg-gray-700 text-white font-poppins"
                          value={item.email}
                          onChange={(e) => {
                            const newFirstAiders = [...firstAiders];
                            newFirstAiders[index] = {
                              ...item,
                              email: e.target.value,
                            };
                            setFirstAiders(newFirstAiders);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">Phone</Label>
                        <Input
                          className="bg-gray-700 text-white font-poppins"
                          value={item.phone}
                          onChange={(e) => {
                            const newFirstAiders = [...firstAiders];
                            newFirstAiders[index] = {
                              ...item,
                              phone: e.target.value,
                            };
                            setFirstAiders(newFirstAiders);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">
                          Location
                        </Label>
                        <Input
                          className="bg-gray-700 text-white font-poppins"
                          value={item.location}
                          onChange={(e) => {
                            const newFirstAiders = [...firstAiders];
                            newFirstAiders[index] = {
                              ...item,
                              location: e.target.value,
                            };
                            setFirstAiders(newFirstAiders);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Safety Officers Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-poppins text-white">
                    Safety Officers
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSafetyOfficers([
                        ...safetyOfficers,
                        { name: "", email: "", phone: "", location: "" },
                      ])
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Safety Officer
                  </Button>
                </div>

                {safetyOfficers.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 hover:bg-red-600"
                      onClick={() =>
                        setSafetyOfficers(
                          safetyOfficers.filter((_, i) => i !== index)
                        )
                      }
                    >
                      <X className="h-4 w-4 text-white hover:text-black" />
                    </Button>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="font-poppins text-white">Name</Label>
                        <Input
                          required
                          className="bg-gray-700 text-white font-poppins"
                          value={item.name}
                          onChange={(e) => {
                            const newSafetyOfficers = [...safetyOfficers];
                            newSafetyOfficers[index] = {
                              ...item,
                              name: e.target.value,
                            };
                            setSafetyOfficers(newSafetyOfficers);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">Email</Label>
                        <Input
                          type="email"
                          className="bg-gray-700 text-white font-poppins"
                          value={item.email}
                          onChange={(e) => {
                            const newSafetyOfficers = [...safetyOfficers];
                            newSafetyOfficers[index] = {
                              ...item,
                              email: e.target.value,
                            };
                            setSafetyOfficers(newSafetyOfficers);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">Phone</Label>
                        <Input
                          className="bg-gray-700 text-white font-poppins"
                          value={item.phone}
                          onChange={(e) => {
                            const newSafetyOfficers = [...safetyOfficers];
                            newSafetyOfficers[index] = {
                              ...item,
                              phone: e.target.value,
                            };
                            setSafetyOfficers(newSafetyOfficers);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">
                          Location
                        </Label>
                        <Input
                          className="bg-gray-700 text-white font-poppins"
                          value={item.location}
                          onChange={(e) => {
                            const newSafetyOfficers = [...safetyOfficers];
                            newSafetyOfficers[index] = {
                              ...item,
                              location: e.target.value,
                            };
                            setSafetyOfficers(newSafetyOfficers);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Fire Protection Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-poppins text-white">
                    Fire Protection Assistants
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setFireProtection([
                        ...fireProtection,
                        { name: "", email: "", phone: "", location: "" },
                      ])
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Assistant
                  </Button>
                </div>

                {fireProtection.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 hover:bg-red-600"
                      onClick={() =>
                        setFireProtection(
                          fireProtection.filter((_, i) => i !== index)
                        )
                      }
                    >
                      <X className="h-4 w-4 text-white hover:text-black" />
                    </Button>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="font-poppins text-white">Name</Label>
                        <Input
                          required
                          className="bg-gray-700 text-white font-poppins"
                          value={item.name}
                          onChange={(e) => {
                            const newFireProtection = [...fireProtection];
                            newFireProtection[index] = {
                              ...item,
                              name: e.target.value,
                            };
                            setFireProtection(newFireProtection);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">Email</Label>
                        <Input
                          type="email"
                          className="bg-gray-700 text-white font-poppins"
                          value={item.email}
                          onChange={(e) => {
                            const newFireProtection = [...fireProtection];
                            newFireProtection[index] = {
                              ...item,
                              email: e.target.value,
                            };
                            setFireProtection(newFireProtection);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">Phone</Label>
                        <Input
                          className="bg-gray-700 text-white font-poppins"
                          value={item.phone}
                          onChange={(e) => {
                            const newFireProtection = [...fireProtection];
                            newFireProtection[index] = {
                              ...item,
                              phone: e.target.value,
                            };
                            setFireProtection(newFireProtection);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">
                          Location
                        </Label>
                        <Input
                          className="bg-gray-700 text-white font-poppins"
                          value={item.location}
                          onChange={(e) => {
                            const newFireProtection = [...fireProtection];
                            newFireProtection[index] = {
                              ...item,
                              location: e.target.value,
                            };
                            setFireProtection(newFireProtection);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Company Doctors Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-poppins text-white">
                    Company Doctors
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setCompanyDoctors([
                        ...companyDoctors,
                        { name: "", email: "", phone: "", location: "" },
                      ])
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Doctor
                  </Button>
                </div>

                {companyDoctors.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 hover:bg-red-600"
                      onClick={() =>
                        setCompanyDoctors(
                          companyDoctors.filter((_, i) => i !== index)
                        )
                      }
                    >
                      <X className="h-4 w-4 text-white hover:text-black" />
                    </Button>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="font-poppins text-white">Name</Label>
                        <Input
                          required
                          className="bg-gray-700 text-white font-poppins"
                          value={item.name}
                          onChange={(e) => {
                            const newCompanyDoctors = [...companyDoctors];
                            newCompanyDoctors[index] = {
                              ...item,
                              name: e.target.value,
                            };
                            setCompanyDoctors(newCompanyDoctors);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">Email</Label>
                        <Input
                          type="email"
                          className="bg-gray-700 text-white font-poppins"
                          value={item.email}
                          onChange={(e) => {
                            const newCompanyDoctors = [...companyDoctors];
                            newCompanyDoctors[index] = {
                              ...item,
                              email: e.target.value,
                            };
                            setCompanyDoctors(newCompanyDoctors);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">Phone</Label>
                        <Input
                          className="bg-gray-700 text-white font-poppins"
                          value={item.phone}
                          onChange={(e) => {
                            const newCompanyDoctors = [...companyDoctors];
                            newCompanyDoctors[index] = {
                              ...item,
                              phone: e.target.value,
                            };
                            setCompanyDoctors(newCompanyDoctors);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">
                          Location
                        </Label>
                        <Input
                          className="bg-gray-700 text-white font-poppins"
                          value={item.location}
                          onChange={(e) => {
                            const newCompanyDoctors = [...companyDoctors];
                            newCompanyDoctors[index] = {
                              ...item,
                              location: e.target.value,
                            };
                            setCompanyDoctors(newCompanyDoctors);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Responsible Contact Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="font-poppins text-white">
                    Responsible Contacts
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setResponsibleContact([
                        ...responsibleContact,
                        { name: "", email: "", phone: "", location: "" },
                      ])
                    }
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Contact
                  </Button>
                </div>

                {responsibleContact.map((item, index) => (
                  <div key={index} className="p-4 border rounded-lg relative">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-2 hover:bg-red-600"
                      onClick={() =>
                        setResponsibleContact(
                          responsibleContact.filter((_, i) => i !== index)
                        )
                      }
                    >
                      <X className="h-4 w-4 text-white hover:text-black" />
                    </Button>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="font-poppins text-white">Name</Label>
                        <Input
                          required
                          className="bg-gray-700 text-white font-poppins"
                          value={item.name}
                          onChange={(e) => {
                            const newResponsibleContact = [
                              ...responsibleContact,
                            ];
                            newResponsibleContact[index] = {
                              ...item,
                              name: e.target.value,
                            };
                            setResponsibleContact(newResponsibleContact);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">Email</Label>
                        <Input
                          type="email"
                          className="bg-gray-700 text-white font-poppins"
                          value={item.email}
                          onChange={(e) => {
                            const newResponsibleContact = [
                              ...responsibleContact,
                            ];
                            newResponsibleContact[index] = {
                              ...item,
                              email: e.target.value,
                            };
                            setResponsibleContact(newResponsibleContact);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">Phone</Label>
                        <Input
                          className="bg-gray-700 text-white font-poppins"
                          value={item.phone}
                          onChange={(e) => {
                            const newResponsibleContact = [
                              ...responsibleContact,
                            ];
                            newResponsibleContact[index] = {
                              ...item,
                              phone: e.target.value,
                            };
                            setResponsibleContact(newResponsibleContact);
                          }}
                        />
                      </div>
                      <div>
                        <Label className="font-poppins text-white">
                          Location
                        </Label>
                        <Input
                          className="bg-gray-700 text-white font-poppins"
                          value={item.location}
                          onChange={(e) => {
                            const newResponsibleContact = [
                              ...responsibleContact,
                            ];
                            newResponsibleContact[index] = {
                              ...item,
                              location: e.target.value,
                            };
                            setResponsibleContact(newResponsibleContact);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="p-6 flex gap-3">
            <Button
              type="button"
              onClick={onClose}
              className="bg-red-800 hover:bg-red-700 font-poppins font-medium"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-green-800 hover:bg-green-700 font-poppins font-semibold"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating...
                </div>
              ) : (
                "Create Company"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
