import routeApis from './routeApis';
import routePages from './routePages';
import shared from './shared';

interface IConstants {
  shared: typeof shared;
  routePages: typeof routePages;
  routeApis: typeof routeApis;
}

const constants: IConstants = {
  shared,
  routePages,
  routeApis,
};

export * from './httpCode';

export default constants;
