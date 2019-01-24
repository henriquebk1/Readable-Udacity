import React from 'react';
import Typography from "@material-ui/core/es/Typography/Typography";
import {NavLink, withRouter} from "react-router-dom";
import Button from "@material-ui/core/es/Button/Button";

const NotFound = () => {
    return (
        <div style={{padding: 50}}>
            <Typography variant='h2'>
                Not Found this item or category
            </Typography>
            <div style={{
                padding: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Button variant="contained" color="primary">
                    <NavLink style={{color: 'white'}} to='/'>Go to Home</NavLink>
                </Button>
            </div>
        </div>
    )
};

export default withRouter(NotFound)