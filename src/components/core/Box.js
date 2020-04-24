import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Styled = styled.div`
  display: ${(props) => props.display || 'flex'};
  flex: ${(props) => props.flex && '1 1 auto'};
  position: ${(props) => props.position};
  background: ${(props) => props.background};
  flex-direction: ${(props) => props.direction || props.flexDirection};
  justify-content: ${(props) => props.justify || props.justifyContent};
  align-items: ${(props) => props.align || props.alignItems};
  width: ${(props) => props.width};
  max-width: ${(props) => props.maxWidth};
  max-height: ${(props) => props.maxHeight};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  margin-top: ${(props) => props.marginTop};
  margin-bottom: ${(props) => props.marginBottom};
  margin-left: ${(props) => props.marginLeft};
  margin-right: ${(props) => props.marginRight};
  padding: ${(props) => props.padding};
  padding-top: ${(props) => props.paddingTop};
  padding-bottom: ${(props) => props.paddingBottom};
  padding-left: ${(props) => props.paddingLeft};
  padding-right: ${(props) => props.paddingRight};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  border-top: ${({ theme, separator }) => separator === 'top' && `1px solid ${theme.grey.light}`};
  border-right: ${({ theme, separator }) => separator === 'right' && `1px solid ${theme.grey.light}`};
  border-bottom: ${({ theme, separator }) => separator === 'bottom' && `1px solid ${theme.grey.light}`};
  border-left: ${({ theme, separator }) => separator === 'left' && `1px solid ${theme.grey.light}`};
  border-radius: ${(props) => props.borderRadius};
  overflow: ${(props) => props.overflow};
`;

function Box({ children, ...props }) {
  return (
    <Styled {...props}>
      { children }
    </Styled>
  );
}

Box.propTypes = {
  children: PropTypes.node,
  position: PropTypes.string,
  direction: PropTypes.string,
  flexDirection: PropTypes.string,
  justify: PropTypes.string,
  justifyContent: PropTypes.string,
  align: PropTypes.string,
  alignItems: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
  marginTop: PropTypes.string,
  marginBottom: PropTypes.string,
  marginLeft: PropTypes.string,
  marginRight: PropTypes.string,
  padding: PropTypes.string,
  paddingTop: PropTypes.string,
  paddingBottom: PropTypes.string,
  paddingLeft: PropTypes.string,
  paddingRight: PropTypes.string,
};

Box.defaultProps = {
  direction: 'column',
};

export default Box;
