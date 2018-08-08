import React from 'react';
import PropTypes from 'prop-types';
import { GridList, GridListTile, GridListTileBar, withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    width: "100%",
    height: "100%",
    paddingTop: "20px",
    paddingBottom: "20px",
    spacing: 0,
  },
  gridList: {
    width: "100%",
    height: "100%",
    margin: 0,
    spacing: 0
  },
  subheader: {
    width: '100%'
  },
  media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
  },
  titleWrap: {
      overflow: "visible"
  }
});


function TopArtists(props) {

  const { classes, topArtists } = props;

  return (
    <div className={classes.root}>
      <Typography variant="headline">Your Top Artists</Typography>
      <GridList cellHeight={180} className={classes.gridList} cols={4} >
        {topArtists.map((artist) => (
          <GridListTile key={artist.name} cols={1}>
                <img src={artist.images[0].url || null} alt={artist.name} />
                <GridListTileBar
                    className={classes.titleWrap}
                    title={artist.name}
                />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

TopArtists.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopArtists);
