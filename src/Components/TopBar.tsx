import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Divider, Grid, IconButton, Theme, Toolbar, Typography } from "@material-ui/core";
import { useActions, useAppState } from '../Overmind/OvermindHelper';
import SvgHelper from './SvgHelper';
import { IconPaths } from '../Others/IconPaths';

interface Props {

}

const getThemeObj = (theme: Theme) => {
    return {}
}

const useStyles = makeStyles((theme: Theme) => (getThemeObj(theme)))

const TopBar: React.FC<Props> = (props) => {
    const actions = useActions()
    const states = useAppState()

    const classes = useStyles();

    const onPlusPressed = () => {
        actions.addTab({
            tabName: `tab${states.tabs.length + 1}`,
            tabContent: `tab${states.tabs.length + 1}`,
        })
    }

    return <AppBar>
        <Toolbar>
            <Typography style={{ flexGrow: 1 }}>Notepadta</Typography>
            <IconButton>
                <SvgHelper path={IconPaths.cog} color='white' />
            </IconButton>
            <IconButton onClick={onPlusPressed}>
                <SvgHelper path={IconPaths.plus} color='white' />
            </IconButton>

        </Toolbar>
    </AppBar>

}

export default TopBar;