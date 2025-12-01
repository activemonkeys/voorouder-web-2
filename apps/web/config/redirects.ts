// apps/web/config/redirects.ts
type RedirectsMap = Record<string, string>;

export const redirects: RedirectsMap = {
  '/namen-lijsten-slachtoffers-10-14-mei-1940-rotterdam-2023':
    '/namen-slachtoffers-10-14-mei-1940-rotterdam',

  '/namen-lijsten-slachtoffers-10-14-mei-1940-rotterdam':
    '/namen-slachtoffers-10-14-mei-1940-rotterdam',

  '/lijst-slachtoffers-bombardement-rotterdam-31-maart-1943':
    '/namen-slachtoffers-bombardement-31-maart-1943-rotterdam',

  '/slachtoffers-vergeten-bombardement-rotterdam-31-maart-1943':
    '/namen-slachtoffers-bombardement-31-maart-1943-rotterdam',

  '/voorlopige-lijst-slachtoffers-vergeten-bombardement-31-maart-1943':
    '/namen-slachtoffers-bombardement-31-maart-1943-rotterdam',

  '/bommen-op-van-berkels-patent': '/bommen-van-berkels-patent',

  '/albums/militaire-slachtoffers-10-14-mei-1940-rotterdam':
    '/albums/nederlandse-militaire-slachtoffers-10-14-mei-1940-rotterdam',
};
