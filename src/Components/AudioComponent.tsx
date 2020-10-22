import React from "react";
import {Card, CardActionArea, CardContent, CardMedia} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import IconButton from "@material-ui/core/IconButton";
const axios = require('axios').default;


export default function AudioComponent(props: any) {
    let [mediaRecorder, setMediaRecorder] = React.useState<MediaRecorder | null>(null);
    const [mediaChunks, setMediaChunks] = React.useState<BlobPart[]>([]);
    const [recording, setRecording] = React.useState(true);


    const useStyles = makeStyles((theme: any) => ({
        root: {
            margin: theme.spacing(3),
            width: 500,
        },
        media: {
            height: 250,
        },
        title: {
            color: theme.palette.primary.main,
        }
    }));
    const classes = useStyles();


    function startRecording() {
        navigator.mediaDevices.getUserMedia({
            audio: true,
        }).then(stream => {
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start();
            console.log(mediaRecorder!.state)
            console.log("recorder started");
            setRecording(false);
            mediaRecorder!.ondataavailable = e => {
                mediaChunks.push(e.data)
            }
            console.log(mediaRecorder)
            setMediaRecorder(mediaRecorder);
        }).catch(console.error)
    }

    function stopRecording() {
        const audio = document.querySelector('audio')!;

        mediaRecorder!.stop();
        console.log(mediaRecorder!.state)
        mediaRecorder!.onstop = () => {
            const audioFile: File = new File(mediaChunks, 'audioFile.flac', {
                type: 'audio/flac',
            })
            setMediaChunks([]);
            audio.src = window.URL.createObjectURL(audioFile);
            mediaRecorder!.stream.getAudioTracks()[0].stop();
            setRecording(true);
            postAudioFile(audioFile);
        }
        console.log("recorder stopped.")
    }

    function postAudioFile(audioFile: File) {
        const bodyFormData = new FormData();
        bodyFormData.append('audioFile', audioFile, 'audioFile.flac');
        axios.post('/blob', bodyFormData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(console.log)
            .catch(console.error);
    }


    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://thumbs.dreamstime.com/b/old-record-4101224.jpg"
                    title="Recording...."
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                        Recording
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        You can record and play back your own voice.
                    </Typography>
                </CardContent>

            </CardActionArea>
            <CardActions>
                <IconButton onClick={startRecording}>
                    <MicIcon/>
                </IconButton>
                <IconButton onClick={stopRecording} disabled={recording}>
                    <MicOffIcon/>
                </IconButton>
                <audio controls id='audio'/>
            </CardActions>
        </Card>
    )
}
