import DashboardDrawer from "@/components/Dashboard/DashboardDrawer/DashboardDrawer";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = (props: Props) => {
  const { children } = props;
  return <DashboardDrawer>{children}</DashboardDrawer>;
};

export default DashboardLayout;
