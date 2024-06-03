import DashedLine from "@/components/UI/Doctor/DashedLine";
import DoctorCard from "@/components/UI/Doctor/DoctorCard";
import ScrollCategory from "@/components/UI/Doctor/ScrollCategory";
import { TDoctor } from "@/types/doctor";
import { Box, Container, styled } from "@mui/material";
import React from "react";

type Props = {
  searchParams: { specialities: string };
};

async function Doctors({ searchParams }: Props) {
  let res;

  console.log(searchParams);

  if (searchParams?.specialities) {
    res = await fetch(
      `http://localhost:3000/api/v1/doctor?specialities=${searchParams?.specialities}`
    );
  } else {
    res = await fetch(`http://localhost:3000/api/v1/doctor`);
  }
  const { data } = await res.json();
  return (
    <Container>
      <DashedLine />

      <ScrollCategory specialities={searchParams.specialities} />
      <Box
        sx={{
          mt: 6,
          p: 3,
          bgcolor: "secondary.light",
        }}
      >
        {data?.map((item: TDoctor, index: number) => (
          <Box key={item.id}>
            <DoctorCard doctor={item} />

            {index === data?.length - 1 ? null : <DashedLine />}
          </Box>
        ))}
      </Box>
    </Container>
  );
}

export default Doctors;
