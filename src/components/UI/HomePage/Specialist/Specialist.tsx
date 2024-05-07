import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

type Props = {};

const Specialist = async () => {
  const res = await fetch("http://localhost:3000/api/v1/specialities", {
    next: { revalidate: 30 },
  });
  const { data: specialities } = await res.json();
  return (
    <Container>
      <Box
        sx={{
          margin: "40px 0px",
          textAlign: "center",
        }}
      >
        <Box sx={{ textAlign: "start" }}>
          {" "}
          <Typography variant="h4" fontWeight={600}>
            Explore Treatments across specialist
          </Typography>
          <Typography component="p" fontWeight={300} fontSize={18}>
            Experienced doctors across all specialists
          </Typography>
        </Box>

        <Stack direction={"row"} gap={4} mt={5}>
          {specialities &&
            specialities?.length &&
            specialities?.slice(0, 6)?.map((item: any) => (
              <Box
                key={item.id}
                sx={{
                  flex: 1,
                  width: "150px",
                  backgroundColor: "rgba(245,245,245,1)",
                  border: "1px solid rgba(250,250,250,1)",
                  borderRadius: "10px",
                  textAlign: "center",
                  padding: "24px 10px",
                  "& img": {
                    width: "50px",
                    height: "50px",
                    margin: "0 auto",
                  },

                  "&: hover": {
                    border: "1px solid blue",
                    padding: "40px 10px",
                    borderRadius: "10px",
                  },
                }}
              >
                <Image
                  src={item.icon}
                  width={100}
                  height={100}
                  alt="image"
                ></Image>
                <Box>
                  <Typography
                    component="p"
                    fontWeight={600}
                    fontSize={18}
                    mt={2}
                  >
                    {item.title}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Stack>
        <Button
          variant="outlined"
          sx={{
            marginTop: "20px",
          }}
        >
          View ALL
        </Button>
      </Box>
    </Container>
  );
};

export default Specialist;
