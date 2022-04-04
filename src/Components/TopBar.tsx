import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Divider, Grid, IconButton, Theme, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { useActions, useAppState } from '../Overmind/OvermindHelper';
import SvgHelper from './SvgHelper';
import { IconPaths } from '../Others/IconPaths';
import { AppStorage } from '../Others/AppStorage';
import { AppUtils } from '../Others/AppUtils';

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
        actions.setSnackbarText("New tab added")
    }

    const onDeletePressed = () => {
        actions.deleteTabIndex()
        actions.setSnackbarText("Deleted")
    }

    const onSave = (showSnack: boolean = true) => {
        if (states.tabs.length > 0) {
            actions.setTabContent(AppUtils.getInputValue() ?? "")
        }

        AppStorage.saveAllValues(states.tabs)

        if (showSnack)
            actions.setSnackbarText("Saved")
    }

    const onSettingsPressed = () => {
        actions.setSnackbarText("Coming soon")
    }

    useEffect(() => {
        var isCtrl = false;
        document.onkeyup = function (e) {
            isCtrl = !e.ctrlKey;
        }

        document.onkeydown = function (e) {
            isCtrl = e.ctrlKey;
            if (e.key == '1' && isCtrl == true) {
                onPlusPressed()
                return false;
            }

            if (e.key == 'd' && isCtrl == true) {
                onDeletePressed()
                return false;
            }

        }

        AppUtils.onInactive(1000, () => {
            onSave(false)
        })

    }, [])

    return <AppBar id='toolbar'>
        <Toolbar>
            <Typography variant='h6' style={{ flexGrow: 1 }}>Notepadta</Typography>

            <Tooltip title="Settings ( Coming soon )">
                <IconButton onClick={onSettingsPressed}>
                    <SvgHelper path={IconPaths.cog} color='white' />
                </IconButton>
            </Tooltip>

            <Tooltip title="Delete ( Ctrl / Command + D )">
                <IconButton onClick={onDeletePressed}>
                    <SvgHelper path={IconPaths.delete} color='white' />
                </IconButton>
            </Tooltip>

            <Tooltip title="Add new tab ( Ctrl / Command + 1 )">
                <IconButton onClick={onPlusPressed}>
                    <SvgHelper path={IconPaths.plus} color='white' />
                </IconButton>
            </Tooltip>

        </Toolbar>
    </AppBar>

}

export default TopBar;