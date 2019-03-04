import React  from 'react';
import PropTypes from 'prop-types'
import {Component,Button } from'./styles'


const HSXButtonComponent=({
  format,
  actions,
}) =>(
  <Component>
    <Button formatSelected={format==='HSV'} onClick={()=>actions.updateFormat('HSV')}>HSV</Button>
    <Button formatSelected={format!=='HSV'} onClick={()=>actions.updateFormat('HSL')}>HSL</Button>
  </Component>
);

export default HSXButtonComponent

HSXButtonComponent.propTypes = {
  format: PropTypes.string,
  actions: PropTypes.objectOf(PropTypes.func)
};

HSXButtonComponent.defaultProps = {
  format: {},
  actions: {}
};


