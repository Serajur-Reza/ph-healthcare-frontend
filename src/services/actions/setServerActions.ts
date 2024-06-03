"use server";

import { cookies } from "next/headers";
import { authKey } from "@/constants/authKey";
import { redirect } from "next/navigation";

const setAccessToken = (token: string, option?: any) => {
  cookies().set(authKey, token);

  if (option && option.needsPassword) {
    redirect("/dashboard/change-password");
  }

  if (option && option.needsPassword! && option?.redirect) {
    redirect(option?.redirect);
  }
};

export default setAccessToken;
