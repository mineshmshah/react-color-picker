import React from 'react';
import PropTypes from 'prop-types'
import { FullColorSection, AlphaSection, CurrentColorComponent, Mask } from'./styles'

export const CurrentColor = ({h,sl,l,a}) => (
  <CurrentColorComponent >
    <AlphaSection>
      <Mask hue={h} sat={sl} light={l} alpha={a}/>
    </AlphaSection>
    <FullColorSection>
      <Mask hue={h} sat={sl} light={l} alpha={a}/>
    </FullColorSection>
  </CurrentColorComponent>
);

export default CurrentColor

CurrentColor.propTypes ={

};

CurrentColor.defaultProps ={

};
