import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <Container>
      <Stack
        py={2}
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="h4" component={Link} href="/" fontWeight={"600"}>
          P
          <Box component={"span"} color={"primary.main"}>
            H
          </Box>
          Health Care
        </Typography>

        <Stack direction={"row"} gap={4} justifyContent={"space-between"}>
          <Typography component={Link} href="/consultaion">
            Consultation
          </Typography>
          <Typography component={Link} href="/">
            Health Plans
          </Typography>
          <Typography component={Link} href="/login">
            Medicines
          </Typography>
          <Typography component={Link} href="/login">
            Diagnostics
          </Typography>
          <Typography component={Link} href="/login">
            NGOS
          </Typography>
        </Stack>

        <Button component={Link} href="/login">
          Login
        </Button>
      </Stack>
    </Container>
  );
};

export default Navbar;
