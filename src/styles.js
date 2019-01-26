import {fade} from '@material-ui/core/styles/colorManipulator';
import red from '@material-ui/core/colors/red';

const drawerWidth = 240;

export const styles = theme => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when options closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    button: {
        margin: theme.spacing.unit,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButtonHidden: {
        display: 'none',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        height: '100vh',
        overflow: 'auto',
    },
    chartContainer: {
        marginLeft: -22,
    },
    tableContainer: {
        height: 320,
    },
    h5: {
        marginBottom: theme.spacing.unit * 2,
    },
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    formControl: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: theme.spacing.unit,
    },
    appBarSelectInput: {
        color: 'white',
        icon: {
            fill: 'white',
        }
    },
    appBarSelect: {
        color: 'white',
        '&:before': {
            color: 'white',
            borderColor: 'white',
            icon: {
                color: 'white',
                fill: 'white',
            },
        },
        '&:after': {
            color: 'white',
            borderColor: 'white',
        }
    },
    whiteIcon: {
        fill: 'white',
    },
    appBarRoot: {
        width: '100%',
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    appBarSection: {
        display: 'flex',
    },
    margin: {
        margin: theme.spacing.unit,
    },
    padding: {
        padding: theme.spacing.unit,
    },
    avatar: {
        backgroundColor: red[500],
    },
    card: {
        title:{
            width: '50%',
        },
    },
    floatRight: {
        marginLeft:'auto',
        float: 'right',
    },
    threeLinesText: {
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        display: '-webkit-box',
        'line-height': '1.8em',
        'height': '5.4em',
        '-webkit-line-clamp': 3, /* number of lines to show */
        '-webkit-box-orient': 'vertical',
    },
    oneLineeText: {
        overflow: 'hidden',
        'text-overflow': 'ellipsis',
        display: '-webkit-box',
        'line-height': '1.8em',
        'height': '1.8em',
        '-webkit-line-clamp': 1, /* number of lines to show */
        '-webkit-box-orient': 'vertical',
    },
    fabRight: {
        zIndex: 1000,
        margin: theme.spacing.unit,
        right: 25,
        bottom: 25,
        position: 'fixed'
    },
    noOverflow: {
        'overflow-x': 'hidden',
    },
});