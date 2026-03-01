import { useEffect, useMemo, useState } from 'react';
import { useProgressStore } from '../game/store';
import { foundationChapters } from '../data/curriculum/foundations';
import { deepDiveChapters } from '../data/curriculum/deepdives';
import { learningPaths } from '../data/learningPaths';
import { LearningPathNode } from '../components/curriculum/LearningPathNode';
import { ChapterItem } from '../components/curriculum/ChapterItem';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { SearchInput } from '../components/ui/SearchInput';
import { ProgressBar } from '../components/ui/ProgressBar';

type DoneMap = Record<string, boolean>;
const STORAGE_KEY = 'epq_curriculum_done_v1';

export function CurriculumPage() {
  const [done, setDone] = useState<DoneMap>({});
  const [onlyPending, setOnlyPending] = useState(false);
  const [query, setQuery] = useState('');
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
  }, [done]);

  const allChapters = useMemo(() => [...foundationChapters, ...deepDiveChapters], []);

  const chapters = useMemo(() => {
    const base = onlyPending ? allChapters.filter((c) => !done[c.id]) : allChapters;
    const q = query.trim().toLowerCase();
    if (!q) return base;
    return base.filter((c) => {
      const blob = [
        c.title,
        c.objective,
        ...c.glossary,
        ...c.sections.flatMap((s) => [s.heading, ...s.points]),
        ...c.practice.flatMap((p) => [p.title, ...p.steps])
      ].join(' ').toLowerCase();
      return blob.includes(q);
    });
  }, [onlyPending, done, allChapters, query]);

  const completedCount = Object.values(done).filter(Boolean).length;
  const progressPct = Math.round((completedCount / allChapters.length) * 100);

  const toggleDone = (id: string) => setDone((s) => ({ ...s, [id]: !s[id] }));

  const pathBoard = useMemo(() => {
    const basicDone = ['el-core', 'cl-core', 'evm-core', 'tx-lifecycle-core'].filter((id) => done[id]).length;
    const builderDone = ['engine-api-core', 'eip-workflow-core', 'client-testing-core'].filter((id) => done[id]).length;
    const coreDone = ['testing-systems-core', 'security-core', 'l2-da-core', 'el-deep-state-trie', 'cl-deep-forkchoice-finality'].filter((id) => done[id]).length;
    return { basicDone, builderDone, coreDone };
  }, [done]);

  return (
    <main className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>系统化学习课程</h2>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="ghost" onClick={() => setOnlyPending((v) => !v)}>
            {onlyPending ? '显示全部章节' : '仅看未完成'}
          </Button>
        </div>
      </div>

      <Card>
        <h3>学习路径：无限花园的生长</h3>
        <p>从一颗种子开始，逐步成长为以太坊协议森林中的参天大树。</p>
        
        <div className="garden-path">
          {learningPaths.map((path, idx) => {
            const isBasic = idx === 0;
            const isBuilder = idx === 1;
            const progress = isBasic ? pathBoard.basicDone : isBuilder ? pathBoard.builderDone : pathBoard.coreDone;
            const total = isBasic ? 4 : isBuilder ? 3 : 5;

            return (
              <LearningPathNode 
                key={path.id}
                path={path}
                index={idx}
                progress={progress}
                total={total}
              />
            );
          })}
        </div>
      </Card>

      <Card>
        <h3>章节检索</h3>
        <SearchInput 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="搜索知识点：如 Engine API / Finality / Gas / Rollup..."
          resultCount={query ? chapters.length : undefined}
        />
      </Card>

      <ProgressBar progress={progressPct} label={`总体进度 ${progressPct}%`} />

      <div className="chapter-list">
        {chapters.map((chapter, idx) => (
          <ChapterItem
            key={chapter.id}
            chapter={chapter}
            index={idx}
            isExpanded={expandedChapter === chapter.id}
            isDone={!!done[chapter.id]}
            onToggleExpand={() => setExpandedChapter(expandedChapter === chapter.id ? null : chapter.id)}
            onToggleDone={() => toggleDone(chapter.id)}
            allChapters={allChapters}
            doneMap={done}
          />
        ))}
      </div>
    </main>
  );
}
