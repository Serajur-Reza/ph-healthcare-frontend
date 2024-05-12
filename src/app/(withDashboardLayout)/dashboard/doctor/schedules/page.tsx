"use client";

import { Box, Stack, Button, TextField, IconButton, Link } from "@mui/material";
import React, { useEffect, useState } from "react";
import DoctorScheduleModal from "./components/DoctorScheduleModal";
import { TSchedule } from "@/types/schedule";
import { dateFormatter } from "@/utils/dateFormatter";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { useGetAllDoctorSchedulesQuery } from "@/redux/api/doctorScheduleApi";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = {};

const SchedulesPage = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [allSchedules, setAllSchedules] = useState();

  const { data: getSchedules, isLoading } = useGetAllDoctorSchedulesQuery({});

  const schedules = getSchedules?.schedules;
  const meta = getSchedules?.meta;

  console.log(schedules?.data);

  useEffect(() => {
    const updatedData = schedules?.data?.map(
      (schedule: TSchedule, index: number) => {
        return {
          sl: index + 1,
          id: schedule?.scheduleId,
          startDate: dateFormatter(schedule?.schedule?.startDateTime),
          startTime: dayjs(schedule?.schedule?.startDateTime).format("hh:mm a"),
          endTime: dayjs(schedule?.schedule?.endDateTime).format("hh:mm a"),
        };
      }
    );

    setAllSchedules(updatedData);
  }, [schedules]);

  const columns: GridColDef[] = [
    { field: "sl", headerName: "Serial", flex: 1 },
    { field: "startDate", headerName: "Date", flex: 1 },
    { field: "startTime", headerName: "Start Time", flex: 1 },
    { field: "endTime", headerName: "End Time", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <div>
            <IconButton>
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
            {/* <Link href={`/dashboard/admin/schedules/${row?.id}`}>
              <IconButton>
                <CreateIcon />
              </IconButton>
            </Link> */}
          </div>
        );
      },
    },
  ];
  return (
    <Box>
      {" "}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Button onClick={() => setIsModalOpen(true)}>
          Create Doctor Schedule
        </Button>
        <DoctorScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          // onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Doctor"
        />
      </Stack>
      {!isLoading ? (
        <Box my={2}>
          <DataGrid rows={allSchedules ?? []} columns={columns} />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default SchedulesPage;
