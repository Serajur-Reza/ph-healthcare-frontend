import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Image from "next/image";

import React from "react";
import Link from "next/link";

const TopRatedDoctors = async () => {
  const res = await fetch(
    "http://localhost:3000/api/v1/doctor?page=1&limit=3",
    {
      next: { revalidate: 30 },
    }
  );
  const { data: doctors } = await res.json();
  return (
    <Box
      sx={{
        my: 10,
        py: 30,
        backgroundColor: "rgba(20, 20, 20, 0.1)",
        clipPath: "polygon(0 0,100% 25%, 100% 100%, 0 75%)",
      }}
    >
      {" "}
      <Box sx={{ textAlign: "center" }}>
        {" "}
        <Typography variant="h4" fontWeight={600}>
          Explore Treatments across specialist
        </Typography>
        <Typography component="p" fontWeight={300} fontSize={18}>
          Experienced doctors across all specialists
        </Typography>
      </Box>
      <Container sx={{ margin: "30px auto" }}>
        <Grid container spacing={2}>
          {doctors?.map((doctor: any) => (
            <Grid item key={doctor.id} md={4}>
              <Card>
                <Box
                  sx={{
                    width: "100%",
                    height: 300,

                    "& img": {
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      objectFit: "cover",
                    },
                  }}
                >
                  <Image
                    src={doctor?.profilePhoto ? doctor?.profilePhoto : ""}
                    width={400}
                    height={300}
                    alt="doctor"
                  />
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {doctor.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {doctor.qualification}, {doctor.designation}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" mt={1}>
                    <LocationOnIcon />
                    {doctor.address}
                  </Typography>
                </CardContent>
                <CardActions
                  sx={{
                    justifyContent: "space-between",
                    px: 2,
                    paddingBottom: "20px",
                  }}
                >
                  <Button>Book Now</Button>
                  <Button variant="outlined">View Profile</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="outlined"
            sx={{
              marginTop: "20px",
            }}
            component={Link}
            href="/doctors"
          >
            View ALL
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default TopRatedDoctors;
