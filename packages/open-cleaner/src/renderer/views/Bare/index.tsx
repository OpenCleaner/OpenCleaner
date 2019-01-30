import React from 'react';
import {
  withStyles,
  WithStyles,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import './styles.scss';

const styles = ({  }: Theme) =>
  createStyles({
    root: {
      textAlign: 'center',
    },
  });

interface Props extends WithStyles<typeof styles> {}

const Bare = withStyles(styles)(
  class extends React.Component<Props> {
    render() {
      const { classes } = this.props;

      return <p className={classes.root}>Bare</p>;
    }
  },
);

export default Bare;
