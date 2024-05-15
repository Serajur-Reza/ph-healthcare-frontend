"use client";

import {
  useGetSingleUserQuery,
  useUpdateSingleUserMutation,
} from "@/redux/api/userApi";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import React, { useState } from "react";
import DoctorInformation from "./compontents/DoctorInformation";
import AutoFileUploader from "@/components/Forms/AutoFileUploader";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { getUserInfo } from "@/services/auth.services";
import ProfileUpdateModal from "./compontents/ProfileUpdateModal";

type Props = {};

const ProfilePage = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: doctorData, isLoading } = useGetSingleUserQuery({});

  console.log(doctorData);

  const [updateProfile, { isLoading: profileUpdating }] =
    useUpdateSingleUserMutation();

  const fileUploadHandler = (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("data", JSON.stringify({}));

    updateProfile(formData);
  };

  if (isLoading) {
    <div>Loading...</div>;
  }
  return (
    <>
      <ProfileUpdateModal
        open={isModalOpen}
        setOpen={setIsModalOpen}
        id={doctorData?.id}
      />
      <Container>
        <Grid container spacing={2}>
          <Grid xs={12} md={4}>
            <Box
              sx={{
                height: 300,
                width: "100%",
                overflow: "hidden",
                borderRadius: 1,
              }}
            >
              <Image
                src={doctorData?.profilePhoto ?? ""}
                height={300}
                width={400}
                alt="user photo"
              />
            </Box>

            {profileUpdating && <p>Uploading...</p>}

            <AutoFileUploader
              name="file"
              label="choose your profile photo"
              icon={<CloudUploadIcon />}
              onFileUpload={fileUploadHandler}
              variant="text"
            />

            <Button
              fullWidth
              endIcon={<ModeEditIcon />}
              onClick={() => setIsModalOpen(true)}
            >
              Edit Profile
            </Button>
          </Grid>
          <Grid xs={12} md={8}>
            <DoctorInformation doctorData={doctorData} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default ProfilePage;
