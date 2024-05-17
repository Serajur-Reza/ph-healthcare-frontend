"use client";

import {
  Box,
  Stack,
  Button,
  TextField,
  IconButton,
  Link,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DoctorScheduleModal from "./components/DoctorScheduleModal";
import { TSchedule } from "@/types/schedule";
import { dateFormatter } from "@/utils/dateFormatter";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import dayjs from "dayjs";
import {
  useDeleteDoctorScheduleMutation,
  useGetAllDoctorSchedulesQuery,
} from "@/redux/api/doctorScheduleApi";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "sonner";

type Props = {};

const SchedulesPage = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const query: Record<string, unknown> = {};

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  query["page"] = page;
  query["limit"] = limit;

  const [allSchedules, setAllSchedules] = useState();

  const { data: getSchedules, isLoading } = useGetAllDoctorSchedulesQuery({
    ...query,
  });

  const [deleteDoctorSchedule] = useDeleteDoctorScheduleMutation();

  const schedules = getSchedules?.schedules;
  const meta = getSchedules?.schedules?.meta;

  let pageCount: number;

  if (meta?.total) {
    pageCount = Math.ceil(meta.total / limit);
  }

  useEffect(() => {
    const updatedData = schedules?.data?.map(
      (schedule: TSchedule, index: number) => {
        return {
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
            <IconButton onClick={() => handleDeleteDoctorSchedule(row?.id)}>
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

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleDeleteDoctorSchedule = async (id: string) => {
    try {
      const res = await deleteDoctorSchedule(id);
      console.log(res);
      if (res?.data?.scheduleId) {
        toast.success("doctor schedule deleted successfully", {
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error(error?.message || "error deleting doctor schedule", {
        duration: 2000,
      });
    }
  };

  return (
    <Box>
      {" "}
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Button
          onClick={() => setIsModalOpen(true)}
          endIcon={<AddIcon />}
          sx={{ mt: 3.5 }}
        >
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
          <DataGrid
            rows={allSchedules ?? []}
            columns={columns}
            hideFooterPagination
            slots={{
              footer: () => {
                return (
                  <Box
                    sx={{ mb: 2, display: "flex", justifyContent: "center" }}
                  >
                    <Pagination
                      color="primary"
                      count={pageCount}
                      page={page}
                      onChange={handleChange}
                    />
                  </Box>
                );
              },
            }}
          />
        </Box>
      ) : (
        <h1>Loading.....</h1>
      )}
    </Box>
  );
};

export default SchedulesPage;
