import React from 'react';
import PropTypes from 'prop-types'
import { Container, FullColorSection, AlphaSection, CurrentColorComponent, Mask, Label } from'./styles'

export const CurrentColor = ({h,sl,l,a}) => (
  <Container>
    <Label>
      PREVIEW
    </Label>
    <CurrentColorComponent >
      <AlphaSection>
        <Mask hue={h} sat={sl} light={l} alpha={a}/>
      </AlphaSection>
      <FullColorSection>
        <Mask hue={h} sat={sl} light={l} alpha={a}/>
      </FullColorSection>
    </CurrentColorComponent>
  </Container>
);

export default CurrentColor

CurrentColor.propTypes ={
  h: PropTypes.number,
  sl: PropTypes.number,
  l: PropTypes.number,
  a: PropTypes.string,
};

CurrentColor.defaultProps ={
  h: 0,
  sl:100,
  l: 50,
  a: "1.00",
};
