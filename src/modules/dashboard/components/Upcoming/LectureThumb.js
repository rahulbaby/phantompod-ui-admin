import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import Box from '@material-ui/core/Box';

import { EmptyList, ListCarousel } from 'components/common';
import { dbTimeNow } from 'utils/functions';
import { instance } from 'utils';
import { isoToFormatted } from 'lib/functions';
import { DISPLAY_DATE_TIME_FORMAT, DB_DATE_TIME_FORMAT } from 'config/enums';

const now = moment(new Date());
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    margin: 15,
    maxWidth: 400,
    width: '100%',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    width: '80%',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 150,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

const TitleTag = ({ type }) => {
  let title = type === 'live' ? ' * LIVE NOW * ' : type === 'soon' ? 'STARTS SOON' : 'UPCOMING';
  let color = type === 'live' ? 'green' : type === 'soon' ? 'orange' : '#7198c7';

  const titleTagStyle = {
    fontSize: 10,
    border: `1px solid ${color}`,
    padding: '2px 20px',
    background: '#fff',
    width: 'fit-content',
    color,
    //color : "#fff" ,
    marginRight: 10,
    fontWeight: 700,
  };

  return <Typography style={titleTagStyle}>{title}</Typography>;
};

const LetureThumb = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const { item, showTitle, ...rest } = props;
  let history = useHistory();
  const items = useSelector(({ items }) => items.rows);
  let subject = items.subjects.find((x) => x.subjectId === item.subjectId);
  let topic = items.topics.find((x) => x.topicId === item.topicId);
  const upTimeMoment = moment(item.updatetime, DB_DATE_TIME_FORMAT);

  let type = 'upcoming';
  let duration = moment.duration(upTimeMoment.diff(now));
  if (duration.asHours() < 24) type = 'soon';
  if (duration.asHours() < 0.1) type = 'live';
  let color = type === 'live' ? '#e1fbe1' : type === 'soon' ? '#fff5f5' : '#fff';

  return (
    <Card className={classes.root} raised style={{ background: color }} {...rest}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Box style={{ display: 'flex' }}>
            <TitleTag type={type} />
            <Typography variant="caption" color="primary">
              {upTimeMoment.fromNow()}
            </Typography>
          </Box>
          <Typography component="h5" variant="h5">
            {item.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {item.tutor}
          </Typography>
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ display: 'block', height: 20, overflow: 'auto' }}
          >
            {`${subject ? subject.subjectName : ''} • ${topic ? topic.topicName : ''}`}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {` — ${isoToFormatted(upTimeMoment, DISPLAY_DATE_TIME_FORMAT)}`}
          </Typography>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        //image="img/video-blogger.png"
        image={`https://img.youtube.com/vi/${item.youtubeId}/default.jpg`}
        title="Live from space album cover"
      />
    </Card>
  );
};

export default LetureThumb;
