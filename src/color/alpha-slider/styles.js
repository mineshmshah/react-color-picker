import styled from 'styled-components';
import img from '../../assets/alpha.png'

const AlphaSliderComponent = styled.div`
  display: flex;
  justify-content: start;
`;

const  SliderBoxAlphaLayer = styled.div`
	width: auto;
	margin: 5px;
	float: left;
	background: url(${img});
`

const  SliderBox = styled.div`
	width: ${({areaWidth})=> `${areaWidth}px`};
	height: 28px;
	float: left;
	background: url(${img});
	background: ${({hue})=>`linear-gradient(to right, hsla(${hue},100%,50%,0) 0%, hsla(${hue},100%,50%,1) 100%)`};
`

const PickerSlider = styled.div`
	width: 2px;
	height: 100%;
	border: 1px solid #777;
	background-color: #FFF;
	position: relative;
	top: -1px;
	left: ${({ sliderX }) => `${sliderX-1}px`};
`;

export {
  AlphaSliderComponent,
  SliderBox,
  PickerSlider,
  SliderBoxAlphaLayer
}
