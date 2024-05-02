"use client";

import assets from "@/assets";
import { registerPatient } from "@/services/actions/registerPatient";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { modifyPayload } from "@/utils/modifyPayload";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import router from "next/router";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

export type TLogin = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TLogin>();

  const router = useRouter();

  const onSubmit: SubmitHandler<TLogin> = async (values) => {
    try {
      const res = await userLogin(values);
      console.log(res);
      if (res?.data?.accessToken) {
        storeUserInfo({ accessToken: res?.data?.accessToken });
        toast.success(res?.message, { duration: 2000 });
        router.push("/");
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

          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              {" "}
              <Grid container spacing={3}>
                <Grid item md={6} my={1}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    type="email"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("email")}
                  />
                </Grid>
                <Grid item md={6} my={1}>
                  <TextField
                    id="outlined-basic"
                    label="Password"
                    type="password"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("password")}
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
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Login;
