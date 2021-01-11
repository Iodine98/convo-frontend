import React, {useEffect} from 'react';
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-monokai";

export default function LiveCodeEditor(props?: any){
    const [editorValue, setEditorValue] = React.useState('');

    useEffect(() => {
        if (props.liveEditorInput.variableName !== undefined && props.liveEditorInput.type !== undefined && props.liveEditorInput.value !== undefined){
            let finalValue = props.liveEditorInput.value
            if (props.liveEditorInput.type === 'string'){
                finalValue = `'${finalValue}'`;
            }
            setEditorValue(editorValue => editorValue +`const ${props.liveEditorInput.variableName}: ${props.liveEditorInput.type} = ${finalValue};\n\n`);
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
