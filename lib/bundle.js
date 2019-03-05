'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var styled = _interopDefault(require('styled-components'));

/* eslint-disable global-require */
var storeEnv = require('./store.prod');

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _typeof2(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof2(obj) {
      return typeof obj;
    };
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof2(obj);
}

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

var PickerAreaComponent = styled.div.withConfig({
  displayName: "styles__PickerAreaComponent",
  componentId: "sc-4vegv8-0"
})(["width:", ";height:", ";min-width:", ";min-height:", ";margin:7px;border-radius:4px;position:relative;background:", ";background:", ";background:", ";background:", ";background-color:", ""], function (_ref) {
  var areaWidth = _ref.areaWidth;
  return "".concat(areaWidth, "px");
}, function (_ref2) {
  var areaHeight = _ref2.areaHeight;
  return "".concat(areaHeight, "px");
}, function (_ref3) {
  var areaWidth = _ref3.areaWidth;
  return "".concat(areaWidth, "px");
}, function (_ref4) {
  var areaHeight = _ref4.areaHeight;
  return "".concat(areaHeight, "px");
}, function (_ref5) {
  var format = _ref5.format;
  return format !== 'HSL' ? '-moz-linear-gradient(bottom, #000 0%, rgba(0, 0, 0, 0) 100%),\n\t\t\t\t-moz-linear-gradient(left, #FFF 0%, rgba(255, 255, 255, 0) 100%);' : '-moz-linear-gradient(top, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 100%, 0) 50%,\n' + '\t\t\t\t\t\t\t\t\thsla(0, 0%, 0%, 0) 50%, hsl(0, 0%, 0%) 100%),\n' + '\t\t\t\t-moz-linear-gradient(left, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);';
}, function (_ref6) {
  var format = _ref6.format;
  return format !== 'HSL' ? '-webkit-linear-gradient(bottom, #000 0%, rgba(0, 0, 0, 0) 100%),\n' + '\t\t\t\t-webkit-linear-gradient(left, #FFF 0%, rgba(255, 255, 255, 0) 100%);' : '-webkit-linear-gradient(top, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 100%, 0) 50%,\n' + '\t\t\t\t\t\t\t\t\thsla(0, 0%, 0%, 0) 50%, hsl(0, 0%, 0%) 100%),\n' + '\t\t\t\t-webkit-linear-gradient(left, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);';
}, function (_ref7) {
  var format = _ref7.format;
  return format !== 'HSL' ? ' -ms-linear-gradient(bottom, #000 0%, rgba(0, 0, 0, 0) 100%),\n' + '\t\t\t\t-ms-linear-gradient(left, #FFF 0%, rgba(255, 255, 255, 0) 100%);' : '-ms-linear-gradient(top, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 100%, 0) 50%,\n' + '\t\t\t\t\t\t\t\t\thsla(0, 0%, 0%, 0) 50%, hsl(0, 0%, 0%) 100%),\n' + '\t\t\t\t-ms-linear-gradient(left, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);';
}, function (_ref8) {
  var format = _ref8.format;
  return format !== 'HSL' ? '-o-linear-gradient(bottom, #000 0%, rgba(0, 0, 0, 0) 100%),\n' + '\t\t\t\t-o-linear-gradient(left, #FFF 0%, rgba(255, 255, 255, 0) 100%);' : '-o-linear-gradient(top, hsl(0, 0%, 100%) 0%, hsla(0, 0%, 100%, 0) 50%,\n' + '\t\t\t\t\t\t\t\t\thsla(0, 0%, 0%, 0) 50%, hsl(0, 0%, 0%) 100%),\n' + '\t\t\t\t-o-linear-gradient(left, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);';
}, function (_ref9) {
  var hue = _ref9.hue;
  return "hsla(".concat(hue, ",100%,50%,1)");
});
var PickerComponent = styled.div.withConfig({
  displayName: "styles__PickerComponent",
  componentId: "sc-4vegv8-1"
})(["width:8px;height:8px;border-radius:50%;border:2px solid #FFFFFF;box-shadow:0 1px 1px rgba(0,0,0,0.1);position:absolute;left:", ";top:", ";display:flex;"], function (_ref10) {
  var pickerPositionX = _ref10.pickerPositionX;
  return "".concat(pickerPositionX, "px") || '45%';
}, function (_ref11) {
  var pickerPositionY = _ref11.pickerPositionY;
  return "".concat(pickerPositionY, "px") || '45%';
});

function symbolObservablePonyfill(root) {
  var result;
  var Symbol = root.Symbol;

  if (typeof Symbol === 'function') {
    if (Symbol.observable) {
      result = Symbol.observable;
    } else {
      result = Symbol('observable');
      Symbol.observable = result;
    }
  } else {
    result = '@@observable';
  }

  return result;
}

/* global window */
var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = symbolObservablePonyfill(root);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */

var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */


function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? 'null' : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];

    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }

  return boundActionCreators;
}

var UPDATE_COLOR_PICKER_AREA_POSITION = 'UPDATE_COLOR_PICKER_AREA_POSITION';
var UPDATE_COLORS_WITH_PICKER_AREA = 'UPDATE_COLORS_WITH_PICKER_AREA';
var pickerAreaTypes = {
  UPDATE_COLOR_PICKER_AREA_POSITION: UPDATE_COLOR_PICKER_AREA_POSITION,
  UPDATE_COLORS_WITH_PICKER_AREA: UPDATE_COLORS_WITH_PICKER_AREA
};

var updateColorPickerAreaPosition = function updateColorPickerAreaPosition(sv, v, sl, l, areaWidth, areaHeight, format) {
  return {
    type: pickerAreaTypes.UPDATE_COLOR_PICKER_AREA_POSITION,
    sv: sv,
    v: v,
    sl: sl,
    l: l,
    areaWidth: areaWidth,
    areaHeight: areaHeight,
    format: format
  };
};
var updateColorsWithPickerArea = function updateColorsWithPickerArea(xValue, yValue, format) {
  return {
    type: pickerAreaTypes.UPDATE_COLORS_WITH_PICKER_AREA,
    xValue: xValue,
    yValue: yValue,
    format: format
  };
};

function mapStateToProps(state) {
  return {
    positionX: state.pickerArea.positionX,
    positionY: state.pickerArea.positionY
  };
}

function mapDispatchToProps(dispatch) {
  return {
    pickerAreaActions: bindActionCreators({
      updateColorPickerAreaPosition: updateColorPickerAreaPosition,
      updateColorsWithPickerArea: updateColorsWithPickerArea
    }, dispatch)
  };
}

var store = reactRedux.connect(mapStateToProps, mapDispatchToProps);

var PickerArea =
/*#__PURE__*/
function (_Component) {
  _inherits(PickerArea, _Component);

  function PickerArea(props) {
    var _this;

    _classCallCheck(this, PickerArea);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(PickerArea).call(this, props));
    _this.mouseDownEvent = _this.mouseDownEvent.bind(_assertThisInitialized(_this));
    _this.updatePickerPosition = _this.updatePickerPosition.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PickerArea, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updatePickerPosition();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updatePickerPosition();
    }
  }, {
    key: "updatePickerPosition",
    value: function updatePickerPosition() {
      var _this$props = this.props,
          pickerAreaActions = _this$props.pickerAreaActions,
          sv = _this$props.sv,
          v = _this$props.v,
          sl = _this$props.sl,
          l = _this$props.l,
          areaWidth = _this$props.areaWidth,
          areaHeight = _this$props.areaHeight,
          format = _this$props.format;
      pickerAreaActions.updateColorPickerAreaPosition(sv, v, sl, l, areaWidth, areaHeight, format);
    }
  }, {
    key: "updateColorWithPicker",
    value: function updateColorWithPicker(e, pickerAreaOffsetX, pickerAreaOffsetY) {
      var _this$props2 = this.props,
          areaWidth = _this$props2.areaWidth,
          areaHeight = _this$props2.areaHeight,
          pickerAreaActions = _this$props2.pickerAreaActions,
          format = _this$props2.format;
      var xValue = e.pageX - pickerAreaOffsetX;
      if (xValue > areaWidth) xValue = areaWidth;
      if (xValue < 0) xValue = 0;
      var yValue = e.pageY - pickerAreaOffsetY;
      if (yValue > areaHeight) yValue = areaHeight;
      if (yValue < 0) yValue = 0;
      var saturation = Math.round(xValue / areaWidth * 100);
      var value = Math.round(100 - yValue / areaHeight * 100);
      pickerAreaActions.updateColorsWithPickerArea(saturation, value, format);
    }
  }, {
    key: "mouseDownEvent",
    value: function mouseDownEvent(e) {
      var _this2 = this;

      var pickerAreaOffsetX = e.currentTarget.offsetLeft + 1;
      var pickerAreaOffsetY = e.currentTarget.offsetTop + 1;
      this.updateColorWithPicker(e, pickerAreaOffsetX, pickerAreaOffsetY);

      var PointerUpdater = function PointerUpdater(event) {
        return _this2.updateColorWithPicker(event, pickerAreaOffsetX, pickerAreaOffsetY);
      };

      document.addEventListener('mousemove', PointerUpdater);
      document.addEventListener('mouseup', function () {
        return document.removeEventListener('mousemove', PointerUpdater);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          h = _this$props3.h,
          areaWidth = _this$props3.areaWidth,
          areaHeight = _this$props3.areaHeight,
          format = _this$props3.format,
          positionX = _this$props3.positionX,
          positionY = _this$props3.positionY;
      return React__default.createElement(PickerAreaComponent, {
        hue: h,
        areaWidth: areaWidth,
        areaHeight: areaHeight,
        format: format,
        onMouseDown: function onMouseDown(e) {
          return _this3.mouseDownEvent(e);
        }
      }, React__default.createElement(PickerComponent, {
        pickerPositionX: positionX,
        pickerPositionY: positionY
      }));
    }
  }]);

  return PickerArea;
}(React.Component);

var PickerArea$1 = store(PickerArea);
PickerArea.defaultProps = {
  h: 0,
  sv: 100,
  sl: 100,
  l: 50,
  v: 100,
  areaHeight: 200,
  areaWidth: 200,
  format: 'HSV',
  pickerAreaActions: {},
  positionX: 0,
  positionY: 0
};

var InputComponent = styled.div.withConfig({
  displayName: "styles__InputComponent",
  componentId: "w2ydnh-0"
})(["display:flex;justify-content:center;height:fit-content;"]);
var NumericalInput = styled.input.withConfig({
  displayName: "styles__NumericalInput",
  componentId: "w2ydnh-1"
})(["width:26px;height:26px;border-radius:4px;border:#C8D1DE 1px solid;padding:0 4px;margin-bottom:4px;text-align:center;"]);
var Label = styled.label.withConfig({
  displayName: "styles__Label",
  componentId: "w2ydnh-2"
})(["display:flex;justify-content:center;font-family:Roboto;font-size:10px;font-style:normal;font-stretch:normal;line-height:15px;letter-spacing:normal;text-align:center;color:#A9B5C7;"]);
var InputBox = styled.div.withConfig({
  displayName: "styles__InputBox",
  componentId: "w2ydnh-3"
})(["display:flex;flex-direction:column;padding:5px;"]);

// Update color inputs
var UPDATE_R_INPUT = 'UPDATE_R_INPUT';
var UPDATE_G_INPUT = 'UPDATE_G_INPUT';
var UPDATE_B_INPUT = 'UPDATE_B_INPUT';
var VALIDATE_RGB_INPUT = 'VALIDATE_RGB_INPUT';
var rgbInputTypes = {
  UPDATE_R_INPUT: UPDATE_R_INPUT,
  UPDATE_G_INPUT: UPDATE_G_INPUT,
  UPDATE_B_INPUT: UPDATE_B_INPUT,
  VALIDATE_RGB_INPUT: VALIDATE_RGB_INPUT
};

var updateRInputValue = function updateRInputValue(value) {
  return {
    type: rgbInputTypes.UPDATE_R_INPUT,
    value: value
  };
};
var updateGInputValue = function updateGInputValue(value) {
  return {
    type: rgbInputTypes.UPDATE_G_INPUT,
    value: value
  };
};
var updateBInputValue = function updateBInputValue(value) {
  return {
    type: rgbInputTypes.UPDATE_B_INPUT,
    value: value
  };
};
var validateRGBInput = function validateRGBInput(value, min, max) {
  return {
    type: rgbInputTypes.VALIDATE_RGB_INPUT,
    value: value,
    min: min,
    max: max
  };
};

function mapStateToProps$1(state) {
  return {
    rInput: state.rgbInput.r_input,
    gInput: state.rgbInput.g_input,
    bInput: state.rgbInput.b_input
  };
}

function mapDispatchToProps$1(dispatch) {
  return {
    rgbInputActions: bindActionCreators({
      updateGInputValue: updateGInputValue,
      updateRInputValue: updateRInputValue,
      updateBInputValue: updateBInputValue,
      validateRGBInput: validateRGBInput
    }, dispatch)
  };
}

var store$1 = reactRedux.connect(mapStateToProps$1, mapDispatchToProps$1);

var RGBComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(RGBComponent, _Component);

  function RGBComponent(props) {
    var _this;

    _classCallCheck(this, RGBComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(RGBComponent).call(this, props));
    _this.updateInputValues = _this.updateInputValues.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(RGBComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateInputValues();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.updateInputValues(prevProps);
    }
  }, {
    key: "updateInputValues",
    value: function updateInputValues(prevProps) {
      var _this$props = this.props,
          r = _this$props.r,
          g = _this$props.g,
          b = _this$props.b;
      var _this$props$rgbInputA = this.props.rgbInputActions,
          updateRInputValue = _this$props$rgbInputA.updateRInputValue,
          updateGInputValue = _this$props$rgbInputA.updateGInputValue,
          updateBInputValue = _this$props$rgbInputA.updateBInputValue;

      if (prevProps) {
        if (this.props.r !== prevProps.r) updateRInputValue(r);
        if (this.props.g !== prevProps.g) updateGInputValue(g);
        if (this.props.b !== prevProps.b) updateBInputValue(b);
      } else {
        updateRInputValue(r);
        updateGInputValue(g);
        updateBInputValue(b);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          rInput = _this$props2.rInput,
          gInput = _this$props2.gInput,
          bInput = _this$props2.bInput;
      var _this$props$rgbInputA2 = this.props.rgbInputActions,
          updateRInputValue = _this$props$rgbInputA2.updateRInputValue,
          updateGInputValue = _this$props$rgbInputA2.updateGInputValue,
          updateBInputValue = _this$props$rgbInputA2.updateBInputValue,
          validateRGBInput = _this$props$rgbInputA2.validateRGBInput;
      return React__default.createElement(InputComponent, null, React__default.createElement(InputBox, null, React__default.createElement(NumericalInput, {
        id: "rInput",
        value: rInput,
        onChange: function onChange(event) {
          return updateRInputValue(event.target.value);
        },
        onBlur: function onBlur() {
          return validateRGBInput('r', 0, 255);
        }
      }), React__default.createElement(Label, {
        htmlFor: "rInput"
      }, "R ")), React__default.createElement(InputBox, null, React__default.createElement(NumericalInput, {
        id: "gInput",
        value: gInput,
        onChange: function onChange(event) {
          return updateGInputValue(event.target.value);
        },
        onBlur: function onBlur() {
          return validateRGBInput('g', 0, 255);
        }
      }), React__default.createElement(Label, {
        htmlFor: "gInput"
      }, "G")), React__default.createElement(InputBox, null, React__default.createElement(NumericalInput, {
        id: "bInput",
        value: bInput,
        onChange: function onChange(event) {
          return updateBInputValue(event.target.value);
        },
        onBlur: function onBlur() {
          return validateRGBInput('b', 0, 255);
        }
      }), React__default.createElement(Label, {
        htmlFor: "bInput"
      }, "B")));
    }
  }]);

  return RGBComponent;
}(React.Component);

var RGBAInput = store$1(RGBComponent);
RGBComponent.defaultProps = {
  rgbInputActions: {},
  r: 255,
  g: 0,
  b: 0,
  rInput: 255,
  gInput: 0,
  bInput: 0
};

var InputComponent$1 = styled.div.withConfig({
  displayName: "styles__InputComponent",
  componentId: "sc-8julr4-0"
})(["display:flex;justify-content:center;height:fit-content;"]);
var NumericalInput$1 = styled.input.withConfig({
  displayName: "styles__NumericalInput",
  componentId: "sc-8julr4-1"
})(["width:26px;height:26px;border-radius:4px;border:#C8D1DE 1px solid;padding:0 4px;margin-bottom:4px;text-align:center;"]);
var Label$1 = styled.label.withConfig({
  displayName: "styles__Label",
  componentId: "sc-8julr4-2"
})(["display:flex;justify-content:center;font-family:Roboto;font-size:10px;font-style:normal;font-stretch:normal;line-height:15px;letter-spacing:normal;text-align:center;color:#A9B5C7;"]);
var InputBox$1 = styled.div.withConfig({
  displayName: "styles__InputBox",
  componentId: "sc-8julr4-3"
})(["display:flex;flex-direction:column;padding:5px;"]);

// Update color inputs
var UPDATE_A_INPUT = 'UPDATE_A_INPUT';
var VALIDATE_A_INPUT = 'VALIDATE_A_INPUT';
var aInputTypes = {
  UPDATE_A_INPUT: UPDATE_A_INPUT,
  VALIDATE_A_INPUT: VALIDATE_A_INPUT
};

var updateAInputValue = function updateAInputValue(value) {
  return {
    type: aInputTypes.UPDATE_A_INPUT,
    value: value
  };
};
var validateAInput = function validateAInput() {
  return {
    type: aInputTypes.VALIDATE_A_INPUT
  };
};

function mapStateToProps$2(state) {
  return {
    aInput: state.aInput.a_input
  };
}

function mapDispatchToProps$2(dispatch) {
  return {
    aInputActions: bindActionCreators({
      updateAInputValue: updateAInputValue,
      validateAInput: validateAInput
    }, dispatch)
  };
}

var store$2 = reactRedux.connect(mapStateToProps$2, mapDispatchToProps$2);

var AComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(AComponent, _Component);

  function AComponent(props) {
    var _this;

    _classCallCheck(this, AComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AComponent).call(this, props));
    _this.updateInputValues = _this.updateInputValues.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateInputValues();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.updateInputValues(prevProps);
    }
  }, {
    key: "updateInputValues",
    value: function updateInputValues(prevProps) {
      var a = this.props.a;
      var updateAInputValue = this.props.aInputActions.updateAInputValue;

      if (prevProps) {
        if (this.props.a !== prevProps.a) updateAInputValue(a);
      } else {
        updateAInputValue(a);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var aInput = this.props.aInput;
      var _this$props$aInputAct = this.props.aInputActions,
          updateAInputValue = _this$props$aInputAct.updateAInputValue,
          validateAInput = _this$props$aInputAct.validateAInput;
      return React__default.createElement(InputComponent$1, null, React__default.createElement(InputBox$1, null, React__default.createElement(NumericalInput$1, {
        id: "aInput",
        value: aInput,
        onChange: function onChange(event) {
          return updateAInputValue(event.target.value);
        },
        onBlur: function onBlur() {
          return validateAInput();
        }
      }), React__default.createElement(Label$1, {
        htmlFor: "aInput"
      }, "A")));
    }
  }]);

  return AComponent;
}(React.Component);

var AInput = store$2(AComponent);
AComponent.defaultProps = {
  aInputActions: {},
  a: "1.00",
  aInput: "1.00"
};

var UPDATE_HUE_POSITION_VERTICAL = 'UPDATE_POSITION_VERTICAL';
var UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL = 'UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL';
var hueSliderTypesVertical = {
  UPDATE_HUE_POSITION_VERTICAL: UPDATE_HUE_POSITION_VERTICAL,
  UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL: UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL
};

var updateHueSliderPositionVertical = function updateHueSliderPositionVertical(value, areaHeight) {
  return {
    type: hueSliderTypesVertical.UPDATE_HUE_POSITION_VERTICAL,
    value: value,
    areaHeight: areaHeight
  };
};
var updateColorsWithHueSliderVertical = function updateColorsWithHueSliderVertical(value) {
  return {
    type: hueSliderTypesVertical.UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL,
    value: value
  };
};

function mapStateToProps$3(state) {
  return {
    position: state.hueVertical.position
  };
}

function mapDispatchToProps$3(dispatch) {
  return {
    hueSliderVerticalActions: bindActionCreators({
      updateColorsWithHueSliderVertical: updateColorsWithHueSliderVertical,
      updateHueSliderPositionVertical: updateHueSliderPositionVertical
    }, dispatch)
  };
}

var store$3 = reactRedux.connect(mapStateToProps$3, mapDispatchToProps$3);

var HueSliderComponent = styled.div.withConfig({
  displayName: "styles__HueSliderComponent",
  componentId: "sc-1utiz37-0"
})(["display:flex;justify-content:start;margin:7px;"]);
var SliderBox = styled.div.withConfig({
  displayName: "styles__SliderBox",
  componentId: "sc-1utiz37-1"
})(["height:", ";border-radius:2px;width:10px;background:-moz-linear-gradient(top,#F00 0%,#FF0 16.66%,#0F0 33.33%,#0FF 50%,#00F 66.66%,#F0F 83.33%,#F00 100%);background:-webkit-linear-gradient(top,#F00 0%,#FF0 16.66%,#0F0 33.33%,#0FF 50%,#00F 66.66%,#F0F 83.33%,#F00 100%);background:-ms-linear-gradient(top,#F00 0%,#FF0 16.66%,#0F0 33.33%,#0FF 50%,#00F 66.66%,#F0F 83.33%,#F00 100%);background:-o-linear-gradient(top,#F00 0%,#FF0 16.66%,#0F0 33.33%,#0FF 50%,#00F 66.66%,#F0F 83.33%,#F00 100%);"], function (_ref) {
  var areaHeight = _ref.areaHeight;
  return "".concat(areaHeight, "px");
});
var PickerSlider = styled.div.withConfig({
  displayName: "styles__PickerSlider",
  componentId: "sc-1utiz37-2"
})(["height:8px;width:8px;border:2px solid  #FFFFFF;box-shadow:0 1px 1px rgba(0,0,0,0.1);position:relative;left:-1px;top:", ";border-radius:50%;"], function (_ref2) {
  var sliderY = _ref2.sliderY;
  return "".concat(sliderY - 5, "px");
});

var HueSliderVertical =
/*#__PURE__*/
function (_Component) {
  _inherits(HueSliderVertical, _Component);

  function HueSliderVertical(props) {
    var _this;

    _classCallCheck(this, HueSliderVertical);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HueSliderVertical).call(this, props));
    _this.updateHueSlider = _this.updateHueSlider.bind(_assertThisInitialized(_this));
    _this.mouseDownEvent = _this.mouseDownEvent.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(HueSliderVertical, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateHueSlider();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateHueSlider();
    }
  }, {
    key: "updateHueSlider",
    value: function updateHueSlider() {
      var _this$props = this.props,
          hueSliderVerticalActions = _this$props.hueSliderVerticalActions,
          h = _this$props.h,
          areaHeight = _this$props.areaHeight;
      hueSliderVerticalActions.updateHueSliderPositionVertical(h, areaHeight);
    }
  }, {
    key: "updateHValueWithSlider",
    value: function updateHValueWithSlider(e, sliderAreaOffset) {
      var _this$props2 = this.props,
          areaHeight = _this$props2.areaHeight,
          hueSliderVerticalActions = _this$props2.hueSliderVerticalActions;
      var yValue = e.pageY - sliderAreaOffset;
      if (yValue > areaHeight) yValue = areaHeight;
      if (yValue < 0) yValue = 0;
      var hue = Math.round(yValue / areaHeight * 359);
      hueSliderVerticalActions.updateColorsWithHueSliderVertical(hue);
    }
  }, {
    key: "mouseDownEvent",
    value: function mouseDownEvent(e) {
      var _this2 = this;

      var sliderAreaOffset = e.currentTarget.offsetTop;
      this.updateHValueWithSlider(e, sliderAreaOffset);

      var HUpdaterFunction = function HUpdaterFunction(event) {
        return _this2.updateHValueWithSlider(event, sliderAreaOffset);
      };

      document.addEventListener('mousemove', HUpdaterFunction);
      document.addEventListener('mouseup', function () {
        return document.removeEventListener('mousemove', HUpdaterFunction);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          position = _this$props3.position,
          areaHeight = _this$props3.areaHeight;
      return React__default.createElement(HueSliderComponent, null, React__default.createElement(SliderBox, {
        areaHeight: areaHeight,
        onMouseDown: function onMouseDown(e) {
          return _this3.mouseDownEvent(e);
        }
      }, React__default.createElement(PickerSlider, {
        sliderY: position
      })));
    }
  }]);

  return HueSliderVertical;
}(React.Component);

var HueSliderVertical$1 = store$3(HueSliderVertical);
HueSliderVertical.defaultProps = {
  hueSliderVerticalActions: {},
  h: 0,
  areaHeight: 160,
  position: 0
};

var UPDATE_ALPHA_POSITION_VERTICAL = 'UPDATE_ALPHA_POSITION_VERTICAL';
var VALIDATE_ALPHA_VALUE_VERTICAL_SLIDER = 'VALIDATE_ALPHA_VALUE_VERTICAL_SLIDER';
var alphaSliderVerticalTypes = {
  UPDATE_ALPHA_POSITION_VERTICAL: UPDATE_ALPHA_POSITION_VERTICAL,
  VALIDATE_ALPHA_VALUE_VERTICAL_SLIDER: VALIDATE_ALPHA_VALUE_VERTICAL_SLIDER
};

var updateAlphaSliderPositionVertical = function updateAlphaSliderPositionVertical(value, areaHeight) {
  return {
    type: alphaSliderVerticalTypes.UPDATE_ALPHA_POSITION_VERTICAL,
    value: value,
    areaHeight: areaHeight
  };
};
var validateAlphaValueVerticalSlider = function validateAlphaValueVerticalSlider(value) {
  return {
    type: alphaSliderVerticalTypes.VALIDATE_ALPHA_VALUE_VERTICAL_SLIDER,
    value: value
  };
};

function mapStateToProps$4(state) {
  return {
    position: state.alphaVertical.position
  };
}

function mapDispatchToProps$4(dispatch) {
  return {
    alphaSliderVerticalActions: bindActionCreators({
      updateAlphaSliderPositionVertical: updateAlphaSliderPositionVertical,
      validateAlphaValueVerticalSlider: validateAlphaValueVerticalSlider
    }, dispatch)
  };
}

var store$4 = reactRedux.connect(mapStateToProps$4, mapDispatchToProps$4);

var img = new Image(); img.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg=='; export default img;

var img = /*#__PURE__*/Object.freeze({

});

var AlphaSliderComponent = styled.div.withConfig({
  displayName: "styles__AlphaSliderComponent",
  componentId: "fxyuc8-0"
})(["display:flex;justify-content:start;height:fit-content;margin:7px"]);
var SliderBoxAlphaLayer = styled.div.withConfig({
  displayName: "styles__SliderBoxAlphaLayer",
  componentId: "fxyuc8-1"
})(["width:auto;background:url(", ") center;border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;background-size:contain;"], img);
var SliderBox$1 = styled.div.withConfig({
  displayName: "styles__SliderBox",
  componentId: "fxyuc8-2"
})(["height:", ";width:10px;background:", ";border-radius:2px;-webkit-border-radius:2px;-moz-border-radius:2px;"], function (_ref) {
  var areaHeight = _ref.areaHeight;
  return "".concat(areaHeight, "px");
}, function (_ref2) {
  var hue = _ref2.hue,
      sat = _ref2.sat,
      light = _ref2.light;
  return "linear-gradient(to top, hsla(".concat(hue, ",").concat(sat, "%,").concat(light, "%,0) 0%, hsla(").concat(hue, ",").concat(sat, "%,").concat(light, "%,1) 100%)");
});
var PickerSlider$1 = styled.div.withConfig({
  displayName: "styles__PickerSlider",
  componentId: "fxyuc8-3"
})(["height:8px;width:8px;border:2px solid  #FFFFFF;box-shadow:0 1px 1px rgba(0,0,0,0.1);position:relative;left:-1px;border-radius:50%;top:", ";"], function (_ref3) {
  var sliderY = _ref3.sliderY;
  return "".concat(sliderY - 5, "px");
});

var AlphaSlider =
/*#__PURE__*/
function (_Component) {
  _inherits(AlphaSlider, _Component);

  function AlphaSlider(props) {
    var _this;

    _classCallCheck(this, AlphaSlider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AlphaSlider).call(this, props));
    _this.updateAlphaSlider = _this.updateAlphaSlider.bind(_assertThisInitialized(_this));
    _this.mouseDownEvent = _this.mouseDownEvent.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(AlphaSlider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateAlphaSlider();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.updateAlphaSlider();
    }
  }, {
    key: "updateAlphaSlider",
    value: function updateAlphaSlider() {
      var _this$props = this.props,
          alphaSliderVerticalActions = _this$props.alphaSliderVerticalActions,
          a = _this$props.a,
          areaHeight = _this$props.areaHeight;
      alphaSliderVerticalActions.updateAlphaSliderPositionVertical(a, areaHeight);
    }
  }, {
    key: "updateAValueWithSlider",
    value: function updateAValueWithSlider(e, sliderAreaOffset) {
      var _this$props2 = this.props,
          areaHeight = _this$props2.areaHeight,
          alphaSliderVerticalActions = _this$props2.alphaSliderVerticalActions;
      var yValue = areaHeight - (e.pageY - sliderAreaOffset);
      if (yValue > areaHeight) yValue = areaHeight;
      if (yValue < 0) yValue = 0;
      var alpha = (yValue / areaHeight).toFixed(2);
      alphaSliderVerticalActions.validateAlphaValueVerticalSlider(alpha);
    }
  }, {
    key: "mouseDownEvent",
    value: function mouseDownEvent(e) {
      var _this2 = this;

      var sliderAreaOffset = e.currentTarget.offsetTop;
      this.updateAValueWithSlider(e, sliderAreaOffset);

      var AUpdaterFunction = function AUpdaterFunction(event) {
        return _this2.updateAValueWithSlider(event, sliderAreaOffset);
      };

      document.addEventListener('mousemove', AUpdaterFunction);
      document.addEventListener('mouseup', function () {
        return document.removeEventListener('mousemove', AUpdaterFunction);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _this$props3 = this.props,
          position = _this$props3.position,
          areaHeight = _this$props3.areaHeight,
          h = _this$props3.h,
          sl = _this$props3.sl,
          l = _this$props3.l;
      return React__default.createElement(AlphaSliderComponent, null, React__default.createElement(SliderBoxAlphaLayer, null, React__default.createElement(SliderBox$1, {
        hue: h,
        sat: sl,
        light: l,
        areaHeight: areaHeight,
        onMouseDown: function onMouseDown(e) {
          return _this3.mouseDownEvent(e);
        }
      }, React__default.createElement(PickerSlider$1, {
        sliderY: position
      }))));
    }
  }]);

  return AlphaSlider;
}(React.Component);

var AlphaSliderVertical = store$4(AlphaSlider);
AlphaSlider.defaultProps = {
  alphaSliderVerticalActions: {},
  h: 0,
  sl: 100,
  l: 50,
  a: "1.00",
  areaHeight: 200,
  position: 0
};

// Update Global Color Values
var UPDATE_R = 'UPDATE_R';
var UPDATE_G = 'UPDATE_G';
var UPDATE_B = 'UPDATE_B';
var UPDATE_A = 'UPDATE_A';
var UPDATE_H = 'UPDATE_H';
var UPDATE_SV = 'UPDATE_SV';
var UPDATE_SL = 'UPDATE_SL';
var UPDATE_V = 'UPDATE_V';
var UPDATE_L = 'UPDATE_L'; // Update color inputs

var UPDATE_HEX = 'UPDATE_HEX'; // Update HSL/ HSX Format

var UPDATE_FORMAT = 'UPDATE_FORMAT'; // Update Full values

var UPDATE_HSL_COMBO = 'UPDATE_HSL_COMBO';
var UPDATE_HSV_COMBO = 'UPDATE_HSV_COMBO';
var UPDATE_RGB_COMBO = 'UPDATE_RGB_COMBO';
var colorTypes = {
  UPDATE_R: UPDATE_R,
  UPDATE_G: UPDATE_G,
  UPDATE_B: UPDATE_B,
  UPDATE_A: UPDATE_A,
  UPDATE_H: UPDATE_H,
  UPDATE_L: UPDATE_L,
  UPDATE_SV: UPDATE_SV,
  UPDATE_SL: UPDATE_SL,
  UPDATE_V: UPDATE_V,
  UPDATE_HEX: UPDATE_HEX,
  UPDATE_FORMAT: UPDATE_FORMAT,
  UPDATE_HSL_COMBO: UPDATE_HSL_COMBO,
  UPDATE_HSV_COMBO: UPDATE_HSV_COMBO,
  UPDATE_RGB_COMBO: UPDATE_RGB_COMBO
};

var updateRValue = function updateRValue(value) {
  return {
    type: colorTypes.UPDATE_R,
    value: value
  };
};
var updateGValue = function updateGValue(value) {
  return {
    type: colorTypes.UPDATE_G,
    value: value
  };
};
var updateBValue = function updateBValue(value) {
  return {
    type: colorTypes.UPDATE_B,
    value: value
  };
};
var updateHValue = function updateHValue(value) {
  return {
    type: colorTypes.UPDATE_H,
    value: value
  };
};
var updateSVValue = function updateSVValue(value) {
  return {
    type: colorTypes.UPDATE_SV,
    value: value
  };
};
var updateSLValue = function updateSLValue(value) {
  return {
    type: colorTypes.UPDATE_SL,
    value: value
  };
};
var updateLValue = function updateLValue(value) {
  return {
    type: colorTypes.UPDATE_L,
    value: value
  };
};
var updateVValue = function updateVValue(value) {
  return {
    type: colorTypes.UPDATE_V,
    value: value
  };
};
var updateAValue = function updateAValue(value) {
  return {
    type: colorTypes.UPDATE_A,
    value: value
  };
};
var updateFormat = function updateFormat(value) {
  return {
    type: colorTypes.UPDATE_FORMAT,
    value: value
  };
};

// Update color inputs
var UPDATE_HEX_INPUT = 'UPDATE_HEX_INPUT';
var VALIDATE_HEX_INPUT = 'VALIDATE_HEX_INPUT';
var hexInputTypes = {
  UPDATE_HEX_INPUT: UPDATE_HEX_INPUT,
  VALIDATE_HEX_INPUT: VALIDATE_HEX_INPUT
};

var updateHexInputValue = function updateHexInputValue(value) {
  return {
    type: hexInputTypes.UPDATE_HEX_INPUT,
    value: value
  };
};
var validateHexInput = function validateHexInput() {
  return {
    type: hexInputTypes.VALIDATE_HEX_INPUT
  };
};

function mapStateToProps$5(state) {
  return {
    r: state.color.r,
    g: state.color.g,
    b: state.color.b,
    h: state.color.h,
    sv: state.color.sv,
    sl: state.color.sl,
    l: state.color.l,
    v: state.color.v,
    a: state.color.a,
    hex: state.color.hex,
    format: state.color.format
  };
}

function mapDispatchToProps$5(dispatch) {
  return {
    actions: bindActionCreators({
      updateRValue: updateRValue,
      updateGValue: updateGValue,
      updateBValue: updateBValue,
      updateHValue: updateHValue,
      updateSVValue: updateSVValue,
      updateSLValue: updateSLValue,
      updateLValue: updateLValue,
      updateVValue: updateVValue,
      updateAValue: updateAValue,
      updateFormat: updateFormat,
      updateHexInputValue: updateHexInputValue,
      validateHexInput: validateHexInput
    }, dispatch),
    hexActions: bindActionCreators({
      updateHexInputValue: updateHexInputValue,
      validateHexInput: validateHexInput
    }, dispatch)
  };
}

var store$5 = reactRedux.connect(mapStateToProps$5, mapDispatchToProps$5);

var InputComponent$2 = styled.div.withConfig({
  displayName: "styles__InputComponent",
  componentId: "sc-14qwisy-0"
})(["display:flex;justify-content:center;height:fit-content;"]);
var NumericalInput$2 = styled.input.withConfig({
  displayName: "styles__NumericalInput",
  componentId: "sc-14qwisy-1"
})(["width:64px;height:26px;border-radius:4px;border:#C8D1DE 1px solid;padding:0 4px;margin-bottom:4px;text-align:center;"]);
var Label$2 = styled.label.withConfig({
  displayName: "styles__Label",
  componentId: "sc-14qwisy-2"
})(["display:flex;justify-content:center;font-family:Roboto;font-size:10px;font-style:normal;font-stretch:normal;line-height:15px;letter-spacing:normal;text-align:center;color:#A9B5C7;"]);
var InputBox$2 = styled.div.withConfig({
  displayName: "styles__InputBox",
  componentId: "sc-14qwisy-3"
})(["display:flex;flex-direction:column;padding:5px;"]);

function mapStateToProps$6(state) {
  return {
    hexInput: state.hexInput.hex_input
  };
}

function mapDispatchToProps$6(dispatch) {
  return {
    hexInputActions: bindActionCreators({
      updateHexInputValue: updateHexInputValue,
      validateHexInput: validateHexInput
    }, dispatch)
  };
}

var store$6 = reactRedux.connect(mapStateToProps$6, mapDispatchToProps$6);

var HexComponent =
/*#__PURE__*/
function (_Component) {
  _inherits(HexComponent, _Component);

  function HexComponent(props) {
    var _this;

    _classCallCheck(this, HexComponent);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(HexComponent).call(this, props));
    _this.updateInputValues = _this.updateInputValues.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(HexComponent, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateInputValues();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      this.updateInputValues(prevProps);
    }
  }, {
    key: "updateInputValues",
    value: function updateInputValues(prevProps) {
      var hex = this.props.hex;
      var updateHexInputValue = this.props.hexInputActions.updateHexInputValue;

      if (prevProps) {
        if (this.props.hex !== prevProps.hex) updateHexInputValue(hex);
      } else {
        updateHexInputValue(hex);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var hexInput = this.props.hexInput;
      var _this$props$hexInputA = this.props.hexInputActions,
          updateHexInputValue = _this$props$hexInputA.updateHexInputValue,
          validateHexInput = _this$props$hexInputA.validateHexInput;
      return React__default.createElement(InputComponent$2, null, React__default.createElement(InputBox$2, null, React__default.createElement(NumericalInput$2, {
        id: "hexInput",
        value: hexInput,
        onChange: function onChange(event) {
          return updateHexInputValue(event.target.value);
        },
        onBlur: function onBlur() {
          return validateHexInput();
        }
      }), React__default.createElement(Label$2, {
        htmlFor: "aInput"
      }, "HEXA")));
    }
  }]);

  return HexComponent;
}(React.Component);

var HexInput = store$6(HexComponent);
HexComponent.defaultProps = {
  hexInputActions: {},
  hex: "#FF0000",
  hexInput: "#FF0000"
};

var Container = styled.div.withConfig({
  displayName: "styles__Container",
  componentId: "fzehsu-0"
})(["display:flex;flex-direction:column;box-shadow:0 2px 4px rgba(136,158,176,0.4);background-color:#ffffff;padding:12px;border-radius:4px;width:fit-content;max-width:280px;"]);
var AreaAndSliderContainer = styled.div.withConfig({
  displayName: "styles__AreaAndSliderContainer",
  componentId: "fzehsu-1"
})(["display:flex;justify-content:center;width:280px;"]);
var RGBAHexInputContainer = styled.div.withConfig({
  displayName: "styles__RGBAHexInputContainer",
  componentId: "fzehsu-2"
})(["display:flex;justify-content:center;width:280px;"]);
var HSVInputAndButtonContainer = styled.div.withConfig({
  displayName: "styles__HSVInputAndButtonContainer",
  componentId: "fzehsu-3"
})(["display:flex;flex-direction:column;justify-content:center;width:280px;"]);
var HorizontalSliderContainer = styled.div.withConfig({
  displayName: "styles__HorizontalSliderContainer",
  componentId: "fzehsu-4"
})(["display:flex;flex-direction:column;justify-content:center;width:280px;"]);
var PreviewContainer = styled.div.withConfig({
  displayName: "styles__PreviewContainer",
  componentId: "fzehsu-5"
})(["display:flex;justify-content:center;width:280px;"]);

var Color =
/*#__PURE__*/
function (_Component) {
  _inherits(Color, _Component);

  function Color(props) {
    var _this;

    _classCallCheck(this, Color);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Color).call(this, props));
    _this.handleChange = _this.handleChange.bind(_assertThisInitialized(_this));
    _this.updateColor = _this.updateColor.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(Color, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.handleChange();
      this.updateColor();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(previousProps) {
      var _this2 = this;

      var colorHasChanged = ['r', 'g', 'b', 'a', 'h', 'sl', 'sv', 'l', 'v', 'hex'].some(function (key) {
        return previousProps[key] !== _this2.props[key];
      });
      if (colorHasChanged) this.handleChange();
    }
  }, {
    key: "handleChange",
    value: function handleChange() {
      var _this$props = this.props,
          r = _this$props.r,
          g = _this$props.g,
          b = _this$props.b,
          a = _this$props.a,
          h = _this$props.h,
          sl = _this$props.sl,
          sv = _this$props.sv,
          l = _this$props.l,
          v = _this$props.v,
          hex = _this$props.hex,
          onChange = _this$props.onChange;
      var colorObject = {
        hex: hex,
        rgba: {
          r: r,
          g: g,
          b: b,
          a: a
        },
        hsla: {
          h: h,
          s: sl,
          l: l,
          a: a
        },
        hsva: {
          h: h,
          s: sv,
          v: v,
          a: a
        }
      };
      onChange(colorObject);
    }
  }, {
    key: "updateColor",
    value: function updateColor() {
      var color = this.props.color;
      var _this$props$hexAction = this.props.hexActions,
          updateHexInputValue = _this$props$hexAction.updateHexInputValue,
          validateHexInput = _this$props$hexAction.validateHexInput;
      updateHexInputValue(color);
      validateHexInput();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          r = _this$props2.r,
          g = _this$props2.g,
          b = _this$props2.b,
          a = _this$props2.a,
          h = _this$props2.h,
          sl = _this$props2.sl,
          sv = _this$props2.sv,
          l = _this$props2.l,
          v = _this$props2.v,
          hex = _this$props2.hex,
          actions = _this$props2.actions,
          format = _this$props2.format;
      return React__default.createElement(Container, null, React__default.createElement(AreaAndSliderContainer, null, React__default.createElement(PickerArea$1, Object.assign({
        h: h
      }, {
        sl: sl
      }, {
        sv: sv
      }, {
        l: l
      }, {
        v: v
      }, {
        format: format
      }, {
        actions: actions
      }, {
        areaWidth: 200,
        areaHeight: 200
      })), React__default.createElement(HueSliderVertical$1, Object.assign({
        h: h
      }, {
        areaHeight: 200
      })), React__default.createElement(AlphaSliderVertical, Object.assign({
        h: h
      }, {
        sl: sl
      }, {
        l: l
      }, {
        a: a
      }, {
        areaHeight: 200
      }))), React__default.createElement(RGBAHexInputContainer, null, React__default.createElement(HexInput, Object.assign({
        hex: hex
      }, {
        actions: actions
      })), React__default.createElement(RGBAInput, Object.assign({
        r: r
      }, {
        g: g
      }, {
        b: b
      }, {
        actions: actions
      })), React__default.createElement(AInput, Object.assign({
        a: a
      }, {
        actions: actions
      }))));
    }
  }]);

  return Color;
}(React.Component);

var Color$1 = store$5(Color);
Color.defaultProps = {
  r: 255,
  g: 0,
  b: 0,
  h: 0,
  sv: 100,
  sl: 100,
  l: 50,
  v: 100,
  a: "1.00",
  hex: "#FF0000",
  hexActions: {},
  actions: {},
  format: 'HSV'
};

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, props));
    _this.state = {
      bg: '#FFF'
    };
    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      return React__default.createElement("div", {
        className: "App",
        style: {
          backgroundColor: this.state.bg
        }
      }, React__default.createElement(Color$1, {
        onChange: function onChange(_ref) {
          var hex = _ref.hex;
          return _this2.setState({
            bg: hex
          });
        },
        color: "#00B9FC"
      }));
    }
  }]);

  return App;
}(React.Component);

var AppWithProvider = function AppWithProvider() {
  return React__default.createElement(reactRedux.Provider, {
    store: storeEnv()
  }, React__default.createElement(App, null));
};

module.exports = AppWithProvider;
