import styled from 'styled-components';

const InputComponent = styled.div`
  display: flex;
  width: 250px;
  justify-content: center;
  height: fit-content;
`

const NumericalInput = styled.input`
  width: 64px;
  height: 26px;
  border-radius: 4px;
  border: #C8D1DE 1px solid;
  padding: 0 4px;
  margin-bottom: 4px;
  text-align: center;
`;

const Label = styled.label`
  display: flex;
  justify-content: center;
  font-family: Roboto;
  font-size: 10px;
  font-style: normal;
  font-stretch: normal;
  line-height: 15px;
  letter-spacing: normal;
  text-align: center;
  color: #A9B5C7;
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
  InputComponent
}
