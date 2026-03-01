import { useMemo } from 'react';
import { useProgressStore } from '../game/store';
import { Trash2, Activity, Award, BookX, CheckCircle } from 'lucide-react';
import { CustomSelect } from '../components/CustomSelect';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { MetricCard } from '../components/ui/MetricCard';

export function ProgressPage() {
  const { xp, completed, wrongBook, clearWrongBook, knowledgeMap, setKnowledgeStatus } = useProgressStore();

  const doneCount = useMemo(() => Object.values(completed).filter(Boolean).length, [completed]);
  const domainGroups = useMemo(() => {
    return knowledgeMap.reduce<Record<string, typeof knowledgeMap>>((acc, n) => {
      if (!acc[n.domain]) acc[n.domain] = [];
      acc[n.domain].push(n);
      return acc;
    }, {});
  }, [knowledgeMap]);

  const selectOptions = [
    { value: 'todo', label: '待学习' },
    { value: 'learning', label: '学习中' },
    { value: 'done', label: '已掌握' }
  ];

  return (
    <main className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h2>学习进度总览</h2>
      </div>

      <div className="grid">
        <MetricCard
          icon={<Activity size={32} />}
          label="总 XP"
          value={xp}
          color="#2f6b47"
          bgGradient="linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(218,244,223,0.4) 100%)"
          iconBg="#daf4df"
          shadowColor="rgba(47,107,71,0.1)"
        />
        <MetricCard
          icon={<Award size={32} />}
          label="已通关"
          value={<>{doneCount} <span style={{ fontSize: '1rem', fontWeight: 500 }}>关</span></>}
          color="#5a76dc"
          bgGradient="linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(231,247,255,0.4) 100%)"
          iconBg="#e7f7ff"
          shadowColor="rgba(90,118,220,0.1)"
        />
        <MetricCard
          icon={<BookX size={32} />}
          label="错题数量"
          value={wrongBook.length}
          color="#d97706"
          bgGradient="linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(254,243,199,0.4) 100%)"
          iconBg="#fef3c7"
          shadowColor="rgba(217,119,6,0.1)"
        />
      </div>

      <Card>
        <h3>知识图谱（协议全栈）</h3>
        <div className="grid">
          {Object.entries(domainGroups).map(([domain, nodes]) => (
            <div key={domain} style={{ background: 'rgba(255,255,255,0.5)', padding: '20px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.8)' }}>
              <strong style={{ display: 'block', marginBottom: '16px', color: 'var(--primary-hover)', fontSize: '1.1rem', borderBottom: '2px solid rgba(47,107,71,0.1)', paddingBottom: '8px' }}>{domain}</strong>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {nodes.map((n) => (
                  <div key={n.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '8px', borderBottom: '1px dashed rgba(47,107,71,0.1)' }}>
                    <span style={{ fontSize: '0.95rem', fontWeight: 500 }}>{n.title}</span>
                    <CustomSelect 
                      value={n.status} 
                      onChange={(val) => setKnowledgeStatus(n.id, val as any)}
                      options={selectOptions}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3>错题本</h3>
          {wrongBook.length > 0 && (
            <Button variant="ghost" onClick={clearWrongBook} style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
              <Trash2 size={16} /> 清空错题本
            </Button>
          )}
        </div>
        
        {wrongBook.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            <CheckCircle size={48} style={{ margin: '0 auto 16px', opacity: 0.2 }} />
            <p>暂无错题，继续闯关吧。</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {wrongBook.map((w) => (
              <div key={`${w.levelId}-${w.questionId}`} style={{ background: 'rgba(255,255,255,0.6)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(47,107,71,0.1)' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <Badge variant="warning">Lv.{w.levelId}</Badge>
                  <strong>{w.prompt}</strong>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem', paddingLeft: '8px', borderLeft: '3px solid #fef3c7' }}>
                  解析：{w.explanation}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </main>
  );
}
