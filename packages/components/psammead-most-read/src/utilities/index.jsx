import React from 'react';
import { TEXT_VARIANTS } from '@bbc/psammead-storybook-helpers';
import { latin } from '@bbc/gel-foundations/scripts';
import Timestamp from '@bbc/psammead-timestamp';
import { MostReadItemWrapper, MostReadLink } from '../Item';
import MostReadRank from '../Rank';

/* eslint-disable react/prop-types */
const lastUpdated = ({ script, service }) => (
  // This will return the provided english translations
  <Timestamp
    datetime="2019-03-01T14:00+00:00"
    script={script}
    padding={false}
    service={service}
  >
    Last updated: 5th November 2016
  </Timestamp>
);

export const getServiceVariant = ({ service, variant = '' }) => {
  if (variant !== 'default') {
    const variantOverride =
      variant.charAt(0).toUpperCase() + variant.substring(1);
    return service + variantOverride;
  }

  return service;
};

export const getItem = ({ service, withTimestamp = false }) => {
  const baseUrl = 'https://www.bbc.com';
  const { text, articlePath } = TEXT_VARIANTS[service];
  const timestamp = withTimestamp
    ? lastUpdated({ script: latin, service })
    : null;

  return {
    id: `${Math.floor(Math.random() * 100000) + 1}`,
    title: text,
    href: `${baseUrl}${articlePath}`,
    timestamp,
  };
};

export const getItemWrapperArray = ({
  numberOfItems,
  service,
  script,
  dir,
  withTimestamp = false,
  maxTwoColumns = false,
}) => {
  const itemWrapperArray = [];
  const item = getItem({ service, withTimestamp });
  for (let i = 1; i <= numberOfItems; i += 1) {
    itemWrapperArray.push(
      <MostReadItemWrapper dir={dir} key={i} maxTwoColumns={maxTwoColumns}>
        <MostReadRank
          service={service}
          script={script}
          listIndex={i}
          numberOfItems={numberOfItems}
          dir={dir}
          maxTwoColumns={maxTwoColumns}
        />
        <MostReadLink
          dir={dir}
          href={item.href}
          service={service}
          script={script}
          title={item.title}
        >
          {item.timestamp}
        </MostReadLink>
      </MostReadItemWrapper>,
    );
  }
  return itemWrapperArray;
};
