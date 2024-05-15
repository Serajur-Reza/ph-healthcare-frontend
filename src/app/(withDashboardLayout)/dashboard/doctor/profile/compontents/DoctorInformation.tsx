import { Typography, Stack, styled, Box } from "@mui/material";
import React from "react";

type Props = {
  doctorData: any;
};

const StyledInformationBox = styled(Box)(({ theme }) => ({
  background: "#f4f7fe",
  borderRadius: theme.spacing(1),
  width: "45%",
  padding: "8px 16px",
  "& p": {
    fontWeight: 600,
  },
}));

const DoctorInformation = (props: Props) => {
  const { doctorData } = props;

  return (
    <>
      <Typography variant="h5" color={"primary.main"} mb={2}>
        Personal Information
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} gap={2} flexWrap={"wrap"}>
        <StyledInformationBox>
          <Typography color={"secondary"} variant="caption">
            Role
          </Typography>
          <Typography>Admin</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color={"secondary"} variant="caption">
            Name
          </Typography>
          <Typography>{doctorData?.name}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color={"secondary"} variant="caption">
            Email
          </Typography>
          <Typography>{doctorData?.email}</Typography>
        </StyledInformationBox>

        <StyledInformationBox>
          <Typography color={"secondary"} variant="caption">
            Gender
          </Typography>
          <Typography>{doctorData?.gender}</Typography>
        </StyledInformationBox>
      </Stack>

      <Typography variant="h5" color={"primary.main"} mb={2}>
        Professional Information
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} gap={2} flexWrap={"wrap"}>
        <StyledInformationBox>
          <Typography color={"secondary"} variant="caption">
            Role
          </Typography>
          <Typography>Admin</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color={"secondary"} variant="caption">
            Name
          </Typography>
          <Typography>{doctorData?.name}</Typography>
        </StyledInformationBox>
        <StyledInformationBox>
          <Typography color={"secondary"} variant="caption">
            Email
          </Typography>
          <Typography>{doctorData?.email}</Typography>
        </StyledInformationBox>

        <StyledInformationBox>
          <Typography color={"secondary"} variant="caption">
            Gender
          </Typography>
          <Typography>{doctorData?.gender}</Typography>
        </StyledInformationBox>
      </Stack>
    </>
  );
};

export default DoctorInformation;
