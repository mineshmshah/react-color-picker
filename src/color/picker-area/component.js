import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { PickerAreaComponent, PickerComponent } from './styles'
import store from './enhancer/connect'

class PickerArea extends Component {
  constructor(props) {
    super(props)
    this.mouseDownEvent = this.mouseDownEvent.bind(this)
    this.updatePickerPosition = this.updatePickerPosition.bind(this)
  }

  componentDidMount(){
    this.updatePickerPosition()
  }

  componentDidUpdate(){
    this.updatePickerPosition()
  }

  updatePickerPosition(){
    const {pickerAreaActions, sv,v,sl,l, areaWidth, areaHeight, format} = this.props
    pickerAreaActions.updateColorPickerAreaPosition(sv,v,sl,l, areaWidth, areaHeight, format)
  }

  updateColorWithPicker(e, pickerAreaOffsetX, pickerAreaOffsetY){
    const {areaWidth, areaHeight, pickerAreaActions, format} = this.props;
    let xValue =e.pageX - pickerAreaOffsetX;
    if (xValue > areaWidth) xValue = areaWidth;
    if (xValue < 0) xValue = 0;
    let yValue = e.pageY - pickerAreaOffsetY;
    if (yValue > areaHeight) yValue = areaHeight
    if (yValue < 0 ) yValue = 0;
    const saturation = Math.round((xValue/areaWidth) * 100);
    const value = Math.round(100 - ((yValue/areaHeight) * 100));
    pickerAreaActions.updateColorsWithPickerArea(saturation,value,format)
  }

  mouseDownEvent(e) {
    // This is always relative to one level above to the parent that is absolutely positioned
    // https://stackoverflow.com/questions/1480133/how-can-i-get-an-objects-absolute-position-on-the-page-in-javascript
    let currentElement = e.currentTarget;
    let pickerAreaOffsetX = 0;
    let pickerAreaOffsetY = 0;
    do {
      pickerAreaOffsetX += currentElement.offsetLeft;
      pickerAreaOffsetY += currentElement.offsetTop;
      currentElement = currentElement.offsetParent;
    } while (currentElement);
    console.log(pickerAreaOffsetX);
    console.log(pickerAreaOffsetY)
    this.updateColorWithPicker(e, pickerAreaOffsetX, pickerAreaOffsetY);
    const PointerUpdater = event => this.updateColorWithPicker(event, pickerAreaOffsetX, pickerAreaOffsetY);
    document.addEventListener('mousemove',  PointerUpdater) ;
    document.addEventListener('mouseup', () =>
      document.removeEventListener('mousemove', PointerUpdater))
  }


  render(){
    const {h, areaWidth, areaHeight, format, positionX, positionY} = this.props
    return(
      <PickerAreaComponent
        hue={h}
        areaWidth={areaWidth}
        areaHeight={areaHeight}
        format={format}
        onMouseDown={e=>this.mouseDownEvent(e)}
      >
        <PickerComponent pickerPositionX={positionX} pickerPositionY={positionY}/>
      </PickerAreaComponent>
    )
  }

}

export default store(PickerArea)


PickerArea.propTypes = {
  h: PropTypes.number,
  sv: PropTypes.number,
  sl: PropTypes.number,
  l: PropTypes.number,
  v: PropTypes.number,
  areaWidth: PropTypes.number,
  areaHeight: PropTypes.number,
  format: PropTypes.string,
  pickerAreaActions: PropTypes.objectOf(PropTypes.func),
  positionX: PropTypes.number,
  positionY: PropTypes.number
};

PickerArea.defaultProps ={
  h: 0,
  sv: 100,
  sl:100,
  l: 50,
  v: 100,
  areaHeight: 200,
  areaWidth: 200,
  format: 'HSV',
  pickerAreaActions: {},
  positionX: 0,
  positionY: 0
};
