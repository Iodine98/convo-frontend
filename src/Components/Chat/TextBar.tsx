import React from "react";
import '../../Styles/ChatWindow.scss';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import {IconButton} from "@material-ui/core";
import AudioComponent from "../AudioComponent";


export default function TextBar(props?: any) {
    // currentlyRecording shows whether the mic icon is red (true) or gray (false)
    const [currentlyRecording, setCurrentlyRecording] = React.useState<boolean>(false);
    // inputValue is the input value from the <input> element
    const [inputValue, setInputValue] = React.useState<string>("");
    // audioComponent here is initialized with null, because it only gets initialized once the user has started recording (clicked on the mic icon)
    const [audioComponent, setAudioComponent] = React.useState<AudioComponent|null>(null);


    /**
     * Starts recording
     * - Mic icon turns red.
     * - Audio Component gets initialized
     * - The start recording function of the AudioComponent is called
     */
    function startRecording() {
        setCurrentlyRecording(true);
        const ac = new AudioComponent(setInputValue);
        setAudioComponent(ac);
        ac.startRecording();
    }

    /**
     * Stops the recording
     * - Mic icon turns gray
     * - stopRecording from AudioComponent is called
     */
    function stopRecording() {
        setCurrentlyRecording(false);
        audioComponent!.stopRecording();
    }

    /**
     * Checks whether the user clicked on the send button or pressed enter
     * @param event when the user presses 'Enter' key -> addMessage to ChatWindow
     * @param clicked when the users clicks on the send icon -> addMessage to ChatWindow
     */
    function onSubmit(event: any, clicked: boolean) {
        if((clicked || event.key === 'Enter') && inputValue.length > 0){
            props.setMessageString(inputValue);
            setInputValue('');
        }
    }

    /**
     * Render method of text bar
     */
    return (
        <div className={'text-bar'}>
            <input type={'text'}
                   value={inputValue}
                   onChange={e => setInputValue(e.target.value)}
                   onKeyPress={event => onSubmit(event, false)}/>
            <div className={'buttons'}>
                {(() => {
                    if (currentlyRecording) {
                        return (
                            <IconButton onClick={stopRecording}>
                                <MicIcon style={{
                                    // color is red when currently recording
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
                    onClick={event => onSubmit(event,true)}>
                    <SendIcon />
                </IconButton>
            </div>
        </div>


    )
}
