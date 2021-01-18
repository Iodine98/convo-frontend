import React, {useCallback, useEffect} from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import {CallingSnippet, CodeSnippet, FunctionSnippet, VariableSnippet} from "../Chat/ChatMessages";

export default function LiveCodeEditor(props?: any){
    const [editorValue, setEditorValue] = React.useState('');

    function isVariable(statement: CodeSnippet): statement is VariableSnippet {
        return (statement as VariableSnippet).value !== undefined;
    }

    function isFunction(statement: CodeSnippet): statement is FunctionSnippet {
        return (statement as FunctionSnippet).returnType !== undefined;
    }

    function isCalling(statement: CodeSnippet): statement is CallingSnippet {
        return (statement as CallingSnippet).parentFunction === 'window';
    }

    const setVariable = useCallback(() => {
        const currentVariable = props.liveEditorInput;
        let finalValue = currentVariable.value
        if (props.liveEditorInput.type === 'string'){
            finalValue = `'${finalValue}'`;
        }
        const finalString = `const ${currentVariable.variableName}: ${currentVariable.type} = ${finalValue};\n\n`
        setEditorValue(editorValue => editorValue + finalString);
    }, [props.liveEditorInput]);
    
    const setFunction = useCallback(() => {
        const currentFunction = props.liveEditorInput;
        const finalString = `function ${currentFunction.functionName}(${currentFunction.variables.toString()}): ${currentFunction.returnType} {\n\t${currentFunction.body}\n};\n\n`
        setEditorValue(editorValue => editorValue + finalString);
    }, [props.liveEditorInput]);

    const setCalling = useCallback(() => {
        const currentCalling = props.liveEditorInput;
        const finalString = `${currentCalling.functionName}(${currentCalling.arguments.toString()});\n\n`;
        setEditorValue(editorValue => editorValue + finalString);
    }, [props.liveEditorInput])

    useEffect(() => {
        if (isVariable(props.liveEditorInput)){
            setVariable();
        }
        if (isFunction(props.liveEditorInput)){
            setFunction();
        }
        if (isCalling(props.liveEditorInput)){
            setCalling();
        }
    }, [props.liveEditorInput, setCalling, setFunction, setVariable]);



    function onLoad(){}


    function onChange(newValue: any) {
        console.log("change", newValue);
    }


    return(
        <div style={{margin: "4em"}}>
            <AceEditor
                placeholder="Placeholder Text"
                mode="javascript"
                theme="monokai"
                name="blah2"
                onLoad={onLoad}
                onChange={onChange}
                fontSize={14}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={editorValue}
                setOptions={{
                    enableBasicAutocompletion: false,
                    enableLiveAutocompletion: false,
                    enableSnippets: false,
                    showLineNumbers: true,
                    tabSize: 2,
                }}/>
        </div>
    )
}
