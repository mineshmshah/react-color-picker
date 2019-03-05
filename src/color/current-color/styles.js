import styled from 'styled-components';
import * as img from '../../assets/alpha.png'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
`;

const CurrentColorComponent = styled.div`
  display: flex;
  width: 90px;
  height: 32px;
  justify-content: center;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(136, 158, 176, 0.4);
  overflow:hidden;
`;


const FullColorSection = styled.div`
  width: 50%;
  height: 100%;
  justify-content: center;
`;

const AlphaSection = styled.div`
  width: 50%;
  height: 100%;
  justify-content: center;
  background: url(${img});
`;

const Mask = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  background-color: ${({hue,sat,light, alpha}) => `hsla(${hue},${sat}%,${light}%, ${alpha})`};
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
  margin: 4px;
`;

export {
  Container,
  CurrentColorComponent,
  FullColorSection,
  AlphaSection,
  Mask,
  Label
}

