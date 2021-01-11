import React, {useEffect} from "react";
import '../../Styles/ChatWindow.scss';
import photo from '../../images/small_image_size.jpg';

// interface to help with type checking each chatMessage object
interface ChatMessage {
    id: number | string,
    avatar: string,
    message: string,
    time: Date,
}

interface CodeSnippet {
    variableName: string,
    type: string,
    value: string,
}

type CodeEntities = 'variableName' | 'type' | 'value';


export default function ChatMessages(props?: any) {
    // A magic number to distinguish my own message from someone else's
    const currentId: number = 1;
    // initializing the messages array with example messages
    // {
    //     message: 'What would you like to name your variable?',
    //         id: 2,
    //     avatar: "",
    //     time: new Date(),
    // }
    const [messages, setMessages] = React.useState<ChatMessage[]>([]);
    const [editorReady, setEditorReady] = React.useState<boolean>(false);
    const [codeSnippet, setCodeSnippet] = React.useState<CodeSnippet>({
        'variableName': '',
        'type': '',
        'value': '',
    });
    const [statementType, setStatementType] = React.useState<string>('');

    const variableEntitiesReg: string[] = ['name of your variable', 'type of your variable', 'value of your variable'];
    const functionEntitiesReg: string[] = ['name of your function', 'return type of your function', 'parameter(s) of your function (with spaces in between)'];
    const variableEntities: CodeEntities[] = ['variableName', 'type', 'value'];
    const statementTypeRegexes = ['variable', 'function']

    useEffect(() => {
        if (!editorReady && props.messageString !== '') {
            setMessages(prevMessages => [...prevMessages, {message: props.messageString, id: 1, avatar: photo, time: new Date()}]);
            if (statementType === ''){
                const statementTypeRegexIndex = statementTypeRegexes.findIndex(regex => new RegExp(regex, 'i').test(props.messageString));
                setStatementType(statementTypeRegexIndex > -1 ? statementTypeRegexes[statementTypeRegexIndex] : '');
            }
        }
        return () => props.setMessageString('');
    }, [editorReady, props, messages, statementType, statementTypeRegexes]);
    
    useEffect(() => {
        if (statementType === 'variable' && messages.findIndex(message => message.message === `What is the ${variableEntitiesReg[0]}?`) === -1){
            setMessages(prevMessages => [...prevMessages, {
                message: `What is the ${variableEntitiesReg[0]}?`,
                id: 2,
                avatar: '',
                time: new Date()
            }]);    
        } else if (statementType === 'function' && messages.findIndex(message => message.message === `What is the ${functionEntitiesReg[0]}?`) === -1){
            setMessages(prevMessages => [...prevMessages, {
                message: `What is the ${functionEntitiesReg[0]}?`,
                id: 2,
                avatar: '',
                time: new Date()
            }])
        }
        
    }, [functionEntitiesReg, messages, statementType, variableEntitiesReg])


    // if messageString from ChatWindow is not empty (i.e. there is a new message) addMessage when either messages or props changes
    useEffect(() => {
        if (!editorReady && messages.length >= 2 && messages[messages.length - 1].id !== 2 && statementType === 'variable') {
            const currentMessage: ChatMessage = messages.pop()!;
            const lastMessage: ChatMessage = messages.pop()!;
            messages.push(...[lastMessage, currentMessage]);
            const stringEntitiesIndex: number = variableEntitiesReg.findIndex(stringEntity => new RegExp(stringEntity, 'i').test(lastMessage.message));
            if (stringEntitiesIndex > -1) {
                setCodeSnippet(prevCodeSnippet => {
                    return {
                        ...prevCodeSnippet,
                        [variableEntities[stringEntitiesIndex]]: currentMessage.message
                    };
                })
                if (stringEntitiesIndex < variableEntities.length - 1) {
                    setMessages(prevMessages => [...prevMessages, {
                        message: `What is the ${variableEntitiesReg[stringEntitiesIndex + 1]}?`,
                        id: 2,
                        avatar: '',
                        time: new Date()
                    }]);
                }
            }
        }
        return () => {
            const finished = codeSnippet.variableName !== '' && codeSnippet.value !== '' && codeSnippet.type !== '';
            setStatementType(prevState => finished ? '' : prevState);
            setEditorReady(finished);
            props.setMessageString('');
        }
    }, [editorReady, messages, codeSnippet, props, variableEntitiesReg, variableEntities, statementType])

    useEffect(() => {
        if (editorReady) {
            props.setLiveEditorInput(codeSnippet);

        }
    })


    /**
     * Render method of ChatMessages
     */
    return (
        <div style={{maxHeight: '25em'}}>
            {messages.map((message) => {
                    // my own messages
                    if (message.id === currentId) {
                        return (
                            <div className={'container darker'} key={`${message.time.toDateString()} | ${message.time.toTimeString()}`}>
                                <img src={message.avatar} alt={'Avatar'} className={'right'}/>
                                <p>{message.message}</p>
                                <span className={'time-right'}>{`${message.time.toDateString()} | ${message.time.toTimeString()}`}</span>
                            </div>
                        )
                        // other party's messages
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
        </div>
    );
}
