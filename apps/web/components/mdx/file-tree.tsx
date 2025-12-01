// apps/web/components/mdx/file-tree.tsx
import {File, Folder} from 'lucide-react';

import {cn} from '@workspace/ui/lib/utils';

interface FileTreeProps {
  children: string;
  className?: string;
}

export function FileTree({children, className}: FileTreeProps) {
  const content = String(children ?? '').trim();
  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const renderTree = (lines: string[]) => {
    return lines.map((line, i) => {
      const indentMatch = line.match(/^\s*/);
      const indent = indentMatch ? indentMatch[0].length : 0;
      const nextLine = lines[i + 1];
      const nextIndentMatch = nextLine?.match(/^\s*/);
      const nextIndent = nextIndentMatch ? nextIndentMatch[0].length : 0;

      const name = line.trim();
      const isFolder = name.endsWith('/') || (nextLine && nextIndent > indent);

      return (
        <div
          key={i}
          style={{paddingLeft: `${indent * 0.5}rem`}}
          className="flex items-center gap-2"
        >
          {isFolder ? (
            <Folder className="h-4 w-4 text-blue-500" />
          ) : (
            <File className="h-4 w-4 text-gray-500" />
          )}
          <span>{name}</span>
        </div>
      );
    });
  };

  return (
    <div
      className={cn(
        'bg-muted rounded-lg border p-4 font-mono text-sm',
        className,
      )}
    >
      {renderTree(lines)}
    </div>
  );
}
