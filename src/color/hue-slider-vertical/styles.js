import styled from 'styled-components';

const HueSliderComponent = styled.div`
  display: flex;
  justify-content: start;
  margin: 10px;
`;

const  SliderBox = styled.div`
	height: ${({areaHeight})=> `${areaHeight}px`};
	border-radius: 2px;
	width: 10px;
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
	height: 8px;
	width: 8px;
	border: 2px solid  #FFFFFF;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
	position: relative;
	left: -1px;
	top: ${({ sliderY }) => `${sliderY-5}px`};
	border-radius: 50%;
`;

export {
  HueSliderComponent,
  SliderBox,
  PickerSlider
}
