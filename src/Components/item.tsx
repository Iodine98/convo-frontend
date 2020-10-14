import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {Card, CardActionArea, CardContent, CardMedia} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";


export default function Item() {
    const useStyles = makeStyles((theme: any) => ({
        root: {
            margin: theme.spacing(3),
            width: 345,
        },
        media: {
            height: 140,
        },
        title: {
            color: theme.palette.primary.main,
        }
    }));
    const classes = useStyles();


    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://images.unsplash.com/photo-1540573133985-87b6da6d54a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1955&q=80"
                    title="Surprised monkey"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" className={classes.title}>
                        OMG it's a Monkey!
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Monkey is a common name that may refer to groups or species of mammal. The term is applied descriptively to groups of primates
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" href="https://unsplash.com/photos/Z05GiksmqYU">
                    See it on Unsplash
                </Button>
            </CardActions>
        </Card>
    )
}
