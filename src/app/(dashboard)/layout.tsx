import { RouteTracker } from "@/src/components/shared/RouteTracker";
import { NavigationLayout } from "@/src/components/navigation/NavigationLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NavigationLayout>
      <RouteTracker />
      {children}
    </NavigationLayout>
  );
}
