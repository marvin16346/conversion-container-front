import { useRouter } from "next/router";
import Typography from '@mui/material/Typography'
import { Box, Divider, Grid, IconButton, Stack, Button } from "@mui/material";
import ConversionProvider from "@/provider/ConversionProvider";
import MediaPanel from '@/component/panel/MediaPanel';
import EventPanel from '@/component/panel/EventPanel';
import { useState } from "react";
import DeployDialog from "@/component/dialog/DeployDialog";
import ConversionPanel from "@/component/panel/ConversionPanel";

const TagManager = () => {
    const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    const { domain } = router.query;

    if (!router.isReady) {
        return;
    }

    return ( 
        <Box>
            <Box p={10}>
                <Grid 
                    container 
                    spacing={2}
                    direction="row"    
                    // justifyContent="space-around"
                    // textAlign="center"
                >
                    <Grid item xs={8}>
                        <Typography variant="h3" color="initial">{domain}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <Button variant="contained"
                            onClick={() => {
                                setOpen(true);
                            }}
                         >
                            배포하기 
                        </Button>
                    </Grid>
                </Grid>
            </Box>

            <ConversionProvider>
                <Stack spacing={8}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-around"
                        textAlign="center"
                        spacing={4}
                    >
                        {/* 매체 */}
                        <MediaPanel/>

                        {/* 이벤트 */}
                        <EventPanel/>
                    </Grid>

                    <ConversionPanel/>

                    {/* <AllConversion/> */}
                </Stack>
            </ConversionProvider>   

            {
                domain
                &&
                <DeployDialog 
                    domain={domain as string} 
                    open={open} 
                    onClose={() => setOpen(false)}
                />
            }
        </Box>
     );
}
 


export default TagManager;

