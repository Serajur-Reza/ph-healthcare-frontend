import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { getTimeIn12HourFormat } from "@/utils/dateFormatter";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: string,
  selectedScheduleIds: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      selectedScheduleIds.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

type TProps = {
  schedules: any;
  selectedScheduleIds: any;
  setSelectedScheduleIds: any;
};

export default function PHMultiSelectField(props: TProps) {
  const { schedules, selectedScheduleIds, setSelectedScheduleIds } = props;

  console.log(schedules);
  const theme = useTheme();
  // const [selectedSchedule, setSelectedSchedule] = React.useState<string[]>([]);

  const handleChange = (
    event: SelectChangeEvent<typeof selectedScheduleIds>
  ) => {
    const {
      target: { value },
    } = event;
    setSelectedScheduleIds(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Chip</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={selectedScheduleIds}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value: any) => {
                const selectedSchedule = schedules?.find(
                  (schedule: any) => schedule.id === value
                );

                if (!selectedSchedule) {
                  return null;
                }

                const formattedTimeSlot = `${getTimeIn12HourFormat(
                  selectedSchedule?.startDateTime
                )} -
                ${getTimeIn12HourFormat(selectedSchedule?.endDateTime)}`;
                return <Chip key={value} label={formattedTimeSlot} />;
              })}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {schedules?.map((schedule: any) => (
            <MenuItem
              key={schedule.id}
              value={schedule.id}
              style={getStyles(schedule.id, selectedScheduleIds, theme)}
            >
              {`${getTimeIn12HourFormat(schedule?.startDateTime)} -
                ${getTimeIn12HourFormat(schedule?.endDateTime)}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
