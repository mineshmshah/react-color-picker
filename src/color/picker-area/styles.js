import styled from 'styled-components';

const PickerAreaComponent = styled.div`
  width: ${({areaWidth}) => `${areaWidth}px`};
  height: ${({areaHeight}) => `${areaHeight}px`};
	margin: 5px;
	border: #a9b5c7 1px solid;
	position: relative;
	float: left;
	display: table;

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
  width: 10px;
	height: 10px;
	border-radius: 50%;
	border: 1px solid #FFF;
	position: absolute;
	left: ${({pickerPositionX}) => `${pickerPositionX}px` || '45%' };
	top: ${({pickerPositionY}) => `${pickerPositionY}px` || '45%' };
	display: flex;
	
	::before {
		width: 8px;
    height: 8px;
    content: "";
    position: absolute;
    border: 1px solid #999;
    border-radius: 50%;
	}
`;

export {
  PickerAreaComponent,
  PickerComponent
}
