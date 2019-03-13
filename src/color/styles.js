import styled from 'styled-components';


const Container = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px rgba(136, 158, 176, 0.4);
  background-color: #ffffff;
  padding: 12px;
  border-radius: 4px;
  width: fit-content;
  max-width: 280px;
`;
const Container2 = styled.div`
  overflow-y: hidden;
  position: absolute;
`;
const BlockDivs = styled.div`
  height: 100px;
  content: "";
  width: 100px;
  background-color: #61dafb;
`
const AreaAndSliderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 280px;
`;

const RGBAHexInputContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 280px;
`;

const HSVInputAndButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 280px;
`;
const HorizontalSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 280px;
`;

const PreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 280px;
`;

export {
  Container,
  AreaAndSliderContainer,
  RGBAHexInputContainer,
  HSVInputAndButtonContainer,
  HorizontalSliderContainer,
  PreviewContainer,
  Container2,
  BlockDivs
}

