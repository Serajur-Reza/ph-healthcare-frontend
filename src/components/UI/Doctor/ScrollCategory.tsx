"use client";

import { useGetAllSpecialitiesQuery } from "@/redux/api/specialitiesApi";
import { TSpecialities } from "@/types/doctor";
import { Box, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  specialities: string;
};

function ScrollCategory({ specialities }: Props) {
  const [value, setValue] = React.useState(specialities || "");

  const router = useRouter();
  const { data: getAllSpecialities } = useGetAllSpecialitiesQuery({});
  console.log(getAllSpecialities);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    console.log(newValue);
    router.push(`/doctors?specialities=${newValue}`);
  };
  return (
    <div>
      <Box sx={{ maxWidth: { xs: 320, sm: 480 }, bgcolor: "background.paper" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {getAllSpecialities?.map((item: any) => (
            <Tab
              key={item?.id}
              label={item?.title}
              value={item?.title}
              sx={{ fontWeight: 600 }}
            />
          ))}
        </Tabs>
      </Box>
    </div>
  );
}

export default ScrollCategory;
