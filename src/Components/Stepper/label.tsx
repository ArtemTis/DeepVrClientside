import styled, {css} from 'styled-components';
import { LabelPosition } from './loader-components';

export const Label = styled.div<{width: number | string; fontSize: number; labelPosition: LabelPosition}>`
  /* max-width: ${({ width }) => (width === 'expand' ? '100%' : width + 'px')}; */
  line-height: ${({ fontSize }) => fontSize}px;
  font-size: ${props => props.fontSize}px;
  font-weight: 400;
  margin-bottom: 5px;

  white-space: nowrap;

  ${({ labelPosition }) =>
    labelPosition === 'left' &&
    css`
    margin-right: 10px;
  `}

  ${({ labelPosition }) =>
    labelPosition === 'right' &&
    css`
    margin-left: 10px;
  `}
`;