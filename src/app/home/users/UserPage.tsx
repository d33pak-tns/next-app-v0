"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import Link from "next/link";

const UserPage = () => {
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/");
  };

  return (
    <div>
      <h2>User Information</h2>
      <Button variant="contained" onClick={handleRedirect}>
        Go to Home Page
      </Button>
      <Link href="/">Using Link</Link>
    </div>
  );
};

export default UserPage;
