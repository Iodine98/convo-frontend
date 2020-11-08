import React from 'react';
import theme from "./theme";
import {ThemeProvider} from "@material-ui/styles";
import {CssBaseline} from "@material-ui/core";
import ChatWindow from "./Components/Chat/ChatWindow";

export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
                <ChatWindow />
        </ThemeProvider>
    );
}
