import React, { HTMLAttributes } from 'react';
import WidgetEmpty, { getIconPath, iconNames, IWidgetEmptyProps } from '../WidgetEmpty';
import createComponent, { Component, Merge } from '@semcore/core';
import i18nEnhance, { IWithI18nEnhanceProps } from '@semcore/utils/lib/enhances/i18nEnhance';
import de from './translations/de.json';
import en from './translations/en.json';
import es from './translations/es.json';
import fr from './translations/fr.json';
import it from './translations/it.json';
import ja from './translations/ja.json';
import pt from './translations/pt.json';
import ru from './translations/ru.json';
import zh from './translations/zh.json';

export interface IWidgetNoDataProps extends IWidgetEmptyProps, IWithI18nEnhanceProps {
  /** Error description. If it is absent, use the local default one */
  description?: React.ReactNode;
  /* Data types */
  type?: iconNames;
}

class NoData extends Component<IWidgetNoDataProps> {
  static displayName = 'WidgetNoData';
  static enhance = [i18nEnhance()];
  static defaultProps = {
    type: 'other-data',
    i18n: {
      de,
      en,
      es,
      fr,
      it,
      ja,
      pt,
      ru,
      zh,
    },
  };

  render() {
    const Root = this.Root;
    const { Children, type, description, getI18nText } = this.asProps;
    const { title, description: descriptionText } = getI18nText();

    return (
      <Root render={WidgetEmpty} icon={getIconPath(type)}>
        <WidgetEmpty.Title>{title}</WidgetEmpty.Title>
        <WidgetEmpty.Description>{description || descriptionText}</WidgetEmpty.Description>
        <Children />
      </Root>
    );
  }
}

export default createComponent<Merge<IWidgetEmptyProps, HTMLAttributes<HTMLDivElement>>>(NoData);
