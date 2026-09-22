'use client';

import { useId, useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Code2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import reference from '@/lib/report-reference.json';

const base = '/sources/client-updates';
const views = [
  {
    id: 'report',
    label: 'HTML report',
    title: 'VanZandt Controls / Eagle Automation',
    description:
      'The supplied HTML, rendered directly. Scroll inside to explore the buyer cards and transaction tables. This example also includes internal operator sections.',
    url: `${base}/report.html`,
    action: 'Open full report',
  },
  {
    id: 'structure',
    label: 'JSON structure',
    title: 'How the report data is organized',
    description:
      'Annotated structure from the JSON-for-design document, dated 21 Sep 2026. This is descriptive JSONC, including internal fields; it is not a live report payload.',
    url: `${base}/json-for-design.html`,
    action: 'Open documentation',
  },
  {
    id: 'sample',
    label: 'Sample JSON',
    title: 'Acme Payroll · fictional example',
    description:
      'A separate example from the documentation: four corpus deals, two buyer cards, and one sourced transaction. This is not the JSON behind the VanZandt report.',
    url: `${base}/sample.json`,
    action: 'Open JSON file',
  },
] as const;

export function ReportArtifactViewer() {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const tabs = useRef<HTMLDivElement>(null);
  const view = views[selected];

  function moveTab(event: KeyboardEvent<HTMLDivElement>) {
    let next: number;
    if (event.key === 'ArrowRight') next = (selected + 1) % views.length;
    else if (event.key === 'ArrowLeft')
      next = (selected + views.length - 1) % views.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = views.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabs.current
      ?.querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [next]?.focus();
  }

  return (
    <section
      className="report-artifacts"
      aria-label="Supplied report and JSON"
      data-no-pan
    >
      <div
        className="report-artifact-tabs"
        ref={tabs}
        role="tablist"
        tabIndex={-1}
        aria-label="Choose a report reference"
        onKeyDown={moveTab}
      >
        {views.map((item, index) => (
          <Button
            key={item.id}
            variant="ghost"
            role="tab"
            id={`${id}-tab-${item.id}`}
            aria-selected={selected === index}
            aria-controls={`${id}-panel-${item.id}`}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
          >
            {index === 0 ? <FileText size={15} /> : <Code2 size={15} />}
            {item.label}
          </Button>
        ))}
      </div>
      <div className="report-artifact-intro">
        <h4>{view.title}</h4>
        <p>{view.description}</p>
        <a href={view.url} target="_blank" rel="noreferrer">
          {view.action} <ArrowUpRight size={14} />
        </a>
      </div>
      {views.map((item, index) => (
        <div
          key={item.id}
          role="tabpanel"
          className={item.id === 'report' ? undefined : 'report-artifact-code'}
          tabIndex={item.id === 'report' ? undefined : 0}
          data-canvas-scroll={item.id === 'report' ? undefined : true}
          id={`${id}-panel-${item.id}`}
          aria-labelledby={`${id}-tab-${item.id}`}
          hidden={selected !== index}
        >
          {selected === index && (
            <>
              {view.id === 'report' ? (
                <iframe
                  className="report-artifact-frame"
                  src={view.url}
                  title="Supplied Exit Radar HTML report for VanZandt Controls / Eagle Automation"
                  sandbox="allow-popups allow-popups-to-escape-sandbox"
                  loading="lazy"
                />
              ) : (
                <>
                  {view.id === 'structure' ? (
                    <>
                      <p className="report-code-label">Report shape · JSONC</p>
                      <pre>
                        <code>{reference.shape}</code>
                      </pre>
                      <p className="report-code-label">
                        Planned addition · delta
                      </p>
                      <p className="report-code-note">
                        Described as an unmerged change in the supplied note.
                      </p>
                      <pre>
                        <code>{reference.delta}</code>
                      </pre>
                    </>
                  ) : (
                    <pre>
                      <code>{reference.sample}</code>
                    </pre>
                  )}
                </>
              )}
            </>
          )}
        </div>
      ))}
    </section>
  );
}
