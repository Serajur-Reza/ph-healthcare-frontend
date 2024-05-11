"use client";

import PHFileUploader from "@/components/Forms/PHFileUploader";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import {
  useGetSingleUserQuery,
  useUpdateSingleUserMutation,
} from "@/redux/api/userApi";
import { Gender } from "@/types";
import { modifyPayload } from "@/utils/modifyPayload";
import { Box, Typography, Grid, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const ProfilePage = () => {
  const { data: getAdmin, isLoading } = useGetSingleUserQuery({});
  const [updateUser] = useUpdateSingleUserMutation();

  const router = useRouter();

  const defaultValues = {
    email: getAdmin?.email || "",
    name: getAdmin?.name || "",
    contactNumber: getAdmin?.contactNumber || "",
  };

  const handleFormSubmit = async (values: FieldValues) => {
    try {
      const data = modifyPayload(values);
      const res = await updateUser(data).unwrap();
      console.log(res);

      if (res?.id) {
        toast.success("Profile updated Successfully", { duration: 2000 });
        // router.refresh();
        router.push("/dashboard/admin");
      }
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  return (
    <Box>
      <Typography>Your Profile</Typography>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <PHForm
          onSubmit={handleFormSubmit}
          defaultValues={getAdmin && defaultValues}
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

            <Grid item md={6}>
              <PHFileUploader name="file" label="file" />
            </Grid>
          </Grid>

          <Button type="submit">Update</Button>
        </PHForm>
      )}
    </Box>
  );
};

export default ProfilePage;
