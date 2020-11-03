import React from "react";
import {Card, CardActionArea, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/styles";

export default function TextComponent(props: any) {

    const useStyles = makeStyles((theme: any) => ({
        root: {
            margin: theme.spacing(3),
            width: 500,
            height: 250,
        },
        title: {
            color: theme.palette.primary.main,
        }
    }));
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                        Displayed text
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.transcript}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
