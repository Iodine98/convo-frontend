import React from 'react';
import theme from "./theme";
import {ThemeProvider} from "@material-ui/styles";
import {CssBaseline} from "@material-ui/core";
import AudioComponent from "./Components/AudioComponent";
import Grid from "@material-ui/core/Grid";
import TextComponent from "./Components/TextComponent";
import ChatWindow from "./Components/ChatWindow";

function App() {
    const [transcript, setTranscript] = React.useState<String>("");


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            {/*<Grid container direction='column-reverse'>*/}
                <ChatWindow />
            {/*</Grid>*/}
            {/*<Grid container direction='row'>*/}
            {/*    <Grid item>*/}
            {/*        <AudioComponent setTranscript={setTranscript}/>*/}
            {/*    </Grid>*/}
            {/*    <Grid item>*/}
            {/*        <TextComponent*/}
            {/*            transcript={transcript}/>*/}
            {/*    </Grid>*/}
            {/*</Grid>*/}
        </ThemeProvider>
    );
}

export default App;
