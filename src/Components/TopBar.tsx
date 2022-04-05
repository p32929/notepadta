import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, Divider, Grid, IconButton, Theme, Toolbar, Tooltip, Typography } from "@material-ui/core";
import { useActions, useAppState } from '../Overmind/OvermindHelper';
import SvgHelper from './SvgHelper';
import { IconPaths } from '../Others/IconPaths';
import { AppStorage } from '../Others/AppStorage';
import { AppUtils } from '../Others/AppUtils';
import { Constants } from '../Others/Constants';

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
        actions.addTab(Constants.getStartingTab())
        actions.setSnackbarText("New tab added")
        AppUtils.focusInput()
    }

    const onDeletePressed = () => {
        actions.deleteTabIndex()
        actions.setSnackbarText("Deleted tab")
        AppUtils.focusInput()
    }

    const onSavePressed = () => {

        AppStorage.saveAllValues({
            tabs: states.tabs,
            currentTabIndex: states.currentTabIndex
        })
        actions.setSnackbarText("Saved all tabs")
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
            if (e.key == 's' && isCtrl == true) {
                onSavePressed()
                return false;
            }
            if (e.key == 'd' && isCtrl == true) {
                onDeletePressed()
                return false;
            }
        }

        window.onbeforeunload = function (e) {
            onSavePressed()
        };

    }, [])

    return <AppBar id='toolbar'>
        <Toolbar>
            <Typography variant='h6' style={{ flexGrow: 1 }}>Notepadta</Typography>

            <Tooltip title="Settings ( Coming soon )" arrow>
                <IconButton onClick={onSettingsPressed}>
                    <SvgHelper path={IconPaths.cog} color='white' />
                </IconButton>
            </Tooltip>

            <Tooltip title="Delete ( Ctrl / Command + D )" arrow>
                <IconButton onClick={onDeletePressed}>
                    <SvgHelper path={IconPaths.delete} color='white' />
                </IconButton>
            </Tooltip>

            <Tooltip title="Save ( Ctrl / Command + S )" arrow>
                <IconButton onClick={onSavePressed}>
                    <SvgHelper path={IconPaths.save} color='white' />
                </IconButton>
            </Tooltip>

            <Tooltip title="Add new tab ( Ctrl / Command + 1 )" arrow>
                <IconButton onClick={onPlusPressed}>
                    <SvgHelper path={IconPaths.plus} color='white' />
                </IconButton>
            </Tooltip>

        </Toolbar>
    </AppBar>

}

export default TopBar;