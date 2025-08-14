import { Box, Stack } from "@mui/material";
import DownloadChart from "../../Dashboard/DownloadChart";
import TagChart from "../../Dashboard/TagChart";
import DownloadActivityHistory from "../../Dashboard/DownloadActivityHistory";

const Dashboard: React.FC = () => {
    return (
<Box >
      <Stack direction="column" spacing={3}>


            <TagChart />

            <Stack direction="row" spacing={3}>
                <DownloadChart />
                <DownloadActivityHistory />
            </Stack>

        </Stack>

</Box>
      

    );
};

export default Dashboard;
