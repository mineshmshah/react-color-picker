import styled from 'styled-components';

const Component = styled.div`
  display: flex;
  justify-content: center;
`;

const  SliderBox = styled.div`
	width: 198px;
	height: 28px;
	margin: 5px;
  border: #a9b5c7 1px solid;
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


export {
  Component,
  SliderBox
}
