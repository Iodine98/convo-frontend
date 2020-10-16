import React from 'react';
import theme from "./theme";
import {ThemeProvider} from "@material-ui/styles";
import {CssBaseline} from "@material-ui/core";
import AudioComponent from "./Components/AudioComponent";
import Grid from "@material-ui/core/Grid";
import TextComponent from "./Components/TextComponent";

function App() {
    const [audioBlob, setAudioBlob] = React.useState<Blob|null>(null);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Grid container direction='row'>
                <Grid item>
                    <AudioComponent setAudioBlob={setAudioBlob}/>
                </Grid>
                <Grid item>
                    <TextComponent audioBlob={audioBlob}/>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default App;
