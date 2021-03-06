import React, { HTMLProps } from 'react';

import createComponent, { Component, styled, Merge } from '@semcore/core';
import { Box, IBoxProps } from '@semcore/flex-box';
import resolveColor from '@semcore/utils/lib/color';

import style from './style/spin.shadow.css';

function getThemeColor(theme) {
  switch (theme) {
    case 'dark':
    case 'invert':
      return 'currentColor';
    default:
      return resolveColor(theme);
  }
}

export interface ISpinProps extends IBoxProps {
  /** Spinner size
   * @default m
   **/
  size?: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
  /** Spinner theme. There are several default themes or you can use your own color
   * @default dark
   **/
  theme?: 'dark' | 'invert' | string;
  /** Whether the spinner should be in the center of the parent.
   * This works for a nested spinner in flex,
   * otherwise only horizontal alignment will occur.
   * */
  centered?: boolean;
}

class Spin extends Component<ISpinProps> {
  static displayName = 'Spin';
  static style = style;
  static defaultProps = {
    size: 'm',
    theme: 'dark',
  };

  render() {
    const { Root: SSpin } = this;
    const { styles, size, theme, centered } = this.asProps;
    return styled(styles)`
      SSpin {
        color: ${getThemeColor(theme)};
      }
    `(<SSpin render={Box} size={size} theme={theme} centered={centered} />);
  }
}

export default createComponent<Merge<ISpinProps, HTMLProps<HTMLSpanElement>>>(Spin);
