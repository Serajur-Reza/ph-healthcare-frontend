"use client";

import { Box, Stack, Button, TextField, IconButton } from "@mui/material";

import React, { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DoctorModal from "./components/DoctorModal";
import {
  useDeleteDoctorMutation,
  useGetAllDoctorsQuery,
} from "@/redux/api/doctorApi";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import { toast } from "sonner";
import { useDebounce } from "@/redux/hooks";

type Props = {};

const DoctorsPage = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const query: Record<string, any> = {};
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedTerm = useDebounce({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = searchTerm;
  }

  const { data: doctors, isLoading } = useGetAllDoctorsQuery({ ...query });
  const [deleteDoctor] = useDeleteDoctorMutation();

  console.log(searchTerm);

  const handleDelete = async (id: string) => {
    try {
      console.log(id);
      const res = await deleteDoctor(id).unwrap();
      console.log(res);
      if (res?.id) {
        toast.success("Doctor deleted successfully", { duration: 2000 });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  console.log(doctors?.doctors);
  console.log(doctors?.meta);

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "contactNumber", headerName: "Contact Number", flex: 1 },
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
  return (
    <Box>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Button onClick={() => setIsModalOpen(true)}>Create Doctor</Button>
        <DoctorModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Doctor"
        />
      </Stack>

      <Box>
        {!isLoading ? (
          <Box>
            <DataGrid
              rows={doctors?.doctors}
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

export default DoctorsPage;
