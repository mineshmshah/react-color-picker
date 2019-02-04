import React  from 'react';
import {Component,Button } from'./styles'


const HSXButtonComponent=({
  format,
  actions,
}) =>(
  <Component>
    <Button formatSelected={format==='HSV'} onClick={()=>actions.updateFormat('HSV')}>HSV</Button>
    <Button formatSelected={format!=='HSV'} onClick={()=>actions.updateFormat('HSL')}>HSL</Button>
  </Component>
)

export default HSXButtonComponent

