import React from "react";
import '../../Styles/ChatWindow.scss';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import {IconButton} from "@material-ui/core";
import AudioComponent from "../AudioComponent";


export default function TextBar(props?: any) {
    const [currentlyRecording, setCurrentlyRecording] = React.useState<boolean>(false);
    const [inputValue, setInputValue] = React.useState<string>("");
    const [audioComponent, setAudioComponent] = React.useState<AudioComponent|null>(null);



    function startRecording() {
        setCurrentlyRecording(true);
        const ac = new AudioComponent(setInputValue);
        setAudioComponent(ac);
        ac.startRecording();
    }

    function stopRecording() {
        setCurrentlyRecording(false);
        audioComponent!.stopRecording();
    }

    return (
        <div className={'text-bar'}>
            <input type={'text'}
                   value={inputValue}
                   onChange={e => setInputValue(e.target.value)}
                   onKeyPress={event => event.key === 'Enter' && inputValue.length > 0 ? props.setMessageString(inputValue) : null}/>
            <div className={'buttons'}>
                {(() => {
                    if (currentlyRecording) {
                        return (
                            <IconButton onClick={stopRecording}>
                                <MicIcon style={{
                                    color: 'red',
                                }}/>
                            </IconButton>
                        )
                    } else {
                        return (
                            <IconButton onClick={startRecording}>
                                <MicIcon/>
                            </IconButton>
                        )
                    }
                })()}
                <IconButton
                    onClick={() => props.setMessageString(inputValue)}>
                    <SendIcon />
                </IconButton>
            </div>
        </div>


    )
}
