import React from 'react';

export const Container = ({
  htmlTag = 'div',
  children,
  className,
}: React.PropsWithChildren & {
  htmlTag?: 'div' | 'section' | 'article' | 'header' | 'footer';
  className?: string;
}) => React.createElement(htmlTag, { className: `${className || ''} container mx-auto p-4` }, children);
