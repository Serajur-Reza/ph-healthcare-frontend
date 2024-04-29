import { Box, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import faceBookIcon from "@/assets/landing_page/facebook.png";
type Props = {};

function Footer({}: Props) {
  return (
    <Box bgcolor="rgb(17,26,34)" py={5}>
      <Container>
        <Stack direction={"row"} gap={4} justifyContent={"center"}>
          <Typography color="#fff">Consultation</Typography>
          <Typography color="#fff">Health Plans</Typography>
          <Typography color="#fff">Medicines</Typography>
          <Typography color="#fff">Diagnostics</Typography>
          <Typography color="#fff">NGOS</Typography>
        </Stack>

        <Stack direction={"row"} gap={2} justifyContent={"center"} py={3}>
          <Image src={faceBookIcon} width={30} height={30} alt="facebook" />
          <Image src={faceBookIcon} width={30} height={30} alt="facebook" />
          <Image src={faceBookIcon} width={30} height={30} alt="facebook" />
          <Image src={faceBookIcon} width={30} height={30} alt="facebook" />
        </Stack>

        <div className="border-b-[1px] border-dashed"></div>
        <Stack
          direction={"row"}
          gap={2}
          justifyContent={"space-between"}
          alignItems={"center"}
          py={3}
        >
          <Typography component="p" color={"white"}>
            &copy;2024 ph healthCare. All rights reserved
          </Typography>

          <Typography
            variant="h4"
            component={Link}
            href="/"
            fontWeight={600}
            color={"white"}
          >
            P
            <Box component={"span"} color={"primary.main"}>
              H
            </Box>
            Health Care
          </Typography>

          <Typography component="p" color={"white"}>
            Privacy Policy; Terms & Conditions
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}

export default Footer;
