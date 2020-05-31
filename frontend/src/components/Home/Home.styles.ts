import {makeStyles} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";

export const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'rgb(192, 192, 192)',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: 'rgb(192, 192, 192)',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

export const activeStyle = {
    borderColor: '#2196f3'
};

export const acceptStyle = {
    borderColor: '#00e676'
};

export const rejectStyle = {
    borderColor: '#ff1744'
};

export const imgContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '100%',
}

export const imageItem = {
    width: 100,
    height: 'auto'
}

export const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
}));
