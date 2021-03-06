import React from 'react';
import styled from 'styled-components';
import { oneOf, number, node, bool } from 'prop-types';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_5_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import Grid from '@bbc/psammead-grid';
import { mostReadListGridProps } from '../utilities/gridProps';

const TwoColumnGrid = styled(Grid).attrs({
  role: 'list',
})`
  list-style-type: none;
  margin: 0;
  padding: 0;
  grid-auto-flow: column;
  grid-template-rows: repeat(
    ${props => Math.ceil(props.numberOfItems / 2)},
    [col-start] auto [col-end]
  );
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    grid-template-rows: repeat(
      ${props => props.numberOfItems},
      [col-start] auto [col-end]
    );
  }
`;

const MultiColumnGrid = styled(TwoColumnGrid)`
  @media (min-width: ${GEL_GROUP_5_SCREEN_WIDTH_MIN}) {
    grid-auto-flow: row;
    grid-template-rows: repeat(
      ${props => Math.floor(props.numberOfItems / 2)},
      [col-start] auto [col-end]
    );
  }
`;

const MostReadList = ({ numberOfItems, dir, maxTwoColumns, children }) => {
  const MostReadListGrid = maxTwoColumns ? TwoColumnGrid : MultiColumnGrid;
  return (
    <MostReadListGrid
      {...mostReadListGridProps(maxTwoColumns)}
      dir={dir}
      numberOfItems={numberOfItems}
      forwardedAs="ol"
    >
      {children}
    </MostReadListGrid>
  );
};

MostReadList.propTypes = {
  children: node.isRequired,
  dir: oneOf(['rtl', 'ltr']),
  maxTwoColumns: bool,
  numberOfItems: number.isRequired,
};

MostReadList.defaultProps = {
  dir: 'ltr',
  maxTwoColumns: false,
};

export default MostReadList;
