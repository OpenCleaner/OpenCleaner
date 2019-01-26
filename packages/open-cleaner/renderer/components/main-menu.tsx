import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import {List} from "@material-ui/core";
import {resolve} from "../helpers";

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

export const mainListItems = (
    <List
        component="nav"
    >
        <ListItemLink
            href={resolve('Home')}
        >
            <ListItemText primary="Home"/>
        </ListItemLink>
    </List>
);

export const secondaryListItems = (
    <div>
        <ListItemLink
            href={resolve('about')}
        >
            <ListItemText primary="About"/>
        </ListItemLink>
    </div>
);