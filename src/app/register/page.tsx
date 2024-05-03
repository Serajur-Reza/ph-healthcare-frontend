"use client";

import assets from "@/assets";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import { registerPatient } from "@/services/actions/registerPatient";
import { userLogin } from "@/services/actions/userLogin";
import { storeUserInfo } from "@/services/auth.services";
import { modifyPayload } from "@/utils/modifyPayload";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const patientValidationSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email(),
  contactNumber: z
    .string()
    .regex(/^\d{11}$/, "Please provide a valid phone number"),
  address: z.string().min(1, "Please enter your address"),
});

export const validationSchema = z.object({
  password: z.string().min(6, "Must be at least 6 characters"),
  patient: patientValidationSchema,
});

export const defaultValues = {
  password: "",
  patient: {
    name: "",
    email: "",
    contactNumber: "",
    address: "",
  },
};

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>();

  const router = useRouter();

  const handleRegister = async (values: FieldValues) => {
    values.patient.gender = "MALE";
    console.log(values);
    const data = modifyPayload(values);

    const [error, setError] = useState("");

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
        } else {
          setError(res?.message);
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
              onSubmit={handleRegister}
              resolver={zodResolver(validationSchema)}
              defaultValues={defaultValues}
            >
              {" "}
              <Grid container spacing={3}>
                <Grid item md={12} my={1}>
                  <PHInput
                    name="patient.name"
                    type="text"
                    label="Name"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6} my={1}>
                  <PHInput
                    name="patient.email"
                    label="Email"
                    type="email"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6} my={1}>
                  <PHInput
                    name="password"
                    label="Password"
                    type="password"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>

                <Grid item md={6} my={1}>
                  <PHInput
                    name="patient.contactNumber"
                    label="Contact"
                    type="tel"
                    size="small"
                    fullWidth={true}
                  />
                </Grid>
                <Grid item md={6} my={1}>
                  <PHInput
                    name="patient.address"
                    label="Address"
                    type="text"
                    size="small"
                    fullWidth={true}
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
            </PHForm>
          </Box>
        </Box>
      </Stack>
    </Container>
  );
};

export default Register;
