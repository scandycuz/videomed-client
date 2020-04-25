import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Typography from 'components/core/Typography';
import { strToHex } from 'util/methods';

const Circle = styled.div`
  border-radius: 50%;
  width: 3.75rem;
  height: 3.75rem;
  background: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function Profile({ firstName, lastName }) {
  const color = strToHex(`${firstName}${lastName}`);
  const initial = firstName[0].toUpperCase();

  return (
    <Circle color={color}>
      <Typography size="2.5rem" color="white">
        { initial }
      </Typography>
    </Circle>
  )
}

Profile.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
}

export default Profile;
