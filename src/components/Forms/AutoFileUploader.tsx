"use client";

import * as React from "react";
import { SxProps, styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Input, SvgIconProps } from "@mui/material";
import { ReactElement } from "react";

type Props = {
  name: string;
  label?: string;
  accept?: string;
  sx?: SxProps;
  icon?: ReactElement<SvgIconProps>;
  variant?: "contained" | "text";
  onFileUpload: (file: File) => void;
};

export default function AutoFileUploader(props: Props) {
  const { name, label, accept, sx, icon, variant, onFileUpload } = props;
  //   const { control } = useFormContext();
  return (
    <Box>
      <Button
        component="label"
        role={undefined}
        variant={variant}
        tabIndex={-1}
        startIcon={icon ? icon : <CloudUploadIcon />}
        sx={{ ...sx }}
      >
        {label || "Upload file"}
        <Input
          type="file"
          inputProps={{ accept: accept }}
          style={{ display: "none" }}
          onChange={(e) => {
            const fileInput = e.target as HTMLInputElement;
            const file = fileInput.files?.[0];
            if (file) {
              onFileUpload(file);
            }
          }}
        />
      </Button>
    </Box>
  );
}
