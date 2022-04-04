import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Divider, Grid, IconButton, Theme, Toolbar, Typography } from "@material-ui/core";
import { useActions, useAppState } from '../Overmind/OvermindHelper';
import SvgHelper from './SvgHelper';
import { IconPaths } from '../Others/IconPaths';
import { AppStorage } from '../Others/AppStorage';

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
            tabName: `...::: :::...`,
            tabContent: '',
        })
    }

    const onDeletePressed = () => {
        actions.setButtonVisibilities({
            isReloadVisible: true
        })
        actions.deleteTabIndex()
    }

    const onSavePressed = () => {
        // @ts-ignore
        var inputValue: any = document.getElementById('input_field')?.value
        console.log(inputValue)
        actions.setTabContent(inputValue)

        // var tempTabs = states.tabs.slice()
        // tempTabs[states.currentTabIndex].tabContent = inputValue

        AppStorage.saveAllValues(states.tabs)
        console.log("Saved");
    }

    const onSettingsPressed = () => {
        alert("Coming soon")
    }

    const onReloadPressed = () => {
        window.location.reload()
    }

    return <AppBar id='toolbar'>
        <Toolbar>
            <Typography variant='h6' style={{ flexGrow: 1 }}>Notepadta</Typography>

            {
                states.buttonVisibilities.isReloadVisible && <IconButton onClick={onReloadPressed}>
                    <SvgHelper path={IconPaths.reload} color='white' />
                </IconButton>
            }

            <IconButton onClick={onSettingsPressed}>
                <SvgHelper path={IconPaths.cog} color='white' />
            </IconButton>

            <IconButton onClick={onDeletePressed}>
                <SvgHelper path={IconPaths.delete} color='white' />
            </IconButton>

            <IconButton onClick={onSavePressed}>
                <SvgHelper path={IconPaths.save} color='white' />
            </IconButton>

            <IconButton onClick={onPlusPressed}>
                <SvgHelper path={IconPaths.plus} color='white' />
            </IconButton>

        </Toolbar>
    </AppBar>

}

export default TopBar;