import { loadRemote } from "@module-federation/runtime/.";
import { NextPage, NextPageContext } from "next";
import dynamic from "next/dynamic";

interface Props {
  module: string;
}

interface ModuleWithDefaultExport {
  default: React.ComponentType;
}

const FederatedPage: NextPage<Props> = ({ module }) => {  
  const Page = dynamic(
    () =>
      loadRemote<ModuleWithDefaultExport>(module).then((module) => {
        if (module === null) {
          // Handle the case where the module is null
          throw new Error('Failed to load module');
        }
        return module;
      }),
    {
      ssr: false,
      loading: () => <div>Loading Page...</div>,
    }
  );

  return (
    <div>
      <h1>Dynamic Page</h1>
      <p>Current module: {module}</p>
      <Page />
    </div>
  );
}

FederatedPage.getInitialProps = async (ctx: NextPageContext) => {
  const path = ctx.req?.url?.split('/') ?? [];
  const pagePath = `${path[1]}/pages/${path.slice(2).join('/')}`;

  return { 
    module: pagePath
  };
}

export default FederatedPage;