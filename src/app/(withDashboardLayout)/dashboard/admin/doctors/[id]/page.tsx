"use client";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHSelectField from "@/components/Forms/PHSelectField";
import {
  useGetSingleDoctorQuery,
  useUpdateDoctorMutation,
} from "@/redux/api/doctorApi";
import { Gender } from "@/types";
import { Grid, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  params: {
    id: string;
  };
};

const SingleDoctor = (props: Props) => {
  const { params } = props;

  const router = useRouter();

  const { data: getSingleDoctor, isLoading } = useGetSingleDoctorQuery(
    params?.id
  );

  const [updateDoctor] = useUpdateDoctorMutation();

  console.log(getSingleDoctor);

  const defaultValues = {
    email: getSingleDoctor?.email || "",
    name: getSingleDoctor?.name || "",
    contactNumber: getSingleDoctor?.contactNumber || "",
    address: getSingleDoctor?.address || "",
    registrationNumber: getSingleDoctor?.registrationNumber || "",
    gender: getSingleDoctor?.gender || "",
    experience: getSingleDoctor?.experience || 0,
    appointmentFee: getSingleDoctor?.appointmentFee || 0,
    qualification: getSingleDoctor?.qualification || "",
    currentWorkingPlace: getSingleDoctor?.currentWorkingPlace || "",
    designation: getSingleDoctor?.designation || "",
    profilePhoto: getSingleDoctor?.profilePhoto || "",
  };

  console.log("default ", defaultValues);

  const handleFormSubmit = async (values: FieldValues) => {
    console.log(values);
    values.experience = Number(values.experience);
    values.appointmentFee = Number(values.appointmentFee);
    values.id = params?.id;
    try {
      const res = await updateDoctor({ id: values.id, body: values }).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Doctor updated successfully", { duration: 2000 });
        router.refresh();

        // router.push("/dashboard/admin/doctors");
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <Box>
      <Typography>page - {params.id}</Typography>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <PHForm
          onSubmit={handleFormSubmit}
          defaultValues={getSingleDoctor && defaultValues}
        >
          <Grid container spacing={2} sx={{ my: 5 }}>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="name"
                label="Name"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="email"
                type="email"
                label="Email"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="contactNumber"
                label="Contract Number"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="address"
                label="Address"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="registrationNumber"
                label="Registration Number"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="experience"
                type="number"
                label="Experience"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHSelectField
                items={Gender}
                name="gender"
                label="Gender"
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="appointmentFee"
                type="number"
                label="appointmentFee"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="qualification"
                label="Qualification"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="currentWorkingPlace"
                label="Current Working Place"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <PHInput
                name="designation"
                label="Designation"
                fullWidth={true}
                sx={{ mb: 2 }}
              />
            </Grid>
          </Grid>

          <Button type="submit">Update</Button>
        </PHForm>
      )}
    </Box>
  );
};

export default SingleDoctor;
