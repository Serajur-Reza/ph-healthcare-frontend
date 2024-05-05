import { Box, Button, Container, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

import assets from "@/assets/index";

const HeroSection = () => {
  return (
    <Container sx={{ display: "flex", direction: "row", py: 16 }}>
      <Box sx={{ flex: 1, position: "relative" }}>
        <Box
          sx={{
            position: "absolute",
            width: "700px",
            top: "-90px",
            left: "-120px",
          }}
        >
          <Image src={assets.svgs.grid} alt="grid"></Image>
        </Box>
        <Typography fontWeight={600} component="h1" variant="h2">
          Healthier Hearts
        </Typography>
        <Typography fontWeight={600} component="h1" variant="h2">
          come from
        </Typography>
        <Typography
          variant="h2"
          component="h1"
          fontWeight={600}
          color="primary.main"
        >
          preventive care
        </Typography>

        <Typography sx={{ my: 4 }}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
          provident iusto quia voluptatem, incidunt fugit obcaecati culpa porro
          iure dignissimos cupiditate cum, eum sapiente velit nemo. Hic iure
          numquam soluta!
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button>Make Appointment</Button>
          <Button variant="outlined" sx={{ marginLeft: "5px" }}>
            Contact Us
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          p: 1,
          flex: 1,
          display: "flex",
          justifyContent: "center",
          position: "relative",
          mt: 0,
        }}
      >
        <Box sx={{ position: "absolute", left: "200px", top: "-30px" }}>
          <Image src={assets.svgs.arrow} width={100} height={100} alt="arrow" />
        </Box>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Box mt={4}>
            <Image
              src={assets.images.doctor1}
              width={240}
              height={380}
              alt="arrow"
            />
          </Box>
          <Box>
            <Image
              src={assets.images.doctor2}
              width={240}
              height={350}
              alt="arrow"
            />
          </Box>
        </Box>

        <Box sx={{ position: "absolute", top: "220px", left: "150px" }}>
          <Image src={assets.images.doctor3} width={240} height={240} />
        </Box>

        <Box
          sx={{
            position: "absolute",
            bottom: "-50px",
            right: "0",
            zIndex: "-1",
          }}
        >
          <Image src={assets.images.stethoscope} width={180} height={180} />
        </Box>
      </Box>
    </Container>
  );
};

export default HeroSection;
