import { RouteTracker } from "@/src/components/shared/RouteTracker";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <RouteTracker />
      {children}
    </>
  );
}
