import {ActivatedRouteSnapshot, Params, Router} from '@angular/router';

export interface PathRouter {
    path: string;
    pathParts: string[];
    queryParams: Params;
}

export function getPath(router: Router, basePath?: string): PathRouter {
    const pathRouter: PathRouter = {path: (!basePath ? '' : basePath),
        pathParts: !basePath ? [] : basePath.split('/').filter(value => !!value),
        queryParams: []
    };
    return getPathBySnapshot(router.routerState.snapshot.root, pathRouter);
}

export function getPathBySnapshot(activatedRoute: ActivatedRouteSnapshot, path: PathRouter): PathRouter {

    if (activatedRoute.children && activatedRoute.children.length) {
        const routeSnapshots = activatedRoute.children.filter(value => value.outlet === 'primary');
        for (const routeSnapshot of routeSnapshots) {
            if (routeSnapshot.url && routeSnapshot.url.length) {
                const paths = routeSnapshot.url.map(value => value.path);

                path.queryParams = Object.assign({}, path.queryParams, routeSnapshot.queryParams);
                path.pathParts = [...path.pathParts, ...paths];
                path.path += paths
                    .reduce((previousValue, currentValue) => previousValue + '/' + currentValue) + '/';
                path = getPathBySnapshot(routeSnapshot, path);
            }
        }
    }
    return path;
}
