
import AdminLayout from "@/components/admin/AdminLayout";
import HRManagement from "@/components/admin/HRManagement";

const HRPage = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">HR Management</h1>
        
        <HRManagement />
      </div>
    </AdminLayout>
  );
};

export default HRPage;
