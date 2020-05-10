import styled from 'styled-components';
import { normalizeColor } from 'util/methods';

const Box = styled.div`
  display: ${(props) => props.display || 'flex'};
  visibility: ${(props) => props.visibility};
  z-index: ${(props) => props.zIndex};
  flex: ${(props) => typeof props.flex === 'string' ? props.flex : props.flex && '1 1 auto'};
  position: ${(props) => props.position};
  background: ${(props) =>
    props.background ? normalizeColor(props.theme, props.background) :
    undefined};
  flex-direction: ${(props) => props.direction || props.flexDirection};
  justify-content: ${(props) => props.justify || props.justifyContent};
  align-items: ${(props) => props.align || props.alignItems};
  width: ${(props) => props.width};
  min-width: ${(props) => props.minWidth};
  max-width: ${(props) => props.maxWidth};
  min-height: ${(props) => props.minHeight};
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
  box-shadow: ${(props) => props.boxShadow};
  overflow: ${(props) => props.overflow};
  overflow-x: ${(props) => props.overflowX};
  overflow-y: ${(props) => props.overflowY};
  transition: ${(props) => props.transition};
  pointer-events: ${(props) => props.pointerEvents};
`;

Box.defaultProps = {
  direction: 'column',
};

export default Box;
