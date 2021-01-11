import React from "react";
import '../../Styles/ChatWindow.scss';
import TextBar from "./TextBar";
import ChatMessages from "./ChatMessages";


export default function ChatWindow(props?: any) {
    // this messageString will store the string from TextBar and pass it to the chatMessages component.
    const [messageString, setMessageString] = React.useState<string>('');


    return (
        <div style={{margin: "4em"}}>
            <ChatMessages messageString={messageString} setMessageString={setMessageString} setLiveEditorInput={props.setLiveEditorInput}/>
            <TextBar setMessageString={setMessageString}/>
        </div>
    );
}
