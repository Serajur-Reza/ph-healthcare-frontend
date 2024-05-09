"use client";

import { Box, Stack, Button, TextField, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import ScheduleModal from "./components/ScheduleModal";
import {
  useDeleteScheduleMutation,
  useGetAllSchedulesQuery,
} from "@/redux/api/scheduleApi";
import { dateFormatter } from "@/utils/dateFormatter";
import dayjs from "dayjs";
import { TSchedule } from "@/types/schedule";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "sonner";
import CreateIcon from "@mui/icons-material/Create";
import { useRouter } from "next/navigation";

type Props = {};

const SchedulesPage = (props: Props) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [allSchedules, setAllSchedules] = useState();
  const { data: getSchedules, isLoading } = useGetAllSchedulesQuery({});
  const [deleteSchedule] = useDeleteScheduleMutation();

  const schedules = getSchedules?.schedules;
  const meta = getSchedules?.meta;

  useEffect(() => {
    const updatedData = schedules?.data?.map((schedule: TSchedule) => {
      return {
        id: schedule?.id,
        startDate: dateFormatter(schedule?.startDateTime),
        endDate: dateFormatter(schedule?.endDateTime),
        startTime: dayjs(schedule?.startDateTime).format("hh:mm a"),
        endTime: dayjs(schedule?.endDateTime).format("hh:mm a"),
      };
    });

    setAllSchedules(updatedData);
  }, [schedules]);

  const deleteHandler = async (id: string) => {
    const res = await deleteSchedule(id);
    console.log(res);
    if (res?.data?.id) {
      toast.error("Schedule deleted successfully!!!", { duration: 2000 });
    }
  };

  const columns: GridColDef[] = [
    { field: "startDate", headerName: "Start Date", flex: 1 },
    { field: "endDate", headerName: "End Date", flex: 1 },
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
            <IconButton onClick={() => deleteHandler(row?.id)}>
              <DeleteIcon sx={{ color: "red" }} />
            </IconButton>
            <IconButton
              onClick={() =>
                router.push(`/dashboard/admin/schedules/${row?.id}`)
              }
            >
              <CreateIcon />
            </IconButton>
          </div>
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
        <Button onClick={() => setIsModalOpen(true)}>Create Schedule</Button>
        <ScheduleModal open={isModalOpen} setOpen={setIsModalOpen} />
        <TextField
          // onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
          placeholder="Search Schedule"
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
