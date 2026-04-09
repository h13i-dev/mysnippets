import type { BaseProps } from '@src/types/base';
import clsx from 'clsx';

export interface BreadcrumbProps extends BaseProps {
  currentPath?: string;
  paths?: string[] | { title: string; path?: string }[];
}

interface BreadcrumbItem {
  title: string;
  path?: string;
}

/**
 * パスから簡易的なタイトルを生成
 * @param path パス文字列
 */
function generateTitleFromPath(path: string): string {
  const segments = path.split('/').filter(Boolean);
  const lastSegment = segments[segments.length - 1] || '';
  // ケバブケースをタイトルケースに変換
  return lastSegment
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * 文字列配列からパンくずリストを生成
 * @param pathArray パスの配列
 */
function generateBreadcrumbsFromPaths(pathArray: string[]) {
  const breadcrumbItems = [
    { title: 'トップ', path: '/' },
    ...pathArray.map((path) => ({
      title: generateTitleFromPath(path),
      path,
    })),
  ];

  return breadcrumbItems;
}

/**
 * オブジェクト形式（BreadcrumbItem[]）のパンくずリスト生成
 * @param breadcrumbObject BreadcrumbItemの配列
 */
function generateArrayBreadcrumbs(breadcrumbObject: BreadcrumbItem[]) {
  const breadcrumbItems = [{ title: 'トップ', path: '/' }];

  for (const item of breadcrumbObject) {
    breadcrumbItems.push({
      title: item.title,
      path: item.path || '',
    });
  }

  return breadcrumbItems;
}

/**
 * 現在のパスから階層的なパスを生成する関数
 * @param currentPath 現在のパス
 * @returns パスの配列
 */
function generatePathHierarchy(currentPath: string): string[] {
  const segments = currentPath.split('/').filter(Boolean);

  return segments.reduce<string[]>((paths, _segment, index) => {
    let path = '/' + segments.slice(0, index + 1).join('/');
    path = path.endsWith('/') ? path : path + '/';
    paths.push(path);
    return paths;
  }, []);
}

/**
 * パスに基づいてパンくずリストを生成する関数
 * @param pathname 現在のパス
 * @param paths カスタムパス配列
 */
function generateBreadcrumbs(
  pathname: string,
  paths?: string[] | { title: string; path?: string }[],
) {
  if (paths) {
    // pathsが配列形式で、最初の要素がBreadcrumbItemオブジェクトの場合
    if (
      Array.isArray(paths) &&
      paths.length > 0 &&
      typeof paths[0] === 'object' &&
      'title' in paths[0]
    ) {
      return generateArrayBreadcrumbs(paths as BreadcrumbItem[]);
    }
    // pathsが文字列配列の場合
    else if (Array.isArray(paths)) {
      return generateBreadcrumbsFromPaths(paths as string[]);
    }
  }

  // currentPathから自動生成する場合
  const pathHierarchy = generatePathHierarchy(pathname);
  return generateBreadcrumbsFromPaths(pathHierarchy);
}

const Breadcrumb = ({ currentPath = '/', paths, className, ...rest }: BreadcrumbProps) => {
  const breadcrumbItems = generateBreadcrumbs(currentPath, paths);

  return (
    <nav className={clsx('p-breadcrumb', className)} {...rest} aria-label="パンくずリスト">
      {/* @ts-expect-error */}
      <ol className="p-breadcrumb_items" itemscope="" itemtype="https://schema.org/BreadcrumbList">
        {breadcrumbItems.map((item, index) => {
          const isLastItem = index === breadcrumbItems.length - 1;
          const cleanTitle = item.title.replace(/<br.*?>/gi, ' ');
          const position = index + 1;

          if (!isLastItem) {
            return (
              // @ts-expect-error
              <li
                key={index}
                className="p-breadcrumb_item"
                itemprop="itemListElement"
                itemscope=""
                itemtype="https://schema.org/ListItem"
              >
                {item.path ? (
                  // @ts-expect-error
                  <a itemprop="item" href={item.path}>
                    {/* @ts-expect-error */}
                    <span itemprop="name">{cleanTitle}</span>
                  </a>
                ) : (
                  // @ts-expect-error
                  <span itemprop="name">{cleanTitle}</span>
                )}
                {/* @ts-expect-error */}
                <meta itemprop="position" content={position.toString()} />
                <span className="icon_arrow-forward" aria-hidden="true" />
              </li>
            );
          } else {
            return (
              // @ts-expect-error
              <li
                key={index}
                className="p-breadcrumb_item"
                itemprop="itemListElement"
                itemscope=""
                itemtype="https://schema.org/ListItem"
              >
                {/* @ts-expect-error */}
                <span itemprop="name">{cleanTitle}</span>
                {/* @ts-expect-error */}
                <meta itemprop="position" content={position.toString()} />
              </li>
            );
          }
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
