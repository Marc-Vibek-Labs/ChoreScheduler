import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Box } from "@chakra-ui/react";
import { CustomFade } from "../../../components/CustomFade";

export default function Dashboard() {
  return (
    <Box>
      <CustomFade style={{ width: "100%" }}>
        <Navbar />
        <Sidebar />
      </CustomFade>
    </Box>
  );
}
