"use client";

import { Box, Stack, Button, TextField, IconButton } from "@mui/material";
import React, { useState } from "react";
import SpecialityModal from "./components/SpecialityModal";
import {
  useDeleteSpecialityMutation,
  useGetAllSpecialitiesQuery,
} from "@/redux/api/specialitiesApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import DeleteIcon from "@mui/icons-material/Delete";

const SpecialitiesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: specialities, isLoading } = useGetAllSpecialitiesQuery({});

  const [deleteSpeciality] = useDeleteSpecialityMutation();

  const handleDelete = async (id: string) => {
    try {
      console.log(id);
      const res = await deleteSpeciality(id).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Speciality deleted successfully", { duration: 2000 });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 400 },
    {
      field: "icon",
      headerName: "Icon",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box>
            <Image src={row.icon} width={30} height={30} alt="icon" />
          </Box>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        );
      },
    },
  ];

  console.log(specialities);
  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Button onClick={() => setIsModalOpen(true)}>Create Speciality</Button>
        <SpecialityModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField size="small" placeholder="Search Specialist" />
      </Stack>

      <Box>
        {!isLoading ? (
          <Box>
            <DataGrid
              rows={specialities}
              columns={columns}
              hideFooter={true}
            ></DataGrid>
          </Box>
        ) : (
          <h1>Loading...</h1>
        )}
      </Box>
    </Box>
  );
};

export default SpecialitiesPage;
