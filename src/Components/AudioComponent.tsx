import axios from 'axios';

export default class AudioComponent {
    private mediaRecorder: MediaRecorder | null = null;
    private mediaRecorderPromise = this.initializeMediaRecorder();
    private mediaChunks: BlobPart[] = [];
    private setInputValue: Function;

    constructor(setInputValue: Function) {
        this.setInputValue = setInputValue;
    }

    public startRecording() {
        this.mediaRecorderPromise.then(mediaRecorder => {
            this.mediaRecorder = mediaRecorder;
            this.mediaRecorder.start();
            console.log(this.mediaRecorder.state);
            console.log("recorder started");
            this.mediaRecorder.ondataavailable = e => {
                this.mediaChunks.push(e.data)
            };
        });
    };

    public stopRecording() {
        if (this.mediaRecorder == null) {
            console.error('MediaRecorder has not been initialized.')
        } else {
            this.mediaRecorder.stop();
            console.log(this.mediaRecorder.state);
            this.mediaRecorder.onstop = () => {
                const audioFile: Blob = new Blob(this.mediaChunks);
                this.mediaRecorder!.stream.getAudioTracks().map(channel => channel.stop());
                this.postAudioFile(audioFile);
            };
            console.log("recorder stopped.");
        }
    }

    private postAudioFile(audioFile: Blob) {
        axios.post('/file', audioFile, {
            headers: {
                'Content-Type': 'audio/webm;codecs=opus',
                'Sign': Math.round(Math.random() * 10).toString(),
            }
        }).then(response => {
            console.log(response.data);
            this.setInputValue(response.data);
        }).catch(console.error);
    }

    private initializeMediaRecorder(): Promise<MediaRecorder> {
        return new Promise(resolve => {
            navigator.mediaDevices.getUserMedia({
                audio: {
                    sampleSize: 16,
                },
                video: false,
            }).then(stream => {
                resolve(new MediaRecorder(stream, {
                    mimeType: 'audio/webm;codecs=opus',
                }));
            });
        });
    }
}
