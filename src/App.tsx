import React from 'react';
import theme from "./theme";
import {ThemeProvider} from "@material-ui/styles";
import {CssBaseline} from "@material-ui/core";
import AudioComponent from "./Components/AudioComponent";
import Grid from "@material-ui/core/Grid";
import TextComponent from "./Components/TextComponent";

function App() {
    const [transcript, setTranscript] = React.useState<Blob|null>(null);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Grid container direction='row'>
                <Grid item>
                    <AudioComponent setTranscript={setTranscript}/>
                </Grid>
                <Grid item>
                    <TextComponent transcript={transcript}/>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default App;
