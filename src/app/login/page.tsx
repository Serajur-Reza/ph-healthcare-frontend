"use client";

import assets from "@/assets";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { zodResolver } from "@hookform/resolvers/zod";
import { Password } from "@mui/icons-material";

import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState } from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const validationSchema = z.object({
  email: z.string().email("Please enter your email"),
  password: z.string().min(6, "Must be at least 6 characters"),
});

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleLogin = async (values: FieldValues) => {
    try {
      const res = await userLogin(values);
      console.log(res);
      if (res?.data?.accessToken) {
        storeUserInfo({ accessToken: res?.data?.accessToken });
        toast.success(res?.message, { duration: 2000 });
        router.push("/");
      } else {
        setError(res?.message);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{ height: "100vh", alignItems: "center", justifyContent: "center" }}
      >
        <Box
          sx={{
            maxWidth: 600,
            width: "100%",
            boxShadow: 1,
            borderRadius: 1,
            p: 4,
            textAlign: "center",
          }}
        >
          <Stack
            sx={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box>
              <Image src={assets.svgs.logo} width={50} height={50} alt="logo" />
            </Box>

            <Box>
              <Typography variant="h6" fontWeight={600}>
                Login PH Health Care
              </Typography>
            </Box>
          </Stack>

          {error && (
            <Box>
              <Typography
                sx={{
                  backgroundColor: "red",
                  padding: "1px",
                  borderRadius: "2px",
                  color: "white",
                  marginTop: "5px",
                }}
              >
                {error}
              </Typography>
            </Box>
          )}

          <Box>
            <PHForm
              onSubmit={handleLogin}
              resolver={zodResolver(validationSchema)}
              defaultValues={{ email: "", password: "" }}
            >
              {" "}
              <Grid container spacing={3}>
                <Grid item md={6} my={1}>
                  <PHInput
                    name={"email"}
                    label="Email"
                    type="email"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6} my={1}>
                  <PHInput
                    name={"password"}
                    label="Password"
                    type="password"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
              <Typography
                mb={1}
                textAlign={"end"}
                component="p"
                fontWeight={300}
              >
                <Link href={"/register"}>Forgot Password?</Link>
              </Typography>
              <Button
                type="submit"
                sx={{ margin: "10px 0px" }}
                fullWidth={true}
              >
                Login
              </Button>
              <Box>
                <Typography component="p" fontWeight={300}>
                  Don&apos;t have an account?{" "}
                  <Link href={"/register"}>Create an account</Link>
                </Typography>
              </Box>
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
