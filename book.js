import * as pdfjsLib from './assets/pdf.min.mjs';

const pdfPath = 'assets/poem-book.pdf';
const currentLeftCanvas = document.getElementById('currentLeftPageCanvas');
const currentRightCanvas = document.getElementById('currentRightPageCanvas');
const incomingLeftCanvas = document.getElementById('incomingLeftPageCanvas');
const incomingRightCanvas = document.getElementById('incomingRightPageCanvas');
const stage = document.getElementById('bookStage');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const pageIndicator = document.getElementById('pageIndicator');
const bookLoadingState = document.getElementById('bookLoadingState');

let pdfDocument = null;
let currentLeftPage = 1;
let isAnimating = false;

function getRightPageNumber(leftPageNumber) {
  return Math.min(leftPageNumber + 1, pdfDocument?.numPages || leftPageNumber);
}

function updateControls() {
  if (!pdfDocument) return;

  const rightPage = getRightPageNumber(currentLeftPage);
  pageIndicator.textContent = `Pages ${currentLeftPage}-${rightPage} of ${pdfDocument.numPages}`;
  prevPageBtn.disabled = currentLeftPage <= 1 || isAnimating;
  nextPageBtn.disabled = rightPage >= pdfDocument.numPages || isAnimating;
}

async function renderPdfPage(pageNumber, canvas) {
  const context = canvas.getContext('2d');

  if (!pdfDocument || pageNumber > pdfDocument.numPages) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  const page = await pdfDocument.getPage(pageNumber);
  const container = canvas.parentElement;
  const availableWidth = container.clientWidth;
  const availableHeight = container.clientHeight;
  const baseViewport = page.getViewport({ scale: 1 });
  const scale = Math.min(availableWidth / baseViewport.width, availableHeight / baseViewport.height);
  const viewport = page.getViewport({ scale });
  const pixelRatio = window.devicePixelRatio || 1;

  canvas.width = Math.floor(viewport.width * pixelRatio);
  canvas.height = Math.floor(viewport.height * pixelRatio);
  canvas.style.width = `${viewport.width}px`;
  canvas.style.height = `${viewport.height}px`;

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.clearRect(0, 0, viewport.width, viewport.height);
  await page.render({ canvasContext: context, viewport }).promise;
}

async function renderSpread(leftPageNumber, leftCanvas, rightCanvas) {
  await Promise.all([
    renderPdfPage(leftPageNumber, leftCanvas),
    renderPdfPage(getRightPageNumber(leftPageNumber), rightCanvas)
  ]);
}

async function goToSpread(targetLeftPage, direction) {
  if (
    !pdfDocument ||
    isAnimating ||
    targetLeftPage < 1 ||
    targetLeftPage > pdfDocument.numPages ||
    targetLeftPage === currentLeftPage
  ) {
    return;
  }

  isAnimating = true;
  bookLoadingState.textContent = 'Turning pages...';
  updateControls();

  try {
    await renderSpread(targetLeftPage, incomingLeftCanvas, incomingRightCanvas);
  } catch (error) {
    bookLoadingState.textContent = 'Unable to render those pages';
    isAnimating = false;
    updateControls();
    console.error(error);
    return;
  }

  stage.classList.remove('slide-next', 'slide-prev');
  void stage.offsetWidth;
  stage.classList.add(direction === 'next' ? 'slide-next' : 'slide-prev');

  window.setTimeout(async () => {
    await renderSpread(targetLeftPage, currentLeftCanvas, currentRightCanvas);
    incomingLeftCanvas.width = 0;
    incomingRightCanvas.width = 0;
    incomingLeftCanvas.height = 0;
    incomingRightCanvas.height = 0;
    currentLeftPage = targetLeftPage;
    isAnimating = false;
    stage.classList.remove('slide-next', 'slide-prev');
    bookLoadingState.textContent = 'Use Previous / Next to continue reading';
    updateControls();
  }, 560);
}

async function initializeBook() {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = './assets/pdf.worker.min.mjs';

    bookLoadingState.textContent = 'Loading book...';
    pdfDocument = await pdfjsLib.getDocument(pdfPath).promise;
    await renderSpread(currentLeftPage, currentLeftCanvas, currentRightCanvas);
    bookLoadingState.textContent = 'Use Previous / Next to continue reading';
    updateControls();
  } catch (error) {
    bookLoadingState.textContent = 'Unable to load the PDF here. Use Open Full Screen.';
    console.error(error);
  }
}

if (prevPageBtn) {
  prevPageBtn.addEventListener('click', () => goToSpread(currentLeftPage - 2, 'prev'));
}

if (nextPageBtn) {
  nextPageBtn.addEventListener('click', () => goToSpread(currentLeftPage + 2, 'next'));
}

window.addEventListener('resize', () => {
  if (!pdfDocument || isAnimating) return;

  window.clearTimeout(window.__bookResizeTimer);
  window.__bookResizeTimer = window.setTimeout(() => {
    renderSpread(currentLeftPage, currentLeftCanvas, currentRightCanvas);
  }, 160);
});

initializeBook();
