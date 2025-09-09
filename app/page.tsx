import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <h1>Landing Page</h1>
      <Button asChild>
        <Link href="/dashboard">Get Started</Link>
      </Button>
    </div>
  );
}
