import React from 'react';
import PropTypes from 'prop-types';
import { GridListTile, GridListTileBar, Typography, withStyles } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  }
});


function NowPlaying(props) {

    const { classes, nowPlaying, isPlaying } = props;

    const getIsPlaying = () => {
        if (isPlaying === true) {
          return (
            <GridListTile key={nowPlaying.name} className={classes.root} cols={1}>
                <img src={ nowPlaying.image } alt="Album art" style={{width: 500, height: 450}}/>
                <GridListTileBar
                    title={nowPlaying.name}
                    subtitle={nowPlaying.artist}
                />
            </GridListTile>
          )
        }
        if (isPlaying === false) {
          return (
            <Typography>
              Ummmm... have you tried playing a song in Spotify?
            </Typography>
          )
        }
      }

    return (
        <div className={classes.root}>
            {getIsPlaying()}
        </div>
    );
}

NowPlaying.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NowPlaying);
