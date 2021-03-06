import React from 'react';
import createComponent, { Component, styled } from '@semcore/core';
import { Box } from '@semcore/flex-box';
import EventEmitter from '@semcore/utils/lib/eventEmitter';
import trottle from '@semcore/utils/lib/rafTrottle';
import { eventToPoint, invert } from './utils';

import style from './style/xyplot.shadow.css';

class XYPlotRoot extends Component {
  static displayName = 'XYPlot';

  static style = style;

  static defaultProps = () => ({
    eventEmitter: new EventEmitter(),
    data: [],
    scale: [],
  });

  rootRef = React.createRef();

  // distributeEvents = ['onMouseEnter', 'onMouseMove', 'onMouseLeave', 'onClick', 'onDoubleClick'];

  // renderChildrenByOrder(children) {
  //   return React.Children.toArray(children).sort((a, b) => {
  //     if (React.isValidElement(a) && React.isValidElement(b)) {
  //       return (a.props.order || 0) - (b.props.order || 0);
  //     }
  //     return 0;
  //   });
  // }

  // emitEvent = trottle((name, e) => {
  //   this.asProps.eventEmitter.emit(`${name}Root`, e, this.rootRef.current);
  // });
  //
  // bindHandlerDistributeEvent = (name) => (e) => {
  //   e.persist();
  //   this.emitEvent(name, e);
  // };
  //
  // addEventHandlers() {
  //   return this.distributeEvents.reduce((events, name) => {
  //     events[name] = this.bindHandlerDistributeEvent(name);
  //     return events;
  //   }, {});
  // }

  emitNearestXY = trottle((e) => {
    const [xScale, yScale] = this.asProps.scale;
    const [x, y] = eventToPoint(e, this.rootRef.current);
    this.asProps.eventEmitter.emit(`onNearestXY`, [invert(xScale, x), invert(yScale, y)]);
  });

  handlerMouseMove = (e) => {
    e.persist();
    this.emitNearestXY(e);
  };

  handlerMouseLeave = trottle(() => {
    this.asProps.eventEmitter.emit(`onNearestXY`, []);
  });

  setContext() {
    const { scale, data, eventEmitter } = this.asProps;
    return {
      $rootProps: {
        data: data,
        scale: scale,
        eventEmitter: eventEmitter,
        rootRef: this.rootRef,
      },
    };
  }

  render() {
    const SXYPlot = this.Root;
    const { styles, scale } = this.asProps;

    return styled(styles)(
      <SXYPlot
        render={Box}
        tag="svg"
        __excludeProps={['data', 'scale']}
        ref={this.rootRef}
        onMouseMove={this.handlerMouseMove}
        onMouseLeave={this.handlerMouseLeave}
      />,
    );
  }
}

export default createComponent(XYPlotRoot);
