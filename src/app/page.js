"use client";

//This is different pages.
//This page is for a item inventory.
//Make a new page for a new

import { useAuth } from "@/contexts/auth";
import List from "./components/List";

export default function Home() {
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    return null;
  }

  return (
    <>
      <main className=" flex min-h-screen flex-col items-center justify-between p-16">
        {/* Auth till page */}
        {/* på page syns bara en sida */}
        {/* lägg komponenter */}
        {/* <Form /> */}
        <List />
      </main>
    </>
  );
}
