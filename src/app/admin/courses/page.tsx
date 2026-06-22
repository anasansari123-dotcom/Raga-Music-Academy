"use client";

import { useCallback, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { GraduationCap, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { PortalShell } from "@/components/portal/PortalShell";
import { Button } from "@/components/ui/Button";
import { adminNavItems } from "@/lib/admin-nav";
import type { CoursePriceDTO } from "@/lib/course-types";
import { formatInr } from "@/lib/course-types";

const emptyForm = {
  title: "",
  subtitle: "",
  priceInr: "",
  priceSuffix: "",
  sortOrder: "0",
  highlighted: false,
  isActive: true,
};

export default function AdminCoursesPage() {
  const { data: session } = useSession();
  const [courses, setCourses] = useState<CoursePriceDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const loadCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/courses");
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to load courses.");
      setCourses(data.courses ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const startEdit = (course: CoursePriceDTO) => {
    setEditingId(course.id);
    setForm({
      title: course.title,
      subtitle: course.subtitle,
      priceInr: String(course.priceInr),
      priceSuffix: course.priceSuffix ?? "",
      sortOrder: String(course.sortOrder),
      highlighted: course.highlighted,
      isActive: course.isActive,
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const payload = {
      title: form.title,
      subtitle: form.subtitle,
      priceInr: Number(form.priceInr),
      priceSuffix: form.priceSuffix || undefined,
      sortOrder: Number(form.sortOrder),
      highlighted: form.highlighted,
      isActive: form.isActive,
    };

    try {
      const res = await fetch(
        editingId ? `/api/admin/courses/${editingId}` : "/api/admin/courses",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed.");
      resetForm();
      await loadCourses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course price from the website?")) return;
    setError(null);
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Delete failed.");
      await loadCourses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  return (
    <PortalShell
      title="Course Prices"
      subtitle="Manage pricing shown on the website homepage and courses section."
      navItems={adminNavItems}
      userName={session?.user?.name ?? undefined}
    >
      <div className="mb-6 flex flex-wrap gap-3">
        <Button
          variant="primary"
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
        >
          <Plus className="h-4 w-4" />
          Add Course Price
        </Button>
      </div>

      {error ? (
        <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
      ) : null}

      {showForm ? (
        <form
          onSubmit={handleSubmit}
          className="mb-8 rounded-2xl border border-gold/15 bg-white/80 p-6 shadow-sm"
        >
          <h3 className="mb-4 text-lg font-semibold text-purple-deep">
            {editingId ? "Edit Course Price" : "Add Course Price"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">Course Title</label>
              <input
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 outline-none focus:border-gold/50"
                placeholder="e.g. Vocal Class"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1 block text-sm font-medium">Subtitle / Description</label>
              <textarea
                required
                rows={2}
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 outline-none focus:border-gold/50"
                placeholder="Short description shown on pricing card"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Price (₹)</label>
              <input
                type="number"
                required
                min={0}
                value={form.priceInr}
                onChange={(e) => setForm({ ...form, priceInr: e.target.value })}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 outline-none focus:border-gold/50"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Price Suffix (optional)</label>
              <input
                value={form.priceSuffix}
                onChange={(e) => setForm({ ...form, priceSuffix: e.target.value })}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 outline-none focus:border-gold/50"
                placeholder="e.g. per month"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Sort Order</label>
              <input
                type="number"
                value={form.sortOrder}
                onChange={(e) => setForm({ ...form, sortOrder: e.target.value })}
                className="w-full rounded-xl border border-gold/20 bg-white px-4 py-3 outline-none focus:border-gold/50"
              />
            </div>
            <div className="flex flex-col justify-end gap-3 sm:flex-row sm:items-center">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.highlighted}
                  onChange={(e) => setForm({ ...form, highlighted: e.target.checked })}
                />
                Highlighted card
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                />
                Show on website
              </label>
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <Button type="submit" variant="secondary" disabled={submitting}>
              {submitting ? "Saving…" : editingId ? "Update" : "Add Course"}
            </Button>
            <Button type="button" variant="ghost" onClick={resetForm} className="text-dark">
              Cancel
            </Button>
          </div>
        </form>
      ) : null}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-purple-deep" />
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gold/30 bg-white/60 p-12 text-center">
          <GraduationCap className="mx-auto h-10 w-10 text-gold-dark/60" />
          <p className="mt-4 text-lg font-semibold text-purple-deep">No course prices yet</p>
          <p className="mt-2 text-sm text-dark-soft/70">
            Add your first course price — it will appear on the website pricing section.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {courses.map((course) => (
            <article
              key={course.id}
              className={`rounded-2xl border p-6 shadow-sm ${
                course.highlighted
                  ? "border-gold/30 bg-gradient-to-b from-purple-deep to-dark text-ivory"
                  : "border-gold/15 bg-white/80"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-semibold">{course.title}</h3>
                  <p className={`mt-1 text-sm ${course.highlighted ? "text-ivory/70" : "text-dark-soft/75"}`}>
                    {course.subtitle}
                  </p>
                </div>
                {!course.isActive ? (
                  <span className="rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-800">
                    Hidden
                  </span>
                ) : null}
              </div>
              <p className={`mt-4 text-3xl font-bold ${course.highlighted ? "text-gold-light" : "text-purple-deep"}`}>
                {formatInr(course.priceInr)}
                {course.priceSuffix ? (
                  <span className="ml-2 text-base font-medium opacity-75">{course.priceSuffix}</span>
                ) : null}
              </p>
              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => startEdit(course)}
                  className={`inline-flex items-center gap-1 text-sm hover:underline ${
                    course.highlighted ? "text-gold-light" : "text-purple"
                  }`}
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(course.id)}
                  className="inline-flex items-center gap-1 text-sm text-red-600 hover:underline"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </PortalShell>
  );
}
