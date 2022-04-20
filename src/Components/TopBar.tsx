// @ts-nocheck
import React, { useEffect, useRef } from 'react'
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
        actions.setSnackbarText("Added new tab")
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

    const onExportPressed = () => {
        const text = btoa(JSON.stringify({
            tabs: states.tabs
        }));
        const name = `${new Date().getTime()}.txt`;
        const a = document.createElement('a');
        const type = name.split(".").pop();
        a.href = URL.createObjectURL(new Blob([text], { type: `text/${type === "txt" ? "plain" : type}` }));
        a.download = name;
        a.click();
    }

    const onImportPressed = () => {
        if (fileInputRef != null) {
            // @ts-ignore
            fileInputRef.current.click();
        }
    }

    // const onSettingsPressed = () => {
    //     actions.setSnackbarText("Coming soon")
    // }

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

    const fileInputRef = useRef(null)


    return <AppBar id='toolbar'>
        <Toolbar>

            <input onChange={(e) => {
                var file = e.target.files[0]
                const reader = new FileReader()
                reader.onload = async (e) => {
                    try {
                        const text = (e.target.result)
                        console.log(text)
                        const data = JSON.parse(atob(text))
                        console.log(data.tabs)
                        actions.setTabs(data.tabs)
                    }
                    catch (e) {
                        console.log(e)
                    }
                };
                reader.readAsText(file)

            }} type='file' accept=".txt" id='file' ref={fileInputRef} style={{ display: 'none' }} />

            <Typography onClick={() => {
                window.location.reload()
            }} variant='h6' style={{ flexGrow: 1, cursor: 'pointer' }}>Fanote.xyz</Typography>

            {/* <Tooltip title="Help" arrow>
                <IconButton onClick={onImportPressed}>
                    <SvgHelper path={IconPaths.help} color='white' />
                </IconButton>
            </Tooltip> */}

            <Tooltip title="Import notes" arrow>
                <IconButton onClick={onImportPressed}>
                    <SvgHelper path={IconPaths.import} color='white' />
                </IconButton>
            </Tooltip>

            <Tooltip title="Export notes" arrow>
                <IconButton onClick={onExportPressed}>
                    <SvgHelper path={IconPaths.export} color='white' />
                </IconButton>
            </Tooltip>

            <Tooltip title="Delete tab ( Ctrl / Command + D )" arrow>
                <IconButton onClick={onDeletePressed}>
                    <SvgHelper path={IconPaths.delete} color='white' />
                </IconButton>
            </Tooltip>

            <Tooltip title="Save notes ( Ctrl / Command + S )" arrow>
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