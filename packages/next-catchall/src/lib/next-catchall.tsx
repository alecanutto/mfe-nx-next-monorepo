import React from 'react';
import { NextPage, NextPageContext } from 'next';
import { loadRemote } from '@module-federation/runtime';
import createMatcher from 'feather-route-matcher';

interface FederatedPageProps {
  FederatedPage?: React.ComponentType<any>;
  render404?: boolean;
  renderError?: boolean;
  needsReload?: boolean;
}

interface ModuleWithDefaultExport {
  default: any;
}

const matchFederatedPage = async (
  remote?: string,
  path?: string
): Promise<any> => {
  if (!path) {
    return null;
  }

  const remotes = remote
    ? new Set([remote])
    : new Set(
        ...__FEDERATION__.__INSTANCES__
          .filter((item) => item.options.remotes.length > 0)
          .map((item) => item.options.remotes.map((r) => r.name))
      );

  console.log('remotes', remotes);

  const maps = await Promise.all(
    Array.from(remotes).map(async (remote) => {
      return loadRemote<ModuleWithDefaultExport>(remote + '/pages-map')
        .then((factory) => ({ remote, config: factory?.default }))
        .catch(() => null);
    })
  );

  console.log('maps', maps);

  interface Config {
    [path: string]: {
      remote: string;
      module: any;
    };
  }

  const config: Config = {};

  for (const map of maps) {
    if (!map) continue;

    for (const [path, mod] of Object.entries(map.config)) {
      if (path === '/') {
        config[`/${remote}`] = {
          remote: map.remote,
          module: mod,
        };
      } else {
        config[`/${remote}${path}`] = {
          remote: map.remote,
          module: mod,
        };
      }
    }
  }

  console.log('config', config);
  const matcher = createMatcher(config);
  console.log('path', path);
  return matcher(path);
};

interface CreateFederatedCatchAllOptions {
  remote: string;
  ErrorComponent?: any;
  NotFoundComponent?: any;
}

export function createFederatedCatchAll({
  remote,
  ErrorComponent,
  NotFoundComponent,
}: CreateFederatedCatchAllOptions) {
  const FederatedCatchAll: NextPage<FederatedPageProps> = (initialProps) => {
    const [lazyProps, setProps] = React.useState({});

    const { FederatedPage, render404, renderError, needsReload, ...props } = {
      ...lazyProps,
      ...initialProps,
    };

    React.useEffect(() => {
      if (needsReload) {
        const runUnderlayingGIP = async () => {
          console.log('needsReload');
          const federatedProps = await FederatedCatchAll.getInitialProps?.(
            props as NextPageContext
          );
          if (federatedProps) setProps({ ...federatedProps, remote });
        };
        runUnderlayingGIP();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (render404) {
      return <NotFoundComponent />;
    }
    if (renderError) {
      return <ErrorComponent />;
    }

    if (FederatedPage) {
      return <FederatedPage {...props} />;
    }

    return null;
  };

  FederatedCatchAll.getInitialProps = async (ctx: NextPageContext) => {
    const { err, req, res, AppTree, ...props } = ctx;
    if (err) {
      return { renderError: true, ...props };
    }

    if (typeof window === 'undefined') {
      console.log('in server');
      return { needsReload: true, ...props };
    }

    console.log('in browser');
    console.log('getInitialProps', ctx.asPath);

    const matchedPage = await matchFederatedPage(remote, ctx.asPath);

    try {
      console.log('matchedPage', matchedPage);
      const remote = matchedPage?.value?.remote;
      const mod = matchedPage?.value?.module.replace('./', '/');

      if (!remote || !mod) {
        // TODO: Run getInitialProps for 404 page
        return { render404: true, ...props };
      }

      console.log('loading exposed module', mod, 'from remote', remote);
      const FederatedPage = await loadRemote<ModuleWithDefaultExport>(
        remote + mod
      ).then((factory) => factory?.default);
      console.log('FederatedPage', FederatedPage);
      if (!FederatedPage) {
        // TODO: Run getInitialProps for 404 page
        return { render404: true, ...props };
      }

      const modifiedContext = {
        ...ctx,
        query: matchedPage.params,
      };

      const federatedPageProps =
        (await FederatedPage.getInitialProps?.(modifiedContext)) || {};
      return { ...federatedPageProps, FederatedPage };
    } catch (err) {
      console.log('err', err);
      // TODO: Run getInitialProps for error page
      return { renderError: true, ...props };
    }
  };

  return FederatedCatchAll;
}
