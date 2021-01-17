import React, {useCallback, useEffect} from "react";
import '../../Styles/ChatWindow.scss';

// interface to help with type checking each chatMessage object
interface ChatMessage {
    id: number | string,
    avatar: string,
    message: string,
    time: Date,
}

export interface VariableSnippet {
    variableName: string,
    type: string,
    value: string,
    [name: string]: string,
}

export interface FunctionSnippet {
    functionName: string,
    variables: string[],
    body: string,
    returnType: string,

    [name: string]: string | string[],
}

export type CodeSnippet = FunctionSnippet | VariableSnippet | object;

const variableEntitiesQuestions: string[] = ['name of your variable', 'type of your variable', 'value of your variable'];
const functionEntitiesQuestions: string[] = ['name of your function', 'parameter(s) of your function (with spaces in between)', 'the body of your function', 'return type of your function'];
const entitiesQuestions: { [index: string]: string[] } = {
    'variable': variableEntitiesQuestions,
    'function': functionEntitiesQuestions,
};
const statementTypes: string[] = ['variable', 'function', 'clear'];
const variableEntities: string[] = ['variableName', 'type', 'value'];
const functionEntities: string[] = ['functionName', 'variables', 'body', 'returnType'];
const entityTypes: { [index: string]: string[] } = {
    'variable': variableEntities,
    'function': functionEntities,
};


export default function ChatMessages(props?: any) {
    // initializing the messages array with example messages
    const [messages, setMessages] = React.useState<ChatMessage[]>([]);
    const [editorReady, setEditorReady] = React.useState<boolean>(false);
    const [statementType, setStatementType] = React.useState<string>('');
    const myId: number = 1;
    const otherId: number = 2;
    const [codeSnippet, setCodeSnippet] = React.useState<CodeSnippet>({});
    const [entitiesRegIndex, setEntitiesRegIndex] = React.useState<number>(0);
    const [currentUser, setCurrentUser] = React.useState<number>(myId);

    const addMessage = useEffect(() => {
        if (props.messageString !== '') {
            const chatMessage: ChatMessage = {
                avatar: "", id: 1, message: props.messageString, time: new Date()
            }
            setMessages([...messages, chatMessage]);
            if (statementType === '') {
                setStatementType(props.messageString);
            }
            if (statementType === 'variable' && Object.keys(codeSnippet).length === 0){
                const newCodeSnippet: VariableSnippet = {
                    type: "", value: "", variableName: ""
                };
                setCodeSnippet(newCodeSnippet);
            }
            if (statementType === 'function' && Object.keys(codeSnippet).length === 0){
                const newCodeSnippet: FunctionSnippet = {
                    body: "", functionName: "", returnType: "", variables: [],
                };
                setCodeSnippet(newCodeSnippet);
            }
            props.setMessageString('');
        }
    }, [props, messages, statementType, codeSnippet])

    const response = useEffect(() => {
        if (messages.length > 0 && messages[messages.length - 1].id === myId && statementType !== '' && statementType !== 'clear' && entitiesRegIndex > -1 && entitiesRegIndex < entityTypes[statementType].length) {
            const computerMessage: ChatMessage = {
                message: `What is the ${entitiesQuestions[statementType][entitiesRegIndex]}?`,
                id: otherId,
                avatar: '',
                time: new Date()
            };
            setMessages(prevMessages => [...prevMessages, computerMessage]);
            setEntitiesRegIndex(prevState => prevState + 1);
        }
    }, [statementType, entitiesRegIndex, messages]);

    const analyzeStatement = useEffect(() => {
        if (messages.length > 2 && messages[messages.length - 1].id === myId){
            let finished = false;
            const currentMessage = messages[messages.length - 1];
            const entityKey: string = entityTypes[statementType][entitiesRegIndex - 1];
            if (statementType === 'variable') {
                setCodeSnippet((prevCodeSnippet: VariableSnippet) => {
                    const nextCodeSnippet: VariableSnippet = {
                        ...prevCodeSnippet,
                        [entityKey]: currentMessage.message,
                    }
                    finished = Object.keys(nextCodeSnippet).every(key => nextCodeSnippet[key] !== '');
                    setEditorReady(finished);
                    return nextCodeSnippet;
                });
            } else if (statementType === 'function') {
                const literal: string | string[] = entityKey === 'variables' ? currentMessage.message.split(' ') : currentMessage.message;
                setCodeSnippet((prevCodeSnippet: FunctionSnippet) => {
                    const nextCodeSnippet: FunctionSnippet = {
                        ...prevCodeSnippet,
                        [entityKey]: literal,
                    }
                    finished = Object.keys(nextCodeSnippet).every(key => nextCodeSnippet[key] !== '');
                    setEditorReady(finished);
                    return nextCodeSnippet;
                });
            }
        }
    }, [entitiesRegIndex, messages, statementType]);



    const clear = useEffect(() => {
        if (statementType === 'clear') {
            setMessages([]);
            setStatementType('');
        }
    }, [messages, statementType]);

    useEffect(() => {
        if (editorReady) {
            props.setLiveEditorInput(codeSnippet);
            return () => {
                setEditorReady(false);
                setCodeSnippet({});
            }
        }
    }, [codeSnippet, editorReady, props]);


    /**
     * Render method of ChatMessages
     */
    return (
        <div>
            {messages.map((message, index) => {
                    // my own messages
                    if (message.id === myId) {
                        return (
                            <div className={'container darker'} key={index}>
                                <img src={message.avatar} alt={'Avatar'} className={'right'}/>
                                <p>{message.message}</p>
                                <span className={'time-right'}>{`${message.time.toDateString()} | ${message.time.toTimeString()}`}</span>
                            </div>
                        )
                        // other party's messages
                    } else {
                        return (
                            <div className={'container'} key={index}>
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
