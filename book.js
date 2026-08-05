import * as pdfjsLib from './assets/pdf.min.mjs';

const pdfPath = 'assets/poem-book.pdf';

// Canvases
const currentLeftCanvas = document.getElementById('currentLeftPageCanvas');
const currentRightCanvas = document.getElementById('currentRightPageCanvas');
const incomingLeftCanvas = document.getElementById('incomingLeftPageCanvas');
const incomingRightCanvas = document.getElementById('incomingRightPageCanvas');

// Elements
const stage = document.getElementById('bookStage');
const prevPageBtn = document.getElementById('prevPageBtn');
const nextPageBtn = document.getElementById('nextPageBtn');
const pageIndicator = document.getElementById('pageIndicator');
const bookLoadingState = document.getElementById('bookLoadingState');
const viewModeToggle = document.getElementById('viewModeToggle');
const pageSlider = document.getElementById('pageSlider');
const jumpToPageInput = document.getElementById('jumpToPageInput');
const totalPagesText = document.getElementById('totalPagesText');

const zoomInBtn = document.getElementById('zoomInBtn');
const zoomOutBtn = document.getElementById('zoomOutBtn');
const zoomResetBtn = document.getElementById('zoomResetBtn');
const zoomPercent = document.getElementById('zoomPercent');

const firstPageBtn = document.getElementById('firstPageBtn');
const lastPageBtn = document.getElementById('lastPageBtn');

// State
let pdfDocument = null;
let currentLeftPage = 1;
let isAnimating = false;
let viewMode = 'double'; // 'single' or 'double'
let zoomScale = 1.0;

// Swipe tracking
let touchstartX = 0;
let touchendX = 0;
let touchstartY = 0;
let touchendY = 0;

function getRightPageNumber(leftPageNumber) {
  if (!pdfDocument) return leftPageNumber;
  return Math.min(leftPageNumber + 1, pdfDocument.numPages);
}

function updateControls() {
  if (!pdfDocument) return;

  const totalPages = pdfDocument.numPages;
  totalPagesText.textContent = totalPages;
  pageSlider.max = totalPages;
  pageSlider.value = currentLeftPage;
  jumpToPageInput.value = currentLeftPage;
  jumpToPageInput.max = totalPages;

  if (viewMode === 'single') {
    pageIndicator.textContent = `Page ${currentLeftPage} of ${totalPages}`;
    prevPageBtn.disabled = currentLeftPage <= 1 || isAnimating;
    nextPageBtn.disabled = currentLeftPage >= totalPages || isAnimating;
  } else {
    const rightPage = getRightPageNumber(currentLeftPage);
    if (currentLeftPage === rightPage) {
      pageIndicator.textContent = `Page ${currentLeftPage} of ${totalPages}`;
    } else {
      pageIndicator.textContent = `Pages ${currentLeftPage}-${rightPage} of ${totalPages}`;
    }
    prevPageBtn.disabled = currentLeftPage <= 1 || isAnimating;
    nextPageBtn.disabled = rightPage >= totalPages || isAnimating;
  }

  // Update button icons
  if (viewModeToggle) {
    const icon = viewModeToggle.querySelector('i');
    if (icon) {
      icon.className = viewMode === 'single' ? 'fas fa-file' : 'fas fa-book-open';
    }
  }

  zoomPercent.textContent = `${Math.round(zoomScale * 100)}%`;
}

// Set viewMode dynamically based on viewport width
function autoDetectViewMode() {
  const isMobileViewport = window.innerWidth < 768;
  const newMode = isMobileViewport ? 'single' : 'double';
  
  if (newMode !== viewMode) {
    setViewMode(newMode);
  }
}

function setViewMode(newMode) {
  viewMode = newMode;
  document.body.classList.remove('view-single', 'view-double');
  document.body.classList.add(`view-${viewMode}`);
  
  if (viewMode === 'double' && currentLeftPage % 2 === 0) {
    // Spread mode requires starting on an odd page
    currentLeftPage = Math.max(1, currentLeftPage - 1);
  }
  
  updateControls();
  if (pdfDocument && !isAnimating) {
    renderSpread(currentLeftPage, currentLeftCanvas, currentRightCanvas);
  }
}

async function renderPdfPage(pageNumber, canvas) {
  const context = canvas.getContext('2d');

  if (!pdfDocument || pageNumber > pdfDocument.numPages || pageNumber < 1) {
    canvas.width = 0;
    canvas.height = 0;
    context.clearRect(0, 0, canvas.width, canvas.height);
    return;
  }

  const page = await pdfDocument.getPage(pageNumber);
  const container = canvas.parentElement;
  
  // Available width and height of page container
  const availableWidth = container.clientWidth;
  const availableHeight = container.clientHeight;
  const baseViewport = page.getViewport({ scale: 1 });
  
  // Calculate scale based on container size
  let scale = Math.min(availableWidth / baseViewport.width, availableHeight / baseViewport.height);
  scale = scale * zoomScale; // Apply zoom
  
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
  if (viewMode === 'single') {
    // In single page mode, right canvas is hidden by CSS and set to 0 size
    const rightContext = rightCanvas.getContext('2d');
    rightCanvas.width = 0;
    rightCanvas.height = 0;
    rightContext.clearRect(0, 0, 0, 0);
    
    await renderPdfPage(leftPageNumber, leftCanvas);
  } else {
    await Promise.all([
      renderPdfPage(leftPageNumber, leftCanvas),
      renderPdfPage(getRightPageNumber(leftPageNumber), rightCanvas)
    ]);
  }
}

async function goToSpread(targetLeftPage, direction) {
  if (!pdfDocument || isAnimating) return;

  const totalPages = pdfDocument.numPages;
  
  // Validate target page boundaries
  if (targetLeftPage < 1 || targetLeftPage > totalPages || targetLeftPage === currentLeftPage) {
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

  // Determine transition direction if not explicitly provided
  if (!direction) {
    direction = targetLeftPage > currentLeftPage ? 'next' : 'prev';
  }

  stage.classList.remove('slide-next', 'slide-prev');
  void stage.offsetWidth; // Trigger reflow
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
    bookLoadingState.textContent = 'Use navigation to continue reading';
    updateControls();
  }, 560);
}

function handleNextPage() {
  if (isAnimating) return;
  const step = viewMode === 'single' ? 1 : 2;
  goToSpread(currentLeftPage + step, 'next');
}

function handlePrevPage() {
  if (isAnimating) return;
  const step = viewMode === 'single' ? 1 : 2;
  goToSpread(currentLeftPage - step, 'prev');
}

// Initializer
async function initializeBook() {
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = './assets/pdf.worker.min.mjs';

    bookLoadingState.textContent = 'Loading book...';
    
    // Auto detect initial view mode based on screen width
    autoDetectViewMode();

    pdfDocument = await pdfjsLib.getDocument(pdfPath).promise;
    await renderSpread(currentLeftPage, currentLeftCanvas, currentRightCanvas);
    bookLoadingState.textContent = 'Use navigation to continue reading';
    updateControls();
  } catch (error) {
    bookLoadingState.textContent = 'Unable to load the PDF. Use Open Full Screen.';
    console.error(error);
  }
}

// Event Listeners
if (prevPageBtn) {
  prevPageBtn.addEventListener('click', handlePrevPage);
}

if (nextPageBtn) {
  nextPageBtn.addEventListener('click', handleNextPage);
}

// View Mode Toggle
if (viewModeToggle) {
  viewModeToggle.addEventListener('click', () => {
    const targetMode = viewMode === 'single' ? 'double' : 'single';
    setViewMode(targetMode);
  });
}

// Slider
if (pageSlider) {
  pageSlider.addEventListener('change', (e) => {
    let targetVal = parseInt(e.target.value, 10);
    if (viewMode === 'double' && targetVal % 2 === 0) {
      targetVal = Math.max(1, targetVal - 1);
    }
    goToSpread(targetVal);
  });
}

// Jump input
if (jumpToPageInput) {
  jumpToPageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      let targetVal = parseInt(jumpToPageInput.value, 10);
      if (isNaN(targetVal) || targetVal < 1) targetVal = 1;
      if (targetVal > pdfDocument?.numPages) targetVal = pdfDocument.numPages;
      
      if (viewMode === 'double' && targetVal % 2 === 0) {
        targetVal = Math.max(1, targetVal - 1);
      }
      goToSpread(targetVal);
      jumpToPageInput.blur();
    }
  });
}

// Zoom controls
if (zoomInBtn) {
  zoomInBtn.addEventListener('click', () => {
    if (zoomScale < 3.0) {
      zoomScale = parseFloat((zoomScale + 0.25).toFixed(2));
      updateControls();
      renderSpread(currentLeftPage, currentLeftCanvas, currentRightCanvas);
    }
  });
}

if (zoomOutBtn) {
  zoomOutBtn.addEventListener('click', () => {
    if (zoomScale > 0.5) {
      zoomScale = parseFloat((zoomScale - 0.25).toFixed(2));
      updateControls();
      renderSpread(currentLeftPage, currentLeftCanvas, currentRightCanvas);
    }
  });
}

if (zoomResetBtn) {
  zoomResetBtn.addEventListener('click', () => {
    if (zoomScale !== 1.0) {
      zoomScale = 1.0;
      updateControls();
      renderSpread(currentLeftPage, currentLeftCanvas, currentRightCanvas);
    }
  });
}

// Absolute Navigation
if (firstPageBtn) {
  firstPageBtn.addEventListener('click', () => goToSpread(1));
}

if (lastPageBtn) {
  lastPageBtn.addEventListener('click', () => {
    if (!pdfDocument) return;
    let target = pdfDocument.numPages;
    if (viewMode === 'double' && target % 2 === 0) {
      target = target - 1;
    }
    goToSpread(target);
  });
}

// Keyboard shortcuts
window.addEventListener('keydown', (e) => {
  if (document.activeElement.tagName === 'INPUT') return;
  
  if (e.key === 'ArrowLeft') {
    handlePrevPage();
  } else if (e.key === 'ArrowRight') {
    handleNextPage();
  } else if (e.key === '+' || e.key === '=') {
    zoomInBtn.click();
  } else if (e.key === '-') {
    zoomOutBtn.click();
  } else if (e.key === '0') {
    zoomResetBtn.click();
  }
});

// Resize listener
window.addEventListener('resize', () => {
  if (!pdfDocument || isAnimating) return;

  window.clearTimeout(window.__bookResizeTimer);
  window.__bookResizeTimer = window.setTimeout(() => {
    autoDetectViewMode();
    renderSpread(currentLeftPage, currentLeftCanvas, currentRightCanvas);
  }, 200);
});

// Touch swipe logic
function handleGesture() {
  const diffX = touchstartX - touchendX;
  const diffY = touchstartY - touchendY;
  
  // Swipe horizontally if motion is mostly horizontal
  if (Math.abs(diffX) > Math.abs(diffY)) {
    if (Math.abs(diffX) > 60) {
      if (diffX > 0) {
        handleNextPage(); // swipe left -> next page
      } else {
        handlePrevPage(); // swipe right -> prev page
      }
    }
  }
}

stage.addEventListener('touchstart', (e) => {
  touchstartX = e.changedTouches[0].screenX;
  touchstartY = e.changedTouches[0].screenY;
}, { passive: true });

stage.addEventListener('touchend', (e) => {
  touchendX = e.changedTouches[0].screenX;
  touchendY = e.changedTouches[0].screenY;
  handleGesture();
}, { passive: true });

// Start
initializeBook();
