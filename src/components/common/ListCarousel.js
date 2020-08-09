import React, { Fragment, useEffect, useState, useRef } from 'react';
import Box from '@material-ui/core/Box';

const ListCarousel = (props) => {
  const playerRef = useRef(null);
  const { rows, block, itemWrapperProps, ...rest } = props;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(playerRef.current.offsetWidth);
  });

  return (
    <Box ref={playerRef} style={{ width: '100%' }}>
      {Box && width && (
        <Box
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            width,
          }}
        >
          {Object.values(rows).map((item, i) => (
            <Box key={i} style={{ flex: '0 0 auto' }} {...itemWrapperProps}>
              {block(item)}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ListCarousel;
