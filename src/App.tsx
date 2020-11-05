import React from 'react';
import theme from "./theme";
import {ThemeProvider} from "@material-ui/styles";
import {CssBaseline} from "@material-ui/core";
import ChatWindow from "./Components/ChatWindow";

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
                <ChatWindow />
        </ThemeProvider>
    );
}

export default App;
