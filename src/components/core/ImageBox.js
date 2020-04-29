import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Box from 'components/core/Box';
import Typography from 'components/core/Typography';

export function ImageBox({ src, title }) {
  return (
    <Box width="100%" direction="row" align="center" justify="flex-start">
      <Image
        src={src}
        alt="SSL encryption and JWT authentication"
      />

      <Box marginLeft="1rem">
        <Typography>
          <strong>{ title }</strong>
        </Typography>
      </Box>
    </Box>
  );
}

ImageBox.propTypes = {
  src: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default ImageBox;

const Image = styled.img`
  width: 4rem;
  height: auto;
  align-self: flex-start;
`;
