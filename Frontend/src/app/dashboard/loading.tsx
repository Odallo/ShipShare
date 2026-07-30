export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-surface-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="animate-spin w-10 h-10 border-[3px] border-primary-500 border-t-transparent rounded-full" />
        <p className="text-surface-400 text-sm font-medium">Loading dashboard...</p>
      </div>
    </div>
  );
}
