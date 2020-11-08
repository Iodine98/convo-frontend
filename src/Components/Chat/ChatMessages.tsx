import React, {useCallback, useEffect} from "react";
import '../../Styles/ChatWindow.scss';
import photo from '../../images/small_image_size.jpg';
import TextBar from "./TextBar";

interface ChatMessage {
    id: number | string,
    avatar: string,
    message: string,
    time: string,
}


export default function ChatMessages(props?: any) {
    const currentId: number = 1;
    const temp_messages = [
        {
            id: 1,
            avatar: photo,
            message: "Hello. How are you today?",
            time: "11:00",

        }, {
            id: 2,
            avatar: photo,
            message: 'I\'m fine. Thanks for asking.',
            time: '11:01',
        }, {
            id: 1,
            avatar: photo,
            message: 'Sweet! So, what do you wanna do today?',
            time: '11:02',
        }, {
            id: 2,
            avatar: photo,
            message: 'Nah, I dunno. Play soccer... or learn more coding perhaps?',
            time: '11:05',
        }
    ]
    const [messages, setMessages] = React.useState<ChatMessage[]>([]);


    useEffect(() => {
        if (props.messageString !== '') {
            const addMessage = (message: string, id = 1, avatar = photo, time = '11:00') => {
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
                            <div className={'container darker'} key={message.id + '|' + message.message + '|' + message.time}>
                                <img src={message.avatar} alt={'Avatar'} className={'right'}/>
                                <p>{message.message}</p>
                                <span className={'time-right'}>{message.time}</span>
                            </div>
                        )
                    } else {
                        return (
                            <div className={'container'} key={message.id + '|' + message.message + '|' + message.time}>
                                <img src={message.avatar} alt={'Avatar'}/>
                                <p>{message.message}</p>
                                <span className={'time-left'}>{message.time}</span>
                            </div>
                        )
                    }
                }
            )}
            <TextBar/>
        </div>
    );
}
