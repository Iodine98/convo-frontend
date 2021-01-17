import React, {useEffect} from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";
import {CodeSnippet, FunctionSnippet, VariableSnippet} from "../Chat/ChatMessages";

export default function LiveCodeEditor(props?: any){
    const [editorValue, setEditorValue] = React.useState('');

    function isVariable(statement: CodeSnippet): statement is VariableSnippet {
        return (statement as VariableSnippet).value !== undefined;
    }

    function isFunction(statement: CodeSnippet): statement is FunctionSnippet {
        return (statement as FunctionSnippet).returnType !== undefined;
    }

    useEffect(() => {
        if (isVariable(props.liveEditorInput)){
            let finalValue = props.liveEditorInput.value
            if (props.liveEditorInput.type === 'string'){
                finalValue = `'${finalValue}'`;
            }
            const finalString = `const ${props.liveEditorInput.variableName}: ${props.liveEditorInput.type} = ${finalValue};\n\n`
            setEditorValue(editorValue => editorValue + finalString);
        }
        if (isFunction(props.liveEditorInput)){
            const currentFunction = props.liveEditorInput;
            const finalString = `function ${currentFunction.functionName}(${currentFunction.variables.toString()}): ${currentFunction.returnType} {\n\t${currentFunction.body}\n};\n\n`
            setEditorValue(editorValue => editorValue + finalString);
        }
    }, [props.liveEditorInput]);



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
