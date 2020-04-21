import React from 'react';
import styled from 'styled-components';
import Text from 'util/Text';

const Styled = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || props.flexDirection};
  justify-content: ${(props) => props.justify || props.justifyContent};
  align-items: ${(props) => props.align || props.alignItems};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  padding: ${(props) => props.padding};
`;

function Box({ children, ...props }) {
  return (
    <Styled {...props}>
      { children }
    </Styled>
  );
}

Box.defaultProps = {
  direction: 'column',
};

export default Box;
