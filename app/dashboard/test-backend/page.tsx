"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Profile() {
  const { getToken } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await getToken();
      const res = await fetch("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUserData(data);
    };
    fetchUser();
  }, [getToken]);

  return <pre>{JSON.stringify(userData, null, 2)}</pre>;
}
