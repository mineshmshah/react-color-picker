import styled from 'styled-components';

const PickerAreaComponent = styled.div`
  width: ${({areaWidth}) => `${areaWidth}px`};
  height: ${({areaHeight}) => `${areaHeight}px`};
  min-width: ${({areaWidth}) => `${areaWidth}px`};
  min-height: ${({areaHeight}) => `${areaHeight}px`};
	margin: 7px;
	border-radius: 4px;
	position: relative;

	background: ${({format}) => format !=='HSL' 
    ? '-moz-linear-gradient(bottom, #000 0%, rgba(0, 0, 0, 0) 100%),\n\t\t\t\t-moz-linear-gradient(left, #FFF 0%, rgba(255, 255, 255, 0) 100%);'
    : '-moz-linear-gradient(top, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 100%, 0) 50%,\n'
  + '\t\t\t\t\t\t\t\t\thsla(0, 0%, 0%, 0) 50%, hsl(0, 0%, 0%) 100%),\n'
  + '\t\t\t\t-moz-linear-gradient(left, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);'};
	background: ${({format}) => format !=='HSL' ? '-webkit-linear-gradient(bottom, #000 0%, rgba(0, 0, 0, 0) 100%),\n'
  + '\t\t\t\t-webkit-linear-gradient(left, #FFF 0%, rgba(255, 255, 255, 0) 100%);':'-webkit-linear-gradient(top, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 100%, 0) 50%,\n'
  + '\t\t\t\t\t\t\t\t\thsla(0, 0%, 0%, 0) 50%, hsl(0, 0%, 0%) 100%),\n'
  + '\t\t\t\t-webkit-linear-gradient(left, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);'};
  background: ${({format}) => format !=='HSL' ? ' -ms-linear-gradient(bottom, #000 0%, rgba(0, 0, 0, 0) 100%),\n'
  + '\t\t\t\t-ms-linear-gradient(left, #FFF 0%, rgba(255, 255, 255, 0) 100%);': '-ms-linear-gradient(top, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 100%, 0) 50%,\n'
  + '\t\t\t\t\t\t\t\t\thsla(0, 0%, 0%, 0) 50%, hsl(0, 0%, 0%) 100%),\n'
  + '\t\t\t\t-ms-linear-gradient(left, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);'};
  background: ${({format}) => format !=='HSL' ? '-o-linear-gradient(bottom, #000 0%, rgba(0, 0, 0, 0) 100%),\n'
  + '\t\t\t\t-o-linear-gradient(left, #FFF 0%, rgba(255, 255, 255, 0) 100%);': '-o-linear-gradient(top, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 100%, 0) 50%,\n'
  + '\t\t\t\t\t\t\t\t\thsla(0, 0%, 0%, 0) 50%, hsl(0, 0%, 0%) 100%),\n'
  + '\t\t\t\t-o-linear-gradient(left, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);'};
  background-color: ${({hue}) => `hsla(${hue},100%,50%,1)`}
`;

const PickerComponent = styled.div`
  width: 8px;
	height: 8px;
	border-radius: 50%;
	border: 2px solid #FFFFFF;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
	position: absolute;
	left: ${({pickerPositionX}) => `${pickerPositionX}px` || '45%' };
	top: ${({pickerPositionY}) => `${pickerPositionY}px` || '45%' };
	display: flex;
`;

export {
  PickerAreaComponent,
  PickerComponent
}
