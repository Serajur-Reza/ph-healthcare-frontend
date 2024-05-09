export type TSchedule = {
  startTime(startTime: any): unknown;
  endTime(endTime: any): unknown;
  id?: string;
  startDate: string;
  endDate: string;
};

export type TScheduleFrom = {
  startDate: Date;
  endDate: Date;
  startTime: string;
  endTime: string;
};
