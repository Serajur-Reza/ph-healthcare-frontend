"use client";

import AuthButton from "@/components/UI/AuthButton/AuthButton";
import useUserInfo from "@/hooks/useUserInfo";
import logoutUser from "@/services/actions/logoutUser";
import { getUserInfo } from "@/services/auth.services";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const userInfo = useUserInfo();

  // const AuthButton = dynamic(
  //   () => import("@/components/UI/AuthButton/AuthButton"),
  //   {
  //     ssr: false,
  //   }
  // );

  const router = useRouter();

  const handleLogOut = () => {
    logoutUser(router);
  };
  return (
    <Box sx={{ bgcolor: "primary.main" }}>
      <Container>
        <Stack
          py={2}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography variant="h4" component={Link} href="/" fontWeight={"600"}>
            P
            <Box component={"span"} color={"white"}>
              H
            </Box>
            Health Care
          </Typography>

          <Stack direction={"row"} gap={4} justifyContent={"space-between"}>
            <Typography component={Link} href="/consultaion" color={"white"}>
              Consultation
            </Typography>
            <Typography component={Link} href="/" color={"white"}>
              Health Plans
            </Typography>
            <Typography component={Link} href="/login" color={"white"}>
              Medicines
            </Typography>
            <Typography component={Link} href="/login" color={"white"}>
              Diagnostics
            </Typography>
            <Typography component={Link} href="/login" color={"white"}>
              NGOS
            </Typography>
            {userInfo?.id && (
              <Typography component={Link} href="/dashboard" color={"white"}>
                Dashboard
              </Typography>
            )}
          </Stack>

          {userInfo?.id ? (
            <Button color="error" onClick={handleLogOut} sx={{ boxShadow: 0 }}>
              Logout
            </Button>
          ) : (
            <Button component={Link} href="/login">
              Login
            </Button>
          )}
          {/* <AuthButton /> */}
        </Stack>
      </Container>
    </Box>
  );
};

export default Navbar;
