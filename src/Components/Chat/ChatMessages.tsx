import React, {useEffect} from "react";
import '../../Styles/ChatWindow.scss';
import photo from '../../images/small_image_size.jpg';
import TextBar from "./TextBar";

interface ChatMessage {
    id: number | string,
    avatar: string,
    message: string,
    time: Date,
}


export default function ChatMessages(props?: any) {
    const currentId: number = 1;
    const temp_messages: ChatMessage[] = [
        {
            id: 1,
            avatar: photo,
            message: "Hello. How are you today?",
            time: new Date(),

        }, {
            id: 2,
            avatar: photo,
            message: 'I\'m fine. Thanks for asking.',
            time: new Date(),
        }, {
            id: 1,
            avatar: photo,
            message: 'Sweet! So, what do you wanna do today?',
            time: new Date(),
        }, {
            id: 2,
            avatar: photo,
            message: 'Nah, I dunno. Play soccer... or learn more coding perhaps?',
            time: new Date(),
        }
    ]
    const [messages, setMessages] = React.useState<ChatMessage[]>(temp_messages);


    useEffect(() => {
        if (props.messageString !== '') {
            const addMessage = (message: string, id = 1, avatar: string = photo, time: Date = new Date()) => {
                setMessages([...messages, {message, id, avatar, time}]);
            }
            addMessage(props.messageString);
            props.setMessageString('');
        }
    }, [messages, props]);


    return (
        <div>
            {messages.map((message) => {
                    if (message.id === currentId) {
                        return (
                            <div className={'container darker'} key={`${message.time.toDateString()} | ${message.time.toTimeString()}`}>
                                <img src={message.avatar} alt={'Avatar'} className={'right'}/>
                                <p>{message.message}</p>
                                <span className={'time-right'}>{`${message.time.toDateString()} | ${message.time.toTimeString()}`}</span>
                            </div>
                        )
                    } else {
                        return (
                            <div className={'container'} key={`${message.time.toDateString()} | ${message.time.toTimeString()}`}>
                                <img src={message.avatar} alt={'Avatar'}/>
                                <p>{message.message}</p>
                                <span className={'time-left'}>{`${message.time.toDateString()} | ${message.time.toTimeString()}`}</span>
                            </div>
                        )
                    }
                }
            )}
            <TextBar/>
        </div>
    );
}
