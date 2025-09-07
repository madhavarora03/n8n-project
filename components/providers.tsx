import { ClerkLoaded, ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ClerkLoaded>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
