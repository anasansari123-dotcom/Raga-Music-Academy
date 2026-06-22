"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Loader2, Plus, Users } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { StatusBadge } from "@/components/payments/StatusBadge";
import { Button } from "@/components/ui/Button";
import type { PaymentRequestDTO, UserSummary } from "@/lib/payment-types";
import { formatCurrency, formatDateTime } from "@/lib/payment-types";

import { adminNavItems } from "@/lib/admin-nav";

export default function AdminPaymentRequestsPage() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState<PaymentRequestDTO[]>([]);
  const [users, setUsers] = useState<UserSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showUserForm, setShowUserForm] = useState(false);

  const [form, setForm] = useState({
    userId: "",
    amount: "",
    description: "",
    dueDate: "",
  });

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [reqRes, userRes] = await Promise.all([
        fetch("/api/admin/payment-requests"),
        fetch("/api/admin/users"),
      ]);
      const reqData = await reqRes.json();
      const userData = await userRes.json();
      if (!reqRes.ok) throw new Error(reqData.error ?? "Failed to load requests.");
      if (!userRes.ok) throw new Error(userData.error ?? "Failed to load users.");
      setRequests(reqData.paymentRequests ?? []);
      setUsers(userData.users ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/payment-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: form.userId,
          amount: Number(form.amount),
          description: form.description,
          dueDate: form.dueDate || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create request.");
      setForm({ userId: "", amount: "", description: "", dueDate: "" });
      setShowForm(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to create user.");
      setUserForm({ name: "", email: "", phone: "", password: "" });
      setShowUserForm(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this pending payment request?")) return;
    const res = await fetch(`/api/admin/payment-requests/${id}`, { method: "DELETE" });
    if (res.ok) loadData();
  };

  return (
    <PortalShell
      title="Payment Requests"
      subtitle="Create fee requests for students and track their status."
      navItems={adminNavItems}
      userName={session?.user?.name ?? undefined}
    >
      <div className="mb-6 flex flex-wrap gap-3">
        <Button variant="primary" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4" />
          New Payment Request
        </Button>
        <Button variant="outline" onClick={() => setShowUserForm(!showUserForm)} className="border-purple/30 text-purple-deep">
          <Users className="h-4 w-4" />
          Add Student
        </Button>
      </div>

      {error ? (
        <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      {showForm ? (
        <form
          onSubmit={handleCreateRequest}
          className="mb-8 rounded-2xl border border-gold/15 bg-white/80 p-6 shadow-sm"
        >
          <h3 className="mb-4 text-lg font-semibold text-purple-deep">Create Payment Request</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">Student</label>
              <select
                required
                value={form.userId}
                onChange={(e) => setForm({ ...form, userId: e.target.value })}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 outline-none focus:border-gold/50"
              >
                <option value="">Select student</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} — {user.email}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Amount (₹)</label>
              <input
                type="number"
                required
                min={1}
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Due Date (optional)</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 outline-none focus:border-gold/50"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">Purpose / Description</label>
              <textarea
                required
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 outline-none focus:border-gold/50"
                placeholder="e.g. Monthly vocal class fee — March 2026"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button type="submit" variant="secondary" disabled={submitting}>
              {submitting ? "Saving…" : "Create Request"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setShowForm(false)} className="text-dark">
              Cancel
            </Button>
          </div>
        </form>
      ) : null}

      {showUserForm ? (
        <form
          onSubmit={handleCreateUser}
          className="mb-8 rounded-2xl border border-gold/15 bg-white/80 p-6 shadow-sm"
        >
          <h3 className="mb-4 text-lg font-semibold text-purple-deep">Add Student Account</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Full Name</label>
              <input
                required
                value={userForm.name}
                onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Phone</label>
              <input
                required
                value={userForm.phone}
                onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Email</label>
              <input
                type="email"
                required
                value={userForm.email}
                onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={userForm.password}
                onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 outline-none focus:border-gold/50"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button type="submit" variant="secondary" disabled={submitting}>
              {submitting ? "Creating…" : "Create Student"}
            </Button>
            <Button type="button" variant="ghost" onClick={() => setShowUserForm(false)} className="text-dark">
              Cancel
            </Button>
          </div>
        </form>
      ) : null}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-purple-deep" />
        </div>
      ) : requests.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gold/30 bg-white/60 p-12 text-center">
          <p className="text-lg font-semibold text-purple-deep">No payment requests yet</p>
          <p className="mt-2 text-sm text-dark-soft/70">
            Create a payment request for a student to get started.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-gold/15 bg-white/80 shadow-sm">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-gold/10 bg-cream/50 text-dark-soft/80">
              <tr>
                <th className="px-4 py-3 font-medium">Student</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium">Purpose</th>
                <th className="px-4 py-3 font-medium">Due</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.id} className="border-b border-gold/5">
                  <td className="px-4 py-4">
                    <p className="font-medium text-dark">{request.user?.name ?? "—"}</p>
                    <p className="text-xs text-dark-soft/70">{request.user?.email}</p>
                  </td>
                  <td className="px-4 py-4 font-semibold text-purple-deep">
                    {formatCurrency(request.amount)}
                  </td>
                  <td className="max-w-xs px-4 py-4 text-dark-soft/80">{request.description}</td>
                  <td className="px-4 py-4 text-dark-soft/70">
                    {request.dueDate ? formatDateTime(request.dueDate) : "—"}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={request.status} />
                  </td>
                  <td className="px-4 py-4 text-dark-soft/70">
                    {formatDateTime(request.createdAt)}
                  </td>
                  <td className="px-4 py-4">
                    {request.status === "pending" ? (
                      <button
                        type="button"
                        onClick={() => handleDelete(request.id)}
                        className="text-sm text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    ) : (
                      <span className="text-xs text-dark-soft/50">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PortalShell>
  );
}
