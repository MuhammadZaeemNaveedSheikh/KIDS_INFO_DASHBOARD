import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  colors,
  makeStyles
} from '@material-ui/core';
// import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.red[600],
    height: 56,
    width: 56
  },
  differenceIcon: {
    color: colors.red[900]
  },
  differenceValue: {
    color: colors.red[900],
    marginRight: theme.spacing(1)
  }
}));

const CropDescription = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Apple
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              Apple description
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              Apple
            </Avatar>
          </Grid>
        </Grid>
        <Box
          mt={2}
          display="flex"
          alignItems="center"
        >
          
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            {/*Areas here from excel file*/}
            Areas: Lahore Karachi
          </Typography>
          {/* <ArrowDownwardIcon className={classes.differenceIcon} /> */}
        </Box>
      </CardContent>
    </Card>
  );
};

CropDescription.propTypes = {
  className: PropTypes.string
};

export default CropDescription;
