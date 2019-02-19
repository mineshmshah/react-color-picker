import styled from 'styled-components';

const HueSliderComponent = styled.div`
  display: flex;
  justify-content: start;
  padding: 30px;
`;

const  SliderBox = styled.div`
	height: ${({areaHeight})=> `${areaHeight}px`};
	border-radius: 2px;
	width: 12px;
	margin: 5px;
	float: left;
	background: -moz-linear-gradient(top, #F00 0%, #FF0 16.66%, #0F0 33.33%, #0FF 50%,
				#00F 66.66%, #F0F 83.33%, #F00 100%);
	background: -webkit-linear-gradient(top, #F00 0%, #FF0 16.66%, #0F0 33.33%, #0FF 50%,
				#00F 66.66%, #F0F 83.33%, #F00 100%);
	background: -ms-linear-gradient(top, #F00 0%, #FF0 16.66%, #0F0 33.33%, #0FF 50%,
				#00F 66.66%, #F0F 83.33%, #F00 100%);
	background: -o-linear-gradient(top, #F00 0%, #FF0 16.66%, #0F0 33.33%, #0FF 50%,
				#00F 66.66%, #F0F 83.33%, #F00 100%);
`

const PickerSlider = styled.div`
	height: 2px;
	width: 100%;
	border: 1px solid #777;
	background-color: #FFF;
	position: relative;
	left: -1px;
	top: ${({ sliderY }) => `${sliderY-1}px`};
`;

export {
  HueSliderComponent,
  SliderBox,
  PickerSlider
}
