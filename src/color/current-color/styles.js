import styled from 'styled-components';
import img from '../../assets/alpha.png'


const CurrentColorComponent = styled.div`
  display: flex;
  width: 100px;
  height: 100px;
  justify-content: center;
`;


const FullColorSection = styled.div`
  width: 50%;
  height: 100%;
  justify-content: center;
  background-color: #FFF;
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



export {
  CurrentColorComponent,
  FullColorSection,
  AlphaSection,
  Mask
}

