'use client';

import React from 'react';
import parse from 'html-react-parser';
export default function TrainingHtml({ content }: { content: string | null }) {
  return <article className="">{parse(`${content}`)}</article>;
}
