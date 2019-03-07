'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var reactRedux = require('react-redux');
var createSagaMiddleware = _interopDefault(require('redux-saga'));
var reduxDevtoolsExtension = require('redux-devtools-extension');
var styled = _interopDefault(require('styled-components'));

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
/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */

function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}
/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */


function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[result] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[result] = observable, _ref2;
}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers);

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    return hasChanged ? nextState : state;
  };
}

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

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */


function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}
/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */


function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error("Dispatching while constructing your middleware is not allowed. " + "Other middleware would not be applied to this dispatch.");
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
!function (global) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.

  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  var runtime = global.regeneratorRuntime;

  if (runtime) {
    {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    } // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.


    return;
  } // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.


  runtime = global.regeneratorRuntime = module.exports;

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.

    generator._invoke = makeInvokeMethod(innerFn, self, context);
    return generator;
  }

  runtime.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.

  var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.


  var IteratorPrototype = {};

  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;

      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }

    genFun.prototype = Object.create(Gp);
    return genFun;
  }; // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.


  runtime.awrap = function (arg) {
    return {
      __await: arg
    };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;

        if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function (error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    } // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).


    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);

  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };

  runtime.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.

  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;
    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        } // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;

        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);

          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;
        var record = tryCatch(innerFn, self, context);

        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted; // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.

          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  } // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.


  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

      context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.

      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    } // The delegate iterator is finished, so forget it and continue with
    // the outer generator.


    context.delegate = null;
    return ContinueSentinel;
  } // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.


  defineIteratorMethods(Gp);
  Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{
      tryLoc: "root"
    }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    keys.reverse(); // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.

    return function next() {
      while (keys.length) {
        var key = keys.pop();

        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      } // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.


      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];

      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;
          return next;
        };

        return next.next = next;
      }
    } // Return an iterator with no values.


    return {
      next: doneResult
    };
  }

  runtime.values = values;

  function doneResult() {
    return {
      value: undefined$1,
      done: true
    };
  }

  Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      this.prev = 0;
      this.next = 0; // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.

      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;
      this.method = "next";
      this.arg = undefined$1;
      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },
    stop: function () {
      this.done = true;
      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;

      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;

      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },
    complete: function (record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },
    "catch": function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      } // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.


      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };
}( // In sloppy mode, unbound `this` refers to the global object, fallback to
// Function constructor if we're in global strict mode. That is sadly a form
// of indirect eval which violates Content Security Policy.
function () {
  return this || typeof self === "object" && self;
}() || Function("return this")());
});

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = function () {
  return this || typeof self === "object" && self;
}() || Function("return this")(); // Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.


var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0; // Save the old regeneratorRuntime in case it needs to be restored later.

var oldRuntime = hadRuntime && g.regeneratorRuntime; // Force reevalutation of runtime.js.

g.regeneratorRuntime = undefined;
var runtimeModule = runtime;

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch (e) {
    g.regeneratorRuntime = undefined;
  }
}

var regenerator = runtimeModule;

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

var createSymbol = function createSymbol(name) {
  return "@@redux-saga/" + name;
};
var IO =
/*#__PURE__*/
createSymbol('IO');
var MULTICAST =
/*#__PURE__*/
createSymbol('MULTICAST');

var undef = function undef(v) {
  return v === null || v === undefined;
};

var notUndef = function notUndef(v) {
  return v !== null && v !== undefined;
};

var func = function func(f) {
  return typeof f === 'function';
};

var string = function string(s) {
  return typeof s === 'string';
};

var array = Array.isArray;

var pattern = function pattern(pat) {
  return pat && (string(pat) || symbol(pat) || func(pat) || array(pat) && pat.every(pattern));
};

var channel = function channel(ch) {
  return ch && func(ch.take) && func(ch.close);
};

var stringableFunc = function stringableFunc(f) {
  return func(f) && f.hasOwnProperty('toString');
};

var symbol = function symbol(sym) {
  return Boolean(sym) && typeof Symbol === 'function' && sym.constructor === Symbol && sym !== Symbol.prototype;
};

var multicast = function multicast(ch) {
  return channel(ch) && ch[MULTICAST];
};

var identity = function identity(v) {
  return v;
};

var kThrow = function kThrow(err) {
  throw err;
};

var kReturn = function kReturn(value) {
  return {
    value: value,
    done: true
  };
};

function makeIterator(next, thro, name) {
  if (thro === void 0) {
    thro = kThrow;
  }

  if (name === void 0) {
    name = 'iterator';
  }

  var iterator = {
    meta: {
      name: name
    },
    next: next,
    throw: thro,
    return: kReturn,
    isSagaIterator: true
  };

  if (typeof Symbol !== 'undefined') {
    iterator[Symbol.iterator] = function () {
      return iterator;
    };
  }

  return iterator;
}
var TAKE = 'TAKE';
var PUT = 'PUT';
var ALL = 'ALL';
var FORK = 'FORK';
var SELECT = 'SELECT';

var makeEffect = function makeEffect(type, payload) {
  var _ref;

  return _ref = {}, _ref[IO] = true, _ref.combinator = false, _ref.type = type, _ref.payload = payload, _ref;
};

function take(patternOrChannel, multicastPattern) {
  if (patternOrChannel === void 0) {
    patternOrChannel = '*';
  }

  if (pattern(patternOrChannel)) {
    return makeEffect(TAKE, {
      pattern: patternOrChannel
    });
  }

  if (multicast(patternOrChannel) && notUndef(multicastPattern) && pattern(multicastPattern)) {
    return makeEffect(TAKE, {
      channel: patternOrChannel,
      pattern: multicastPattern
    });
  }

  if (channel(patternOrChannel)) {
    return makeEffect(TAKE, {
      channel: patternOrChannel
    });
  }

  throw new Error("take(patternOrChannel): argument " + patternOrChannel + " is not valid channel or a valid pattern");
}

function put(channel$$1, action) {

  if (undef(action)) {
    action = channel$$1; // `undefined` instead of `null` to make default parameter work

    channel$$1 = undefined;
  }

  return makeEffect(PUT, {
    channel: channel$$1,
    action: action
  });
}

function all(effects) {
  var eff = makeEffect(ALL, effects);
  eff.combinator = true;
  return eff;
}

function getFnCallDescriptor(fnDescriptor, args) {
  var context = null;
  var fn;

  if (func(fnDescriptor)) {
    fn = fnDescriptor;
  } else {
    if (array(fnDescriptor)) {
      context = fnDescriptor[0];
      fn = fnDescriptor[1];
    } else {
      context = fnDescriptor.context;
      fn = fnDescriptor.fn;
    }

    if (context && string(fn) && func(context[fn])) {
      fn = context[fn];
    }
  }

  return {
    context: context,
    fn: fn,
    args: args
  };
}

function fork(fnDescriptor) {

  for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
    args[_key3 - 1] = arguments[_key3];
  }

  return makeEffect(FORK, getFnCallDescriptor(fnDescriptor, args));
}

function select(selector) {
  if (selector === void 0) {
    selector = identity;
  }

  for (var _len5 = arguments.length, args = new Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
    args[_key5 - 1] = arguments[_key5];
  }

  return makeEffect(SELECT, {
    selector: selector,
    args: args
  });
}

var done = function done(value) {
  return {
    done: true,
    value: value
  };
};

var qEnd = {};

function safeName(patternOrChannel) {
  if (channel(patternOrChannel)) {
    return 'channel';
  }

  if (stringableFunc(patternOrChannel)) {
    return String(patternOrChannel);
  }

  if (func(patternOrChannel)) {
    return patternOrChannel.name;
  }

  return String(patternOrChannel);
}

function fsmIterator(fsm, startState, name) {
  var stateUpdater,
      errorState,
      effect,
      nextState = startState;

  function next(arg, error) {
    if (nextState === qEnd) {
      return done(arg);
    }

    if (error && !errorState) {
      nextState = qEnd;
      throw error;
    } else {
      stateUpdater && stateUpdater(arg);
      var currentState = error ? fsm[errorState](error) : fsm[nextState]();
      nextState = currentState.nextState;
      effect = currentState.effect;
      stateUpdater = currentState.stateUpdater;
      errorState = currentState.errorState;
      return nextState === qEnd ? done(arg) : effect;
    }
  }

  return makeIterator(next, function (error) {
    return next(null, error);
  }, name);
}

function takeEvery(patternOrChannel, worker) {
  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  var yTake = {
    done: false,
    value: take(patternOrChannel)
  };

  var yFork = function yFork(ac) {
    return {
      done: false,
      value: fork.apply(void 0, [worker].concat(args, [ac]))
    };
  };

  var action,
      setAction = function setAction(ac) {
    return action = ac;
  };

  return fsmIterator({
    q1: function q1() {
      return {
        nextState: 'q2',
        effect: yTake,
        stateUpdater: setAction
      };
    },
    q2: function q2() {
      return {
        nextState: 'q1',
        effect: yFork(action)
      };
    }
  }, 'q1', "takeEvery(" + safeName(patternOrChannel) + ", " + worker.name + ")");
}

function takeEvery$1(patternOrChannel, worker) {

  for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    args[_key - 2] = arguments[_key];
  }

  return fork.apply(void 0, [takeEvery, patternOrChannel, worker].concat(args));
}

function _defineProperty$1(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectSpread$1(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty$1(target, key, source[key]);
    });
  }

  return target;
}

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

var RGBtoHSL = function RGBtoHSL(r, g, b) {
  var red = r / 255;
  var green = g / 255;
  var blue = b / 255;
  var cmax = Math.max(red, green, blue);
  var cmin = Math.min(red, green, blue);
  var delta = cmax - cmin;
  var hue = 0;
  var saturation = 0;
  var lightness = (cmax + cmin) / 2;
  var X = 1 - Math.abs(2 * lightness - 1);

  if (delta) {
    if (cmax === red) {
      hue = (green - blue) / delta;
    }

    if (cmax === green) {
      hue = 2 + (blue - red) / delta;
    }

    if (cmax === blue) {
      hue = 4 + (red - green) / delta;
    }

    if (cmax) saturation = delta / X;
  }

  var FinalHue = 60 * hue;
  if (FinalHue < 0) FinalHue += 360;
  FinalHue = Math.round(FinalHue);
  var FinalSaturation = Math.round(saturation * 100);
  var FinalLightness = Math.round(lightness * 100);
  return {
    FinalHue: FinalHue,
    FinalSaturation: FinalSaturation,
    FinalLightness: FinalLightness
  };
};

var RGBtoHSV = function RGBtoHSV(r, g, b) {
  var red = r / 255;
  var green = g / 255;
  var blue = b / 255;
  var cmax = Math.max(red, green, blue);
  var cmin = Math.min(red, green, blue);
  var delta = cmax - cmin;
  var hue = 0;
  var saturation = 0;

  if (delta) {
    if (cmax === red) {
      hue = (green - blue) / delta;
    }

    if (cmax === green) {
      hue = 2 + (blue - red) / delta;
    }

    if (cmax === blue) {
      hue = 4 + (red - green) / delta;
    }

    if (cmax) saturation = delta / cmax;
  }

  var FinalHue = 60 * hue;
  if (FinalHue < 0) FinalHue += 360;
  FinalHue = Math.round(FinalHue);
  var FinalSaturation = Math.round(saturation * 100);
  var FinalValue = Math.round(cmax * 100);
  return {
    FinalHue: FinalHue,
    FinalSaturation: FinalSaturation,
    FinalValue: FinalValue
  };
};

var RGBtoHex = function RGBtoHex(r, g, b, hexAlpha) {
  var hexR = r.toString(16);
  var hexG = g.toString(16);
  var hexB = b.toString(16);
  if (r < 16) hexR = "0".concat(hexR);
  if (g < 16) hexG = "0".concat(hexG);
  if (b < 16) hexB = "0".concat(hexB);
  return "#".concat(hexR).concat(hexG).concat(hexB).concat(hexAlpha).toUpperCase();
};

var _marked =
/*#__PURE__*/
regenerator.mark(validateRGBInput);

function validateRGBInput(_ref) {
  var value, min, max, currentInput, currentValue, parsedInput, parsedValue, validityCheck, currentColors, r, g, b, hex, hexAlpha, newHSL, newHSV, newHex;
  return regenerator.wrap(function validateRGBInput$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          value = _ref.value, min = _ref.min, max = _ref.max;
          _context.next = 3;
          return select(function (state) {
            return state.rgbInput["".concat(value, "_input")];
          });

        case 3:
          currentInput = _context.sent;
          _context.next = 6;
          return select(function (state) {
            return state.color[value];
          });

        case 6:
          currentValue = _context.sent;
          parsedInput = Number.parseInt(currentInput, 10);
          parsedValue = Number.parseInt(currentValue, 10);
          validityCheck = typeof parsedInput === 'number' && !Number.isNaN(+currentInput) && parsedInput >= min && parsedInput <= max;

          if (!validityCheck) {
            _context.next = 29;
            break;
          }

          _context.next = 13;
          return put({
            type: colorTypes[["UPDATE_".concat(value.toUpperCase())]],
            value: parsedInput
          });

        case 13:
          _context.next = 15;
          return select(function (state) {
            return state.color;
          });

        case 15:
          currentColors = _context.sent;
          r = currentColors.r, g = currentColors.g, b = currentColors.b, hex = currentColors.hex;
          hexAlpha = hex.slice(7, 9);
          newHSL = RGBtoHSL(r, g, b);
          newHSV = RGBtoHSV(r, g, b);
          newHex = RGBtoHex(r, g, b, hexAlpha);
          _context.next = 23;
          return put(_objectSpread$1({
            type: colorTypes.UPDATE_HSL_COMBO
          }, newHSL));

        case 23:
          _context.next = 25;
          return put(_objectSpread$1({
            type: colorTypes.UPDATE_HSV_COMBO
          }, newHSV));

        case 25:
          _context.next = 27;
          return put({
            type: colorTypes.UPDATE_HEX,
            value: newHex
          });

        case 27:
          _context.next = 31;
          break;

        case 29:
          _context.next = 31;
          return put({
            type: rgbInputTypes["UPDATE_".concat(value.toUpperCase(), "_INPUT")],
            value: parsedValue
          });

        case 31:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var rgbInputEffects = [takeEvery$1(rgbInputTypes.VALIDATE_RGB_INPUT, validateRGBInput)];

var rgbInputEffects$1 = _toConsumableArray(rgbInputEffects);

// Update color inputs
var UPDATE_H_INPUT = 'UPDATE_H_INPUT';
var UPDATE_SV_INPUT = 'UPDATE_SV_INPUT';
var UPDATE_SL_INPUT = 'UPDATE_SL_INPUT';
var UPDATE_V_INPUT = 'UPDATE_V_INPUT';
var UPDATE_L_INPUT = 'UPDATE_L_INPUT';
var VALIDATE_HSX_INPUT = 'VALIDATE_HSX_INPUT';
var hsxInputTypes = {
  UPDATE_H_INPUT: UPDATE_H_INPUT,
  UPDATE_L_INPUT: UPDATE_L_INPUT,
  UPDATE_SV_INPUT: UPDATE_SV_INPUT,
  UPDATE_SL_INPUT: UPDATE_SL_INPUT,
  UPDATE_V_INPUT: UPDATE_V_INPUT,
  VALIDATE_HSX_INPUT: VALIDATE_HSX_INPUT
};

var HSLtoRGB = function HSLtoRGB(hue, sl, l) {
  var sat = sl / 100;
  var light = l / 100;
  var H = hue / 60;
  var C = sat * (1 - Math.abs(2 * light - 1));
  var X = C * (1 - Math.abs(H % 2 - 1));
  var m = light - C / 2;
  var precision = 255;
  C = (C + m) * precision;
  X = (X + m) * precision;
  m *= precision;

  var setRGB = function setRGB(r, g, b) {
    return {
      FinalRed: Math.round(r),
      FinalGreen: Math.round(g),
      FinalBlue: Math.round(b)
    };
  };

  var finalRGB = {};
  if (H >= 0 && H < 1) finalRGB = setRGB(C, X, m);
  if (H >= 1 && H < 2) finalRGB = setRGB(X, C, m);
  if (H >= 2 && H < 3) finalRGB = setRGB(m, C, X);
  if (H >= 3 && H < 4) finalRGB = setRGB(m, X, C);
  if (H >= 4 && H < 5) finalRGB = setRGB(X, m, C);
  if (H >= 5 && H < 6) finalRGB = setRGB(C, m, X);
  return finalRGB;
};

var HSVtoRGB = function HSVtoRGB(h, sv, v) {
  var sat = sv / 100;
  var value = v / 100;
  var C = sat * value;
  var H = h / 60;
  var X = C * (1 - Math.abs(H % 2 - 1));
  var m = value - C;
  var precision = 255;
  C = (C + m) * precision;
  X = (X + m) * precision;
  m *= precision;

  var setRGB = function setRGB(r, g, b) {
    return {
      FinalRed: Math.round(r),
      FinalGreen: Math.round(g),
      FinalBlue: Math.round(b)
    };
  };

  var finalRGB = {};
  if (H >= 0 && H < 1) finalRGB = setRGB(C, X, m);
  if (H >= 1 && H < 2) finalRGB = setRGB(X, C, m);
  if (H >= 2 && H < 3) finalRGB = setRGB(m, C, X);
  if (H >= 3 && H < 4) finalRGB = setRGB(m, X, C);
  if (H >= 4 && H < 5) finalRGB = setRGB(X, m, C);
  if (H >= 5 && H < 6) finalRGB = setRGB(C, m, X);
  return finalRGB;
};

var HSVtoHSL = function HSVtoHSL(h, s, v) {
  var currentS = s / 100;
  var currentV = v / 100;
  var FinalHue = h;
  var FinalLightness = 0.5 * (currentV * (2 - currentS));
  var absValue = Math.abs(2 * FinalLightness - 1);
  var FinalSaturation = absValue === 1 ? 0 : currentS * currentV / (1 - absValue);
  FinalLightness = Math.round(FinalLightness * 100);
  FinalSaturation = Math.round(FinalSaturation * 100);
  return {
    FinalHue: FinalHue,
    FinalSaturation: FinalSaturation,
    FinalLightness: FinalLightness
  };
};

var HSLtoHSV = function HSLtoHSV(h, s, l) {
  var currentS = s / 100;
  var currentL = l / 100;
  var FinalHue = h;
  var FinalValue = (2 * currentL + currentS * (1 - Math.abs(2 * currentL - 1))) / 2;
  var FinalSaturation = FinalValue === 0 ? 0 : 2 * (FinalValue - currentL) / FinalValue;
  FinalValue = Math.round(FinalValue * 100);
  FinalSaturation = Math.round(FinalSaturation * 100);
  return {
    FinalHue: FinalHue,
    FinalSaturation: FinalSaturation,
    FinalValue: FinalValue
  };
};

var _marked$1 =
/*#__PURE__*/
regenerator.mark(validateHSXInput);

function validateHSXInput(_ref) {
  var value, min, max, format, currentInput, currentValue, parsedInput, parsedValue, validityCheck, currentColors, _currentColors, h, sl, l, newHSV, newRGB, _currentColors2, r, g, b, hex, hexAlpha, newHex, _currentColors3, _currentColors4, _h, sv, v, newHSL, _newRGB, _currentColors5, _r, _g, _b, _hex, _hexAlpha, _newHex;

  return regenerator.wrap(function validateHSXInput$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          value = _ref.value, min = _ref.min, max = _ref.max, format = _ref.format;
          _context.next = 3;
          return select(function (state) {
            return state.hsxInput["".concat(value, "_input")];
          });

        case 3:
          currentInput = _context.sent;
          _context.next = 6;
          return select(function (state) {
            return state.color[value];
          });

        case 6:
          currentValue = _context.sent;
          parsedInput = Number.parseInt(currentInput, 10);
          parsedValue = Number.parseInt(currentValue, 10);
          validityCheck = typeof parsedInput === 'number' && !Number.isNaN(+currentInput) && parsedInput >= min && parsedInput <= max;

          if (!validityCheck) {
            _context.next = 53;
            break;
          }

          _context.next = 13;
          return put({
            type: colorTypes[["UPDATE_".concat(value.toUpperCase())]],
            value: parsedInput
          });

        case 13:
          if (!(format === 'HSL')) {
            _context.next = 32;
            break;
          }

          _context.next = 16;
          return select(function (state) {
            return state.color;
          });

        case 16:
          currentColors = _context.sent;
          _currentColors = currentColors, h = _currentColors.h, sl = _currentColors.sl, l = _currentColors.l;
          newHSV = HSLtoHSV(h, sl, l);
          newRGB = HSLtoRGB(h, sl, l);
          _context.next = 22;
          return put(_objectSpread$1({
            type: colorTypes.UPDATE_HSV_COMBO
          }, newHSV));

        case 22:
          _context.next = 24;
          return put(_objectSpread$1({
            type: colorTypes.UPDATE_RGB_COMBO
          }, newRGB));

        case 24:
          _context.next = 26;
          return select(function (state) {
            return state.color;
          });

        case 26:
          currentColors = _context.sent;
          _currentColors2 = currentColors, r = _currentColors2.r, g = _currentColors2.g, b = _currentColors2.b, hex = _currentColors2.hex;
          hexAlpha = hex.slice(7, 9);
          newHex = RGBtoHex(r, g, b, hexAlpha);
          _context.next = 32;
          return put({
            type: colorTypes.UPDATE_HEX,
            value: newHex
          });

        case 32:
          if (!(format === 'HSV')) {
            _context.next = 51;
            break;
          }

          _context.next = 35;
          return select(function (state) {
            return state.color;
          });

        case 35:
          _currentColors3 = _context.sent;
          _currentColors4 = _currentColors3, _h = _currentColors4.h, sv = _currentColors4.sv, v = _currentColors4.v;
          newHSL = HSVtoHSL(_h, sv, v);
          _newRGB = HSVtoRGB(_h, sv, v);
          _context.next = 41;
          return put(_objectSpread$1({
            type: colorTypes.UPDATE_HSL_COMBO
          }, newHSL));

        case 41:
          _context.next = 43;
          return put(_objectSpread$1({
            type: colorTypes.UPDATE_RGB_COMBO
          }, _newRGB));

        case 43:
          _context.next = 45;
          return select(function (state) {
            return state.color;
          });

        case 45:
          _currentColors3 = _context.sent;
          _currentColors5 = _currentColors3, _r = _currentColors5.r, _g = _currentColors5.g, _b = _currentColors5.b, _hex = _currentColors5.hex;
          _hexAlpha = _hex.slice(7, 9);
          _newHex = RGBtoHex(_r, _g, _b, _hexAlpha);
          _context.next = 51;
          return put({
            type: colorTypes.UPDATE_HEX,
            value: _newHex
          });

        case 51:
          _context.next = 55;
          break;

        case 53:
          _context.next = 55;
          return put({
            type: hsxInputTypes["UPDATE_".concat(value.toUpperCase(), "_INPUT")],
            value: parsedValue
          });

        case 55:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$1);
}

var hsxInputEffects = [takeEvery$1(hsxInputTypes.VALIDATE_HSX_INPUT, validateHSXInput)];

var hsxInputEffects$1 = _toConsumableArray(hsxInputEffects);

// Update color inputs
var UPDATE_A_INPUT = 'UPDATE_A_INPUT';
var VALIDATE_A_INPUT = 'VALIDATE_A_INPUT';
var aInputTypes = {
  UPDATE_A_INPUT: UPDATE_A_INPUT,
  VALIDATE_A_INPUT: VALIDATE_A_INPUT
};

var _marked$2 =
/*#__PURE__*/
regenerator.mark(validateAInput);

function validateAInput() {
  var currentInput, currentValue, parsedInput, parsedValue, validityCheck, hexValue, newAlphaHex;
  return regenerator.wrap(function validateAInput$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return select(function (state) {
            return state.aInput.a_input;
          });

        case 2:
          currentInput = _context.sent;
          _context.next = 5;
          return select(function (state) {
            return state.color.a;
          });

        case 5:
          currentValue = _context.sent;
          parsedInput = Number.parseFloat(currentInput);
          parsedValue = Number.parseFloat(currentValue);
          validityCheck = typeof parsedInput === 'number' && !Number.isNaN(+currentInput) && parsedInput >= 0 && parsedInput <= 1;

          if (!validityCheck) {
            _context.next = 21;
            break;
          }

          _context.next = 12;
          return select(function (state) {
            return state.color.hex;
          });

        case 12:
          hexValue = _context.sent;
          newAlphaHex = Math.round(parsedInput * 255).toString(16).toUpperCase();

          if (parsedInput === 1) {
            hexValue = hexValue.slice(0, 7);
          } else {
            hexValue = hexValue.slice(0, 7).concat(newAlphaHex);
          }

          _context.next = 17;
          return put({
            type: colorTypes.UPDATE_HEX,
            value: hexValue
          });

        case 17:
          _context.next = 19;
          return put({
            type: colorTypes.UPDATE_A,
            value: parsedInput.toFixed(2)
          });

        case 19:
          _context.next = 23;
          break;

        case 21:
          _context.next = 23;
          return put({
            type: aInputTypes.UPDATE_A_INPUT,
            value: parsedValue.toFixed(2)
          });

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$2);
}

var aInputEffects = [takeEvery$1(aInputTypes.VALIDATE_A_INPUT, validateAInput)];

var aInputEffects$1 = _toConsumableArray(aInputEffects);

// Update color inputs
var UPDATE_HEX_INPUT = 'UPDATE_HEX_INPUT';
var VALIDATE_HEX_INPUT = 'VALIDATE_HEX_INPUT';
var hexInputTypes = {
  UPDATE_HEX_INPUT: UPDATE_HEX_INPUT,
  VALIDATE_HEX_INPUT: VALIDATE_HEX_INPUT
};

var _marked$3 =
/*#__PURE__*/
regenerator.mark(validateHexInput);

function validateHexInput() {
  var inputValue, colorHexValue, valid, FinalRed, FinalGreen, FinalBlue, hexValue, newAlpha, newRGB, newHSL, newHSV;
  return regenerator.wrap(function validateHexInput$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return select(function (state) {
            return state.hexInput.hex_input;
          });

        case 2:
          inputValue = _context.sent;
          _context.next = 5;
          return select(function (state) {
            return state.color.hex;
          });

        case 5:
          colorHexValue = _context.sent;
          valid = /(^#{0,1}[0-9A-F]{6}$)|(^#{0,1}[0-9A-F]{3}$)|(^#{0,1}[0-9A-F]{8}$)|(^#{0,1}[0-9A-F]{4}$)/i.test(inputValue);

          if (!valid) {
            _context.next = 31;
            break;
          }

          if (inputValue[0] === '#') inputValue = inputValue.slice(1, inputValue.length);
          if (inputValue.length === 3) inputValue = inputValue.replace(/([0-9A-F])([0-9A-F])([0-9A-F])/i, '$1$1$2$2$3$3');
          if (inputValue.length === 4) inputValue = inputValue.replace(/([0-9A-F])([0-9A-F])([0-9A-F])([0-9A-F])/i, '$1$1$2$2$3$3$4$4');
          FinalRed = Number.parseInt(inputValue.substr(0, 2), 16);
          FinalGreen = Number.parseInt(inputValue.substr(2, 2), 16);
          FinalBlue = Number.parseInt(inputValue.substr(4, 2), 16);
          hexValue = inputValue.length === 8 ? Number.parseInt(inputValue.substr(6, 2), 16) : '255';
          newAlpha = (hexValue / 255).toFixed(2);
          newRGB = {
            FinalRed: FinalRed,
            FinalGreen: FinalGreen,
            FinalBlue: FinalBlue
          };
          newHSL = RGBtoHSL(FinalRed, FinalGreen, FinalBlue);
          newHSV = RGBtoHSV(FinalRed, FinalGreen, FinalBlue);
          _context.next = 21;
          return put({
            type: colorTypes.UPDATE_HEX,
            value: "#".concat(inputValue)
          });

        case 21:
          _context.next = 23;
          return put({
            type: colorTypes.UPDATE_A,
            value: newAlpha
          });

        case 23:
          _context.next = 25;
          return put(_objectSpread$1({
            type: colorTypes.UPDATE_RGB_COMBO
          }, newRGB));

        case 25:
          _context.next = 27;
          return put(_objectSpread$1({
            type: colorTypes.UPDATE_HSL_COMBO
          }, newHSL));

        case 27:
          _context.next = 29;
          return put(_objectSpread$1({
            type: colorTypes.UPDATE_HSV_COMBO
          }, newHSV));

        case 29:
          _context.next = 33;
          break;

        case 31:
          _context.next = 33;
          return put({
            type: hexInputTypes.UPDATE_HEX_INPUT,
            value: colorHexValue
          });

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$3);
}

var aInputEffects$2 = [takeEvery$1(hexInputTypes.VALIDATE_HEX_INPUT, validateHexInput)];

var hexEffects = _toConsumableArray(aInputEffects$2);

var UPDATE_HUE_POSITION = 'UPDATE_POSITION';
var UPDATE_COLORS_WITH_HUE_SLIDER = 'UPDATE_COLORS_WITH_HUE_SLIDER';
var hueSliderTypes = {
  UPDATE_HUE_POSITION: UPDATE_HUE_POSITION,
  UPDATE_COLORS_WITH_HUE_SLIDER: UPDATE_COLORS_WITH_HUE_SLIDER
};

var _marked$4 =
/*#__PURE__*/
regenerator.mark(updateColorsWithHueSlider);

function updateColorsWithHueSlider(_ref) {
  var value, currentColors, h, sl, l, newRGB, updatedColors, r, g, b, hex, hexAlpha, newHex;
  return regenerator.wrap(function updateColorsWithHueSlider$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          value = _ref.value;
          _context.next = 3;
          return put({
            type: colorTypes.UPDATE_H,
            value: value
          });

        case 3:
          _context.next = 5;
          return select(function (state) {
            return state.color;
          });

        case 5:
          currentColors = _context.sent;
          h = currentColors.h, sl = currentColors.sl, l = currentColors.l;
          newRGB = HSLtoRGB(h, sl, l);
          _context.next = 10;
          return put(_objectSpread$1({
            type: colorTypes.UPDATE_RGB_COMBO
          }, newRGB));

        case 10:
          _context.next = 12;
          return select(function (state) {
            return state.color;
          });

        case 12:
          updatedColors = _context.sent;
          r = updatedColors.r, g = updatedColors.g, b = updatedColors.b, hex = updatedColors.hex;
          hexAlpha = hex.slice(7, 9);
          newHex = RGBtoHex(r, g, b, hexAlpha);
          _context.next = 18;
          return put({
            type: colorTypes.UPDATE_HEX,
            value: newHex
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$4);
}

var hueSliderEffects = [takeEvery$1(hueSliderTypes.UPDATE_COLORS_WITH_HUE_SLIDER, updateColorsWithHueSlider)];

var hueSliderEffects$1 = _toConsumableArray(hueSliderEffects);

var UPDATE_ALPHA_POSITION_VERTICAL = 'UPDATE_ALPHA_POSITION_VERTICAL';
var VALIDATE_ALPHA_VALUE_VERTICAL_SLIDER = 'VALIDATE_ALPHA_VALUE_VERTICAL_SLIDER';
var alphaSliderVerticalTypes = {
  UPDATE_ALPHA_POSITION_VERTICAL: UPDATE_ALPHA_POSITION_VERTICAL,
  VALIDATE_ALPHA_VALUE_VERTICAL_SLIDER: VALIDATE_ALPHA_VALUE_VERTICAL_SLIDER
};

var _marked$5 =
/*#__PURE__*/
regenerator.mark(validateAlphaValueVerticalSlider);

function validateAlphaValueVerticalSlider(_ref) {
  var value, hexValue, newAlphaHex;
  return regenerator.wrap(function validateAlphaValueVerticalSlider$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          value = _ref.value;
          _context.next = 3;
          return select(function (state) {
            return state.color.hex;
          });

        case 3:
          hexValue = _context.sent;
          newAlphaHex = Math.round(value * 255).toString(16).toUpperCase();

          if (value === '1.00') {
            hexValue = hexValue.slice(0, 7);
          } else {
            hexValue = hexValue.slice(0, 7).concat(newAlphaHex);
          }

          _context.next = 8;
          return put({
            type: colorTypes.UPDATE_HEX,
            value: hexValue
          });

        case 8:
          _context.next = 10;
          return put({
            type: colorTypes.UPDATE_A,
            value: value
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$5);
}

var alphaSliderVerticalEffects = [takeEvery$1(alphaSliderVerticalTypes.VALIDATE_ALPHA_VALUE_VERTICAL_SLIDER, validateAlphaValueVerticalSlider)];

var alphaVerticalEffects = _toConsumableArray(alphaSliderVerticalEffects);

var UPDATE_ALPHA_POSITION = 'UPDATE_ALPHA_POSITION';
var VALIDATE_ALPHA_VALUE_WITH_SLIDER = 'VALIDATE_ALPHA_VALUE_WITH_SLIDER';
var hueSliderTypes$1 = {
  UPDATE_ALPHA_POSITION: UPDATE_ALPHA_POSITION,
  VALIDATE_ALPHA_VALUE_WITH_SLIDER: VALIDATE_ALPHA_VALUE_WITH_SLIDER
};

var _marked$6 =
/*#__PURE__*/
regenerator.mark(validateAlphaValueWithSlider);

function validateAlphaValueWithSlider(_ref) {
  var value, hexValue, newAlphaHex;
  return regenerator.wrap(function validateAlphaValueWithSlider$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          value = _ref.value;
          _context.next = 3;
          return select(function (state) {
            return state.color.hex;
          });

        case 3:
          hexValue = _context.sent;
          newAlphaHex = Math.round(value * 255).toString(16).toUpperCase();

          if (value === '1.00') {
            hexValue = hexValue.slice(0, 7);
          } else {
            hexValue = hexValue.slice(0, 7).concat(newAlphaHex);
          }

          _context.next = 8;
          return put({
            type: colorTypes.UPDATE_HEX,
            value: hexValue
          });

        case 8:
          _context.next = 10;
          return put({
            type: colorTypes.UPDATE_A,
            value: value
          });

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$6);
}

var alphaSliderEffects = [takeEvery$1(hueSliderTypes$1.VALIDATE_ALPHA_VALUE_WITH_SLIDER, validateAlphaValueWithSlider)];

var alphaSliderEffects$1 = _toConsumableArray(alphaSliderEffects);

var UPDATE_HUE_POSITION_VERTICAL = 'UPDATE_POSITION_VERTICAL';
var UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL = 'UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL';
var hueSliderTypesVertical = {
  UPDATE_HUE_POSITION_VERTICAL: UPDATE_HUE_POSITION_VERTICAL,
  UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL: UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL
};

var _marked$7 =
/*#__PURE__*/
regenerator.mark(updateColorsWithHueSliderVertical);

function updateColorsWithHueSliderVertical(_ref) {
  var value, currentColors, h, sl, l, newRGB, updatedColors, r, g, b, hex, hexAlpha, newHex;
  return regenerator.wrap(function updateColorsWithHueSliderVertical$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          value = _ref.value;
          _context.next = 3;
          return put({
            type: colorTypes.UPDATE_H,
            value: value
          });

        case 3:
          _context.next = 5;
          return select(function (state) {
            return state.color;
          });

        case 5:
          currentColors = _context.sent;
          h = currentColors.h, sl = currentColors.sl, l = currentColors.l;
          newRGB = HSLtoRGB(h, sl, l);
          _context.next = 10;
          return put(_objectSpread$1({
            type: colorTypes.UPDATE_RGB_COMBO
          }, newRGB));

        case 10:
          _context.next = 12;
          return select(function (state) {
            return state.color;
          });

        case 12:
          updatedColors = _context.sent;
          r = updatedColors.r, g = updatedColors.g, b = updatedColors.b, hex = updatedColors.hex;
          hexAlpha = hex.slice(7, 9);
          newHex = RGBtoHex(r, g, b, hexAlpha);
          _context.next = 18;
          return put({
            type: colorTypes.UPDATE_HEX,
            value: newHex
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$7);
}

var hueSliderVerticalEffects = [takeEvery$1(hueSliderTypesVertical.UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL, updateColorsWithHueSliderVertical)];

var hueVerticalEffects = _toConsumableArray(hueSliderVerticalEffects);

var UPDATE_COLOR_PICKER_AREA_POSITION = 'UPDATE_COLOR_PICKER_AREA_POSITION';
var UPDATE_COLORS_WITH_PICKER_AREA = 'UPDATE_COLORS_WITH_PICKER_AREA';
var pickerAreaTypes = {
  UPDATE_COLOR_PICKER_AREA_POSITION: UPDATE_COLOR_PICKER_AREA_POSITION,
  UPDATE_COLORS_WITH_PICKER_AREA: UPDATE_COLORS_WITH_PICKER_AREA
};

var _marked$8 =
/*#__PURE__*/
regenerator.mark(updateColorsWithPickerArea);

function updateColorsWithPickerArea(_ref) {
  var xValue, yValue, format, currentHue, currentColors, h, sl, l, newHSV, newRGB, updatedColors, r, g, b, hex, hexAlpha, newHex, _currentColors, _h, sv, v, newHSL, _newRGB, _updatedColors, _r, _g, _b, _hex, _hexAlpha, _newHex;

  return regenerator.wrap(function updateColorsWithPickerArea$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          xValue = _ref.xValue, yValue = _ref.yValue, format = _ref.format;
          _context.next = 3;
          return select(function (state) {
            return state.color.h;
          });

        case 3:
          currentHue = _context.sent;

          if (!(format === 'HSL')) {
            _context.next = 25;
            break;
          }

          _context.next = 7;
          return put({
            type: colorTypes.UPDATE_HSL_COMBO,
            FinalHue: currentHue,
            FinalSaturation: xValue,
            FinalLightness: yValue
          });

        case 7:
          _context.next = 9;
          return select(function (state) {
            return state.color;
          });

        case 9:
          currentColors = _context.sent;
          h = currentColors.h, sl = currentColors.sl, l = currentColors.l;
          newHSV = HSLtoHSV(h, sl, l);
          newRGB = HSLtoRGB(h, sl, l);
          _context.next = 15;
          return put(_objectSpread$1({
            type: colorTypes.UPDATE_HSV_COMBO
          }, newHSV));

        case 15:
          _context.next = 17;
          return put(_objectSpread$1({
            type: colorTypes.UPDATE_RGB_COMBO
          }, newRGB));

        case 17:
          _context.next = 19;
          return select(function (state) {
            return state.color;
          });

        case 19:
          updatedColors = _context.sent;
          r = updatedColors.r, g = updatedColors.g, b = updatedColors.b, hex = updatedColors.hex;
          hexAlpha = hex.slice(7, 9);
          newHex = RGBtoHex(r, g, b, hexAlpha);
          _context.next = 25;
          return put({
            type: colorTypes.UPDATE_HEX,
            value: newHex
          });

        case 25:
          if (!(format === 'HSV')) {
            _context.next = 46;
            break;
          }

          _context.next = 28;
          return put({
            type: colorTypes.UPDATE_HSV_COMBO,
            FinalHue: currentHue,
            FinalSaturation: xValue,
            FinalValue: yValue
          });

        case 28:
          _context.next = 30;
          return select(function (state) {
            return state.color;
          });

        case 30:
          _currentColors = _context.sent;
          _h = _currentColors.h, sv = _currentColors.sv, v = _currentColors.v;
          newHSL = HSVtoHSL(_h, sv, v);
          _newRGB = HSVtoRGB(_h, sv, v);
          _context.next = 36;
          return put(_objectSpread$1({
            type: colorTypes.UPDATE_HSL_COMBO
          }, newHSL));

        case 36:
          _context.next = 38;
          return put(_objectSpread$1({
            type: colorTypes.UPDATE_RGB_COMBO
          }, _newRGB));

        case 38:
          _context.next = 40;
          return select(function (state) {
            return state.color;
          });

        case 40:
          _updatedColors = _context.sent;
          _r = _updatedColors.r, _g = _updatedColors.g, _b = _updatedColors.b, _hex = _updatedColors.hex;
          _hexAlpha = _hex.slice(7, 9);
          _newHex = RGBtoHex(_r, _g, _b, _hexAlpha);
          _context.next = 46;
          return put({
            type: colorTypes.UPDATE_HEX,
            value: _newHex
          });

        case 46:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$8);
}

var pickerAreaEffects = [takeEvery$1(pickerAreaTypes.UPDATE_COLORS_WITH_PICKER_AREA, updateColorsWithPickerArea)];

var pickerAreaEffects$1 = _toConsumableArray(pickerAreaEffects);

var UPDATE_HUE_POSITION_VERTICAL_HOOKS = 'UPDATE_POSITION_VERTICAL_HOOKS';
var UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL_HOOKS = 'UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL_HOOKS';
var hueSliderVerticalTypes = {
  UPDATE_HUE_POSITION_VERTICAL_HOOKS: UPDATE_HUE_POSITION_VERTICAL_HOOKS,
  UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL_HOOKS: UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL_HOOKS
};

var _marked$9 =
/*#__PURE__*/
regenerator.mark(updateColorsWithHueSliderVerticalHooks);

function updateColorsWithHueSliderVerticalHooks(_ref) {
  var value, currentColors, h, sl, l, newRGB, updatedColors, r, g, b, hex, hexAlpha, newHex;
  return regenerator.wrap(function updateColorsWithHueSliderVerticalHooks$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          value = _ref.value;
          _context.next = 3;
          return put({
            type: colorTypes.UPDATE_H,
            value: value
          });

        case 3:
          _context.next = 5;
          return select(function (state) {
            return state.color;
          });

        case 5:
          currentColors = _context.sent;
          h = currentColors.h, sl = currentColors.sl, l = currentColors.l;
          newRGB = HSLtoRGB(h, sl, l);
          _context.next = 10;
          return put(_objectSpread$1({
            type: colorTypes.UPDATE_RGB_COMBO
          }, newRGB));

        case 10:
          _context.next = 12;
          return select(function (state) {
            return state.color;
          });

        case 12:
          updatedColors = _context.sent;
          r = updatedColors.r, g = updatedColors.g, b = updatedColors.b, hex = updatedColors.hex;
          hexAlpha = hex.slice(7, 9);
          newHex = RGBtoHex(r, g, b, hexAlpha);
          _context.next = 18;
          return put({
            type: colorTypes.UPDATE_HEX,
            value: newHex
          });

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$9);
}

var hueSliderVerticalHooksEffects = [takeEvery$1(hueSliderVerticalTypes.UPDATE_COLORS_WITH_HUE_SLIDER_VERTICAL_HOOKS, updateColorsWithHueSliderVerticalHooks)];

var hueVerticalHooksEffects = _toConsumableArray(hueSliderVerticalHooksEffects);

var _marked$a =
/*#__PURE__*/
regenerator.mark(_callee);
function _callee() {
  return regenerator.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return all([].concat(_toConsumableArray(rgbInputEffects$1), _toConsumableArray(hsxInputEffects$1), _toConsumableArray(aInputEffects$1), _toConsumableArray(hexEffects), _toConsumableArray(hueSliderEffects$1), _toConsumableArray(pickerAreaEffects$1), _toConsumableArray(hueVerticalEffects), _toConsumableArray(alphaVerticalEffects), _toConsumableArray(alphaSliderEffects$1), _toConsumableArray(hueVerticalHooksEffects)));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$a);
}

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
/* eslint-disable no-unused-vars */

var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
  if (val === null || val === undefined) {
    throw new TypeError('Object.assign cannot be called with null or undefined');
  }

  return Object(val);
}

function shouldUseNative() {
  try {
    if (!Object.assign) {
      return false;
    } // Detect buggy property enumeration order in older V8 versions.
    // https://bugs.chromium.org/p/v8/issues/detail?id=4118


    var test1 = new String('abc'); // eslint-disable-line no-new-wrappers

    test1[5] = 'de';

    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test2 = {};

    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i;
    }

    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n];
    });

    if (order2.join('') !== '0123456789') {
      return false;
    } // https://bugs.chromium.org/p/v8/issues/detail?id=3056


    var test3 = {};
    'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
      test3[letter] = letter;
    });

    if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
      return false;
    }

    return true;
  } catch (err) {
    // We don't expect any of the above to throw, but better to be safe.
    return false;
  }
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
  var from;
  var to = toObject(target);
  var symbols;

  for (var s = 1; s < arguments.length; s++) {
    from = Object(arguments[s]);

    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertySymbols(from);

      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumerable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]];
        }
      }
    }
  }

  return to;
};

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';
var ReactPropTypesSecret_1 = ReactPropTypesSecret;

function emptyFunction() {}

var factoryWithThrowingShims = function () {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret_1) {
      // It is still safe when called from React.
      return;
    }

    var err = new Error('Calling PropTypes validators directly is not supported by the `prop-types` package. ' + 'Use PropTypes.checkPropTypes() to call them. ' + 'Read more at http://fb.me/use-check-prop-types');
    err.name = 'Invariant Violation';
    throw err;
  }
  shim.isRequired = shim;

  function getShim() {
    return shim;
  }
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.

  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,
    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };
  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;
  return ReactPropTypes;
};

var propTypes = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
{
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = factoryWithThrowingShims();
}
});

var applyInterface = (function (initialState) {
  var state = initialState;
  state.PropTypes = {
    r: propTypes.number,
    g: propTypes.number,
    b: propTypes.number,
    a: propTypes.string,
    h: propTypes.number,
    sv: propTypes.number,
    sl: propTypes.number,
    v: propTypes.number,
    l: propTypes.number,
    hex: propTypes.string,
    format: propTypes.string
  };
  return state;
});

var intialState = applyInterface({
  r: 255,
  g: 0,
  b: 0,
  a: "1.00",
  h: 0,
  sv: 100,
  sl: 100,
  v: 100,
  l: 50,
  hex: '#FF0000',
  format: 'HSV'
});

var _colorTypes$UPDATE_R$;
var colorReducer = (_colorTypes$UPDATE_R$ = {}, _defineProperty$1(_colorTypes$UPDATE_R$, colorTypes.UPDATE_R, function (state, _ref) {
  var value = _ref.value;
  return _objectSpread$1({}, state, {
    r: value
  });
}), _defineProperty$1(_colorTypes$UPDATE_R$, colorTypes.UPDATE_G, function (state, _ref2) {
  var value = _ref2.value;
  return _objectSpread$1({}, state, {
    g: value
  });
}), _defineProperty$1(_colorTypes$UPDATE_R$, colorTypes.UPDATE_B, function (state, _ref3) {
  var value = _ref3.value;
  return _objectSpread$1({}, state, {
    b: value
  });
}), _defineProperty$1(_colorTypes$UPDATE_R$, colorTypes.UPDATE_H, function (state, _ref4) {
  var value = _ref4.value;
  return _objectSpread$1({}, state, {
    h: value
  });
}), _defineProperty$1(_colorTypes$UPDATE_R$, colorTypes.UPDATE_SV, function (state, _ref5) {
  var value = _ref5.value;
  return _objectSpread$1({}, state, {
    sv: value
  });
}), _defineProperty$1(_colorTypes$UPDATE_R$, colorTypes.UPDATE_SL, function (state, _ref6) {
  var value = _ref6.value;
  return _objectSpread$1({}, state, {
    sl: value
  });
}), _defineProperty$1(_colorTypes$UPDATE_R$, colorTypes.UPDATE_L, function (state, _ref7) {
  var value = _ref7.value;
  return _objectSpread$1({}, state, {
    l: value
  });
}), _defineProperty$1(_colorTypes$UPDATE_R$, colorTypes.UPDATE_V, function (state, _ref8) {
  var value = _ref8.value;
  return _objectSpread$1({}, state, {
    v: value
  });
}), _defineProperty$1(_colorTypes$UPDATE_R$, colorTypes.UPDATE_A, function (state, _ref9) {
  var value = _ref9.value;
  return _objectSpread$1({}, state, {
    a: value
  });
}), _defineProperty$1(_colorTypes$UPDATE_R$, colorTypes.UPDATE_HEX, function (state, _ref10) {
  var value = _ref10.value;
  return _objectSpread$1({}, state, {
    hex: value
  });
}), _defineProperty$1(_colorTypes$UPDATE_R$, colorTypes.UPDATE_FORMAT, function (state, _ref11) {
  var value = _ref11.value;
  return _objectSpread$1({}, state, {
    format: value
  });
}), _defineProperty$1(_colorTypes$UPDATE_R$, colorTypes.UPDATE_HSL_COMBO, function (state, _ref12) {
  var FinalHue = _ref12.FinalHue,
      FinalSaturation = _ref12.FinalSaturation,
      FinalLightness = _ref12.FinalLightness;
  return _objectSpread$1({}, state, {
    h: FinalHue,
    sl: FinalSaturation,
    l: FinalLightness
  });
}), _defineProperty$1(_colorTypes$UPDATE_R$, colorTypes.UPDATE_HSV_COMBO, function (state, _ref13) {
  var FinalHue = _ref13.FinalHue,
      FinalSaturation = _ref13.FinalSaturation,
      FinalValue = _ref13.FinalValue;
  return _objectSpread$1({}, state, {
    h: FinalHue,
    sv: FinalSaturation,
    v: FinalValue
  });
}), _defineProperty$1(_colorTypes$UPDATE_R$, colorTypes.UPDATE_RGB_COMBO, function (state, _ref14) {
  var FinalRed = _ref14.FinalRed,
      FinalGreen = _ref14.FinalGreen,
      FinalBlue = _ref14.FinalBlue;
  return _objectSpread$1({}, state, {
    r: FinalRed,
    g: FinalGreen,
    b: FinalBlue
  });
}), _colorTypes$UPDATE_R$);

var reducer = _objectSpread$1({}, colorReducer);

var colorReducer$1 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return reducer[action.type] ? reducer[action.type](state, action) : state;
});

var applyInterface$1 = (function (initialState) {
  var state = initialState;
  state.PropTypes = {
    position: propTypes.number
  };
  return state;
});

var initialState = applyInterface$1({
  position: 0
});

var hueSliderReducer = _defineProperty$1({}, hueSliderTypes.UPDATE_HUE_POSITION, function (state, _ref) {
  var value = _ref.value,
      areaWidth = _ref.areaWidth;
  var newPosition = value * areaWidth / 359 | 0;
  return _objectSpread$1({}, state, {
    position: newPosition
  });
});

var reducer$1 = _objectSpread$1({}, hueSliderReducer);

var hueSliderReducer$1 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return reducer$1[action.type] ? reducer$1[action.type](state, action) : state;
});

var applyInterface$2 = (function (initialState) {
  var state = initialState;
  state.PropTypes = {
    r_input: propTypes.number,
    g_input: propTypes.number,
    b_input: propTypes.number
  };
  return state;
});

var intialState$1 = applyInterface$2({
  r_input: 255,
  g_input: 0,
  b_input: 0
});

var _rgbInputTypes$UPDATE;
var rgbInputReducer = (_rgbInputTypes$UPDATE = {}, _defineProperty$1(_rgbInputTypes$UPDATE, rgbInputTypes.UPDATE_R_INPUT, function (state, _ref) {
  var value = _ref.value;
  return _objectSpread$1({}, state, {
    r_input: value
  });
}), _defineProperty$1(_rgbInputTypes$UPDATE, rgbInputTypes.UPDATE_G_INPUT, function (state, _ref2) {
  var value = _ref2.value;
  return _objectSpread$1({}, state, {
    g_input: value
  });
}), _defineProperty$1(_rgbInputTypes$UPDATE, rgbInputTypes.UPDATE_B_INPUT, function (state, _ref3) {
  var value = _ref3.value;
  return _objectSpread$1({}, state, {
    b_input: value
  });
}), _rgbInputTypes$UPDATE);

var reducer$2 = _objectSpread$1({}, rgbInputReducer);

var rgbInputReducer$1 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState$1;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return reducer$2[action.type] ? reducer$2[action.type](state, action) : state;
});

var applyInterface$3 = (function (initialState) {
  var state = initialState;
  state.PropTypes = {
    h_input: propTypes.number,
    sv_input: propTypes.number,
    sl_input: propTypes.number,
    l_input: propTypes.number,
    v_input: propTypes.number
  };
  return state;
});

var intialState$2 = applyInterface$3({
  h_input: 0,
  sv_input: 100,
  sl_input: 100,
  l_input: 50,
  v_input: 100
});

var _hsxInputTypes$UPDATE;
var hsxInputReducer = (_hsxInputTypes$UPDATE = {}, _defineProperty$1(_hsxInputTypes$UPDATE, hsxInputTypes.UPDATE_H_INPUT, function (state, _ref) {
  var value = _ref.value;
  return _objectSpread$1({}, state, {
    h_input: value
  });
}), _defineProperty$1(_hsxInputTypes$UPDATE, hsxInputTypes.UPDATE_SV_INPUT, function (state, _ref2) {
  var value = _ref2.value;
  return _objectSpread$1({}, state, {
    sv_input: value
  });
}), _defineProperty$1(_hsxInputTypes$UPDATE, hsxInputTypes.UPDATE_SL_INPUT, function (state, _ref3) {
  var value = _ref3.value;
  return _objectSpread$1({}, state, {
    sl_input: value
  });
}), _defineProperty$1(_hsxInputTypes$UPDATE, hsxInputTypes.UPDATE_L_INPUT, function (state, _ref4) {
  var value = _ref4.value;
  return _objectSpread$1({}, state, {
    l_input: value
  });
}), _defineProperty$1(_hsxInputTypes$UPDATE, hsxInputTypes.UPDATE_V_INPUT, function (state, _ref5) {
  var value = _ref5.value;
  return _objectSpread$1({}, state, {
    v_input: value
  });
}), _hsxInputTypes$UPDATE);

var reducer$3 = _objectSpread$1({}, hsxInputReducer);

var hsxInputReducer$1 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState$2;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return reducer$3[action.type] ? reducer$3[action.type](state, action) : state;
});

var applyInterface$4 = (function (initialState) {
  var state = initialState;
  state.PropTypes = {
    a_input: propTypes.string
  };
  return state;
});

var intialState$3 = applyInterface$4({
  a_input: "1.00"
});

var aInputReducer = _defineProperty$1({}, aInputTypes.UPDATE_A_INPUT, function (state, _ref) {
  var value = _ref.value;
  return _objectSpread$1({}, state, {
    a_input: value
  });
});

var reducer$4 = _objectSpread$1({}, aInputReducer);

var aInputReducer$1 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState$3;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return reducer$4[action.type] ? reducer$4[action.type](state, action) : state;
});

var applyInterface$5 = (function (initialState) {
  var state = initialState;
  state.PropTypes = {
    position: propTypes.number
  };
  return state;
});

var initialState$1 = applyInterface$5({
  position: 0
});

var alphaSliderReducer = _defineProperty$1({}, hueSliderTypes$1.UPDATE_ALPHA_POSITION, function (state, _ref) {
  var value = _ref.value,
      areaWidth = _ref.areaWidth;
  var newPosition = value * areaWidth;
  return _objectSpread$1({}, state, {
    position: newPosition
  });
});

var reducer$5 = _objectSpread$1({}, alphaSliderReducer);

var alphaSliderReducer$1 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$1;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return reducer$5[action.type] ? reducer$5[action.type](state, action) : state;
});

var applyInterface$6 = (function (initialState) {
  var state = initialState;
  state.PropTypes = {
    hex_input: propTypes.string
  };
  return state;
});

var intialState$4 = applyInterface$6({
  hex_input: '#FF0000'
});

var aInputReducer$2 = _defineProperty$1({}, hexInputTypes.UPDATE_HEX_INPUT, function (state, _ref) {
  var value = _ref.value;
  return _objectSpread$1({}, state, {
    hex_input: value
  });
});

var reducer$6 = _objectSpread$1({}, aInputReducer$2);

var hexInputReducer = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : intialState$4;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return reducer$6[action.type] ? reducer$6[action.type](state, action) : state;
});

var applyInterface$7 = (function (initialState) {
  var state = initialState;
  state.PropTypes = {
    positionX: propTypes.number,
    positionY: propTypes.number
  };
  return state;
});

var initialState$2 = applyInterface$7({
  positionX: 0,
  positionY: 0
});

var pickerAreaReducer = _defineProperty$1({}, pickerAreaTypes.UPDATE_COLOR_PICKER_AREA_POSITION, function (state, _ref) {
  var sv = _ref.sv,
      v = _ref.v,
      sl = _ref.sl,
      l = _ref.l,
      areaWidth = _ref.areaWidth,
      areaHeight = _ref.areaHeight,
      format = _ref.format;
  var pickerOffset = 6;
  var x = 0;
  var y = 0;

  if (format === 'HSL') {
    x = sl * areaWidth / 100 - pickerOffset;
    y = areaHeight - l * areaHeight / 100 - pickerOffset;
  }

  if (format === 'HSV') {
    x = sv * areaWidth / 100 - pickerOffset;
    y = areaHeight - v * areaHeight / 100 - pickerOffset;
  }

  return _objectSpread$1({}, state, {
    positionX: x,
    positionY: y
  });
});

var reducer$7 = _objectSpread$1({}, pickerAreaReducer);

var pickerAreaReducer$1 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$2;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return reducer$7[action.type] ? reducer$7[action.type](state, action) : state;
});

var applyInterface$8 = (function (initialState) {
  var state = initialState;
  state.PropTypes = {
    position: propTypes.number
  };
  return state;
});

var initialState$3 = applyInterface$8({
  position: 0
});

var hueSliderVerticalReducer = _defineProperty$1({}, hueSliderTypesVertical.UPDATE_HUE_POSITION_VERTICAL, function (state, _ref) {
  var value = _ref.value,
      areaHeight = _ref.areaHeight;
  var newPosition = value * areaHeight / 359 | 0;
  return _objectSpread$1({}, state, {
    position: newPosition
  });
});

var reducer$8 = _objectSpread$1({}, hueSliderVerticalReducer);

var hueSliderVerticalReducer$1 = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$3;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return reducer$8[action.type] ? reducer$8[action.type](state, action) : state;
});

var applyInterface$9 = (function (initialState) {
  var state = initialState;
  state.PropTypes = {
    position: propTypes.number
  };
  return state;
});

var initialState$4 = applyInterface$9({
  position: 0
});

var alphaSliderReducer$2 = _defineProperty$1({}, alphaSliderVerticalTypes.UPDATE_ALPHA_POSITION_VERTICAL, function (state, _ref) {
  var value = _ref.value,
      areaHeight = _ref.areaHeight;
  var newPosition = areaHeight - value * areaHeight;
  return _objectSpread$1({}, state, {
    position: newPosition
  });
});

var reducer$9 = _objectSpread$1({}, alphaSliderReducer$2);

var alphaSliderVerticalReducer = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$4;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return reducer$9[action.type] ? reducer$9[action.type](state, action) : state;
});

var applyInterface$a = (function (initialState) {
  var state = initialState;
  state.PropTypes = {
    position: propTypes.number
  };
  return state;
});

var initialState$5 = applyInterface$a({
  position: 0
});

var hueSliderVerticalHooksReducer = _defineProperty$1({}, hueSliderVerticalTypes.UPDATE_HUE_POSITION_VERTICAL_HOOKS, function (state, _ref) {
  var value = _ref.value,
      areaHeight = _ref.areaHeight;
  var newPosition = value * areaHeight / 359 | 0;
  return _objectSpread$1({}, state, {
    position: newPosition
  });
});

var reducer$a = _objectSpread$1({}, hueSliderVerticalHooksReducer);

var hueSliderHooksVerticalReducer = (function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState$5;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return reducer$a[action.type] ? reducer$a[action.type](state, action) : state;
});

var rootReducer = combineReducers({
  color: colorReducer$1,
  hue: hueSliderReducer$1,
  alpha: alphaSliderReducer$1,
  rgbInput: rgbInputReducer$1,
  hsxInput: hsxInputReducer$1,
  aInput: aInputReducer$1,
  hexInput: hexInputReducer,
  pickerArea: pickerAreaReducer$1,
  hueVertical: hueSliderVerticalReducer$1,
  alphaVertical: alphaSliderVerticalReducer,
  hueVerticalHooks: hueSliderHooksVerticalReducer
});

function configureStore() {
  var initialState = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var sagaMiddleware = createSagaMiddleware();
  var middlewares = [sagaMiddleware];
  var enhancers = [applyMiddleware.apply(void 0, middlewares)];
  var composeEnhancers = reduxDevtoolsExtension.composeWithDevTools({// other compose enhancers if any
    // Specify here other options if needed
  });
  var store = createStore(rootReducer, initialState, composeEnhancers.apply(void 0, enhancers));

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', function () {
      /* eslint-disable global-require */
      var nextReducer = require('./reducers').default;

      store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(_callee);
  return store;
}

/* eslint-disable global-require */

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
var updateColorsWithPickerArea$1 = function updateColorsWithPickerArea(xValue, yValue, format) {
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
      updateColorsWithPickerArea: updateColorsWithPickerArea$1
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

      // This is always relative to one level above to the parent that is absolutely positioned
      // https://stackoverflow.com/questions/1480133/how-can-i-get-an-objects-absolute-position-on-the-page-in-javascript
      var currentElement = e.currentTarget;
      var pickerAreaOffsetX = 0;
      var pickerAreaOffsetY = 0;

      do {
        pickerAreaOffsetX += currentElement.offsetLeft;
        pickerAreaOffsetY += currentElement.offsetTop;
        currentElement = currentElement.offsetParent;
      } while (currentElement);

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
var validateRGBInput$1 = function validateRGBInput(value, min, max) {
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
      validateRGBInput: validateRGBInput$1
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

var updateAInputValue = function updateAInputValue(value) {
  return {
    type: aInputTypes.UPDATE_A_INPUT,
    value: value
  };
};
var validateAInput$1 = function validateAInput() {
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
      validateAInput: validateAInput$1
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

var updateHueSliderPositionVertical = function updateHueSliderPositionVertical(value, areaHeight) {
  return {
    type: hueSliderTypesVertical.UPDATE_HUE_POSITION_VERTICAL,
    value: value,
    areaHeight: areaHeight
  };
};
var updateColorsWithHueSliderVertical$1 = function updateColorsWithHueSliderVertical(value) {
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
      updateColorsWithHueSliderVertical: updateColorsWithHueSliderVertical$1,
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
  return "".concat(sliderY - 6, "px");
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

      var currentElement = e.currentTarget;
      var sliderAreaOffset = 0;

      do {
        sliderAreaOffset += currentElement.offsetTop;
        currentElement = currentElement.offsetParent;
      } while (currentElement);

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

var updateAlphaSliderPositionVertical = function updateAlphaSliderPositionVertical(value, areaHeight) {
  return {
    type: alphaSliderVerticalTypes.UPDATE_ALPHA_POSITION_VERTICAL,
    value: value,
    areaHeight: areaHeight
  };
};
var validateAlphaValueVerticalSlider$1 = function validateAlphaValueVerticalSlider(value) {
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
      validateAlphaValueVerticalSlider: validateAlphaValueVerticalSlider$1
    }, dispatch)
  };
}

var store$4 = reactRedux.connect(mapStateToProps$4, mapDispatchToProps$4);

var img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==";

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
  return "".concat(sliderY - 6, "px");
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

      var currentElement = e.currentTarget;
      var sliderAreaOffset = 0;

      do {
        sliderAreaOffset += currentElement.offsetTop;
        currentElement = currentElement.offsetParent;
      } while (currentElement);

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

var updateHexInputValue = function updateHexInputValue(value) {
  return {
    type: hexInputTypes.UPDATE_HEX_INPUT,
    value: value
  };
};
var validateHexInput$1 = function validateHexInput() {
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
      validateHexInput: validateHexInput$1
    }, dispatch),
    hexActions: bindActionCreators({
      updateHexInputValue: updateHexInputValue,
      validateHexInput: validateHexInput$1
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
      validateHexInput: validateHexInput$1
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
    store: configureStore()
  }, React__default.createElement(App, null));
};

module.exports = AppWithProvider;
