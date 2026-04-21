const categories = [
  { id: "all", label: "All Algorithms" },
  { id: "searching-sorting", label: "Searching & Sorting" },
  { id: "greedy", label: "Greedy" },
  { id: "dynamic-programming", label: "Dynamic Programming" },
  { id: "backtracking", label: "Backtracking" },
  { id: "graph", label: "Graph Algorithms" },
];

const graphTemplate = {
  nodes: [
    { id: "A", x: 16, y: 22 },
    { id: "B", x: 42, y: 12 },
    { id: "C", x: 72, y: 20 },
    { id: "D", x: 24, y: 64 },
    { id: "E", x: 52, y: 52 },
    { id: "F", x: 80, y: 66 },
  ],
  edges: [
    { from: "A", to: "B", weight: 4 },
    { from: "A", to: "D", weight: 2 },
    { from: "B", to: "C", weight: 3 },
    { from: "B", to: "E", weight: 1 },
    { from: "C", to: "F", weight: 5 },
    { from: "D", to: "E", weight: 6 },
    { from: "E", to: "F", weight: 7 },
    { from: "C", to: "E", weight: 4 },
    { from: "D", to: "F", weight: 8 },
  ],
};

const defaultGraphValues = {
  nodes: graphTemplate.nodes.map((node) => node.id).join(","),
  edges: graphTemplate.edges.map((edge) => `${edge.from},${edge.to},${edge.weight}`).join("\n"),
};

const algorithms = [
  createArrayAlgorithm("linear-search", "Linear Search", "searching-sorting", "Scan each element until the target is found or the array ends.", "search", runLinearSearch),
  createArrayAlgorithm("binary-search", "Binary Search", "searching-sorting", "Repeatedly split a sorted array to find the target in logarithmic time.", "search", runBinarySearch),
  createArrayAlgorithm("merge-sort", "Merge Sort", "searching-sorting", "Divide the array into halves, recursively sort them, and merge back.", "sort", runMergeSort),
  createArrayAlgorithm("quick-sort", "Quick Sort", "searching-sorting", "Partition around a pivot and recursively sort the smaller subarrays.", "sort", runQuickSort),
  createArrayAlgorithm("heap-sort", "Heap Sort", "searching-sorting", "Build a max heap, then repeatedly extract the largest element.", "sort", runHeapSort),
  {
    id: "fractional-knapsack",
    name: "Fractional Knapsack",
    category: "greedy",
    categoryLabel: "Greedy Algorithms",
    visualType: "table",
    description: "Choose items by value density and allow fractions to maximize total value.",
    complexity: "Time: O(n log n) | Space: O(n)",
    inputs: [
      { id: "capacity", label: "Capacity", type: "number", value: "50" },
      {
        id: "items",
        label: "Items (value,weight per line)",
        type: "textarea",
        value: "60,10\n100,20\n120,30",
      },
    ],
    parseInput: (values) => ({
      capacity: Number(values.capacity),
      items: parsePairLines(values.items, ["value", "weight"]),
    }),
    randomize: () => ({
      capacity: String(randomInt(30, 70)),
      items: Array.from({ length: 5 }, () => `${randomInt(30, 140)},${randomInt(5, 25)}`).join("\n"),
    }),
    execute: runFractionalKnapsack,
  },
  {
    id: "huffman-coding",
    name: "Huffman Coding",
    category: "greedy",
    categoryLabel: "Greedy Algorithms",
    visualType: "tree",
    description: "Construct an optimal prefix code by greedily merging the lowest-frequency nodes.",
    complexity: "Time: O(n log n) | Space: O(n)",
    inputs: [
      { id: "symbols", label: "Symbol Frequencies (char:freq)", type: "textarea", value: "a:5\nb:9\nc:12\nd:13\ne:16\nf:45" },
    ],
    parseInput: (values) => ({
      symbols: values.symbols
        .split(/\n+/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [symbol, freq] = line.split(":");
          return { symbol: symbol.trim(), freq: Number(freq) };
        }),
    }),
    randomize: () => ({
      symbols: ["a", "b", "c", "d", "e", "f"]
        .slice(0, randomInt(4, 6))
        .map((symbol) => `${symbol}:${randomInt(3, 40)}`)
        .join("\n"),
    }),
    execute: runHuffmanCoding,
  },
  {
    id: "zero-one-knapsack",
    name: "0/1 Knapsack",
    category: "dynamic-programming",
    categoryLabel: "Dynamic Programming",
    visualType: "dp",
    description: "Fill a DP table to decide whether to take or skip each item for maximum value.",
    complexity: "Time: O(nW) | Space: O(nW)",
    inputs: [
      { id: "capacity", label: "Capacity", type: "number", value: "7" },
      { id: "weights", label: "Weights", type: "text", value: "1,3,4,5" },
      { id: "values", label: "Values", type: "text", value: "1,4,5,7" },
    ],
    parseInput: (values) => ({
      capacity: Number(values.capacity),
      weights: parseNumberList(values.weights),
      values: parseNumberList(values.values),
    }),
    randomize: () => {
      const length = 5;
      return {
        capacity: String(randomInt(8, 14)),
        weights: Array.from({ length }, () => randomInt(1, 6)).join(","),
        values: Array.from({ length }, () => randomInt(2, 12)).join(","),
      };
    },
    execute: runZeroOneKnapsack,
  },
  {
    id: "lcs",
    name: "Longest Common Subsequence",
    category: "dynamic-programming",
    categoryLabel: "Dynamic Programming",
    visualType: "dp",
    description: "Compare two strings and fill a DP grid to derive the longest shared subsequence.",
    complexity: "Time: O(mn) | Space: O(mn)",
    inputs: [
      { id: "first", label: "First String", type: "text", value: "ABCBDAB" },
      { id: "second", label: "Second String", type: "text", value: "BDCABA" },
    ],
    parseInput: (values) => ({ first: values.first.trim(), second: values.second.trim() }),
    randomize: () => ({
      first: randomWord(6),
      second: randomWord(5),
    }),
    execute: runLcs,
  },
  {
    id: "matrix-chain",
    name: "Matrix Chain Multiplication",
    category: "dynamic-programming",
    categoryLabel: "Dynamic Programming",
    visualType: "dp",
    description: "Find the multiplication order that minimizes scalar operations for a matrix chain.",
    complexity: "Time: O(n^3) | Space: O(n^2)",
    inputs: [
      { id: "dimensions", label: "Dimensions", type: "text", value: "40,20,30,10,30" },
    ],
    parseInput: (values) => ({ dimensions: parseNumberList(values.dimensions) }),
    randomize: () => ({
      dimensions: Array.from({ length: 5 }, () => randomInt(10, 60)).join(","),
    }),
    execute: runMatrixChain,
  },
  {
    id: "n-queens",
    name: "N-Queens",
    category: "backtracking",
    categoryLabel: "Backtracking",
    visualType: "board",
    description: "Place queens row by row while backtracking whenever a conflict appears.",
    complexity: "Time: O(N!) | Space: O(N)",
    inputs: [{ id: "size", label: "Board Size", type: "number", value: "4" }],
    parseInput: (values) => ({ size: Number(values.size) }),
    randomize: () => ({ size: String(randomInt(4, 6)) }),
    execute: runNQueens,
  },
  createGraphAlgorithm("bfs", "Breadth-First Search", "Traverse layer by layer from the chosen start node.", runBfs),
  createGraphAlgorithm("dfs", "Depth-First Search", "Explore as deep as possible before backtracking.", runDfs),
  createGraphAlgorithm("prims", "Prim's Algorithm", "Grow a minimum spanning tree by adding the cheapest edge from the visited set.", runPrims),
  createGraphAlgorithm("kruskals", "Kruskal's Algorithm", "Sort edges and keep adding the lightest non-cycling edge to build the MST.", runKruskals),
];

const state = {
  theme: localStorage.getItem("nexus-theme") || "dark",
  search: "",
  activeCategory: "all",
  activeAlgorithmId: algorithms[0].id,
  run: null,
  currentStepIndex: 0,
  autoPlayId: null,
  speed: 850,
};

const els = {
  categoryNav: document.querySelector("#category-nav"),
  algorithmGrid: document.querySelector("#algorithm-grid"),
  title: document.querySelector("#algorithm-title"),
  category: document.querySelector("#algorithm-category"),
  description: document.querySelector("#algorithm-description"),
  inputForm: document.querySelector("#input-form"),
  finalOutput: document.querySelector("#final-output"),
  complexityOutput: document.querySelector("#complexity-output"),
  stepCounter: document.querySelector("#step-counter"),
  currentStepBox: document.querySelector("#current-step-box"),
  currentStep: document.querySelector("#current-step"),
  runProgress: document.querySelector("#run-progress"),
  playbackStatus: document.querySelector("#playback-status"),
  visualizationPanel: document.querySelector("#visualization-panel"),
  themeToggle: document.querySelector("#theme-toggle"),
  runButton: document.querySelector("#run-algorithm"),
  randomizeButton: document.querySelector("#randomize-input"),
  playPauseButton: document.querySelector("#play-pause"),
  nextStepButton: document.querySelector("#next-step"),
  prevStepButton: document.querySelector("#prev-step"),
  resetRunButton: document.querySelector("#reset-run"),
  resetWorkspaceButton: document.querySelector("#reset-workspace"),
  randomAlgorithmButton: document.querySelector("#random-algorithm"),
  searchInput: document.querySelector("#search-input"),
  speedSelect: document.querySelector("#speed-select"),
  algorithmCount: document.querySelector("#algorithm-count"),
};

function init() {
  document.body.classList.toggle("dark", state.theme === "dark");
  renderCategories();
  renderAlgorithmGrid();
  renderWorkspace();
  bindEvents();
}

function bindEvents() {
  els.themeToggle.addEventListener("click", () => {
    state.theme = state.theme === "dark" ? "light" : "dark";
    localStorage.setItem("nexus-theme", state.theme);
    document.body.classList.toggle("dark", state.theme === "dark");
  });

  els.searchInput.addEventListener("input", (event) => {
    state.search = event.target.value.toLowerCase();
    renderAlgorithmGrid();
  });

  els.speedSelect.addEventListener("change", (event) => {
    state.speed = Number(event.target.value);
    if (state.autoPlayId) {
      startAutoPlay();
    }
  });

  els.runButton.addEventListener("click", runActiveAlgorithm);
  els.randomizeButton.addEventListener("click", randomizeInputs);
  els.playPauseButton.addEventListener("click", toggleAutoPlay);
  els.nextStepButton.addEventListener("click", () => shiftStep(1));
  els.prevStepButton.addEventListener("click", () => shiftStep(-1));
  els.resetRunButton.addEventListener("click", resetCurrentRun);
  els.resetWorkspaceButton.addEventListener("click", resetWorkspace);
  els.randomAlgorithmButton.addEventListener("click", selectRandomAlgorithm);
}

function renderCategories() {
  els.categoryNav.innerHTML = "";
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = category.label;
    button.className = category.id === state.activeCategory ? "active" : "";
    button.addEventListener("click", () => {
      state.activeCategory = category.id;
      renderCategories();
      renderAlgorithmGrid();
    });
    els.categoryNav.appendChild(button);
  });
}

function renderAlgorithmGrid() {
  const filtered = algorithms.filter((algorithm) => {
    const byCategory = state.activeCategory === "all" || algorithm.category === state.activeCategory;
    const haystack = `${algorithm.name} ${algorithm.categoryLabel} ${algorithm.description}`.toLowerCase();
    return byCategory && haystack.includes(state.search);
  });

  els.algorithmCount.textContent = String(algorithms.length);
  els.algorithmGrid.innerHTML = "";

  if (!filtered.length) {
    const empty = document.createElement("article");
    empty.className = "algorithm-card";
    empty.innerHTML = "<h4>No matches</h4><p>Try a different keyword or category.</p>";
    els.algorithmGrid.appendChild(empty);
    return;
  }

  filtered.forEach((algorithm) => {
    const card = document.createElement("article");
    card.className = `algorithm-card ${algorithm.id === state.activeAlgorithmId ? "active" : ""}`;
    card.innerHTML = `
      <div class="algorithm-card__top">
        <div>
          <p class="eyebrow">${algorithm.categoryLabel}</p>
          <h4>${algorithm.name}</h4>
        </div>
        <span class="pill">${algorithm.visualType.toUpperCase()}</span>
      </div>
      <p>${algorithm.description}</p>
    `;
    card.addEventListener("click", () => {
      state.activeAlgorithmId = algorithm.id;
      stopAutoPlay();
      state.run = null;
      state.currentStepIndex = 0;
      renderAlgorithmGrid();
      renderWorkspace();
    });
    els.algorithmGrid.appendChild(card);
  });
}

function renderWorkspace() {
  const algorithm = getActiveAlgorithm();
  els.title.textContent = algorithm ? algorithm.name : "Interactive Workspace";
  els.category.textContent = algorithm ? algorithm.categoryLabel : "Select an algorithm";
  els.description.textContent = algorithm ? algorithm.description : "Select an algorithm.";
  els.complexityOutput.textContent = algorithm ? algorithm.complexity : "Choose an algorithm.";
  renderInputForm();
  renderRunState();
}

function renderInputForm() {
  const algorithm = getActiveAlgorithm();
  els.inputForm.innerHTML = "";
  algorithm.inputs.forEach((input) => {
    const wrapper = document.createElement("div");
    wrapper.className = "field-group";
    const id = `field-${input.id}`;
    wrapper.innerHTML = `<label for="${id}">${input.label}</label>`;
    let field;
    if (input.type === "textarea") {
      field = document.createElement("textarea");
      field.rows = input.id === "edges" ? 8 : 5;
    } else {
      field = document.createElement("input");
      field.type = input.type;
    }
    field.id = id;
    field.name = input.id;
    field.value = input.value;
    wrapper.appendChild(field);
    if (input.help) {
      const help = document.createElement("div");
      help.className = "field-help";
      help.textContent = input.help;
      wrapper.appendChild(help);
    }
    els.inputForm.appendChild(wrapper);
  });
}

function renderRunState() {
  const algorithm = getActiveAlgorithm();
  if (!state.run) {
    els.finalOutput.textContent = "No run yet.";
    els.stepCounter.textContent = "0 / 0";
    setInsightMode(true);
    els.currentStep.textContent = "Run an algorithm to see the active state.";
    els.runProgress.textContent = "Waiting for execution.";
    els.playbackStatus.textContent = "Manual mode.";
    els.visualizationPanel.className = "visualization-panel placeholder-panel";
    els.visualizationPanel.textContent = `${algorithm.name} is ready. Configure input and press Run.`;
    updatePlayButton();
    return;
  }

  const step = state.run.steps[state.currentStepIndex] || state.run.steps[state.run.steps.length - 1];
  const showDetailedInsights = shouldShowDetailedInsights(algorithm, state.run);
  els.finalOutput.textContent = state.run.finalOutput;
  els.stepCounter.textContent = showDetailedInsights ? `${state.currentStepIndex + 1} / ${state.run.steps.length}` : "Visual Focus";
  setInsightMode(showDetailedInsights);
  els.currentStep.textContent = showDetailedInsights
    ? step.message
    : "Detailed per-step text is hidden for long runs. Use the large visualization and playback controls instead.";
  els.runProgress.textContent = `${Math.round(((state.currentStepIndex + 1) / state.run.steps.length) * 100)}% complete across ${state.run.steps.length} states.`;
  els.playbackStatus.textContent = state.autoPlayId ? `Auto play running at ${labelForSpeed(state.speed)} speed.` : "Manual stepping mode.";

  els.visualizationPanel.className = "visualization-panel";
  renderVisualization(algorithm.visualType, step.snapshot, algorithm);
  updatePlayButton();
}

function runActiveAlgorithm() {
  const algorithm = getActiveAlgorithm();
  try {
    const values = Object.fromEntries(new FormData(els.inputForm).entries());
    const parsed = algorithm.parseInput(values);
    state.run = algorithm.execute(parsed);
    state.currentStepIndex = 0;
    stopAutoPlay();
    renderRunState();
  } catch (error) {
    stopAutoPlay();
    state.run = null;
    state.currentStepIndex = 0;
    els.finalOutput.textContent = error.message;
    els.stepCounter.textContent = "0 / 0";
    setInsightMode(true);
    els.currentStep.textContent = "Fix the input and run the algorithm again.";
    els.runProgress.textContent = "Execution stopped.";
    els.playbackStatus.textContent = "Validation error.";
    els.visualizationPanel.className = "visualization-panel placeholder-panel";
    els.visualizationPanel.textContent = "Input validation failed.";
  }
}

function randomizeInputs() {
  const algorithm = getActiveAlgorithm();
  const values = algorithm.randomize();
  Object.entries(values).forEach(([key, value]) => {
    const field = els.inputForm.elements.namedItem(key);
    if (field) field.value = value;
  });
}

function resetCurrentRun() {
  stopAutoPlay();
  if (!state.run) return;
  state.currentStepIndex = 0;
  renderRunState();
}

function resetWorkspace() {
  stopAutoPlay();
  state.run = null;
  state.currentStepIndex = 0;
  state.search = "";
  state.activeCategory = "all";
  state.activeAlgorithmId = algorithms[0].id;
  els.searchInput.value = "";
  renderCategories();
  renderAlgorithmGrid();
  renderWorkspace();
}

function selectRandomAlgorithm() {
  const picked = algorithms[randomInt(0, algorithms.length - 1)];
  state.activeAlgorithmId = picked.id;
  state.run = null;
  state.currentStepIndex = 0;
  renderAlgorithmGrid();
  renderWorkspace();
}

function toggleAutoPlay() {
  if (!state.run) return;
  if (state.autoPlayId) {
    stopAutoPlay();
  } else {
    startAutoPlay();
  }
}

function startAutoPlay() {
  stopAutoPlay();
  state.autoPlayId = window.setInterval(() => {
    if (!state.run || state.currentStepIndex >= state.run.steps.length - 1) {
      stopAutoPlay();
      return;
    }
    state.currentStepIndex += 1;
    renderRunState();
  }, state.speed);
  updatePlayButton();
}

function stopAutoPlay() {
  if (state.autoPlayId) {
    window.clearInterval(state.autoPlayId);
    state.autoPlayId = null;
  }
  updatePlayButton();
}

function updatePlayButton() {
  els.playPauseButton.textContent = state.autoPlayId ? "Pause" : "Auto Play";
  if (state.run) {
    els.playbackStatus.textContent = state.autoPlayId ? `Auto play running at ${labelForSpeed(state.speed)} speed.` : "Manual stepping mode.";
  }
}

function setInsightMode(showDetailedInsights) {
  els.currentStepBox.classList.toggle("is-hidden", !showDetailedInsights);
  els.currentStepBox.parentElement.classList.toggle("compact", !showDetailedInsights);
}

function shiftStep(delta) {
  if (!state.run) return;
  stopAutoPlay();
  state.currentStepIndex = clamp(state.currentStepIndex + delta, 0, state.run.steps.length - 1);
  renderRunState();
}

function renderVisualization(type, snapshot) {
  switch (type) {
    case "sort":
      renderSortVisualization(snapshot);
      break;
    case "search":
      renderSearchVisualization(snapshot);
      break;
    case "table":
      renderTableVisualization(snapshot);
      break;
    case "tree":
      renderTreeVisualization(snapshot);
      break;
    case "dp":
      renderDpVisualization(snapshot);
      break;
    case "board":
      renderBoardVisualization(snapshot);
      break;
    case "graph":
      renderGraphVisualization(snapshot);
      break;
    default:
      els.visualizationPanel.textContent = "Visualization not available.";
  }
}

function renderSortVisualization(snapshot) {
  const maxValue = Math.max(...snapshot.array, 1);
  const wrap = document.createElement("div");
  wrap.className = "visual-array";
  snapshot.array.forEach((value, index) => {
    const group = document.createElement("div");
    group.className = "bar-group";
    const bar = document.createElement("div");
    const classes = ["bar"];
    if (snapshot.active?.includes(index)) classes.push("active", "compare");
    if (snapshot.sorted?.includes(index)) classes.push("done");
    if (snapshot.pivot === index) classes.push("pivot");
    bar.className = classes.join(" ");
    bar.style.height = `${Math.max((value / maxValue) * 480, 28)}px`;
    bar.textContent = value;
    const label = document.createElement("span");
    label.textContent = index;
    group.append(bar, label);
    wrap.appendChild(group);
  });
  els.visualizationPanel.replaceChildren(wrap);
}

function renderSearchVisualization(snapshot) {
  const wrap = document.createElement("div");
  wrap.className = "array-cells";
  snapshot.array.forEach((value, index) => {
    const cell = document.createElement("div");
    const classes = ["array-cell"];
    if (snapshot.active?.includes(index)) classes.push("active", "compare");
    if (snapshot.mid === index) classes.push("mid");
    if (snapshot.found === index) classes.push("found");
    cell.className = classes.join(" ");
    cell.textContent = value;
    wrap.appendChild(cell);
  });
  els.visualizationPanel.replaceChildren(wrap);
}

function renderTableVisualization(snapshot) {
  const table = document.createElement("div");
  table.className = "visual-table";
  snapshot.rows.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "table-row";
    rowEl.style.gridTemplateColumns = `repeat(${row.length}, minmax(0, 1fr))`;
    row.forEach((cellData) => {
      const cell = document.createElement("div");
      const classes = ["table-cell"];
      if (cellData.state === "active") classes.push("active");
      if (cellData.state === "selected") classes.push("filled");
      rowEl.appendChild(cell);
      cell.className = classes.join(" ");
      cell.innerHTML = `<strong>${cellData.label}</strong>${cellData.subtext ? `<small>${cellData.subtext}</small>` : ""}`;
    });
    table.appendChild(rowEl);
  });
  if (snapshot.note) {
    const note = document.createElement("div");
    note.className = "footer-note";
    note.textContent = snapshot.note;
    table.appendChild(note);
  }
  els.visualizationPanel.replaceChildren(table);
}

function renderTreeVisualization(snapshot) {
  const wrap = document.createElement("div");
  wrap.className = "tree-wrap";
  snapshot.levels.forEach((level) => {
    const row = document.createElement("div");
    row.className = "tree-level";
    level.forEach((node) => {
      const el = document.createElement("div");
      const classes = ["tree-node"];
      if (node.state === "active") classes.push("active");
      if (node.state === "merged") classes.push("merged");
      if (node.state === "leaf") classes.push("leaf");
      el.className = classes.join(" ");
      el.innerHTML = `<strong>${node.label}</strong><small>${node.weight}</small>`;
      row.appendChild(el);
    });
    wrap.appendChild(row);
  });
  els.visualizationPanel.replaceChildren(wrap);
}

function renderDpVisualization(snapshot) {
  const table = document.createElement("div");
  table.className = "dp-table";
  snapshot.grid.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "dp-row";
    rowEl.style.gridTemplateColumns = `repeat(${row.length}, minmax(0, 1fr))`;
    row.forEach((cellData) => {
      const cell = document.createElement("div");
      const classes = ["dp-cell"];
      if (cellData.state === "active") classes.push("active");
      if (cellData.state === "filled") classes.push("filled");
      if (cellData.state === "considering") classes.push("considering");
      cell.className = classes.join(" ");
      cell.innerHTML = `<strong>${cellData.label}</strong>${cellData.subtext ? `<small>${cellData.subtext}</small>` : ""}`;
      rowEl.appendChild(cell);
    });
    table.appendChild(rowEl);
  });
  els.visualizationPanel.replaceChildren(table);
}

function renderBoardVisualization(snapshot) {
  const board = document.createElement("div");
  board.className = "board";
  board.style.gridTemplateColumns = `repeat(${snapshot.size}, 1fr)`;
  snapshot.board.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      const cell = document.createElement("div");
      const classes = ["queen-cell", (rowIndex + colIndex) % 2 === 0 ? "light" : "dark"];
      if (snapshot.active?.[0] === rowIndex && snapshot.active?.[1] === colIndex) classes.push("active");
      if (value === 1) classes.push("queen");
      cell.className = classes.join(" ");
      cell.textContent = value === 1 ? "♛" : "";
      board.appendChild(cell);
    });
  });
  els.visualizationPanel.replaceChildren(board);
}

function renderGraphVisualization(snapshot) {
  const wrap = document.createElement("div");
  wrap.className = "graph-layout";
  const canvas = document.createElement("div");
  canvas.className = "graph-canvas";
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.classList.add("graph-svg");

  snapshot.edges.forEach((edge) => {
    const from = snapshot.nodes.find((node) => node.id === edge.from);
    const to = snapshot.nodes.find((node) => node.id === edge.to);
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", from.x);
    line.setAttribute("y1", from.y);
    line.setAttribute("x2", to.x);
    line.setAttribute("y2", to.y);
    line.setAttribute("stroke", edge.state === "selected" ? "var(--success)" : edge.state === "considering" ? "var(--highlight)" : "var(--muted)");
    line.setAttribute("stroke-width", edge.state === "selected" ? "2.3" : "1.35");
    line.setAttribute("class", "graph-line");
    svg.appendChild(line);

    const midX = (from.x + to.x) / 2;
    const midY = (from.y + to.y) / 2;
    const weightBg = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    weightBg.setAttribute("cx", String(midX));
    weightBg.setAttribute("cy", String(midY));
    weightBg.setAttribute("r", "3.6");
    weightBg.setAttribute("fill", "var(--panel-solid)");
    weightBg.setAttribute("stroke", "var(--line)");
    weightBg.setAttribute("stroke-width", "0.3");
    svg.appendChild(weightBg);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", String(midX));
    text.setAttribute("y", String(midY + 0.2));
    text.setAttribute("fill", "var(--text)");
    text.setAttribute("font-size", "3.4");
    text.setAttribute("class", "graph-weight");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.textContent = String(edge.weight ?? "");
    svg.appendChild(text);
  });

  snapshot.nodes.forEach((node) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", String(node.x));
    circle.setAttribute("cy", String(node.y));
    circle.setAttribute("r", "6.8");
    circle.setAttribute(
      "class",
      `graph-node-circle${node.state === "active" ? " active" : node.state === "visited" ? " visited" : ""}`,
    );
    group.appendChild(circle);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", String(node.x));
    label.setAttribute("y", String(node.y));
    label.setAttribute("font-size", "4.4");
    label.setAttribute("class", "graph-node-label");
    label.textContent = node.id;
    group.appendChild(label);
    svg.appendChild(group);
  });

  canvas.append(svg);
  wrap.appendChild(canvas);
  els.visualizationPanel.replaceChildren(wrap);
}

function getActiveAlgorithm() {
  return algorithms.find((item) => item.id === state.activeAlgorithmId);
}

function createArrayAlgorithm(id, name, category, description, visualType, execute) {
  return {
    id,
    name,
    category,
    categoryLabel: "Searching & Sorting",
    visualType,
    description,
    complexity:
      visualType === "search"
        ? name === "Linear Search"
          ? "Time: O(n) | Space: O(1)"
          : "Time: O(log n) | Space: O(1)"
        : name === "Merge Sort"
          ? "Time: O(n log n) | Space: O(n)"
          : "Time: O(n log n) avg | Space: O(log n)",
    inputs: [
      { id: "array", label: "Array Values", type: "text", value: "12,7,19,3,15,8,11" },
      ...(visualType === "search" ? [{ id: "target", label: "Target", type: "number", value: "15" }] : []),
    ],
    parseInput: (values) => ({
      array: parseNumberList(values.array),
      target: values.target !== undefined ? Number(values.target) : undefined,
    }),
    randomize: () => ({
      array: Array.from({ length: randomInt(6, 9) }, () => randomInt(2, 99)).join(","),
      ...(visualType === "search" ? { target: String(randomInt(2, 99)) } : {}),
    }),
    execute,
  };
}

function createGraphAlgorithm(id, name, description, execute) {
  const needsStartNode = id !== "kruskals";
  return {
    id,
    name,
    category: "graph",
    categoryLabel: "Graph Algorithms",
    visualType: "graph",
    description,
    complexity:
      id === "prims" || id === "kruskals"
        ? "Time: O(E log E) | Space: O(V + E)"
        : "Time: O(V + E) | Space: O(V)",
    inputs: [
      {
        id: "nodes",
        label: "Node Names",
        type: "text",
        value: defaultGraphValues.nodes,
        help: "Comma-separated node ids, for example: A,B,C,D,E",
      },
      {
        id: "edges",
        label: "Edges (from,to,weight per line)",
        type: "textarea",
        value: defaultGraphValues.edges,
        help: "For BFS and DFS, weights are optional but accepted. Example: A,B,4",
      },
      ...(needsStartNode
        ? [
            {
              id: "start",
              label: "Start Node",
              type: "text",
              value: "A",
              help: "Must match one of the node names above.",
            },
          ]
        : []),
    ],
    parseInput: (values) => {
      const graph = parseGraphInput(values.nodes, values.edges);
      const payload = { ...graph };
      if (needsStartNode) {
        const start = (values.start || "").trim();
        if (!start) {
          throw new Error(`Start node is required. Use one of: ${graph.nodes.map((node) => node.id).join(", ")}`);
        }
        if (!graph.nodes.some((node) => node.id === start)) {
          throw new Error(`Start node must be one of: ${graph.nodes.map((node) => node.id).join(", ")}`);
        }
        payload.start = start;
      }
      return payload;
    },
    randomize: () => randomGraphInput(needsStartNode),
    execute,
  };
}

function parseNumberList(text) {
  const values = text
    .split(",")
    .map((item) => Number(item.trim()))
    .filter((item) => !Number.isNaN(item));
  if (!values.length) {
    throw new Error("Enter at least one numeric value.");
  }
  return values;
}

function parsePairLines(text, fields) {
  const rows = text
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(",").map((item) => Number(item.trim()));
      return fields.reduce((acc, field, index) => ({ ...acc, [field]: parts[index] }), {});
    });
  if (!rows.length) {
    throw new Error("Enter at least one row of item data.");
  }
  return rows;
}

function parseGraphInput(nodesText, edgesText) {
  const nodeIds = nodesText
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  if (nodeIds.length < 2) {
    throw new Error("Enter at least two node names.");
  }
  if (new Set(nodeIds).size !== nodeIds.length) {
    throw new Error("Node names must be unique.");
  }

  const rawEdges = edgesText
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (!rawEdges.length) {
    throw new Error("Enter at least one edge.");
  }

  const nodeSet = new Set(nodeIds);
  const seenEdges = new Set();
  const edges = rawEdges.map((line) => {
    const parts = line.split(",").map((item) => item.trim());
    if (parts.length < 2 || parts.length > 3) {
      throw new Error(`Invalid edge format: "${line}". Use from,to or from,to,weight.`);
    }
    const [from, to, weightText] = parts;
    if (!nodeSet.has(from) || !nodeSet.has(to)) {
      throw new Error(`Edge "${line}" references a node not listed in Node Names.`);
    }
    if (from === to) {
      throw new Error(`Self-loop "${line}" is not supported.`);
    }
    const key = [from, to].sort().join("|");
    if (seenEdges.has(key)) {
      throw new Error(`Duplicate edge detected between ${from} and ${to}.`);
    }
    seenEdges.add(key);
    const weight = weightText === undefined || weightText === "" ? 1 : Number(weightText);
    if (!Number.isFinite(weight) || weight <= 0) {
      throw new Error(`Edge "${line}" must have a positive numeric weight.`);
    }
    return { from, to, weight };
  });

  const nodes = layoutGraphNodes(nodeIds);
  ensureGraphConnectivity(nodes, edges);
  return { nodes, edges };
}

function layoutGraphNodes(nodeIds) {
  const count = nodeIds.length;
  const centerX = 50;
  const centerY = 50;
  const radiusX = count > 6 ? 34 : 30;
  const radiusY = count > 6 ? 32 : 28;
  return nodeIds.map((id, index) => {
    const angle = (-Math.PI / 2) + (index / count) * Math.PI * 2;
    return {
      id,
      x: Number((centerX + Math.cos(angle) * radiusX).toFixed(2)),
      y: Number((centerY + Math.sin(angle) * radiusY).toFixed(2)),
    };
  });
}

function ensureGraphConnectivity(nodes, edges) {
  const adjacency = buildAdjacency(nodes, edges);
  const visited = new Set();
  const queue = [nodes[0].id];
  while (queue.length) {
    const current = queue.shift();
    if (visited.has(current)) continue;
    visited.add(current);
    adjacency[current].forEach((neighbor) => {
      if (!visited.has(neighbor)) queue.push(neighbor);
    });
  }
  if (visited.size !== nodes.length) {
    throw new Error("Graph must be connected so traversal and MST visualizations can cover all nodes.");
  }
}

function randomGraphInput(needsStartNode) {
  const count = randomInt(5, 8);
  const nodeIds = Array.from({ length: count }, (_, index) => String.fromCharCode(65 + index));
  const edges = [];
  const seen = new Set();

  for (let index = 1; index < nodeIds.length; index += 1) {
    const from = nodeIds[index];
    const to = nodeIds[randomInt(0, index - 1)];
    const key = [from, to].sort().join("|");
    seen.add(key);
    edges.push(`${from},${to},${randomInt(1, 12)}`);
  }

  const extraEdges = randomInt(count, count + 2);
  while (edges.length < extraEdges) {
    const from = nodeIds[randomInt(0, nodeIds.length - 1)];
    const to = nodeIds[randomInt(0, nodeIds.length - 1)];
    if (from === to) continue;
    const key = [from, to].sort().join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    edges.push(`${from},${to},${randomInt(1, 12)}`);
  }

  return {
    nodes: nodeIds.join(","),
    edges: edges.join("\n"),
    ...(needsStartNode ? { start: nodeIds[randomInt(0, nodeIds.length - 1)] } : {}),
  };
}

function cloneArraySnapshot(array, extras = {}) {
  return { array: [...array], ...extras };
}

function pushStep(steps, message, snapshot) {
  steps.push({ message, snapshot: structuredClone(snapshot) });
}

function runLinearSearch({ array, target }) {
  const steps = [];
  let found = -1;
  array.forEach((value, index) => {
    pushStep(steps, `Compare target ${target} with index ${index} value ${value}.`, cloneArraySnapshot(array, { active: [index] }));
    if (value === target && found === -1) {
      found = index;
      pushStep(steps, `Target found at index ${index}.`, cloneArraySnapshot(array, { found: index, active: [index] }));
    }
  });
  if (found === -1) {
    pushStep(steps, `Target ${target} was not found after scanning the entire array.`, cloneArraySnapshot(array));
  }
  return {
    steps,
    finalOutput: found === -1 ? `Target ${target} not found` : `Target ${target} found at index ${found}`,
  };
}

function runBinarySearch({ array, target }) {
  const steps = [];
  const sorted = [...array].sort((a, b) => a - b);
  let left = 0;
  let right = sorted.length - 1;
  let found = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    pushStep(steps, `Check middle index ${mid} with value ${sorted[mid]}.`, cloneArraySnapshot(sorted, { active: [left, mid, right], mid }));
    if (sorted[mid] === target) {
      found = mid;
      pushStep(steps, `Target ${target} found at sorted index ${mid}.`, cloneArraySnapshot(sorted, { found: mid, mid }));
      break;
    }
    if (sorted[mid] < target) {
      left = mid + 1;
      pushStep(steps, `Target is larger, move left boundary to ${left}.`, cloneArraySnapshot(sorted, { active: [left, right] }));
    } else {
      right = mid - 1;
      pushStep(steps, `Target is smaller, move right boundary to ${right}.`, cloneArraySnapshot(sorted, { active: [left, right] }));
    }
  }
  if (found === -1) {
    pushStep(steps, `Target ${target} is absent from the sorted array.`, cloneArraySnapshot(sorted));
  }
  return {
    steps,
    finalOutput: found === -1 ? `Sorted array: [${sorted.join(", ")}], target not found` : `Sorted array: [${sorted.join(", ")}], target found at index ${found}`,
  };
}

function runMergeSort({ array }) {
  const working = [...array];
  const steps = [];
  const sortedIndices = [];

  function mergeSort(start, end) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    pushStep(steps, `Split range ${start}-${end} at ${mid}.`, cloneArraySnapshot(working, { active: range(start, end) }));
    mergeSort(start, mid);
    mergeSort(mid + 1, end);
    const left = working.slice(start, mid + 1);
    const right = working.slice(mid + 1, end + 1);
    let i = 0;
    let j = 0;
    let k = start;
    while (i < left.length && j < right.length) {
      const pickLeft = left[i] <= right[j];
      working[k] = pickLeft ? left[i++] : right[j++];
      pushStep(steps, `Place ${working[k]} into position ${k} while merging.`, cloneArraySnapshot(working, { active: [k] }));
      k += 1;
    }
    while (i < left.length) {
      working[k] = left[i++];
      pushStep(steps, `Copy remaining left value ${working[k]} into position ${k}.`, cloneArraySnapshot(working, { active: [k] }));
      k += 1;
    }
    while (j < right.length) {
      working[k] = right[j++];
      pushStep(steps, `Copy remaining right value ${working[k]} into position ${k}.`, cloneArraySnapshot(working, { active: [k] }));
      k += 1;
    }
    for (let index = start; index <= end; index += 1) {
      if (!sortedIndices.includes(index) && end - start === array.length - 1) sortedIndices.push(index);
    }
  }

  mergeSort(0, working.length - 1);
  pushStep(steps, "Merge sort complete.", cloneArraySnapshot(working, { sorted: working.map((_, index) => index) }));
  return { steps, finalOutput: `Sorted array: [${working.join(", ")}]` };
}

function runQuickSort({ array }) {
  const working = [...array];
  const steps = [];

  function quickSort(low, high) {
    if (low >= high) return;
    const pivot = working[high];
    let i = low;
    pushStep(steps, `Choose pivot ${pivot} at index ${high}.`, cloneArraySnapshot(working, { pivot: high, active: range(low, high) }));
    for (let j = low; j < high; j += 1) {
      pushStep(steps, `Compare index ${j} value ${working[j]} with pivot ${pivot}.`, cloneArraySnapshot(working, { active: [j], pivot: high }));
      if (working[j] <= pivot) {
        [working[i], working[j]] = [working[j], working[i]];
        pushStep(steps, `Swap indices ${i} and ${j}.`, cloneArraySnapshot(working, { active: [i, j], pivot: high }));
        i += 1;
      }
    }
    [working[i], working[high]] = [working[high], working[i]];
    pushStep(steps, `Place pivot in final position ${i}.`, cloneArraySnapshot(working, { active: [i], sorted: [i] }));
    quickSort(low, i - 1);
    quickSort(i + 1, high);
  }

  quickSort(0, working.length - 1);
  pushStep(steps, "Quick sort complete.", cloneArraySnapshot(working, { sorted: working.map((_, index) => index) }));
  return { steps, finalOutput: `Sorted array: [${working.join(", ")}]` };
}

function runHeapSort({ array }) {
  const working = [...array];
  const steps = [];

  function heapify(length, index) {
    let largest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    if (left < length) pushStep(steps, `Compare parent index ${index} with left child ${left}.`, cloneArraySnapshot(working, { active: [index, left] }));
    if (left < length && working[left] > working[largest]) largest = left;
    if (right < length) pushStep(steps, `Compare current largest with right child ${right}.`, cloneArraySnapshot(working, { active: [largest, right] }));
    if (right < length && working[right] > working[largest]) largest = right;
    if (largest !== index) {
      [working[index], working[largest]] = [working[largest], working[index]];
      pushStep(steps, `Swap index ${index} with child ${largest} to restore heap.`, cloneArraySnapshot(working, { active: [index, largest] }));
      heapify(length, largest);
    }
  }

  for (let i = Math.floor(working.length / 2) - 1; i >= 0; i -= 1) {
    heapify(working.length, i);
  }
  const sorted = [];
  for (let end = working.length - 1; end > 0; end -= 1) {
    [working[0], working[end]] = [working[end], working[0]];
    sorted.unshift(end);
    pushStep(steps, `Move max element to index ${end}.`, cloneArraySnapshot(working, { active: [0, end], sorted: [...sorted] }));
    heapify(end, 0);
  }
  pushStep(steps, "Heap sort complete.", cloneArraySnapshot(working, { sorted: working.map((_, index) => index) }));
  return { steps, finalOutput: `Sorted array: [${working.join(", ")}]` };
}

function runFractionalKnapsack({ capacity, items }) {
  if (!Number.isFinite(capacity) || capacity <= 0) {
    throw new Error("Capacity must be a positive number.");
  }
  const normalized = items
    .filter((item) => Number.isFinite(item.value) && Number.isFinite(item.weight) && item.weight > 0)
    .map((item, index) => ({ ...item, ratio: item.value / item.weight, id: index + 1 }))
    .sort((a, b) => b.ratio - a.ratio);
  if (!normalized.length) {
    throw new Error("Provide at least one valid item with positive weight.");
  }

  const steps = [];
  let remaining = capacity;
  let totalValue = 0;
  const chosen = [];
  normalized.forEach((item, index) => {
    const takeFraction = Math.min(1, remaining / item.weight);
    if (takeFraction <= 0) return;
    remaining -= item.weight * takeFraction;
    totalValue += item.value * takeFraction;
    chosen.push({ ...item, fraction: takeFraction });
    pushStep(steps, `Pick ${Math.round(takeFraction * 100)}% of item ${item.id} based on highest value density.`, {
      rows: [
        [
          { label: "Item", subtext: "v / w" },
          { label: "Ratio", subtext: "Greedy key" },
          { label: "Taken", subtext: "Fraction" },
        ],
        ...normalized.map((current, rowIndex) => [
          { label: `#${current.id}`, subtext: `${current.value}/${current.weight}`, state: rowIndex === index ? "active" : undefined },
          { label: current.ratio.toFixed(2), state: rowIndex === index ? "active" : undefined },
          {
            label: `${Math.round((chosen.find((entry) => entry.id === current.id)?.fraction || 0) * 100)}%`,
            state: chosen.some((entry) => entry.id === current.id) ? "selected" : undefined,
          },
        ]),
      ],
      note: `Remaining capacity: ${remaining.toFixed(2)} | Total value: ${totalValue.toFixed(2)}`,
    });
  });
  return {
    steps,
    finalOutput: `Max value = ${totalValue.toFixed(2)} with items ${chosen.map((item) => `#${item.id} (${Math.round(item.fraction * 100)}%)`).join(", ")}`,
  };
}

function runHuffmanCoding({ symbols }) {
  if (!symbols.length) {
    throw new Error("Enter at least two symbols.");
  }
  let forest = symbols
    .filter((item) => item.symbol && Number.isFinite(item.freq))
    .map((item) => ({ label: item.symbol, weight: item.freq, leaves: [item.symbol] }));
  if (forest.length < 2) {
    throw new Error("Enter at least two valid symbol-frequency pairs.");
  }
  const steps = [];

  while (forest.length > 1) {
    forest = forest.sort((a, b) => a.weight - b.weight);
    const left = forest.shift();
    const right = forest.shift();
    const merged = {
      label: `${left.label}${right.label}`,
      weight: left.weight + right.weight,
      leaves: [...left.leaves, ...right.leaves],
    };
    pushStep(steps, `Merge nodes ${left.label} and ${right.label} with the lowest frequencies.`, {
      levels: [
        forest.map((node) => ({ label: node.label, weight: node.weight, state: "leaf" })),
        [
          { label: left.label, weight: left.weight, state: "active" },
          { label: right.label, weight: right.weight, state: "active" },
          { label: merged.label, weight: merged.weight, state: "merged" },
        ],
      ],
    });
    forest.push(merged);
  }

  const root = forest[0];
  pushStep(steps, "Huffman tree construction complete.", {
    levels: [
      [{ label: root.label, weight: root.weight, state: "merged" }],
      root.leaves.map((leaf) => {
        const source = symbols.find((item) => item.symbol === leaf);
        return { label: leaf, weight: source.freq, state: "leaf" };
      }),
    ],
  });

  return {
    steps,
    finalOutput: `Root weight = ${root.weight}. Leaves included: ${root.leaves.join(", ")}`,
  };
}

function runZeroOneKnapsack({ capacity, weights, values }) {
  if (weights.length !== values.length) {
    throw new Error("Weights and values must have the same length.");
  }
  if (!Number.isFinite(capacity) || capacity < 0) {
    throw new Error("Capacity must be zero or more.");
  }
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  const steps = [];
  for (let i = 1; i <= n; i += 1) {
    for (let w = 0; w <= capacity; w += 1) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
      } else {
        dp[i][w] = dp[i - 1][w];
      }
      pushStep(steps, `Fill cell [${i}, ${w}] using item ${i}.`, {
        grid: dp.map((row, rowIndex) =>
          row.map((cell, colIndex) => ({
            label: String(cell),
            subtext: rowIndex === 0 ? `W${colIndex}` : colIndex === 0 ? `I${rowIndex}` : "",
            state:
              rowIndex === i && colIndex === w
                ? "active"
                : rowIndex < i || (rowIndex === i && colIndex < w)
                  ? "filled"
                  : undefined,
          })),
        ),
      });
    }
  }
  return {
    steps,
    finalOutput: `Maximum value = ${dp[n][capacity]}`,
  };
}

function runLcs({ first, second }) {
  if (!first || !second) {
    throw new Error("Both strings are required.");
  }
  const dp = Array.from({ length: first.length + 1 }, () => Array(second.length + 1).fill(0));
  const steps = [];
  for (let i = 1; i <= first.length; i += 1) {
    for (let j = 1; j <= second.length; j += 1) {
      if (first[i - 1] === second[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
      pushStep(steps, `Compare ${first[i - 1]} and ${second[j - 1]} at DP[${i}, ${j}].`, {
        grid: dp.map((row, rowIndex) =>
          row.map((cell, colIndex) => ({
            label: String(cell),
            subtext:
              rowIndex === 0 && colIndex > 0
                ? second[colIndex - 1]
                : colIndex === 0 && rowIndex > 0
                  ? first[rowIndex - 1]
                  : "",
            state:
              rowIndex === i && colIndex === j
                ? "active"
                : rowIndex < i || (rowIndex === i && colIndex < j)
                  ? "filled"
                  : undefined,
          })),
        ),
      });
    }
  }

  let i = first.length;
  let j = second.length;
  let sequence = "";
  while (i > 0 && j > 0) {
    if (first[i - 1] === second[j - 1]) {
      sequence = first[i - 1] + sequence;
      i -= 1;
      j -= 1;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      i -= 1;
    } else {
      j -= 1;
    }
  }

  return {
    steps,
    finalOutput: `LCS length = ${dp[first.length][second.length]}, sequence = ${sequence || "(empty)"}`,
  };
}

function runMatrixChain({ dimensions }) {
  if (dimensions.length < 2) {
    throw new Error("Provide at least two dimensions.");
  }
  if (dimensions.some((value) => value <= 0)) {
    throw new Error("Matrix dimensions must be positive integers.");
  }
  const n = dimensions.length - 1;
  const dp = Array.from({ length: n }, () => Array(n).fill(0));
  const steps = [];
  for (let len = 2; len <= n; len += 1) {
    for (let i = 0; i <= n - len; i += 1) {
      const j = i + len - 1;
      dp[i][j] = Number.POSITIVE_INFINITY;
      for (let k = i; k < j; k += 1) {
        const cost = dp[i][k] + dp[k + 1][j] + dimensions[i] * dimensions[k + 1] * dimensions[j + 1];
        if (cost < dp[i][j]) dp[i][j] = cost;
        pushStep(steps, `Evaluate split k=${k + 1} for matrices ${i + 1}..${j + 1}.`, {
          grid: dp.map((row, rowIndex) =>
            row.map((cell, colIndex) => ({
              label: Number.isFinite(cell) ? String(cell) : "∞",
              subtext: `M${rowIndex + 1}-${colIndex + 1}`,
              state:
                rowIndex === i && colIndex === j
                  ? "active"
                  : Number.isFinite(cell) && cell !== 0
                    ? "filled"
                    : undefined,
            })),
          ),
        });
      }
    }
  }
  return {
    steps,
    finalOutput: `Minimum multiplication cost = ${dp[0][n - 1]}`,
  };
}

function runNQueens({ size }) {
  if (!Number.isInteger(size) || size < 4 || size > 8) {
    throw new Error("Board size must be an integer from 4 to 8.");
  }
  const board = Array.from({ length: size }, () => Array(size).fill(0));
  const steps = [];
  let solved = false;

  function isSafe(row, col) {
    for (let i = 0; i < row; i += 1) {
      if (board[i][col] === 1) return false;
    }
    for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i -= 1, j -= 1) {
      if (board[i][j] === 1) return false;
    }
    for (let i = row - 1, j = col + 1; i >= 0 && j < size; i -= 1, j += 1) {
      if (board[i][j] === 1) return false;
    }
    return true;
  }

  function backtrack(row) {
    if (row === size) {
      solved = true;
      pushStep(steps, "All queens placed successfully.", { board, size });
      return true;
    }
    for (let col = 0; col < size; col += 1) {
      pushStep(steps, `Try placing a queen at row ${row + 1}, column ${col + 1}.`, { board, size, active: [row, col] });
      if (isSafe(row, col)) {
        board[row][col] = 1;
        pushStep(steps, `Place queen at row ${row + 1}, column ${col + 1}.`, { board, size, active: [row, col] });
        if (backtrack(row + 1)) return true;
        board[row][col] = 0;
        pushStep(steps, `Conflict later on, backtrack from row ${row + 1}, column ${col + 1}.`, { board, size, active: [row, col] });
      }
    }
    return false;
  }

  backtrack(0);
  return {
    steps,
    finalOutput: solved ? "One valid queen arrangement found." : "No valid arrangement exists for this board size.",
  };
}

function runBfs({ start, nodes, edges }) {
  const graphNodes = structuredClone(nodes);
  const graphEdges = structuredClone(edges).map((edge) => ({ ...edge }));
  const adjacency = buildAdjacency(graphNodes, graphEdges);
  const queue = [start];
  const visited = new Set([start]);
  const order = [];
  const steps = [];
  while (queue.length) {
    const current = queue.shift();
    order.push(current);
    pushStep(steps, `Visit node ${current} and inspect its neighbors.`, graphSnapshot(graphNodes, graphEdges, visited, current));
    adjacency[current].forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        markEdge(graphEdges, current, neighbor, "selected");
        pushStep(steps, `Queue neighbor ${neighbor} discovered from ${current}.`, graphSnapshot(graphNodes, graphEdges, visited, neighbor));
      }
    });
  }
  return {
    steps,
    finalOutput: `BFS order: ${order.join(" -> ")}`,
  };
}

function runDfs({ start, nodes, edges }) {
  const graphNodes = structuredClone(nodes);
  const graphEdges = structuredClone(edges).map((edge) => ({ ...edge }));
  const adjacency = buildAdjacency(graphNodes, graphEdges);
  const visited = new Set();
  const order = [];
  const steps = [];

  function dfs(node) {
    visited.add(node);
    order.push(node);
    pushStep(steps, `Visit node ${node} and dive deeper.`, graphSnapshot(graphNodes, graphEdges, visited, node));
    adjacency[node].forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        markEdge(graphEdges, node, neighbor, "selected");
        dfs(neighbor);
      }
    });
  }

  dfs(start);
  return {
    steps,
    finalOutput: `DFS order: ${order.join(" → ")}`,
  };
}

function runPrims({ start, nodes, edges }) {
  const graphNodes = structuredClone(nodes);
  const graphEdges = structuredClone(edges).map((edge) => ({ ...edge }));
  const visited = new Set([start]);
  const mst = [];
  const steps = [];

  while (visited.size < graphNodes.length) {
    let candidate = null;
    graphEdges.forEach((edge) => {
      const inVisited = visited.has(edge.from) || visited.has(edge.to);
      const crossesCut = visited.has(edge.from) !== visited.has(edge.to);
      if (inVisited && crossesCut && (!candidate || edge.weight < candidate.weight)) {
        candidate = edge;
      }
    });
    if (!candidate) break;
    candidate.state = "selected";
    visited.add(candidate.from);
    visited.add(candidate.to);
    mst.push(candidate);
    pushStep(steps, `Add edge ${candidate.from}-${candidate.to} with weight ${candidate.weight}.`, graphSnapshot(graphNodes, graphEdges, visited, candidate.to));
  }

  if (mst.length !== graphNodes.length - 1) {
    throw new Error("Unable to build an MST from the provided graph.");
  }
  return {
    steps,
    finalOutput: `MST edges: ${mst.map((edge) => `${edge.from}-${edge.to}`).join(", ")} | Total weight = ${mst.reduce((sum, edge) => sum + edge.weight, 0)}`,
  };
}

function runKruskals({ nodes, edges }) {
  const graphNodes = structuredClone(nodes);
  const graphEdges = structuredClone(edges)
    .map((edge) => ({ ...edge }))
    .sort((a, b) => a.weight - b.weight);
  const parent = Object.fromEntries(graphNodes.map((node) => [node.id, node.id]));
  const steps = [];
  const mst = [];

  function find(node) {
    if (parent[node] !== node) parent[node] = find(parent[node]);
    return parent[node];
  }

  function union(a, b) {
    parent[find(a)] = find(b);
  }

  graphEdges.forEach((edge) => {
    edge.state = "considering";
    pushStep(steps, `Consider edge ${edge.from}-${edge.to} with weight ${edge.weight}.`, graphSnapshot(graphNodes, graphEdges, new Set(mst.flatMap((item) => [item.from, item.to])), edge.to));
    if (find(edge.from) !== find(edge.to)) {
      union(edge.from, edge.to);
      edge.state = "selected";
      mst.push(edge);
      pushStep(steps, `Accept edge ${edge.from}-${edge.to}; it does not form a cycle.`, graphSnapshot(graphNodes, graphEdges, new Set(mst.flatMap((item) => [item.from, item.to])), edge.to));
    } else {
      edge.state = undefined;
    }
  });

  if (mst.length !== graphNodes.length - 1) {
    throw new Error("Unable to build an MST from the provided graph.");
  }
  return {
    steps,
    finalOutput: `MST edges: ${mst.map((edge) => `${edge.from}-${edge.to}`).join(", ")} | Total weight = ${mst.reduce((sum, edge) => sum + edge.weight, 0)}`,
  };
}

function buildAdjacency(nodes, edges) {
  const adjacency = {};
  nodes.forEach((node) => {
    adjacency[node.id] = [];
  });
  edges.forEach((edge) => {
    adjacency[edge.from].push(edge.to);
    adjacency[edge.to].push(edge.from);
  });
  return adjacency;
}

function graphSnapshot(nodes, edges, visited, active) {
  return {
    nodes: nodes.map((node) => ({
      ...node,
      state: node.id === active ? "active" : visited.has(node.id) ? "visited" : undefined,
    })),
    edges: edges.map((edge) => ({ ...edge })),
  };
}

function markEdge(edges, a, b, stateValue) {
  const edge = edges.find(
    (item) => (item.from === a && item.to === b) || (item.from === b && item.to === a),
  );
  if (edge) edge.state = stateValue;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomWord(length) {
  const alphabet = "ABCDEFXYZ";
  return Array.from({ length }, () => alphabet[randomInt(0, alphabet.length - 1)]).join("");
}

function range(start, end) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function labelForSpeed(speed) {
  if (speed >= 1400) return "slow";
  if (speed >= 850) return "medium";
  return "fast";
}

function shouldShowDetailedInsights(algorithm, run) {
  if (!run) return true;
  if (algorithm.category === "graph") return true;
  if (algorithm.id === "n-queens") return false;
  return run.steps.length <= 80;
}

init();
