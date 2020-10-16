import {Card, CardActionArea, CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React from "react";
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

    const str = 'lovely';

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                        Displayed text
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {str}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}
