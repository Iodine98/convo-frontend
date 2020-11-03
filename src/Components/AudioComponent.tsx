import React from "react";
import {Card, CardActionArea, CardContent, CardMedia} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import IconButton from "@material-ui/core/IconButton";
import axios from 'axios';


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
            audio: {
                sampleSize: 16,
            },
            video: false,
        }).then(stream => {
            if (MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
                mediaRecorder = new MediaRecorder(stream, {
                    mimeType: 'audio/webm;codecs=opus',
                });
                mediaRecorder.start();
                console.log(mediaRecorder!.state);
                console.log("recorder started");
                setRecording(false);
                mediaRecorder!.ondataavailable = e => {
                    mediaChunks.push(e.data)
                };
                setMediaRecorder(mediaRecorder);
            } else {
                throw Error('MediaRecorder does not support WEBM audio.');
            }

        }).catch(console.error);
    }

    function stopRecording() {
        const audio = document.querySelector('audio')!;
        mediaRecorder!.stop();
        console.log(mediaRecorder!.state);
        mediaRecorder!.onstop = () => {
            const audioFile: Blob = new Blob(mediaChunks)
            audio.src = window.URL.createObjectURL(audioFile);
            mediaRecorder!.stream.getAudioTracks()[0].stop();
            setRecording(true);
            setMediaChunks([]);
            postAudioFile(audioFile);
        };
        console.log("recorder stopped.");
    }

    function postAudioFile(audioFile: Blob) {
        axios.post('/file', audioFile, {
            headers: {
                'Content-Type': 'audio/webm;codecs=opus',
                'Sign': Math.round(Math.random() * 10).toString(),
            }
        }).then(response => {
            props.setTranscript(response.data);
        }).catch(console.error);
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
    );
}
