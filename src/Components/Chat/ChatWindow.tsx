import React from "react";
import '../../Styles/ChatWindow.scss';
import TextBar from "./TextBar";
import ChatMessages from "./ChatMessages";


export default function ChatWindow(props?: any) {
    const [messageString, setMessageString] = React.useState<string>('');


    return (
        <div>
            <ChatMessages messageString={messageString} setMessageString={setMessageString}/>
            <TextBar setMessageString={setMessageString}/>
        </div>
    );
}
