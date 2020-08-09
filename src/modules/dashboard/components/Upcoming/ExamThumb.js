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
import { DISPLAY_DATE_TIME_FORMAT, DB_DATE_TIME_FORMAT, DB_DATE_FORMAT } from 'config/enums';

const now = moment(new Date());
const dateNow = moment().format(DB_DATE_FORMAT);

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
    //width: '80%',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 120,
    height: 120,
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

const ExamThumb = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  const { item } = props;
  const items = useSelector(({ items }) => items.rows);
  let subject = items.subjects.find((x) => x.subjectId === item.subjectId);
  let topic = items.topics.find((x) => x.topicId === item.topicId);
  const upTimeMoment = moment(item.updatetime, DB_DATE_TIME_FORMAT);

  let type = 'upcoming';
  let duration = moment.duration(upTimeMoment.diff(now));
  if (duration.asHours() < 24) type = 'soon';
  if (item.up_date === dateNow) type = 'live';
  let color = type === 'live' ? '#e1fbe1' : type === 'soon' ? '#fff5f5' : '#fff';

  let subjects = items.subjects.filter((x) => item.subjects.includes(x.subjectId));

  return (
    <Card
      className={classes.root}
      raised
      style={{ background: color }}
      onClick={() => {
        if (type !== 'live') return;
        history.push(`/exams/${item.id}`);
      }}
    >
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Box style={{ display: 'flex' }}>
            <TitleTag type={type} />
            <Typography variant="caption" color="primary">
              {upTimeMoment.fromNow()}
            </Typography>
          </Box>
          <Typography>{item.name}</Typography>
          <Typography variant="caption" color="textSecondary" style={{ display: 'block' }}>
            {`${subjects.map(({ subjectName }) => subjectName).join(',')} - ${
              item.questions.length
            } Questions * ${item.duration} minutes`}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            {` — ${isoToFormatted(upTimeMoment, DISPLAY_DATE_TIME_FORMAT)}`}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
};

export default ExamThumb;
