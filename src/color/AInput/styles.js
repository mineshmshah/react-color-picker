import styled from 'styled-components';


const Component = styled.div`
  display: flex;
  background-color: #edf2f7;
  width: 100px;
  justify-content: center;
`

const NumericalInput = styled.input`
  width: 35px;
  height: 23px;
  border-radius: 4px;
  border: #a9b5c7 1px solid;
  padding: 0 10px;
`;

const Label = styled.label`
  display: flex;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  padding-bottom: 5px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

export {
  NumericalInput,
  InputBox,
  Label,
  Component
}
