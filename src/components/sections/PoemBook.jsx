import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { PageFlip } from 'page-flip';
import { FileDown } from 'lucide-react';
import content from '../../data/content';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import SectionWrapper from '../ui/SectionWrapper';
import SectionHeading from '../ui/SectionHeading';
import './PoemBook.css';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorkerUrl;

const { poemBook } = content;
const INITIAL_PAGES = 6;
const DEFAULT_PAGE_ASPECT_RATIO = 11 / 17;
const MIN_PAGE_WIDTH = 280;

let pdfDocumentPromise;

function loadPdfDocument() {
  if (!pdfDocumentPromise) {
    pdfDocumentPromise = pdfjsLib.getDocument({ url: poemBook.href }).promise.catch(error => {
      pdfDocumentPromise = undefined;
      throw error;
    });
  }

  return pdfDocumentPromise;
}

function isRenderCancelled(error) {
  return error?.name === 'RenderingCancelledException';
}

// StPageFlip removes its DOM on destroy but does not stop its animation loop.
function loadFlipbookPages(flipbook, pages) {
  const requestFrame = window.requestAnimationFrame.bind(window);
  const cancelFrame = window.cancelAnimationFrame.bind(window);
  const originalRequestFrame = window.requestAnimationFrame;
  let active = true;
  let renderLoop;
  let frameId;

  const scheduleRenderLoop = () => {
    frameId = requestFrame(timestamp => {
      if (!active) return;

      const requestFrameBeforeLoop = window.requestAnimationFrame;
      window.requestAnimationFrame = callback => {
        if (callback === renderLoop) return scheduleRenderLoop();
        return requestFrame(callback);
      };

      try {
        renderLoop(timestamp);
      } finally {
        window.requestAnimationFrame = requestFrameBeforeLoop;
      }
    });

    return frameId;
  };

  window.requestAnimationFrame = callback => {
    if (!renderLoop) {
      renderLoop = callback;
      return scheduleRenderLoop();
    }
    return requestFrame(callback);
  };

  try {
    flipbook.loadFromHTML(pages);
  } finally {
    window.requestAnimationFrame = originalRequestFrame;
  }

  return () => {
    active = false;
    if (frameId !== undefined) cancelFrame(frameId);
  };
}

export default function PoemBook() {
  const [book, setBook] = useState(null);
  const [pageSize, setPageSize] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [bookOrientation, setBookOrientation] = useState('landscape');
  const [hasFlipped, setHasFlipped] = useState(false);
  const [loadError, setLoadError] = useState('');
  const [renderError, setRenderError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const bookElementRef = useRef(null);
  const viewerRef = useRef(null);
  const flipbookRef = useRef(null);
  const canvasCacheRef = useRef(new Map());
  const renderedPagesRef = useRef(new Set());
  const renderingPagesRef = useRef(new Map());
  const renderTasksRef = useRef(new Map());
  const prefersReducedMotion = useReducedMotion();
  const fullscreenSupported =
    typeof document !== 'undefined' &&
    Boolean(
      document.fullscreenEnabled &&
        document.documentElement.requestFullscreen &&
        document.exitFullscreen
    );

  useLayoutEffect(() => {
    const viewer = viewerRef.current;
    if (viewer) setBookOrientation(viewer.clientWidth < 560 ? 'portrait' : 'landscape');
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === viewerRef.current);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const viewerWidth = viewerRef.current?.clientWidth ?? 0;
      const nextOrientation = viewerWidth < MIN_PAGE_WIDTH * 2 ? 'portrait' : 'landscape';
      setBookOrientation(current =>
        current === nextOrientation ? current : nextOrientation
      );
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let cancelled = false;

    loadPdfDocument()
      .then(async pdf => {
        const firstPage = await pdf.getPage(1);
        const viewport = firstPage.getViewport({ scale: 1 });
        if (cancelled) return;

        setBook(pdf);
        setPageSize({
          aspectRatio: viewport.width / viewport.height,
        });
      })
      .catch(error => {
        if (cancelled) return;
        console.error('Unable to load the poem book PDF.', error);
        setLoadError('Sorry, the book could not be loaded. You can still open or download the PDF.');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const container = bookElementRef.current;
    if (!book || !pageSize || !container) return undefined;

    let active = true;
    const pageNodes = [];
    const pageCanvases = new Map();
    const cachedCanvases = canvasCacheRef.current;
    const renderedPages = renderedPagesRef.current;
    const renderingPages = renderingPagesRef.current;
    const renderTasks = renderTasksRef.current;
    const minWidth = MIN_PAGE_WIDTH;
    const maxWidth = 520;
    const minHeight = Math.max(1, Math.round(minWidth / pageSize.aspectRatio));
    const maxHeight = Math.max(1, Math.round(maxWidth / pageSize.aspectRatio));

    for (let pageNumber = 1; pageNumber <= book.numPages; pageNumber += 1) {
      const page = document.createElement('div');
      page.className = 'page';
      if (pageNumber === 1 || pageNumber === book.numPages) {
        page.dataset.density = 'hard';
      }

      let canvas = cachedCanvases.get(pageNumber);
      if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.setAttribute('aria-label', `Page ${pageNumber} of ${book.numPages}`);
        cachedCanvases.set(pageNumber, canvas);
      }
      page.appendChild(canvas);
      pageNodes.push(page);
      pageCanvases.set(pageNumber, canvas);
    }

    container.replaceChildren(...pageNodes);

    const renderPage = async pageNumber => {
      if (
        !active ||
        renderedPages.has(pageNumber) ||
        renderingPages.has(pageNumber)
      ) {
        return;
      }

      const canvas = pageCanvases.get(pageNumber);
      if (!canvas) return;

      const renderToken = {};
      renderingPages.set(pageNumber, renderToken);
      let renderTask;

      try {
        const pdfPage = await book.getPage(pageNumber);
        if (!active || renderingPages.get(pageNumber) !== renderToken) return;

        const viewport = pdfPage.getViewport({ scale: 1 });
        const outputScale = Math.min(window.devicePixelRatio || 1, 2);
        const context = canvas.getContext('2d', { alpha: false });
        if (!context) throw new Error(`Could not create a canvas context for page ${pageNumber}.`);

        canvas.width = Math.ceil(viewport.width * outputScale);
        canvas.height = Math.ceil(viewport.height * outputScale);

        renderTask = pdfPage.render({
          canvasContext: context,
          viewport,
          transform: outputScale === 1 ? undefined : [outputScale, 0, 0, outputScale, 0, 0],
        });
        renderTasks.set(pageNumber, { task: renderTask, token: renderToken });
        await renderTask.promise;

        if (active && renderingPages.get(pageNumber) === renderToken) {
          renderedPages.add(pageNumber);
        }
      } catch (error) {
        if (active && !isRenderCancelled(error)) {
          console.error(`Unable to render poem book page ${pageNumber}.`, error);
          setRenderError('Some pages could not be displayed. Try opening the PDF directly.');
        }
      } finally {
        if (renderingPages.get(pageNumber) === renderToken) {
          renderingPages.delete(pageNumber);
          if (renderTasks.get(pageNumber)?.token === renderToken) {
            renderTasks.delete(pageNumber);
          }
        }
      }
    };

    const renderWindow = currentIndex => {
      const firstPage = Math.max(1, currentIndex + 1 - 2);
      const lastPage = Math.min(book.numPages, currentIndex + 1 + 3);
      for (let pageNumber = firstPage; pageNumber <= lastPage; pageNumber += 1) {
        void renderPage(pageNumber);
      }
    };

    const flipbook = new PageFlip(container, {
      width: maxWidth,
      height: maxHeight,
      size: 'stretch',
      minWidth,
      maxWidth,
      minHeight,
      maxHeight,
      usePortrait: true,
      showCover: true,
      drawShadow: true,
      maxShadowOpacity: 0.5,
      flippingTime: prefersReducedMotion ? 1 : 800,
      mobileScrollSupport: true,
    });

    flipbookRef.current = flipbook;
    setBookOrientation(container.clientWidth < minWidth * 2 ? 'portrait' : 'landscape');
    flipbook.on('changeOrientation', event => {
      setBookOrientation(event.data);
    });
    const stopRenderLoop = loadFlipbookPages(flipbook, pageNodes);
    flipbook.on('flip', event => {
      const pageIndex = Number(event.data);
      setCurrentPage(pageIndex);
      setHasFlipped(true);
      renderWindow(pageIndex);
    });
    for (let pageNumber = 1; pageNumber <= Math.min(INITIAL_PAGES, book.numPages); pageNumber += 1) {
      void renderPage(pageNumber);
    }

    const parent = container.parentElement;
    const nextSibling = container.nextSibling;

    return () => {
      active = false;
      for (const taskRecord of renderTasks.values()) {
        taskRecord.task.cancel();
      }
      renderTasks.clear();
      renderingPages.clear();

      stopRenderLoop();
      flipbook.destroy();
      if (parent) {
        if (nextSibling?.parentNode === parent) parent.insertBefore(container, nextSibling);
        else parent.appendChild(container);
        container.replaceChildren();
      }
    };
  }, [book, pageSize, prefersReducedMotion]);

  useEffect(() => {
    flipbookRef.current?.update();
  }, [bookOrientation]);

  const pageCount = book?.numPages ?? 0;
  const handleBookKeyDown = event => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      flipbookRef.current?.flipPrev();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      flipbookRef.current?.flipNext();
    }
  };
  const handleFullscreen = async () => {
    const viewer = viewerRef.current;
    if (!viewer || !fullscreenSupported) return;

    try {
      if (document.fullscreenElement === viewer) await document.exitFullscreen();
      else await viewer.requestFullscreen();
    } catch (error) {
      console.error('Unable to toggle poem book fullscreen mode.', error);
      setRenderError('Fullscreen mode could not be started. You can continue reading here.');
    }
  };
  const pageAspectRatio = pageSize?.aspectRatio ?? DEFAULT_PAGE_ASPECT_RATIO;
  const pageStyle = {
    '--book-aspect-ratio': String(pageAspectRatio * (bookOrientation === 'portrait' ? 1 : 2)),
  };

  return (
    <SectionWrapper
      id="poem-book"
      className="bg-surface"
      ariaLabel="Tamil poetry book"
    >
      <SectionHeading id="poem-book" label={poemBook.label} title={poemBook.heading} />

      <div className="grid gap-8 xl:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] xl:items-center">
        <div className="max-w-xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            {poemBook.bookTitle}
          </p>
          <p className="mb-4 text-base leading-relaxed text-ink-muted">
            {poemBook.description}
          </p>
          <p className="mb-6 text-sm text-ink-muted">{poemBook.credits}</p>
        </div>

        <div className="poem-book__viewer min-w-0" ref={viewerRef}>
          {loadError ? (
            <div className="poem-book__message" role="alert">
              <p>{loadError}</p>
              <a href={poemBook.href} target="_blank" rel="noopener noreferrer">
                Open the PDF
              </a>
            </div>
          ) : !book || !pageSize ? (
            <>
              <div
                className="poem-book__skeleton"
                style={pageStyle}
                role="status"
                aria-label="Loading poem book"
              >
                <div className="poem-book__skeleton-page" />
                <p>Loading your book...</p>
              </div>
              <div className="poem-book__loading-controls" aria-hidden="true" />
              <p className="poem-book__hint">Swipe or drag to turn pages</p>
            </>
          ) : (
            <>
              {renderError && (
                <p className="poem-book__render-error" role="alert">
                  {renderError}
                </p>
              )}
              <div
                className="poem-book__flipbook-shell"
                style={pageStyle}
              >
                <div
                  className="poem-book__flipbook"
                  ref={bookElementRef}
                  role="group"
                  aria-label="Interactive poem book. Use the left and right arrow keys to turn pages."
                  tabIndex={0}
                  onKeyDown={handleBookKeyDown}
                />
              </div>
              <div className="poem-book__toolbar">
                <div className="poem-book__page-controls">
                  <button
                    type="button"
                    aria-label="Previous page"
                    disabled={currentPage === 0}
                    onClick={() => flipbookRef.current?.flipPrev()}
                  >
                    Previous
                  </button>
                  <p className="poem-book__page-count" aria-live="polite">
                    Page {Math.min(currentPage + 1, pageCount)} of {pageCount}
                  </p>
                  <button
                    type="button"
                    aria-label="Next page"
                    disabled={currentPage >= pageCount - 1}
                    onClick={() => flipbookRef.current?.flipNext()}
                  >
                    Next
                  </button>
                </div>
                <div className="poem-book__actions">
                  <a
                    href={poemBook.href}
                    download
                    aria-label="Download poem book PDF"
                  >
                    <FileDown size={16} aria-hidden />
                    Download PDF
                  </a>
                  {fullscreenSupported && (
                    <button
                      type="button"
                      aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
                      onClick={handleFullscreen}
                    >
                      {isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                    </button>
                  )}
                </div>
              </div>
              {!hasFlipped && (
                <p className="poem-book__hint">Swipe or drag to turn pages</p>
              )}
            </>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
