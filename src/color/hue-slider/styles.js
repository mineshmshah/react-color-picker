import styled from 'styled-components';

const HueSliderComponent = styled.div`
  display: flex;
  justify-content: start;
`;

const  SliderBox = styled.div`
	width: ${({areaWidth})=> `${areaWidth}px`};
	height: 28px;
	margin: 5px;
	float: left;
	background: -moz-linear-gradient(left, #F00 0%, #FF0 16.66%, #0F0 33.33%, #0FF 50%,
				#00F 66.66%, #F0F 83.33%, #F00 100%);
	background: -webkit-linear-gradient(left, #F00 0%, #FF0 16.66%, #0F0 33.33%, #0FF 50%,
				#00F 66.66%, #F0F 83.33%, #F00 100%);
	background: -ms-linear-gradient(left, #F00 0%, #FF0 16.66%, #0F0 33.33%, #0FF 50%,
				#00F 66.66%, #F0F 83.33%, #F00 100%);
	background: -o-linear-gradient(left, #F00 0%, #FF0 16.66%, #0F0 33.33%, #0FF 50%,
				#00F 66.66%, #F0F 83.33%, #F00 100%);
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
  HueSliderComponent,
  SliderBox,
  PickerSlider
}
