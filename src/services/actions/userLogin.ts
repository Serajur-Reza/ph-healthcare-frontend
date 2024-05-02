"use server";

import { TLogin } from "@/app/login/page";

export const userLogin = async (data: TLogin) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
      cache: "no-store",
    }
  );

  const userInfo = await res.json();
  return userInfo;
};
