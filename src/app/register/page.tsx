"use client";

import assets from "@/assets";
import { registerPatient } from "@/services/actions/registerPatient";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { modifyPayload } from "@/utils/modifyPayload";
import {
  Stack,
  Container,
  Box,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

type TPatientData = {
  name: string;
  email: string;
  contactNumber: string;
  address: string;
  gender?: string;
};

type TPatientRegisterFormData = {
  password: string;
  patient: TPatientData;
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<TPatientRegisterFormData>();

  const router = useRouter();

  const onSubmit: SubmitHandler<TPatientRegisterFormData> = async (values) => {
    values.patient.gender = "MALE";
    console.log(values);
    const data = modifyPayload(values);

    try {
      const res: any = await registerPatient(data);
      console.log(res);
      if (res?.data?.id) {
        toast.success(res?.message, { duration: 5000 });
        const result = await userLogin({
          password: values?.password,
          email: values?.patient?.email,
        });
        if (result?.data?.accessToken) {
          storeUserInfo({ accessToken: result?.data?.accessToken });
          // toast.success(res?.message, { duration: 2000 });
          router.push("/");
        }
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Container>
      <Stack
        sx={{
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
        }}
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
                Patient Register
              </Typography>
            </Box>
          </Stack>

          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              {" "}
              <Grid container spacing={3}>
                <Grid item md={12} my={1}>
                  <TextField
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.name")}
                  />
                </Grid>
                <Grid item md={6} my={1}>
                  <TextField
                    id="outlined-basic"
                    label="Email"
                    type="email"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.email")}
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

                <Grid item md={6} my={1}>
                  <TextField
                    id="outlined-basic"
                    label="Contact"
                    type="tel"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.contactNumber")}
                  />
                </Grid>
                <Grid item md={6} my={1}>
                  <TextField
                    id="outlined-basic"
                    label="Address"
                    type="text"
                    variant="outlined"
                    size="small"
                    fullWidth={true}
                    {...register("patient.address")}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                sx={{ margin: "10px 0px" }}
                fullWidth={true}
              >
                Register
              </Button>
              <Box>
                <Typography component="p" fontWeight={300}>
                  Do you already have an account?{" "}
                  <Link href={"/login"}>Login</Link>
                </Typography>
              </Box>
            </form>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
