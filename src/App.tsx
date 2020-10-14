import React from 'react';
import theme from "./theme";
import {ThemeProvider} from "@material-ui/styles";
import {CssBaseline} from "@material-ui/core";
import AudioComponent from "./Components/AudioComponent";

function App() {


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <AudioComponent/>
        </ThemeProvider>

    );
}

export default App;
