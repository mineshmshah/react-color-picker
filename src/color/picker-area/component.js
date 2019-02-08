import React, { Component } from 'react';
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
    const pickerAreaOffsetX = e.currentTarget.offsetLeft + 1;
    const pickerAreaOffsetY = e.currentTarget.offsetTop + 1;
    this.updateColorWithPicker(e, pickerAreaOffsetX, pickerAreaOffsetY);
    const PointerUpdater = event => this.updateColorWithPicker(event, pickerAreaOffsetX, pickerAreaOffsetY)
    document.addEventListener('mousemove',  PointerUpdater) ;
    document.addEventListener('mouseup', () =>
      document.removeEventListener('mousemove', PointerUpdater))
  }


  render(){
    const {h, sl, l, areaWidth, areaHeight, format, positionX, positionY} = this.props
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

