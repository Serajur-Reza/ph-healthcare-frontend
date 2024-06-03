// "use server";

import { FieldValues } from "react-hook-form";
import setAccessToken from "./setServerActions";

export const userLogin = async (data: FieldValues) => {
  console.log(data);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
    {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
    }
  );

  const userInfo = await res.json();

  console.log(userInfo);

  const needsPasswordChange = userInfo?.data?.needPasswordChange;

  if (userInfo?.data?.accessToken) {
    setAccessToken(userInfo?.data?.accessToken, {
      redirect: "/dashboard",
      needsPasswordChange,
    });
  }
  return userInfo;
};
