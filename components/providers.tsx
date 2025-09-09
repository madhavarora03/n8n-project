import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ClerkLoading>
          <div className="h-screen w-full flex flex-col items-center justify-center bg-background">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-primary/40 rounded-full animate-ping"></div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-lg font-semibold text-foreground">
                  Loading...
                </h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Setting up your workspace
                </p>
              </div>
            </div>
          </div>
        </ClerkLoading>
        <ClerkLoaded>{children}</ClerkLoaded>
      </ThemeProvider>
    </ClerkProvider>
  );
}
