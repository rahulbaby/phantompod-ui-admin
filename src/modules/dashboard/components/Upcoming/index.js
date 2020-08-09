import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';

import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

import { EmptyList, ListCarousel, Title } from 'components/common';
import { instance } from 'lib';
import { isoToFormatted, dbTimeNow, isMobile } from 'lib/functions';
import { DB_DATE_TIME_FORMAT } from 'config/enums';
import ExamThumb from './ExamThumb';
import LectureThumb from './LectureThumb';

import { LoaderTable } from 'components/loaders';

const Upcoming = (props) => {
  const { date } = props;
  const [loading, setLoding] = React.useState(false);
  const [examRows, setExamRows] = React.useState([]);
  const [lectureRows, setLectureRows] = React.useState([]);

  useEffect(() => {
    setLoding(true);
    let params = {
      where: {
        updatetime: {
          $gt: moment().subtract({ minutes: 30 }).format(DB_DATE_TIME_FORMAT),
        },
      },
    };
    instance.get(`exam`, { params }).then((data) => {
      setLoding(false);
      if (!data.error) setExamRows(data.rows);
    });
    instance.get(`lecture`, { params }).then((data) => {
      setLoding(false);
      if (!data.error) setLectureRows(data.rows);
    });
  }, []);

  if (loading) return <LoaderTable />;
  if (!lectureRows.length && !examRows.length)
    return <EmptyList title="No upcoming lecture / exam!" subTitle="Consider add some !" />;
  return (
    <ListCarousel
      itemWrapperProps={{ marginRight: 2 }}
      rows={[...examRows, ...lectureRows]}
      block={(item) => (item.youtubeId ? <LectureThumb item={item} /> : <ExamThumb item={item} />)}
    />
  );
};

export default Upcoming;
