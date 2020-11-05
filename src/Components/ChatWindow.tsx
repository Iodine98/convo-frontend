import React from "react";
// @ts-ignore
import ChatBot from 'react-simple-chatbot';

interface TextStep {
    id: string | number,
    message?: string | ((previousValue: string, steps: Message[]) => string),
    trigger?: string | number | ((value: string, steps: Message[]) => string),
    avatar: string
}

interface Message {
    id: string | number,
    message?: string | ((previousValue: string, steps: Message[]) => string),
    user?: boolean,
    trigger?: string | number | ((value: string, steps: Message[]) => string),
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
            trigger: '3'
        }, {
            id: '3',
            message: (previousValue: string, steps: Message[]) => `Hello ${previousValue}`,
        }
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
