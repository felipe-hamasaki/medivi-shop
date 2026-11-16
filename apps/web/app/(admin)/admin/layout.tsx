import { AdminNav } from "@/components/admin-nav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="armory-shell store-workspace">
      <div>
        <AdminNav />
        <div>{children}</div>
      </div>
    </div>
  );
}
