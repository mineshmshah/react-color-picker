import styled from 'styled-components';

const PickerAreaComponent = styled.div`
  width: 198px;
	height: 198px;
	margin: 5px;
	border: 1px solid #DDD;
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
  background-color: ${({baseColor}) => baseColor || '#F00'}
`;

export {
  PickerAreaComponent
}
