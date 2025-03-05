import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Common/Header";
import Footer from "./Common/Footer";
import { ClerkProvider } from "@clerk/clerk-react";

function RootLayout() {

  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
<div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <div style={{ flexGrow: 1, minHeight: "80vh" }}>
      <Outlet />
      </div>
      <Footer />
    </div>
    </ClerkProvider>
  );
}

export default RootLayout;
