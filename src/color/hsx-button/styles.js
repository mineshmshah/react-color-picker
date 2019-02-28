import styled from 'styled-components';


const Component = styled.div`
  display: flex;
  justify-content: center;
  border:1px;
  height: fit-content;
  padding: 5px
`;

const Button = styled.div`
  height: 28px;
  width: 64px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: ${({formatSelected}) => formatSelected ? 'linear-gradient(to bottom, #429bff, #3f94f3)' :'linear-gradient(to bottom, #ffffff, #fafcff)'};
  border: ${({formatSelected}) => formatSelected  ? 'solid 1px #4588dd':'solid 1px #c8d1de'};
  color: ${({formatSelected}) => formatSelected  ? '#ffffff':'#a9b5c7'};
  cursor: pointer;
  text-align: center;
  box-shadow: 0 1px 1px -1px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  margin:0 4px;
`;

export {
  Button,
  Component
}
