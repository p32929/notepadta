import React from 'react';
import { Theme } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

interface Props {
    size?: number,
    color?: string,
    path: string,
    styles?: object
}

const getThemeObj = (theme: Theme) => {
    return {
        //
    }
};

const useStyles = makeStyles((theme: Theme) => (getThemeObj(theme)));

const SvgHelper: React.FC<Props> = (props) => {
    // const {} = useActions()
    // const {} = useAppState()

    const classes = useStyles();
    const { color = "#000", size = 24, path, styles } = props;

    return <svg style={{ width: size, height: size, ...styles }} viewBox="0 0 24 24">
        <path fill={color}
            d={path} />
    </svg>
};

export default SvgHelper;
