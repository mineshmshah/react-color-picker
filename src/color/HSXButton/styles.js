import styled from 'styled-components';


const Component = styled.div`
  display: flex;
  justify-content: center;
  width: 200px;
  border:1px;
  border: #a9b5c7 1px solid;
`;

const Button = styled.div`
  height: 50px;
  width: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({formatSelected}) => formatSelected  ? '#a9b5c7':'white'};
  cursor: pointer;
`

export {
  Button,
  Component
}
