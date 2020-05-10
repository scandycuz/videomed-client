import styled from 'styled-components';
import Base from './Base';

const IconButton = styled(Base)`
  border-radius: 50%;

  &:hover {
    background: ${({ theme, disabled }) => !disabled && theme.grey.light};
  }
`;

export default IconButton;
