import React from "react";
// @ts-ignore
import ChatBot from 'react-simple-chatbot';

interface Message {
    id: string,
    message?: string,
    user?: boolean,
    trigger?: string,
    end?: boolean,
}

export default function ChatWindow(props: any) {
    const initialSteps = [
        {
            id: '1',
            message: 'What is your name?',
            trigger: '2'
        }, {
            id: '2',
            user: true,
            trigger: '2'
        },
    ];
    const [steps, setSteps] = React.useState<Message[]>(initialSteps);

    return (
        <div>
            <ChatBot
                headerTitle="Convo"
                recognitionEnable={true}
                floating={true}
                steps={steps}
            />
        </div>
    );


}

// <div>
//     {/*<button className='open-button' onClick={}>Chat</button>*/}
//     {/*<div className='chat-popup' id='myForm'>*/}
//     {/*    <h1>Chat</h1>*/}
//     {/*    <label htmlFor='msg'>Message</label>*/}
//     {/*    <textarea placeholder='Type message...' name='msg' required/>*/}
//     {/*    <button type='submit' className='btn'>Send</button>*/}
//     {/*    <button type='button' className='btn cancel' onClick={closeForm}/>*/}
//     {/*</div>*/}
// {/*</div>*/}
