'use client';
import {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { InterfaceKitBridgePayload } from 'interface-kit/react';
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronRight,
  Compass,
  FileText,
  Focus,
  HelpCircle,
  Layers3,
  LayoutGrid,
  Map as MapIcon,
  Maximize2,
  Menu,
  Minus,
  Plus,
  Search,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog';
import { ChapterContent } from '@/components/learning/chapter-content';
import { LearningPath } from '@/components/learning/learning-path';
import { UpdateResourceLinks } from '@/components/learning/client-updates';
import {
  checkedLessons,
  learningProgressKey,
  type LearningAnswers,
} from '@/lib/learning-path';
import {
  EmailPreview,
  WireframeExplorer,
  type Scenario,
} from '@/components/learning/wireframes';
import {
  acceptance,
  cards,
  chapters,
  glossary,
  sourceUrl,
  cardKindLabel,
  type Card,
} from '@/lib/knowledge';
import { fitRegion, zoomAt, type Camera } from '@/lib/viewport';
import { useBrowserStorage } from '@/hooks/use-browser-storage';
import { InterfaceReview } from '@/components/dev/interface-review';
import {
  arrangeChapters,
  canvasBounds,
  chapterConnections,
} from '@/lib/canvas-layout';

const connectionLabels = [
  'FOR WHOM?',
  'HOW IT WORKS',
  'THE REPORT',
  'BUILT ON EVIDENCE',
  'IN PRACTICE',
  'THE MONTHLY LOOP',
  'THE BOUNDARIES',
  'THE DESIGN DIRECTION',
  'WHAT THE DATA SUPPORTS',
];
export default function Home() {
  const [active, setActive] = useState('overview');
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, scale: 1 });
  const [size, setSize] = useState({ w: 1200, h: 830 });
  const [animate, setAnimate] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [learning, setLearning] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  const [interfaceEditing, setInterfaceEditing] = useState(false);
  const handleInterfaceState = useCallback(
    (payload: InterfaceKitBridgePayload | null) => {
      setInterfaceEditing(payload?.snapshot.isActive ?? false);
    },
    [],
  );
  const [chapterHeights, setChapterHeights] = useState<Record<string, number>>(
    {},
  );
  const layout = useMemo(
    () => arrangeChapters(chapters, chapterHeights),
    [chapterHeights],
  );
  const world = useMemo(() => canvasBounds(layout), [layout]);
  const connections = useMemo(() => chapterConnections(layout), [layout]);
  const worldElement = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<Card | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [savedAnswers, saveAnswers, progressSaved] = useBrowserStorage(
    learningProgressKey,
    '{}',
  );
  const answers = parseJson(savedAnswers);
  const completed = checkedLessons(answers);
  const [checklist, setChecklist] = useState(false);
  const [savedCriteria, saveCriteria] = useBrowserStorage(
    'vequity-reviewed-criteria',
    '[]',
  );
  const criteria = parseJson(savedCriteria);
  const checked = Array.isArray(criteria)
    ? criteria.filter(
        (n): n is number => Number.isInteger(n) && n >= 0 && n < 10,
      )
    : [];
  const [resources, setResources] = useState(false);
  const [help, setHelp] = useState(false);
  const [wireframe, setWireframe] = useState<Scenario | null>(null);
  const [email, setEmail] = useState<boolean | null>(null);
  const stage = useRef<HTMLElement>(null);
  const detailTitle = useRef<HTMLHeadingElement>(null);
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);
  const pointers = useRef(new Map<number, { x: number; y: number }>());
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeIndex = chapters.findIndex((c) => c.id === active);
  const chapter = layout[activeIndex];
  const modalOpen =
    selected !== null ||
    searchOpen ||
    checklist ||
    resources ||
    help ||
    wireframe !== null ||
    email !== null;
  const moveCamera = useCallback((next: Camera) => {
    setAnimate(true);
    setCamera(next);
    if (transitionTimer.current) clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => setAnimate(false), 450);
  }, []);
  const focusChapter = useCallback(
    (id: string) => {
      const target = layout.find((c) => c.id === id)!;
      setActive(id);
      setSidebar(false);
      if (learning) {
        stage.current?.scrollTo({ top: 0, behavior: 'instant' });
      } else moveCamera(fitRegion(target, size));
    },
    [size, learning, moveCamera, layout],
  );
  const completeLesson = (id: string, answer: string) => {
    const valid = Object.fromEntries(
      completed.map((key) => [key, (answers as LearningAnswers)[key]]),
    );
    saveAnswers(JSON.stringify({ ...valid, [id]: answer }));
  };
  const showLearning = (id = active) => {
    setActive(id);
    setLearning(true);
    setSidebar(false);
    stage.current?.scrollTo({ top: 0, behavior: 'instant' });
  };
  const showCanvas = () => {
    setLearning(false);
    stage.current?.scrollTo({ top: 0, behavior: 'instant' });
    moveCamera(fitRegion(chapter, size));
  };
  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      const { width: w, height: h } = entries[0].contentRect;
      setSize({ w, h });
    });
    observer.observe(element);
    return () => {
      observer.disconnect();
      if (transitionTimer.current) clearTimeout(transitionTimer.current);
    };
  }, []);
  useEffect(() => {
    if (learning || interfaceEditing) return;
    setCamera(
      fitRegion(
        layout.find((c) => c.id === activeRef.current)!,
        size,
      ),
    );
  }, [layout, learning, size, interfaceEditing]);
  useEffect(() => {
    if (learning || !worldElement.current) return;
    const observer = new ResizeObserver((entries) => {
      setChapterHeights((previous) => {
        const next = { ...previous };
        let changed = false;
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.chapter!;
          const height = Math.ceil(
            entry.borderBoxSize[0]?.blockSize ?? entry.contentRect.height,
          );
          if (next[id] !== height) {
            next[id] = height;
            changed = true;
          }
        }
        return changed ? next : previous;
      });
    });
    worldElement.current
      .querySelectorAll('.canvas-chapter')
      .forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [learning]);
  useEffect(() => {
    const el = stage.current;
    if (!el || learning || interfaceEditing) return;
    const wheel = (e: WheelEvent) => {
      if (
        !e.ctrlKey &&
        !e.metaKey &&
        e.target instanceof Element &&
        e.target.closest('[data-canvas-scroll]')
      )
        return;
      e.preventDefault();
      setAnimate(false);
      const bounds = el.getBoundingClientRect();
      if (e.ctrlKey || e.metaKey) {
        setCamera((prev) =>
          zoomAt(prev, Math.exp(-e.deltaY * 0.009), {
            x: e.clientX - bounds.left,
            y: e.clientY - bounds.top,
          }),
        );
      } else {
        const unit =
          e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientHeight : 1;
        setCamera((prev) => ({
          ...prev,
          x: prev.x - e.deltaX * unit,
          y: prev.y - e.deltaY * unit,
        }));
      }
    };
    el.addEventListener('wheel', wheel, { passive: false });
    return () => el.removeEventListener('wheel', wheel);
  }, [learning, interfaceEditing]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (interfaceEditing) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        if (modalOpen && !searchOpen) return;
        e.preventDefault();
        setSearchOpen((prev) => !prev);
        return;
      }
      if (e.key === 'Escape' && !modalOpen) {
        setSidebar(false);
        return;
      }
      if (
        modalOpen ||
        (e.target instanceof HTMLElement &&
          e.target.closest(
            'input,textarea,select,button,a,summary,[contenteditable],[data-canvas-scroll]',
          ))
      )
        return;
      if (learning) return;
      const center = { x: size.w / 2, y: size.h / 2 };
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setCamera((c) => zoomAt(c, 1.2, center));
      } else if (e.key === '-') {
        e.preventDefault();
        setCamera((c) => zoomAt(c, 1 / 1.2, center));
      } else if (e.key === '0') {
        e.preventDefault();
        moveCamera(fitRegion(world, size, true));
      } else if (e.key === 'Home') {
        e.preventDefault();
        focusChapter(active);
      } else if (
        ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)
      ) {
        e.preventDefault();
        setAnimate(false);
        setCamera((c) => ({
          ...c,
          x:
            c.x +
            (e.key === 'ArrowLeft' ? 70 : e.key === 'ArrowRight' ? -70 : 0),
          y: c.y + (e.key === 'ArrowUp' ? 70 : e.key === 'ArrowDown' ? -70 : 0),
        }));
      }
    };
    window.addEventListener('keydown', key);
    return () => window.removeEventListener('keydown', key);
  }, [
    active,
    focusChapter,
    modalOpen,
    moveCamera,
    learning,
    size,
    world,
    searchOpen,
    interfaceEditing,
  ]);
  const point = (e: React.PointerEvent) => {
    const bounds = stage.current!.getBoundingClientRect();
    return { x: e.clientX - bounds.left, y: e.clientY - bounds.top };
  };
  const pointerDown = (e: React.PointerEvent<HTMLElement>) => {
    if (
      learning ||
      interfaceEditing ||
      e.button !== 0 ||
      (e.target as HTMLElement).closest('button,a,input,[data-no-pan]')
    )
      return;
    pointers.current.set(e.pointerId, point(e));
    e.currentTarget.setPointerCapture(e.pointerId);
    setAnimate(false);
    setDragging(true);
  };
  const pointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const old = pointers.current.get(e.pointerId);
    if (!old) return;
    const next = point(e);
    if (pointers.current.size === 2) {
      const other = [...pointers.current.entries()].find(
        ([id]) => id !== e.pointerId,
      )![1];
      const oldDist = Math.hypot(old.x - other.x, old.y - other.y);
      const newDist = Math.hypot(next.x - other.x, next.y - other.y);
      const mid = { x: (old.x + other.x) / 2, y: (old.y + other.y) / 2 };
      setCamera((c) => {
        const zoomed = zoomAt(c, newDist / Math.max(1, oldDist), mid);
        return {
          ...zoomed,
          x: zoomed.x + (next.x - old.x) / 2,
          y: zoomed.y + (next.y - old.y) / 2,
        };
      });
    } else
      setCamera((c) => ({
        ...c,
        x: c.x + next.x - old.x,
        y: c.y + next.y - old.y,
      }));
    pointers.current.set(e.pointerId, next);
  };
  const pointerUp = (e: React.PointerEvent) => {
    pointers.current.delete(e.pointerId);
    if (!pointers.current.size) setDragging(false);
  };
  const openCard = (card: Card) => {
    setSelected(card);
    setActive(card.chapter);
  };
  const results = cards.filter((c) =>
    [c.title, c.summary, ...c.points]
      .join(' ')
      .toLowerCase()
      .includes(query.trim().toLowerCase()),
  );
  const setReview = (index: number) =>
    saveCriteria(
      JSON.stringify(
        checked.includes(index)
          ? checked.filter((i) => i !== index)
          : [...checked, index],
      ),
    );
  return (
    <main className="workspace">
      <h1 className="sr-only">Vequity Exit Radar learning canvas</h1>
      <header className="topbar">
        <div className="brand">
          <Button
            variant="ghost"
            size="icon"
            className="mobile-menu"
            aria-label={
              sidebar ? 'Close chapter navigation' : 'Open chapter navigation'
            }
            aria-expanded={sidebar}
            aria-controls="chapter-navigation"
            onClick={() => setSidebar(!sidebar)}
          >
            <Menu />
          </Button>
          <span className="brand-mark" aria-hidden="true">
            v
          </span>
          vequity
          <span className="brand-divider" />
          <span className="brand-label">KNOWLEDGE STUDIO</span>
        </div>
        <div className="top-actions">
          <span className="version">
            <i /> Exit Radar v1
          </span>
          <fieldset
            className="view-switch"
            aria-label="Learning view"
            data-mode={learning ? 'learn' : 'canvas'}
          >
            <Button
              variant={learning ? 'default' : 'ghost'}
              onClick={() => showLearning()}
              aria-pressed={learning}
            >
              <BookOpen />
              Learn
            </Button>
            <Button
              variant={!learning ? 'default' : 'ghost'}
              onClick={showCanvas}
              aria-pressed={!learning}
            >
              <MapIcon />
              Canvas
            </Button>
          </fieldset>
        </div>
      </header>
      {sidebar && (
        <button
          className="sidebar-scrim"
          onClick={() => setSidebar(false)}
          aria-label="Close chapter navigation"
        />
      )}
      <aside
        id="chapter-navigation"
        className={`sidebar ${sidebar ? 'sidebar-open' : ''}`}
      >
        <div className="project-name">
          <span className="project-icon">
            <Layers3 size={19} />
          </span>
          <div>
            <strong>Exit Radar</strong>
            <small>Understand the product</small>
          </div>
        </div>
        <button className="search-preview" onClick={() => setSearchOpen(true)}>
          <Search size={15} /> Search the project <kbd>⌘ K</kbd>
        </button>
        <Button
          className="update-shortcut"
          variant="outline"
          onClick={() => showLearning('updates')}
        >
          <BookOpen size={15} /> Design direction <ArrowRight size={14} />
        </Button>
        <p className="nav-label">YOUR LEARNING PATH</p>
        <nav aria-label="Project chapters">
          {chapters.map((c, i) => (
            <button
              className={`nav-item ${c.id === active ? 'active' : ''}`}
              data-chapter={c.id}
              key={c.id}
              onClick={() => focusChapter(c.id)}
              aria-current={c.id === active ? 'location' : undefined}
            >
              <span className="nav-index">
                {String(i + 1).padStart(2, '0')}
              </span>
              {c.title}
              {completed.includes(c.id) ? (
                <Check
                  aria-label="Knowledge check passed"
                  className="chapter-read"
                  size={13}
                />
              ) : c.id === active ? (
                <ChevronRight size={14} />
              ) : null}
            </button>
          ))}
        </nav>
        <div className="learning-progress">
          <span>
            Knowledge checks{' '}
            <b>
              {completed.length}/{chapters.length}
            </b>
          </span>
          <div>
            <i
              style={{
                width: `${(completed.length / chapters.length) * 100}%`,
              }}
            />
          </div>
          <small>
            {progressSaved
              ? 'Saved in this browser'
              : 'Saved for this visit only'}
          </small>
        </div>
        <div className="sidebar-bottom">
          <button className="source-note" onClick={() => setResources(true)}>
            <FileText size={16} />
            <div>
              <strong>Brief + client references</strong>
              <small>Sources & product glossary</small>
            </div>
            <ArrowUpRight size={12} />
          </button>
          <p>
            <span className="small-dot" /> Working draft · September 2026
          </p>
        </div>
      </aside>
      <section
        ref={stage}
        className={`canvas-stage ${learning ? 'learning-stage' : ''} ${dragging ? 'is-dragging' : ''}`}
        aria-label={
          learning
            ? 'Step-by-step learning path'
            : 'Infinite project learning canvas'
        }
        onPointerDown={pointerDown}
        onPointerMove={pointerMove}
        onPointerUp={pointerUp}
        onPointerCancel={pointerUp}
        style={
          !learning
            ? {
                backgroundPosition: `${camera.x}px ${camera.y}px`,
                backgroundSize: `${20 * camera.scale}px ${20 * camera.scale}px`,
              }
            : undefined
        }
      >
        {learning ? (
          <LearningPath
            active={active}
            completed={completed}
            onNavigate={focusChapter}
            onComplete={completeLesson}
            onCanvas={showCanvas}
            onWireframe={setWireframe}
            onEmail={setEmail}
            onChecklist={() => setChecklist(true)}
          />
        ) : (
          <>
            <div className="canvas-bar" data-no-pan>
              <span>
                <Compass size={15} />
                Project map
                <ChevronRight size={13} />
                <b>{chapter.title}</b>
              </span>
              <div className="canvas-bar-right">
                <Button variant="outline" onClick={() => showLearning()}>
                  Read this chapter
                  <BookOpen size={15} />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Canvas help and keyboard shortcuts"
                  onClick={() => setHelp(true)}
                >
                  <HelpCircle size={15} />
                </Button>
              </div>
            </div>
            <div
              ref={worldElement}
              className={`canvas-world ${animate ? 'camera-animate' : ''}`}
              style={{
                transform: `translate(${camera.x}px,${camera.y}px) scale(${camera.scale})`,
                width: world.x + world.w + 40,
                height: world.y + world.h + 40,
              }}
            >
              {
                <svg
                  className="chapter-connectors"
                  width={world.x + world.w + 40}
                  height={world.y + world.h + 40}
                  aria-hidden="true"
                >
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="8"
                      markerHeight="8"
                      refX="6"
                      refY="4"
                      orient="auto"
                    >
                      <path
                        d="M 0 0 L 7 4 L 0 8"
                        fill="none"
                        stroke="#b7b7b7"
                      />
                    </marker>
                  </defs>
                  {connections.map((connection, index) => (
                    <Fragment key={connection.id}>
                      <path d={connection.path} />
                      <text
                        x={connection.labelX}
                        y={connection.labelY}
                        textAnchor="middle"
                      >
                        {connectionLabels[index]}
                      </text>
                    </Fragment>
                  ))}
                </svg>
              }
              {layout.map((c, i) => (
                <section
                  className={`canvas-chapter chapter-${c.id} ${active === c.id ? 'chapter-focused' : ''}`}
                  id={`chapter-${c.id}`}
                  data-chapter={c.id}
                  key={c.id}
                  aria-labelledby={`heading-${c.id}`}
                  onFocusCapture={() => {
                    if (!interfaceEditing && active !== c.id)
                      focusChapter(c.id);
                  }}
                  style={{
                    left: c.x,
                    top: c.y,
                    width: c.w,
                    minHeight: chapters[i].h,
                  }}
                >
                  <div className="section-heading">
                    <span className="section-num">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p>{c.kicker}</p>
                      <h2 id={`heading-${c.id}`}>{c.title}</h2>
                    </div>
                    <span className="section-meta">{c.subtitle}</span>
                  </div>
                  <ChapterContent
                    id={c.id}
                    onCard={openCard}
                    onWireframe={setWireframe}
                    onEmail={setEmail}
                    onChecklist={() => setChecklist(true)}
                  />
                  <div className="chapter-actions">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => showLearning(c.id)}
                    >
                      <BookOpen size={15} />
                      Read this chapter
                    </Button>
                    {i < chapters.length - 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => focusChapter(chapters[i + 1].id)}
                      >
                        Next: {chapters[i + 1].title}
                        <ArrowRight size={13} />
                      </Button>
                    )}
                  </div>
                </section>
              ))}
            </div>
            {
              <>
                <div className="canvas-controls" data-no-pan>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Zoom out"
                    title="Zoom out (−)"
                    onClick={() =>
                      setCamera((c) =>
                        zoomAt(c, 1 / 1.2, { x: size.w / 2, y: size.h / 2 }),
                      )
                    }
                  >
                    <Minus />
                  </Button>
                  <span>{Math.round(camera.scale * 100)}%</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Zoom in"
                    title="Zoom in (+)"
                    onClick={() =>
                      setCamera((c) =>
                        zoomAt(c, 1.2, { x: size.w / 2, y: size.h / 2 }),
                      )
                    }
                  >
                    <Plus />
                  </Button>
                  <i />
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Fit entire canvas"
                    title="Fit all (0)"
                    onClick={() => moveCamera(fitRegion(world, size, true))}
                  >
                    <Maximize2 />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Focus current chapter"
                    title="Focus chapter (Home)"
                    onClick={() => focusChapter(active)}
                  >
                    <Focus />
                  </Button>
                </div>
                <div className="canvas-hint">
                  Drag to explore <span>·</span> Scroll to move <span>·</span> ⌘
                  / Ctrl scroll to zoom
                </div>
                <div className="minimap" data-no-pan>
                  <span>
                    <LayoutGrid size={10} /> THE WHOLE PICTURE
                  </span>
                  <svg
                    viewBox={`0 0 ${world.x + world.w + 40} ${world.y + world.h + 40}`}
                    aria-hidden="true"
                  >
                    {layout.map((c, i) => (
                      <g
                        key={c.id}
                        data-chapter={c.id}
                        data-active={active === c.id}
                      >
                        <rect
                          x={c.x}
                          y={c.y}
                          width={c.w}
                          height={c.h}
                          rx="55"
                          fill={active === c.id ? '#444444' : '#e8e8e8'}
                          stroke={active === c.id ? '#444444' : '#d3d3d3'}
                          strokeWidth="20"
                        />
                        <text
                          x={c.x + 75}
                          y={c.y + 180}
                          fill={active === c.id ? '#ffffff' : '#6e6e6e'}
                          fontSize="120"
                        >
                          {String(i + 1).padStart(2, '0')}
                        </text>
                      </g>
                    ))}
                    <rect
                      x={-camera.x / camera.scale}
                      y={-camera.y / camera.scale}
                      width={size.w / camera.scale}
                      height={size.h / camera.scale}
                      fill="#6e6e6e12"
                      stroke="#818181"
                      strokeWidth="20"
                      rx="20"
                    />
                  </svg>
                  <div className="minimap-links">
                    {chapters.map((c, i) => (
                      <button
                        key={c.id}
                        aria-label={`Go to ${c.title}`}
                        aria-current={active === c.id ? 'location' : undefined}
                        onClick={() => focusChapter(c.id)}
                        title={c.title}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            }
          </>
        )}
      </section>
      <Dialog
        open={selected !== null}
        onOpenChange={(o) => !o && setSelected(null)}
      >
        <DialogContent
          className="detail-panel"
          placement="right"
          initialFocus={detailTitle}
        >
          <div className="detail-header">
            <span className={`detail-kind ${selected?.kind || 'requirement'}`}>
              {cardKindLabel(selected?.kind)}
            </span>
            <DialogTitle ref={detailTitle} tabIndex={-1}>
              {selected?.title}
            </DialogTitle>
            <DialogDescription>{selected?.summary}</DialogDescription>
          </div>
          <div className="detail-scroll">
            <div className="detail-body">
              {selected?.points.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="detail-sources">
              <span className="card-kicker">FOLLOW THE EVIDENCE</span>
              {selected?.sources.map((source, i) => (
                <a
                  key={i}
                  href={sourceUrl(source)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <FileText size={15} />
                  {source.label}
                  {source.page && <small>Page {source.page}</small>}
                  <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="search-modal">
          <DialogTitle>Find your way around</DialogTitle>
          <DialogDescription>
            Search concepts, requirements, and design decisions.
          </DialogDescription>
          <div className="search-input">
            <Search size={18} />
            <Input
              aria-label="Search canvas content"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try “fallback”, “watch”, or “capability”…"
            />
          </div>
          <div className="search-results">
            {results.length ? (
              results.map((card) => (
                <button
                  key={card.id}
                  onClick={() => {
                    setSearchOpen(false);
                    focusChapter(card.chapter);
                    setSelected(card);
                  }}
                >
                  <FileText size={17} />
                  <div>
                    <strong>{card.title}</strong>
                    <p>{card.summary}</p>
                    <small>
                      {chapters.find((c) => c.id === card.chapter)?.title}
                    </small>
                  </div>
                  <ArrowUpRight size={14} />
                </button>
              ))
            ) : (
              <p className="empty-search">
                No matching concepts. Try “source”, “report”, or “monthly”.
              </p>
            )}
          </div>
          <small className="search-count">
            {results.length} concepts · Requirements, client direction, and
            dated reference evidence
          </small>
        </DialogContent>
      </Dialog>
      <Dialog open={resources} onOpenChange={setResources}>
        <DialogContent className="resources-modal">
          <DialogTitle>Sources & product glossary</DialogTitle>
          <DialogDescription>
            The original brief defines the product. Client messages, data
            artifacts, and the Scout demo explain the latest direction and
            evidence. Each card links back to its sources.
          </DialogDescription>
          <div className="resource-links">
            <a
              href="/sources/design-starter.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <FileText />
              <div>
                <b>Design Starter</b>
                <span>
                  Concept, core questions, and design states · 3 pages
                </span>
              </div>
              <ArrowUpRight />
            </a>
            <a href="/sources/prd.pdf" target="_blank" rel="noreferrer">
              <FileText />
              <div>
                <b>Product Requirements Document</b>
                <span>
                  PRODUCT-I–XI, business rules, and appendix · 16 pages
                </span>
              </div>
              <ArrowUpRight />
            </a>
          </div>
          <h3>Design references & report artifacts</h3>
          <UpdateResourceLinks />
          <div className="resource-notice">
            <InfoDot />
            The client’s HTML is an example. The Paper file has not been
            inspected here; its link is still needed. Existing learning
            wireframes are proposals.
          </div>
          <h3>Speak the product’s language</h3>
          <dl className="glossary">
            {glossary.map(([term, meaning]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{meaning}</dd>
              </div>
            ))}
          </dl>
        </DialogContent>
      </Dialog>
      <Dialog open={checklist} onOpenChange={setChecklist}>
        <DialogContent className="checklist-modal">
          <DialogTitle>The product contract · 10 checks</DialogTitle>
          <DialogDescription>
            Mark what you’ve reviewed. This is a learning checklist, not a
            record of production test results. Saved in this browser.
          </DialogDescription>
          <div className="checklist-progress">
            <span>{checked.length} of 10 reviewed</span>
            <a href="/sources/prd.pdf#page=3" target="_blank" rel="noreferrer">
              PRD · II <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="acceptance-list">
            {acceptance.map((criterion, i) => (
              <label
                key={i}
                className={checked.includes(i) ? 'is-checked' : ''}
              >
                <input
                  type="checkbox"
                  checked={checked.includes(i)}
                  onChange={() => setReview(i)}
                />
                <span className="criterion-number">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{criterion}</span>
              </label>
            ))}
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={help} onOpenChange={setHelp}>
        <DialogContent className="help-modal">
          <DialogTitle>A little room to explore</DialogTitle>
          <DialogDescription>
            Start with Learn for one question at a time. Switch to Canvas to
            explore connections between chapters.
          </DialogDescription>
          <dl className="shortcut-list">
            {[
              ['Drag background', 'Pan across the canvas'],
              ['Scroll / trackpad', 'Move around'],
              ['⌘ / Ctrl + scroll', 'Zoom around your pointer'],
              ['+ / −', 'Zoom in / out'],
              ['0', 'Fit the entire canvas'],
              ['Home', 'Focus the selected chapter'],
              ['Arrow keys', 'Pan in any direction'],
              ['⌘ / Ctrl + K', 'Search all concepts'],
              ['Escape', 'Close a dialog'],
            ].map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p>
            On touch screens, drag or pinch the canvas background. Use Read this
            chapter to return to a readable lesson without zooming.
          </p>
          <div className="help-legend">
            <span>
              <i className="legend-dot requirement" /> Requirement
            </span>
            <span>
              <i className="legend-dot proposal" /> Design proposal
            </span>
            <span>
              <i className="legend-dot observation" /> Review observation
            </span>
          </div>
        </DialogContent>
      </Dialog>
      <WireframeExplorer
        open={wireframe !== null}
        onOpenChange={(o) => !o && setWireframe(null)}
        initial={wireframe || 'sparse'}
      />
      <Dialog open={email !== null} onOpenChange={(o) => !o && setEmail(null)}>
        <DialogContent className="email-modal">
          <DialogTitle>
            {email ? 'Quiet-month notification' : 'Active-month notification'}
          </DialogTitle>
          <DialogDescription>
            Fictional example · A notification, not the full report · Sent to
            watchers only
          </DialogDescription>
          <EmailPreview
            quiet={email === true}
            returningBuyers={learning ? 1 : 2}
            onReport={() => {
              setWireframe(email ? 'quiet' : learning ? 'refreshed' : 'dense');
              setEmail(null);
            }}
          />
        </DialogContent>
      </Dialog>
      <InterfaceReview onStateChange={handleInterfaceState} />
    </main>
  );
}
function InfoDot() {
  return <span className="legend-dot observation" />;
}

function parseJson(value: string): unknown {
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
}
