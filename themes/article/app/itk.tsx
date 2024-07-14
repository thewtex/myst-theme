import React, { Suspense, useEffect } from 'react';
import type { NodeRenderer } from '@myst-theme/providers';

export type ITKView2dDirective = {
  type: 'itkView2d';
  imagePath: string;
};

const ViewerModule = React.lazy(() => import('./viewer.mjs') as any); // todo point to built viewer bundle

export const ITKView2dRenderer: NodeRenderer = ({ node }: { node: ITKView2dDirective }) => {
  const [Viewer, setViewer] = React.useState<any>(null);

  useEffect(() => {
    setViewer(ViewerModule);
  }, []);

  if (!Viewer) {
    return <div className="animate-pulse">loading...</div>;
  }
  return <Suspense><ViewerModule imagePath={node.imagePath} /></Suspense>;
};
