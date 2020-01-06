import React, { useEffect, useRef, useState } from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';

const useLoader = (iframe, handleLoad) => {
  useEffect(() => {
    iframe.current.addEventListener('load', handleLoad);
  });
};

const Canonical = ({ src, title, placeholderSrc }) => {
  const backgroundStyle = `
    background-image: url(${placeholderSrc});
    background-repeat: no-repeat;
    background-size: contain;
  `;

  const StyledIframe = styled.iframe`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
    overflow: hidden;
    ${placeholderSrc ? backgroundStyle : ''}
  `;

  const [isLoading, setLoader] = useState(true);

  const handleLoad = () => {
    setLoader(false);
  };

  const iframe = useRef(null);
  useLoader(iframe, handleLoad);

  return (
    <>
      {isLoading && <span>Loading...</span>}
      <StyledIframe
        src={src}
        ref={iframe}
        title={title}
        allow="autoplay; fullscreen"
        scrolling="no"
        gesture="media"
        allowFullScreen
      />
    </>
  );
};

Canonical.propTypes = {
  src: string.isRequired,
  title: string.isRequired,
  placeholderSrc: string,
};

Canonical.defaultProps = {
  placeholderSrc: null,
};

export default Canonical;
