import styled from 'styled-components';
import img from '../../assets/alpha.png';

const AlphaSliderComponent = styled.div`
  display: flex;
  justify-content: start;
  height: fit-content;
  margin: 7px
`;

const  SliderBoxAlphaLayer = styled.div`
	width: auto;
	background: url(${img}) center;
	border-radius: 2px;
	-webkit-border-radius: 2px;
  -moz-border-radius: 2px;
  background-size: contain;
`;

const  SliderBox = styled.div`
	height: ${({areaHeight})=> `${areaHeight}px`};
	width: 10px;
	background: ${({hue,sat,light})=>`linear-gradient(to top, hsla(${hue},${sat}%,${light}%,0) 0%, hsla(${hue},${sat}%,${light}%,1) 100%)`};
	border-radius: 2px;
	-webkit-border-radius: 2px;
  -moz-border-radius: 2px;
`;

const PickerSlider = styled.div`
	height: 8px;
	width: 8px;
	border: 2px solid  #FFFFFF;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
	position: relative;
	left: -1px;
	border-radius: 50%;
	top: ${({ sliderY }) => `${sliderY-6}px`};
`;

export {
  AlphaSliderComponent,
  SliderBox,
  PickerSlider,
  SliderBoxAlphaLayer
}
