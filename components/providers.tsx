import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ClerkLoaded>{children}</ClerkLoaded>
    </ClerkProvider>
  );
}
