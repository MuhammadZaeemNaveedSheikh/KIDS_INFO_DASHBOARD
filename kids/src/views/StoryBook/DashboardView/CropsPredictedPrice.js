import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
// import InsertChartIcon from '@material-ui/icons/InsertChartOutlined';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.orange[600],
    height: 56,
    width: 56
  }
}));

const CropsPredictedPrice = ({ className, ...rest }) => {
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
            <br></br>
            <Typography
              color="textPrimary"
              variant="h5"
            >
              Predicted Price : Rs.75
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              Apple
            </Avatar>
          </Grid>
        </Grid>
       
      </CardContent>
    </Card>
  );
};

CropsPredictedPrice.propTypes = {
  className: PropTypes.string
};

export default CropsPredictedPrice;
