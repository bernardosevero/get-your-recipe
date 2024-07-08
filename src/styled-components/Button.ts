import styled from 'styled-components';

export const Button = styled.button`
  background-color: #000;
  color: #fff;
  border: 1px solid;
  border-radius: 12px;
  padding: 8px 16px;
  font-family: '__Inter_aaf875', '__Inter_Fallback_aaf875';
  cursor: pointer;

  &:disabled {
    color: #8f8f8f;
  }
`;
