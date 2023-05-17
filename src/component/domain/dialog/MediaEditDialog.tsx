import {  Box, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemButton, ListItemText, TextareaAutosize, Typography, Button, Stack, TextField } from "@mui/material";
import TrackingId from "@/component/domain/unit/TrackingId";
import { Media } from "@/data/media";
import { useState } from "react";
import SyntaxEditor from "../../common/SyntaxEditor";
import { useRouter } from "next/router";
import defaultAxios from "@/axios/axios";

type Props = {
    media: Media,
    open: boolean,
    onClose: Function,
    onSubmit: Function
}

const MediaEditDialog = ({ media, open, onClose, onSubmit }: Props) => {
    // const [open, setOpen] = useState<boolean>(false);
    const router = useRouter();
    const [trackingList, setTrackingList] = useState<Array<string>>(media.trackingList);


    return ( 
        <Dialog onClose={onClose} open={open}>
            <DialogTitle>
                <Typography variant="h4">
                    {media.name} 설정
                </Typography>
            </DialogTitle>

            <DialogContent>
                <Stack spacing={8}>
                    <Box>
                        <Typography variant="h5">
                            공통 유틸리티 스크립트
                        </Typography>
                        <SyntaxEditor
                            text={media.commonScript}
                            keyString="media-editor"
                        />
                    </Box>

                    <Box>
                        <Typography variant="h5">
                            트래킹 ID 리스트
                        </Typography>
                        <TrackingId 
                            trackingList={trackingList}
                            setTrackingList={setTrackingList}
                        />
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button 
                    variant="contained"
                    onClick={onClose}    
                >
                    취소
                </Button>
                <Button 
                    variant="contained"
                    onClick={async () => {
                        const res = await defaultAxios.put(
                            `/media/${media.name}`, 
                            {
                                name: media.name,
                                commonScript : document.getElementById("media-editor-code-input")!.value,
                                trackingList: trackingList
                            }    
                        )
                    }}
                >
                    저장
                </Button>
            </DialogActions>
        </Dialog>
     );
}
 
export default MediaEditDialog;