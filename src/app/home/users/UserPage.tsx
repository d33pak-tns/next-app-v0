// app/home/users/UserPage.tsx
"use client"; // Mark as client-side component

import { Button } from "@mui/material";
import { useRouter } from "next/navigation"; // Use next/navigation instead of next/router
import Link from "next/link";

const UserPage = () => {
  const router = useRouter(); // Get the router object

  // Function to handle button click and redirect
  const handleRedirect = () => {
    // Redirect to '/home' or '/' based on your requirement
    router.push("/"); // Or router.push('/') for the root page
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
