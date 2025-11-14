"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// components
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Trash, Plus, CreditCard, User, Building } from "lucide-react";

// api
import {
  getBanks,
  postBank,
  editBankInformation,
  deleteBankInformation,
} from "@/services/worker/workersBankInformation";

interface Bank {
  _id: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
}

interface BankFormData {
  bankName: string;
  accountName: string;
  accountNumber: string;
}

const BankInformation = () => {
  const queryClient = useQueryClient();

  const {
    data: banksData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["banks"],
    queryFn: getBanks,
  });

  const [selectedBank, setSelectedBank] = useState<Bank | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<BankFormData>({
    bankName: "",
    accountName: "",
    accountNumber: "",
  });

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add or edit mutation
  const saveBankMutation = useMutation({
    mutationFn: async (data: BankFormData) => {
      if (isEdit && selectedBank?._id) {
        return await editBankInformation(selectedBank._id, data);
      } else {
        return await postBank(data);
      }
    },
    onSuccess: () => {
      toast.success(`Bank ${isEdit ? "updated" : "added"} successfully`);
      queryClient.invalidateQueries({ queryKey: ["banks"] });
      setDialogOpen(false);
      resetForm();
    },
    onError: (error: any) => {
      toast.error(
        error.message ||
          `Failed to ${isEdit ? "update" : "add"} bank information`
      );
    },
  });

  // Delete mutation
  const deleteBankMutation = useMutation({
    mutationFn: async (id: string) => await deleteBankInformation(id),
    onSuccess: () => {
      toast.success("Bank deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["banks"] });
      setDeleteDialogOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete bank");
    },
  });

  const resetForm = () => {
    setFormData({ bankName: "", accountName: "", accountNumber: "" });
    setSelectedBank(null);
    setIsEdit(false);
    setIsSubmitting(false);
  };

  const handleOpenAddDialog = () => {
    resetForm();
    setDialogOpen(true);
  };

  const handleOpenEditDialog = (bank: Bank) => {
    setIsEdit(true);
    setSelectedBank(bank);
    setFormData({
      bankName: bank.bankName,
      accountName: bank.accountName,
      accountNumber: bank.accountNumber.toString(),
    });
    setDialogOpen(true);
  };

  const handleOpenDeleteDialog = (bank: Bank) => {
    setSelectedBank(bank);
    setDeleteDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.bankName.trim() ||
      !formData.accountName.trim() ||
      !formData.accountNumber.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    if (!/^\d+$/.test(formData.accountNumber)) {
      toast.error("Account number should contain only numbers");
      return;
    }

    setIsSubmitting(true);
    await saveBankMutation.mutateAsync(formData);
    setIsSubmitting(false);
  };

  const handleDelete = async () => {
    if (selectedBank) {
      await deleteBankMutation.mutateAsync(selectedBank._id);
    }
  };

  // Format account number for display
  const formatAccountNumber = (accountNumber: string) => {
    // Show last 4 digits, mask the rest
    if (accountNumber.length <= 4) return accountNumber;
    return `••••${accountNumber.slice(-4)}`;
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#0D0D0D] text-[#1F2937] dark:text-gray-100 transition-colors duration-300 min-h-screen">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="font-bold text-3xl mb-3">Bank Information</h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Manage your bank accounts for seamless payments
          </p>
        </div>

        <div className="flex justify-between items-center mb-8 p-6 bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#f6f2ff] dark:border-[#2E2E2E]">
          <div>
            <h2 className="text-xl font-semibold">Your Bank Accounts</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {banksData?.bank ? "1 bank account" : "No bank accounts added"}
            </p>
          </div>
          <Button onClick={handleOpenAddDialog} size="lg">
            <Plus className="w-5 h-5" />
            Add Bank Account
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {isLoading ? (
            // Loading Skeletons
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card
                  key={i}
                  className="p-6 border-2 border-dashed border-gray-200 dark:border-gray-800"
                >
                  <CardContent className="p-0 space-y-4">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <div className="flex gap-2 pt-4">
                      <Skeleton className="h-9 flex-1" />
                      <Skeleton className="h-9 flex-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : isError ? (
            <Card className="p-8 text-center border-2 border-dashed border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
              <CardContent>
                <div className="text-red-500 mb-4">
                  <CreditCard className="w-16 h-16 mx-auto mb-3 opacity-50" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Unable to load bank information
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  There was a problem loading your bank accounts. Please try
                  again.
                </p>
                <Button
                  onClick={() =>
                    queryClient.refetchQueries({ queryKey: ["banks"] })
                  }
                >
                  Retry
                </Button>
              </CardContent>
            </Card>
          ) : banksData?.bank ? (
            // Bank Cards
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="group relative overflow-hidden bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#f6f2ff] dark:border-[#2E2E2E] transition-all duration-300">
                <CardContent className="p-6 space-y-4">
                  {/* Bank Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {banksData.bank.bankName}
                        </h3>
                        <Badge variant="secondary" className="mt-1">
                          Primary
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Account Details */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Account Holder:
                      </span>
                      <span className="font-medium">
                        {banksData.bank.accountName}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">
                        Account Number:
                      </span>
                      <span className="font-mono font-medium">
                        {formatAccountNumber(
                          banksData.bank.accountNumber.toString()
                        )}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => handleOpenEditDialog(banksData.bank)}
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      className="flex-1 gap-2"
                      onClick={() => handleOpenDeleteDialog(banksData.bank)}
                    >
                      <Trash className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            // Empty State
            <Card className="text-center p-12 border-dashed bg-white dark:bg-[#1E1E1E] rounded-xl border border-[#f6f2ff] dark:border-[#2E2E2E] transition-colors">
              <CardContent>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                  <CreditCard className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No bank accounts</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-sm mx-auto">
                  Add your bank account to receive payments and manage your
                  finances securely.
                </p>
                <Button
                  onClick={handleOpenAddDialog}
                  className="gap-2"
                  size="lg"
                >
                  <Plus className="w-5 h-5" />
                  Add Your First Bank Account
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Add/Edit Bank Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              {isEdit ? "Edit Bank Account" : "Add Bank Account"}
            </DialogTitle>
            <DialogDescription>
              {isEdit
                ? "Update your bank account details below."
                : "Enter your bank account details to receive payments."}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="bankName" className="text-sm font-medium mb-2">
                  Bank Name
                </Label>
                <Input
                  id="bankName"
                  placeholder="e.g., Chase Bank, Bank of America"
                  value={formData.bankName}
                  onChange={(e) =>
                    setFormData({ ...formData, bankName: e.target.value })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <Label
                  htmlFor="accountName"
                  className="text-sm font-medium mb-2"
                >
                  Account Holder Name
                </Label>
                <Input
                  id="accountName"
                  placeholder="Full name as on bank account"
                  value={formData.accountName}
                  onChange={(e) =>
                    setFormData({ ...formData, accountName: e.target.value })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <Label
                  htmlFor="accountNumber"
                  className="text-sm font-medium mb-2"
                >
                  Account Number
                </Label>
                <Input
                  id="accountNumber"
                  placeholder="Enter account number"
                  value={formData.accountNumber}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      accountNumber: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className="w-full font-mono"
                  maxLength={17}
                />
                <p className="text-xs text-gray-500 mt-1">
                  Numbers only, no spaces or dashes
                </p>
              </div>
            </div>

            <DialogFooter className="gap-2 sm:gap-0 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.bankName.trim() ||
                  !formData.accountName.trim() ||
                  !formData.accountNumber.trim()
                }
                className=""
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : isEdit ? (
                  "Update"
                ) : (
                  "Add"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <Trash className="w-5 h-5" />
              Delete Bank Account
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the bank account{" "}
              <strong>{selectedBank?.bankName}</strong> ending in{" "}
              <strong>
                {selectedBank
                  ? formatAccountNumber(selectedBank.accountNumber.toString())
                  : ""}
              </strong>
              . This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteBankMutation.isPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteBankMutation.isPending}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {deleteBankMutation.isPending ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                "Delete Account"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BankInformation;
