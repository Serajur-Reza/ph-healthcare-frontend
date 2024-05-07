"use client";

import PHFileUploader from "@/components/Forms/PHFileUploader";
import PHForm from "@/components/Forms/PHForm";
import PHInput from "@/components/Forms/PHInput";
import PHModal from "@/components/Shared/PHModal/PHModal";
import { useCreateSpecialityMutation } from "@/redux/api/specialitiesApi";
import { modifyPayload } from "@/utils/modifyPayload";
import { Button, Grid } from "@mui/material";
import React from "react";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { toast } from "sonner";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpecialityModal = (props: Props) => {
  const { open, setOpen } = props;

  const [createSpeciality] = useCreateSpecialityMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    const res = await createSpeciality(data).unwrap();

    if (res?.id) {
      toast.success("Speciality created successfully", { duration: 2000 });
      setOpen(false);
    }
    try {
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div>
      <PHModal open={open} setOpen={setOpen} title="Create a new speciality">
        <PHForm onSubmit={handleFormSubmit}>
          <Grid container spacing={2}>
            <Grid item md={6}>
              <PHInput name="title" label="title" />
            </Grid>
            <Grid item md={6}>
              <PHFileUploader name="file" label="file" />
            </Grid>
          </Grid>

          <Button type="submit" sx={{ mt: 1 }}>
            Create
          </Button>
        </PHForm>
      </PHModal>
    </div>
  );
};

export default SpecialityModal;
