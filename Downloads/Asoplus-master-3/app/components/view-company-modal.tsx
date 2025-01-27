"use client";

import { Company } from "@/app/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Address } from "@/app/types";
import { databases } from "../lib/appwrite-config";
import { User } from "@/app/types";

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const ADDRESSES_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_ADDRESSES_COLLECTION_ID;
const USERS_COLLECTION_ID =
  process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;

interface ViewCompanyModalProps {
  company: Company | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ViewCompanyModal({
  company,
  isOpen,
  onClose,
}: ViewCompanyModalProps) {
  if (!company) return null;

  const [addressesData, setAddressesData] = useState<Address[]>([]);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (company?.addresses) {
      const fetchAddresses = async () => {
        try {
          if (!company?.addresses || company.addresses.length === 0) return;

          const address = company.addresses[0];

          // If we already have the full address object, use it directly
          if (typeof address === "object" && (address as any).$id) {
            setAddressesData([address as Address]);
            return;
          }

          // Otherwise, fetch it using the ID string
          const addressDoc = await databases.getDocument(
            DATABASE_ID!,
            ADDRESSES_COLLECTION_ID!,
            address as string
          );

          setAddressesData([
            {
              $id: addressDoc.$id,
              street: addressDoc.street,
              city: addressDoc.city,
              postalCode: addressDoc.postalCode,
              country: addressDoc.country,
            },
          ]);
        } catch (error) {
          console.error("Error fetching address:", error);
        }
      };
      fetchAddresses();
    }
  }, [company]);

  useEffect(() => {
    if (company?.users) {
      const fetchUser = async () => {
        try {
          if (!company?.users) {
            console.log("No user data found");
            return;
          }

          if (Array.isArray(company.users)) {
            const userId = company.users[0];
            const userDoc = await databases.getDocument(
              DATABASE_ID!,
              USERS_COLLECTION_ID!,
              userId
            );
            setUserData({
              $id: userDoc.$id,
              username: userDoc.username,
              email: userDoc.email,
            });
          } else {
            const user = company.users as unknown as User;
            setUserData({
              $id: user.$id,
              username: user.username,
              email: user.email,
            });
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      };
      fetchUser();
    }
  }, [company]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto bg-[#FDF7F4]">
        <DialogHeader>
          <DialogTitle className="font-poppins font-bold text-2xl text-[#000a14]">
            Company Details
          </DialogTitle>
        </DialogHeader>

        {/* Company Basic Info */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative w-24 h-24 mb-2">
            <Image
              src={company.logo}
              alt={company.name}
              fill
              className="rounded-lg object-contain"
            />
          </div>
          <h2 className="text-xl font-semibold font-poppins">{company.name}</h2>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Address Section */}
            <div>
              <h3 className="text-lg font-semibold font-poppins mb-3 text-center">
                Address
              </h3>
              <div className="p-4 border rounded-lg">
                <div className="grid gap-2">
                  <div>
                    <span className="text-[#000a14] font-bold">Street: </span>
                    <span>{addressesData[0]?.street || ""}</span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">City: </span>
                    <span>{addressesData[0]?.city || ""}</span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">
                      Postal Code:{" "}
                    </span>
                    <span>{addressesData[0]?.postalCode || ""}</span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Country: </span>
                    <span>{addressesData[0]?.country || ""}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold font-poppins mb-3 text-center">
                Contact Info
              </h3>
              <div className="p-4 border rounded-lg">
                <div className="grid gap-[0.5rem] m-auto">
                  <div className="pt-8">
                    <span className="text-[#000a14] font-bold">Username: </span>
                    <span>{userData?.username || ""}</span>
                  </div>
                  <div className="pb-8">
                    <span className="text-[#000a14] font-bold">Email: </span>
                    <span>{userData?.email || ""}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Management */}
            <div>
              <h3 className="text-lg font-semibold font-poppins mb-3 text-center">
                Management
              </h3>
              <div className="p-4 border rounded-lg">
                <div className="grid gap-2">
                  <div>
                    <span className="text-[#000a14] font-bold">Name: </span>
                    <span>{(company.management?.[0] as any)?.name || ""}</span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Email: </span>
                    <span>{(company.management?.[0] as any)?.email || ""}</span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Phone: </span>
                    <span>{(company.management?.[0] as any)?.phone || ""}</span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Location: </span>
                    <span>
                      {(company.management?.[0] as any)?.location || ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Safety Officers */}
            <div>
              <h3 className="text-lg font-semibold font-poppins mb-3 text-center">
                Safety Officers
              </h3>
              <div className="p-4 border rounded-lg">
                <div className="grid gap-2">
                  <div>
                    <span className="text-[#000a14] font-bold">Name: </span>
                    <span>
                      {(company.safetyOfficers?.[0] as any)?.name || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Email: </span>
                    <span>
                      {(company.safetyOfficers?.[0] as any)?.email || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Phone: </span>
                    <span>
                      {(company.safetyOfficers?.[0] as any)?.phone || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Location: </span>
                    <span>
                      {(company.safetyOfficers?.[0] as any)?.location || ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fire Protection */}
            <div>
              <h3 className="text-lg font-semibold font-poppins mb-3 text-center">
                Fire Protection
              </h3>
              <div className="p-4 border rounded-lg">
                <div className="grid gap-2">
                  <div>
                    <span className="text-[#000a14] font-bold">Name: </span>
                    <span>
                      {(company.fireProtection?.[0] as any)?.name || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Email: </span>
                    <span>
                      {(company.fireProtection?.[0] as any)?.email || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Phone: </span>
                    <span>
                      {(company.fireProtection?.[0] as any)?.phone || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Location: </span>
                    <span>
                      {(company.fireProtection?.[0] as any)?.location || ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Primary Contact */}
            <div>
              <h3 className="text-lg font-semibold font-poppins mb-3 text-center">
                Primary Contact
              </h3>
              <div className="p-4 border rounded-lg">
                <div className="grid gap-2">
                  <div>
                    <span className="text-[#000a14] font-bold">Name: </span>
                    <span>
                      {(company.primaryContact?.[0] as any)?.name || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Email: </span>
                    <span>
                      {(company.primaryContact?.[0] as any)?.email || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Phone: </span>
                    <span>
                      {(company.primaryContact?.[0] as any)?.phone || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Location: </span>
                    <span>
                      {(company.primaryContact?.[0] as any)?.location || ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Occupational Safety */}
            <div>
              <h3 className="text-lg font-semibold font-poppins mb-3 text-center">
                Occupational Safety
              </h3>
              <div className="p-4 border rounded-lg">
                <div className="grid gap-2">
                  <div>
                    <span className="text-[#000a14] font-bold">Name: </span>
                    <span>
                      {(company.occupationalSafety?.[0] as any)?.name || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Email: </span>
                    <span>
                      {(company.occupationalSafety?.[0] as any)?.email || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Phone: </span>
                    <span>
                      {(company.occupationalSafety?.[0] as any)?.phone || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Location: </span>
                    <span>
                      {(company.occupationalSafety?.[0] as any)?.location || ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* First Aiders */}
            <div>
              <h3 className="text-lg font-semibold font-poppins mb-3 text-center">
                First Aiders
              </h3>
              <div className="p-4 border rounded-lg">
                <div className="grid gap-2">
                  <div>
                    <span className="text-[#000a14] font-bold">Name: </span>
                    <span>{(company.firstAiders?.[0] as any)?.name || ""}</span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Email: </span>
                    <span>
                      {(company.firstAiders?.[0] as any)?.email || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Phone: </span>
                    <span>
                      {(company.firstAiders?.[0] as any)?.phone || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Location: </span>
                    <span>
                      {(company.firstAiders?.[0] as any)?.location || ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Company Doctors */}
            <div>
              <h3 className="text-lg font-semibold font-poppins mb-3 text-center">
                Company Doctors
              </h3>
              <div className="p-4 border rounded-lg">
                <div className="grid gap-2">
                  <div>
                    <span className="text-[#000a14] font-bold">Name: </span>
                    <span>
                      {(company.companyDoctors?.[0] as any)?.name || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Email: </span>
                    <span>
                      {(company.companyDoctors?.[0] as any)?.email || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Phone: </span>
                    <span>
                      {(company.companyDoctors?.[0] as any)?.phone || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Location: </span>
                    <span>
                      {(company.companyDoctors?.[0] as any)?.location || ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Responsible Contact */}
            <div>
              <h3 className="text-lg font-semibold font-poppins mb-3 text-center">
                Responsible Contact
              </h3>
              <div className="p-4 border rounded-lg">
                <div className="grid gap-2">
                  <div>
                    <span className="text-[#000a14] font-bold">Name: </span>
                    <span>
                      {(company.responsibleContact?.[0] as any)?.name || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Email: </span>
                    <span>
                      {(company.responsibleContact?.[0] as any)?.email || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Phone: </span>
                    <span>
                      {(company.responsibleContact?.[0] as any)?.phone || ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#000a14] font-bold">Location: </span>
                    <span>
                      {(company.responsibleContact?.[0] as any)?.location || ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper component for contact information with consistent layout
const ContactInfo = ({ contact }: { contact: any }) => (
  <div className="grid gap-2">
    <div>
      <span className="text-[#000a14] font-bold">Name: </span>
      <span>{contact?.name || ""}</span>
    </div>
    <div>
      <span className="text-[#000a14] font-bold">Email: </span>
      <span>{contact?.email || ""}</span>
    </div>
    <div>
      <span className="text-[#000a14] font-bold">Phone: </span>
      <span>{contact?.phone || ""}</span>
    </div>
    <div>
      <span className="text-[#000a14] font-bold">Location: </span>
      <span>{contact?.location || ""}</span>
    </div>
  </div>
);
