import { AccountNav } from "@/components/account-nav";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="armory-shell store-workspace">
      <div>
        <AccountNav />
        <div>{children}</div>
      </div>
    </div>
  );
}
