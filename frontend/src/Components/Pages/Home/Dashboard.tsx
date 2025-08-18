import { Box, Stack, Card, CardContent, Typography, Divider } from "@mui/material";
import DownloadChart from "../../Dashboard/DownloadChart";
import TagChart from "../../Dashboard/TagChart";
import DownloadActivityHistory from "../../Dashboard/DownloadActivityHistory";

const Dashboard: React.FC = () => {
    return (
        <Box sx={{ backgroundColor: "#E8F5E8", minHeight: "100vh", p: 3 }}>
            <Stack direction="column" spacing={3}>

                <TagChart />

                <Stack direction="row" spacing={3}>

                    <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 3 , height: 450}}>
                        <CardContent>
                            <Typography
                                variant="h6"
                                sx={{ color: "#689F38", fontWeight: 550, mb: 1.5 }}
                            >
                                Download Overview
                            </Typography>
                            <Divider />

                            <DownloadChart />
                        </CardContent>
                    </Card>

                    <Card sx={{ flex: 1, borderRadius: 3, boxShadow: 3 , height: 450}}>
                        <CardContent>
                            <Typography
                                variant="h6"
                                sx={{ color: "#689F38", fontWeight: 550, mb: 1.5 }}
                            >
                                Download Activity
                            </Typography>
                            <Divider />
                            <DownloadActivityHistory />
                        </CardContent>
                    </Card>
                </Stack>

            </Stack>
        </Box>
    );
};

export default Dashboard;
