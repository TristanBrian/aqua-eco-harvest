
import AdminLayout from "@/components/admin/AdminLayout";
import AdminSettings from "@/components/admin/AdminSettings";

const SettingsPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500">Manage your account settings and preferences.</p>
        <AdminSettings />
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
