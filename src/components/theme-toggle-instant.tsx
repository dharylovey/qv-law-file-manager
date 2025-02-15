'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggleInstant() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="flex items-center">
      <Button
        onClick={() => setTheme(isDark ? 'light' : 'dark')}
        variant="outline"
        size="icon"
        className="rounded-full border-none dark:bg-inherit"
      >
        {isDark ? <Sun /> : <Moon />}
      </Button>
    </div>
  );
}
