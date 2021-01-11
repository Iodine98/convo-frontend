import React from 'react';
import theme from "./theme";
import {ThemeProvider} from "@material-ui/styles";
import {CssBaseline, Grid} from "@material-ui/core";
import ChatWindow from "./Components/Chat/ChatWindow";
import LiveCodeEditor from "./Components/Code/LiveCodeEditor";

export default function App() {
    const [liveEditorInput, setLiveEditorInput] = React.useState({});

    return (
        <ThemeProvider theme={theme}>
            <Grid style={{display: "flex", flexDirection: "row"}}>
                <CssBaseline/>
                <LiveCodeEditor style={{width: "5em"}} liveEditorInput={liveEditorInput}/>
                <ChatWindow style={{width: "5em"}} setLiveEditorInput={setLiveEditorInput}/>
            </Grid>

        </ThemeProvider>
    );
}
