import axios from 'axios';

export default class AudioComponent {
    // only gets set when startRecording is called
    private mediaRecorder: MediaRecorder | null = null;
    // Enables the audio stream and configures the media recorder
    private mediaRecorderPromise = this.initializeMediaRecorder();
    // Chunks of raw audio data
    private mediaChunks: BlobPart[] = [];
    // Function that pass on the Google Speech-to-Text API's response
    private setInputValue: Function;


    // Initializes the function with the given setInputValue function
    constructor(setInputValue: Function) {
        this.setInputValue = setInputValue;
    }

    /**
     * Start the recording
     * - mediaRecorder gets set
     * - mediaRecorder starts and logs its state
     * - while it's recording, pushes raw chunks of audio data onto the media chunks array
     */
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

    /**
     * Stop the recording
     * - Check if mediaRecorder has been initialized
     * - Stop the mediaRecorder
     * - When the recording stops, create a file, disable all audio channels, post the audio request to the server
     */
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

    /**
     * Post request with given audioFile
     * @param audioFile the given audioFile
     * @private this function is not available outside this component for obvious reasons.
     */
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

    /**
     * initializes the mediaRecorder with the enabled audioChannel in the form of a promise
     * @private
     */
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
