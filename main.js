const categories = [
  { id: "all", label: "All Algorithms" },
  { id: "searching-sorting", label: "Searching & Sorting" },
  { id: "greedy", label: "Greedy" },
  { id: "dynamic-programming", label: "Dynamic Programming" },
  { id: "backtracking", label: "Backtracking" },
  { id: "graph", label: "Graph Algorithms" },
];

const graphTemplate = {
  nodes: ["A", "B", "C", "D", "E"],
  edges: [
    { from: "A", to: "B", weight: 2 },
    { from: "A", to: "C", weight: 1 },
    { from: "B", to: "D", weight: 4 },
    { from: "C", to: "D", weight: 3 },
    { from: "C", to: "E", weight: 5 },
  ],
};

const algorithms = [
  createArrayAlgorithm({
    id: "linear-search",
    name: "Linear Search",
    description: "Scan the array from left to right until the target is found.",
    executor: runLinearSearch,
    search: true,
    sortedRequired: false,
    complexity: "Time: O(n) | Space: O(1)",
  }),
  createArrayAlgorithm({
    id: "binary-search",
    name: "Binary Search",
    description: "Use left, right, and middle pointers on a sorted array.",
    executor: runBinarySearch,
    search: true,
    sortedRequired: true,
    complexity: "Time: O(log n) | Space: O(1)",
  }),
  createArrayAlgorithm({
    id: "merge-sort",
    name: "Merge Sort",
    description: "Divide the array, recursively sort halves, then merge them.",
    executor: runMergeSort,
    search: false,
    complexity: "Time: O(n log n) | Space: O(n)",
  }),
  createArrayAlgorithm({
    id: "quick-sort",
    name: "Quick Sort",
    description: "Partition around a pivot and recursively sort subarrays.",
    executor: runQuickSort,
    search: false,
    complexity: "Time: O(n log n) average | Space: O(log n)",
  }),
  createArrayAlgorithm({
    id: "heap-sort",
    name: "Heap Sort",
    description: "Build a max heap and repeatedly extract the maximum.",
    executor: runHeapSort,
    search: false,
    complexity: "Time: O(n log n) | Space: O(1)",
  }),
  {
    id: "fractional-knapsack",
    name: "Fractional Knapsack",
    category: "greedy",
    categoryLabel: "Greedy Algorithms",
    visualType: "table",
    inputType: "Table",
    outputType: "Value",
    description: "Select items by value-to-weight ratio, allowing fractions.",
    complexity: "Time: O(n log n) | Space: O(n)",
    inputs: [
      {
        id: "weights",
        label: "Weights",
        type: "text",
        value: "[10, 20, 30]",
        placeholder: "[10, 20, 30]",
        help: 'Strict format: [10, 20, 30]',
      },
      {
        id: "values",
        label: "Values",
        type: "text",
        value: "[60, 100, 120]",
        placeholder: "[60, 100, 120]",
        help: 'Strict format: [60, 100, 120]',
      },
      {
        id: "capacity",
        label: "Capacity",
        type: "number",
        value: "50",
        placeholder: "50",
      },
    ],
    parseInput: (values) => ({
      weights: parseBracketNumberArray(values.weights, "Weights"),
      values: parseBracketNumberArray(values.values, "Values"),
      capacity: parsePositiveInteger(values.capacity, "Capacity"),
    }),
    randomize: () => {
      const count = randomInt(3, 5);
      return {
        weights: toBracketArray(Array.from({ length: count }, () => randomInt(5, 30))),
        values: toBracketArray(Array.from({ length: count }, () => randomInt(20, 140))),
        capacity: String(randomInt(20, 70)),
      };
    },
    execute: runFractionalKnapsack,
  },
  {
    id: "huffman-coding",
    name: "Huffman Coding",
    category: "greedy",
    categoryLabel: "Greedy Algorithms",
    visualType: "tree",
    inputType: "Table",
    outputType: "Tree",
    description: "Build a Huffman tree from character frequencies and derive binary codes.",
    complexity: "Time: O(n log n) | Space: O(n)",
    inputs: [
      {
        id: "characters",
        label: "Characters",
        type: "text",
        value: "[a, b, c, d]",
        placeholder: "[a, b, c, d]",
        help: "Strict format: [a, b, c, d]",
      },
      {
        id: "frequencies",
        label: "Frequencies",
        type: "text",
        value: "[5, 9, 12, 13]",
        placeholder: "[5, 9, 12, 13]",
        help: "Strict format: [5, 9, 12, 13]",
      },
    ],
    parseInput: (values) => ({
      characters: parseBracketStringArray(values.characters, "Characters"),
      frequencies: parseBracketNumberArray(values.frequencies, "Frequencies"),
    }),
    randomize: () => {
      const chars = ["a", "b", "c", "d", "e", "f"].slice(0, randomInt(4, 6));
      return {
        characters: `[${chars.join(", ")}]`,
        frequencies: toBracketArray(chars.map(() => randomInt(3, 30))),
      };
    },
    execute: runHuffmanCoding,
  },
  {
    id: "zero-one-knapsack",
    name: "0/1 Knapsack",
    category: "dynamic-programming",
    categoryLabel: "Dynamic Programming",
    visualType: "dp",
    inputType: "Table",
    outputType: "Value",
    description: "Use a DP table to decide whether each item is taken or skipped.",
    complexity: "Time: O(nW) | Space: O(nW)",
    inputs: [
      {
        id: "weights",
        label: "Weights",
        type: "text",
        value: "[1, 3, 4, 5]",
        placeholder: "[1, 3, 4, 5]",
        help: "Strict format: [1, 3, 4, 5]",
      },
      {
        id: "values",
        label: "Values",
        type: "text",
        value: "[1, 4, 5, 7]",
        placeholder: "[1, 4, 5, 7]",
      },
      {
        id: "capacity",
        label: "Capacity",
        type: "number",
        value: "7",
        placeholder: "7",
      },
    ],
    parseInput: (values) => ({
      weights: parseBracketNumberArray(values.weights, "Weights"),
      values: parseBracketNumberArray(values.values, "Values"),
      capacity: parseNonNegativeInteger(values.capacity, "Capacity"),
    }),
    randomize: () => {
      const count = randomInt(4, 6);
      return {
        weights: toBracketArray(Array.from({ length: count }, () => randomInt(1, 6))),
        values: toBracketArray(Array.from({ length: count }, () => randomInt(2, 14))),
        capacity: String(randomInt(7, 14)),
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
    inputType: "String",
    outputType: "Value",
    description: "Fill a DP grid and backtrack through it to build the LCS.",
    complexity: "Time: O(mn) | Space: O(mn)",
    inputs: [
      {
        id: "first",
        label: "String1",
        type: "text",
        value: '"ABCBDAB"',
        placeholder: '"ABCBDAB"',
        help: 'Example: "ABCBDAB"',
      },
      {
        id: "second",
        label: "String2",
        type: "text",
        value: '"BDCAB"',
        placeholder: '"BDCAB"',
        help: 'Example: "BDCAB"',
      },
    ],
    parseInput: (values) => ({
      first: parseQuotedString(values.first, "String1"),
      second: parseQuotedString(values.second, "String2"),
    }),
    randomize: () => ({
      first: `"${randomWord(7)}"`,
      second: `"${randomWord(5)}"`,
    }),
    execute: runLcs,
  },
  {
    id: "matrix-chain",
    name: "Matrix Chain Multiplication",
    category: "dynamic-programming",
    categoryLabel: "Dynamic Programming",
    visualType: "dp",
    inputType: "Array",
    outputType: "Tree",
    description: "Minimize scalar multiplications by choosing the best parenthesization.",
    complexity: "Time: O(n^3) | Space: O(n^2)",
    inputs: [
      {
        id: "dimensions",
        label: "Dimensions",
        type: "text",
        value: "[10, 20, 30, 40]",
        placeholder: "[10, 20, 30, 40]",
        help: "Strict format: [10, 20, 30, 40]",
      },
    ],
    parseInput: (values) => ({
      dimensions: parseBracketNumberArray(values.dimensions, "Dimensions"),
    }),
    randomize: () => ({
      dimensions: toBracketArray(Array.from({ length: randomInt(4, 6) }, () => randomInt(10, 60))),
    }),
    execute: runMatrixChain,
  },
  {
    id: "n-queens",
    name: "N-Queens",
    category: "backtracking",
    categoryLabel: "Backtracking",
    visualType: "board",
    inputType: "Grid",
    outputType: "Grid",
    description: "Place queens row by row while highlighting attacks and backtracking moves.",
    complexity: "Time: O(N!) | Space: O(N)",
    inputs: [
      {
        id: "size",
        label: "N",
        type: "number",
        value: "4",
        placeholder: "4",
      },
    ],
    parseInput: (values) => ({
      size: parsePositiveInteger(values.size, "N"),
    }),
    randomize: () => ({ size: String(randomInt(4, 6)) }),
    execute: runNQueens,
  },
  createGraphAlgorithm({
    id: "bfs",
    name: "Breadth-First Search",
    description: "Traverse the graph level by level using a queue.",
    executor: runBfs,
    complexity: "Time: O(V + E) | Space: O(V)",
    needsStartNode: true,
    outputType: "Path",
  }),
  createGraphAlgorithm({
    id: "dfs",
    name: "Depth-First Search",
    description: "Traverse the graph recursively and show backtracking edges.",
    executor: runDfs,
    complexity: "Time: O(V + E) | Space: O(V)",
    needsStartNode: true,
    outputType: "Path",
  }),
  createGraphAlgorithm({
    id: "prims",
    name: "Prim's Algorithm",
    description: "Grow the MST from a start node by choosing the cheapest crossing edge.",
    executor: runPrims,
    complexity: "Time: O(E log E) | Space: O(V + E)",
    needsStartNode: true,
    outputType: "Graph",
  }),
  createGraphAlgorithm({
    id: "kruskals",
    name: "Kruskal's Algorithm",
    description: "Sort edges globally and add them when they do not create a cycle.",
    executor: runKruskals,
    complexity: "Time: O(E log E) | Space: O(V + E)",
    needsStartNode: false,
    outputType: "Graph",
  }),
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
  inputTypeOutput: document.querySelector("#input-type-output"),
  outputTypeOutput: document.querySelector("#output-type-output"),
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
    if (state.autoPlayId) startAutoPlay();
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
      stopAutoPlay();
      state.activeAlgorithmId = algorithm.id;
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
  els.title.textContent = algorithm.name;
  els.category.textContent = algorithm.categoryLabel;
  els.description.textContent = algorithm.description;
  els.complexityOutput.textContent = algorithm.complexity;
  els.inputTypeOutput.textContent = algorithm.inputType;
  els.outputTypeOutput.textContent = algorithm.outputType;
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
      field.rows = input.rows || 4;
    } else {
      field = document.createElement("input");
      field.type = input.type;
    }
    field.id = id;
    field.name = input.id;
    field.value = input.value ?? "";
    if (input.placeholder) field.placeholder = input.placeholder;
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
    els.runProgress.textContent = `Input Type: ${algorithm.inputType} | Output Type: ${algorithm.outputType}`;
    els.playbackStatus.textContent = "Manual mode.";
    els.visualizationPanel.className = "visualization-panel placeholder-panel";
    els.visualizationPanel.textContent = `${algorithm.name} is ready. Use the structured example input or random input, then press Run.`;
    updatePlayButton();
    return;
  }

  const step = state.run.steps[state.currentStepIndex] || state.run.steps[state.run.steps.length - 1];
  const showDetailedInsights = shouldShowDetailedInsights(algorithm, state.run);
  els.finalOutput.textContent = state.run.finalOutput;
  els.stepCounter.textContent = `${state.currentStepIndex + 1} / ${state.run.steps.length}`;
  setInsightMode(showDetailedInsights);
  els.currentStep.textContent = step.message;
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
  if (state.autoPlayId) stopAutoPlay();
  else startAutoPlay();
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
    if (snapshot.compare?.includes(index)) classes.push("compare", "active");
    if (snapshot.swap?.includes(index)) classes.push("active");
    if (snapshot.sorted?.includes(index)) classes.push("done");
    if (snapshot.pivot === index) classes.push("pivot");
    bar.className = classes.join(" ");
    bar.style.height = `${Math.max((value / maxValue) * 460, 28)}px`;
    bar.textContent = value;
    const label = document.createElement("span");
    label.textContent = `i${index}`;
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
    if (snapshot.active?.includes(index)) classes.push("compare", "active");
    if (snapshot.found === index) classes.push("found");
    if (snapshot.mid === index) classes.push("mid");
    cell.className = classes.join(" ");
    cell.innerHTML = `<strong>${value}</strong><small>i${index}</small>`;
    wrap.appendChild(cell);
  });
  els.visualizationPanel.replaceChildren(wrap);
}

function renderTableVisualization(snapshot) {
  const container = document.createElement("div");
  container.className = "visual-table";
  snapshot.rows.forEach((row) => {
    const rowEl = document.createElement("div");
    rowEl.className = "table-row";
    rowEl.style.gridTemplateColumns = `repeat(${row.length}, minmax(0, 1fr))`;
    row.forEach((cellData) => {
      const cell = document.createElement("div");
      const classes = ["table-cell"];
      if (cellData.state === "active") classes.push("active");
      if (cellData.state === "selected") classes.push("filled");
      if (cellData.state === "considering") classes.push("considering");
      cell.className = classes.join(" ");
      cell.innerHTML = `<strong>${cellData.label}</strong>${cellData.subtext ? `<small>${cellData.subtext}</small>` : ""}`;
      rowEl.appendChild(cell);
    });
    container.appendChild(rowEl);
  });
  if (snapshot.note) {
    const note = document.createElement("div");
    note.className = "footer-note";
    note.textContent = snapshot.note;
    container.appendChild(note);
  }
  els.visualizationPanel.replaceChildren(container);
}

function renderTreeVisualization(snapshot) {
  const wrap = document.createElement("div");
  wrap.className = "tree-wrap";
  if (snapshot.queue?.length) {
    const queue = document.createElement("div");
    queue.className = "tree-level";
    snapshot.queue.forEach((entry) => {
      const item = document.createElement("div");
      item.className = `tree-node${entry.state ? ` ${entry.state}` : ""}`;
      item.innerHTML = `<strong>${entry.label}</strong><small>${entry.weight}</small>`;
      queue.appendChild(item);
    });
    wrap.appendChild(queue);
  }
  if (snapshot.codes?.length) {
    const codeTable = document.createElement("div");
    codeTable.className = "visual-table";
    const rows = [
      [
        { label: "Char" },
        { label: "Freq" },
        { label: "Code" },
      ],
      ...snapshot.codes.map((entry) => [
        { label: entry.char, state: entry.char === snapshot.highlightChar ? "active" : undefined },
        { label: String(entry.freq), state: entry.char === snapshot.highlightChar ? "active" : undefined },
        { label: entry.code, state: entry.char === snapshot.highlightChar ? "selected" : undefined },
      ]),
    ];
    rows.forEach((row) => {
      const rowEl = document.createElement("div");
      rowEl.className = "table-row";
      rowEl.style.gridTemplateColumns = "repeat(3, minmax(0, 1fr))";
      row.forEach((cellData) => {
        const cell = document.createElement("div");
        const classes = ["table-cell"];
        if (cellData.state === "active") classes.push("active");
        if (cellData.state === "selected") classes.push("filled");
        cell.className = classes.join(" ");
        cell.innerHTML = `<strong>${cellData.label}</strong>`;
        rowEl.appendChild(cell);
      });
      codeTable.appendChild(rowEl);
    });
    wrap.appendChild(codeTable);
  }
  if (snapshot.root) {
    wrap.appendChild(drawBinaryTree(snapshot.root, snapshot.highlightChar));
  }
  if (snapshot.note) {
    const note = document.createElement("div");
    note.className = "footer-note";
    note.textContent = snapshot.note;
    wrap.appendChild(note);
  }
  els.visualizationPanel.replaceChildren(wrap);
}

function renderDpVisualization(snapshot) {
  const wrap = document.createElement("div");
  wrap.className = "tree-wrap";
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
  wrap.appendChild(table);
  if (snapshot.tree) {
    wrap.appendChild(drawBinaryTree(snapshot.tree));
  }
  if (snapshot.note) {
    const note = document.createElement("div");
    note.className = "footer-note";
    note.textContent = snapshot.note;
    wrap.appendChild(note);
  }
  els.visualizationPanel.replaceChildren(wrap);
}

function renderBoardVisualization(snapshot) {
  const board = document.createElement("div");
  board.className = "board";
  board.style.gridTemplateColumns = `repeat(${snapshot.size}, 1fr)`;
  const attacks = snapshot.attacks || { rows: [], cols: [], diag1: [], diag2: [] };
  snapshot.board.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      const cell = document.createElement("div");
      const classes = ["queen-cell", (rowIndex + colIndex) % 2 === 0 ? "light" : "dark"];
      const underAttack =
        attacks.rows.includes(rowIndex) ||
        attacks.cols.includes(colIndex) ||
        attacks.diag1.includes(rowIndex - colIndex) ||
        attacks.diag2.includes(rowIndex + colIndex);
      if (underAttack && value !== 1) classes.push("attack");
      if (snapshot.active?.[0] === rowIndex && snapshot.active?.[1] === colIndex) classes.push("active");
      if (value === 1) classes.push("queen");
      cell.className = classes.join(" ");
      cell.textContent = value === 1 ? "Q" : "";
      board.appendChild(cell);
    });
  });
  const wrap = document.createElement("div");
  wrap.className = "tree-wrap";
  wrap.appendChild(board);
  if (snapshot.note) {
    const note = document.createElement("div");
    note.className = "footer-note";
    note.textContent = snapshot.note;
    wrap.appendChild(note);
  }
  els.visualizationPanel.replaceChildren(wrap);
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
    line.setAttribute("stroke", edge.state === "selected" ? "var(--success)" : edge.state === "rejected" ? "var(--danger)" : edge.state === "backtrack" ? "var(--highlight)" : "var(--muted)");
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
    text.setAttribute("y", String(midY));
    text.setAttribute("font-size", "3.2");
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
    circle.setAttribute("r", "6.5");
    circle.setAttribute("class", `graph-node-circle${node.state === "active" ? " active" : node.state === "visited" ? " visited" : ""}`);
    group.appendChild(circle);

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    label.setAttribute("x", String(node.x));
    label.setAttribute("y", String(node.y));
    label.setAttribute("font-size", "4.1");
    label.setAttribute("class", "graph-node-label");
    label.textContent = node.id;
    group.appendChild(label);
    svg.appendChild(group);
  });

  canvas.appendChild(svg);
  wrap.appendChild(canvas);

  if (snapshot.metaRows?.length) {
    const meta = document.createElement("div");
    meta.className = "visual-table";
    snapshot.metaRows.forEach((row) => {
      const rowEl = document.createElement("div");
      rowEl.className = "table-row";
      rowEl.style.gridTemplateColumns = `repeat(${row.length}, minmax(0, 1fr))`;
      row.forEach((cellData) => {
        const cell = document.createElement("div");
        const classes = ["table-cell"];
        if (cellData.state === "active") classes.push("active");
        if (cellData.state === "selected") classes.push("filled");
        if (cellData.state === "considering") classes.push("considering");
        cell.className = classes.join(" ");
        cell.innerHTML = `<strong>${cellData.label}</strong>${cellData.subtext ? `<small>${cellData.subtext}</small>` : ""}`;
        rowEl.appendChild(cell);
      });
      meta.appendChild(rowEl);
    });
    wrap.appendChild(meta);
  }

  if (snapshot.note) {
    const note = document.createElement("div");
    note.className = "footer-note";
    note.textContent = snapshot.note;
    wrap.appendChild(note);
  }
  els.visualizationPanel.replaceChildren(wrap);
}

function drawBinaryTree(root, highlightChar = null) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 100 60");
  svg.classList.add("tree-svg");
  const layout = [];
  computeTreeLayout(root, 50, 8, 24, layout);
  layout.forEach((node) => {
    if (node.parentId) {
      const parent = layout.find((entry) => entry.id === node.parentId);
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", String(parent.x));
      line.setAttribute("y1", String(parent.y));
      line.setAttribute("x2", String(node.x));
      line.setAttribute("y2", String(node.y));
      line.setAttribute("stroke", highlightChar && node.pathNodes.includes(highlightChar) ? "var(--accent)" : "var(--muted)");
      line.setAttribute("stroke-width", "1");
      svg.appendChild(line);

      if (node.edgeLabel) {
        const edgeText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        edgeText.setAttribute("x", String((parent.x + node.x) / 2));
        edgeText.setAttribute("y", String((parent.y + node.y) / 2 - 1));
        edgeText.setAttribute("font-size", "3.2");
        edgeText.setAttribute("text-anchor", "middle");
        edgeText.setAttribute("fill", "var(--accent)");
        edgeText.textContent = node.edgeLabel;
        svg.appendChild(edgeText);
      }
    }
  });

  layout.forEach((node) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", String(node.x));
    circle.setAttribute("cy", String(node.y));
    circle.setAttribute("r", "4.8");
    circle.setAttribute("fill", highlightChar && node.label === highlightChar ? "var(--highlight)" : "var(--card-strong)");
    circle.setAttribute("stroke", "var(--line)");
    circle.setAttribute("stroke-width", "0.4");
    svg.appendChild(circle);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", String(node.x));
    text.setAttribute("y", String(node.y - 0.2));
    text.setAttribute("font-size", "2.8");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("dominant-baseline", "middle");
    text.setAttribute("fill", "var(--text)");
    text.textContent = node.label;
    svg.appendChild(text);

    const freq = document.createElementNS("http://www.w3.org/2000/svg", "text");
    freq.setAttribute("x", String(node.x));
    freq.setAttribute("y", String(node.y + 6.8));
    freq.setAttribute("font-size", "2.3");
    freq.setAttribute("text-anchor", "middle");
    freq.setAttribute("fill", "var(--muted)");
    freq.textContent = String(node.weight);
    svg.appendChild(freq);
  });
  return svg;
}

function computeTreeLayout(node, x, y, spread, layout, parentId = null, edgeLabel = "", pathNodes = []) {
  const currentPath = collectTreeChars(node);
  layout.push({
    id: node.id,
    label: node.label,
    weight: node.weight,
    x,
    y,
    parentId,
    edgeLabel,
    pathNodes: currentPath,
  });
  if (node.left) computeTreeLayout(node.left, x - spread, y + 16, spread * 0.58, layout, node.id, "0", currentPath);
  if (node.right) computeTreeLayout(node.right, x + spread, y + 16, spread * 0.58, layout, node.id, "1", currentPath);
}

function collectTreeChars(node) {
  if (!node) return [];
  if (node.char) return [node.char];
  return [...collectTreeChars(node.left), ...collectTreeChars(node.right)];
}

function getActiveAlgorithm() {
  return algorithms.find((item) => item.id === state.activeAlgorithmId);
}

function createArrayAlgorithm({ id, name, description, executor, search, sortedRequired = false, complexity }) {
  return {
    id,
    name,
    category: "searching-sorting",
    categoryLabel: "Searching & Sorting",
    visualType: search ? "search" : "sort",
    inputType: "Array",
    outputType: search ? "Value" : "Array",
    description,
    complexity,
    inputs: [
      {
        id: "array",
        label: "Array",
        type: "text",
        value: sortedRequired ? "[1, 3, 5, 7, 9]" : "[5, 2, 9, 1, 6]",
        placeholder: "[5, 2, 9, 1, 6]",
        help: "Strict format: [5, 2, 9, 1, 6]",
      },
      ...(search
        ? [
            {
              id: "target",
              label: "Target",
              type: "number",
              value: "6",
              placeholder: "6",
            },
          ]
        : []),
    ],
    parseInput: (values) => {
      const array = parseBracketNumberArray(values.array, "Array");
      if (sortedRequired && !isSortedAscending(array)) {
        throw new Error("Binary Search requires the array to be sorted in ascending order.");
      }
      return {
        array,
        target: search ? parseInteger(values.target, "Target") : undefined,
      };
    },
    randomize: () => {
      const array = Array.from({ length: randomInt(5, 8) }, () => randomInt(1, 99));
      const normalized = sortedRequired ? [...array].sort((a, b) => a - b) : array;
      return {
        array: toBracketArray(normalized),
        ...(search ? { target: String(normalized[randomInt(0, normalized.length - 1)]) } : {}),
      };
    },
    execute: executor,
  };
}

function createGraphAlgorithm({ id, name, description, executor, complexity, needsStartNode, outputType }) {
  return {
    id,
    name,
    category: "graph",
    categoryLabel: "Graph Algorithms",
    visualType: "graph",
    inputType: "Graph",
    outputType,
    description,
    complexity,
    inputs: [
      {
        id: "nodes",
        label: "Nodes",
        type: "text",
        value: `[${graphTemplate.nodes.join(", ")}]`,
        placeholder: "[A, B, C, D]",
        help: "Strict format: [A, B, C, D]",
      },
      {
        id: "edges",
        label: "Edges",
        type: "textarea",
        rows: 7,
        value: graphTemplate.edges.map((edge) => `${edge.from}-${edge.to} (${edge.weight})`).join("\n"),
        placeholder: "A-B (2)\nA-C (1)\nB-D (4)\nC-D (3)",
        help: "Use edge list: A-B (2) or adjacency list: A: B(2), C(1)",
      },
      ...(needsStartNode
        ? [
            {
              id: "start",
              label: "Start Node",
              type: "text",
              value: "A",
              placeholder: "A",
            },
          ]
        : []),
    ],
    parseInput: (values) => {
      const graph = parseGraphInput(values.nodes, values.edges);
      const payload = { ...graph };
      if (needsStartNode) {
        const start = parseNodeName(values.start, "Start Node");
        if (!graph.nodes.some((node) => node.id === start)) {
          throw new Error(`Start Node must be one of: ${graph.nodes.map((node) => node.id).join(", ")}`);
        }
        payload.start = start;
      }
      return payload;
    },
    randomize: () => randomGraphInput(needsStartNode),
    execute: executor,
  };
}

function parseBracketNumberArray(text, label) {
  const trimmed = (text || "").trim();
  if (!/^\[.*\]$/.test(trimmed)) {
    throw new Error(`${label} must use bracket format like [1, 2, 3].`);
  }
  const content = trimmed.slice(1, -1).trim();
  if (!content) throw new Error(`${label} cannot be empty.`);
  const values = content.split(",").map((item) => Number(item.trim()));
  if (values.some((value) => !Number.isFinite(value))) {
    throw new Error(`${label} must contain only numeric values.`);
  }
  return values;
}

function parseBracketStringArray(text, label) {
  const trimmed = (text || "").trim();
  if (!/^\[.*\]$/.test(trimmed)) {
    throw new Error(`${label} must use bracket format like [a, b, c].`);
  }
  const content = trimmed.slice(1, -1).trim();
  if (!content) throw new Error(`${label} cannot be empty.`);
  const values = content.split(",").map((item) => item.trim().replace(/^["']|["']$/g, ""));
  if (values.some((value) => !value)) throw new Error(`${label} contains an empty token.`);
  return values;
}

function parseQuotedString(text, label) {
  const trimmed = (text || "").trim();
  if (!trimmed) throw new Error(`${label} is required.`);
  return trimmed.replace(/^["']|["']$/g, "");
}

function parseInteger(value, label) {
  const num = Number(value);
  if (!Number.isInteger(num)) throw new Error(`${label} must be an integer.`);
  return num;
}

function parsePositiveInteger(value, label) {
  const num = parseInteger(value, label);
  if (num <= 0) throw new Error(`${label} must be greater than 0.`);
  return num;
}

function parseNonNegativeInteger(value, label) {
  const num = parseInteger(value, label);
  if (num < 0) throw new Error(`${label} must be 0 or greater.`);
  return num;
}

function parseNodeName(value, label) {
  const normalized = (value || "").trim().replace(/^["']|["']$/g, "");
  if (!normalized) throw new Error(`${label} is required.`);
  return normalized;
}

function parseGraphInput(nodesText, edgesText) {
  const nodeIds = parseBracketStringArray(nodesText, "Nodes");
  if (new Set(nodeIds).size !== nodeIds.length) {
    throw new Error("Nodes must be unique.");
  }
  const edges = parseGraphEdges(edgesText, nodeIds);
  const nodes = layoutGraphNodes(nodeIds);
  ensureGraphConnectivity(nodes, edges);
  return { nodes, edges };
}

function parseGraphEdges(text, nodeIds) {
  const trimmed = (text || "").trim();
  if (!trimmed) throw new Error("Edges are required.");
  return trimmed.includes(":") ? parseAdjacencyList(trimmed, nodeIds) : parseEdgeList(trimmed, nodeIds);
}

function parseEdgeList(text, nodeIds) {
  const nodeSet = new Set(nodeIds);
  const seen = new Set();
  return text.split(/\n+/).map((line) => {
    const trimmed = line.trim();
    const match = trimmed.match(/^([A-Za-z0-9_]+)\s*-\s*([A-Za-z0-9_]+)\s*(?:\(([-+]?\d+)\))?$/);
    if (!match) {
      throw new Error(`Invalid edge format: "${trimmed}". Use A-B (2).`);
    }
    const [, from, to, rawWeight] = match;
    if (!nodeSet.has(from) || !nodeSet.has(to)) {
      throw new Error(`Edge "${trimmed}" references a node not listed in Nodes.`);
    }
    if (from === to) throw new Error(`Self-loop "${trimmed}" is not supported.`);
    const key = [from, to].sort().join("|");
    if (seen.has(key)) throw new Error(`Duplicate edge between ${from} and ${to}.`);
    seen.add(key);
    const weight = rawWeight ? Number(rawWeight) : 1;
    if (!Number.isFinite(weight) || weight <= 0) throw new Error(`Edge "${trimmed}" must have a positive weight.`);
    return { from, to, weight };
  });
}

function parseAdjacencyList(text, nodeIds) {
  const nodeSet = new Set(nodeIds);
  const seen = new Set();
  const edges = [];
  text.split(/\n+/).forEach((line) => {
    const [left, right = ""] = line.split(":");
    const from = left.trim();
    if (!nodeSet.has(from)) throw new Error(`Adjacency entry "${from}" is not in Nodes.`);
    if (!right.trim()) return;
    right.split(",").forEach((segment) => {
      const trimmed = segment.trim();
      const match = trimmed.match(/^([A-Za-z0-9_]+)\(([-+]?\d+)\)$/);
      if (!match) throw new Error(`Invalid adjacency segment "${trimmed}". Use B(2).`);
      const [, to, rawWeight] = match;
      if (!nodeSet.has(to)) throw new Error(`Adjacency segment "${trimmed}" references an unknown node.`);
      const key = [from, to].sort().join("|");
      if (from === to) throw new Error(`Self-loop "${trimmed}" is not supported.`);
      if (seen.has(key)) return;
      seen.add(key);
      edges.push({ from, to, weight: Number(rawWeight) });
    });
  });
  if (!edges.length) throw new Error("Adjacency list must define at least one edge.");
  return edges;
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
    throw new Error("Graph must be connected for traversal and MST visualizations.");
  }
}

function randomGraphInput(needsStartNode) {
  const count = randomInt(4, 7);
  const nodeIds = Array.from({ length: count }, (_, index) => String.fromCharCode(65 + index));
  const edges = [];
  const seen = new Set();
  for (let index = 1; index < nodeIds.length; index += 1) {
    const from = nodeIds[index];
    const to = nodeIds[randomInt(0, index - 1)];
    seen.add([from, to].sort().join("|"));
    edges.push(`${from}-${to} (${randomInt(1, 12)})`);
  }
  while (edges.length < count + 1) {
    const from = nodeIds[randomInt(0, nodeIds.length - 1)];
    const to = nodeIds[randomInt(0, nodeIds.length - 1)];
    if (from === to) continue;
    const key = [from, to].sort().join("|");
    if (seen.has(key)) continue;
    seen.add(key);
    edges.push(`${from}-${to} (${randomInt(1, 12)})`);
  }
  return {
    nodes: `[${nodeIds.join(", ")}]`,
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
    pushStep(steps, `Compare target ${target} with array[${index}] = ${value}.`, cloneArraySnapshot(array, { active: [index] }));
    if (value === target && found === -1) {
      found = index;
      pushStep(steps, `Target found at index ${index}.`, cloneArraySnapshot(array, { active: [index], found: index }));
    }
  });
  if (found === -1) {
    pushStep(steps, `Target ${target} is not present in the array.`, cloneArraySnapshot(array));
  }
  return {
    steps,
    finalOutput: found === -1 ? `Not Found` : `Found at index ${found}`,
  };
}

function runBinarySearch({ array, target }) {
  const steps = [];
  let left = 0;
  let right = array.length - 1;
  let found = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    pushStep(steps, `Check middle position ${mid} with value ${array[mid]}.`, cloneArraySnapshot(array, { active: [left, mid, right], mid }));
    if (array[mid] === target) {
      found = mid;
      pushStep(steps, `Target ${target} found at index ${mid}.`, cloneArraySnapshot(array, { mid, found: mid }));
      break;
    }
    if (array[mid] < target) {
      left = mid + 1;
      pushStep(steps, `Target is larger, move left pointer to ${left}.`, cloneArraySnapshot(array, { active: [left, right] }));
    } else {
      right = mid - 1;
      pushStep(steps, `Target is smaller, move right pointer to ${right}.`, cloneArraySnapshot(array, { active: [left, right] }));
    }
  }
  if (found === -1) pushStep(steps, `Target ${target} is not present in the array.`, cloneArraySnapshot(array));
  return {
    steps,
    finalOutput: found === -1 ? "Not Found" : `Found at index ${found}`,
  };
}

function runMergeSort({ array }) {
  const working = [...array];
  const steps = [];

  function mergeSort(start, end) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    pushStep(steps, `Split range ${start}-${end} into ${start}-${mid} and ${mid + 1}-${end}.`, cloneArraySnapshot(working, { compare: range(start, end) }));
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
      pushStep(steps, `Place ${working[k]} at position ${k} during merge.`, cloneArraySnapshot(working, { swap: [k] }));
      k += 1;
    }
    while (i < left.length) {
      working[k] = left[i++];
      pushStep(steps, `Copy leftover left value ${working[k]} into position ${k}.`, cloneArraySnapshot(working, { swap: [k] }));
      k += 1;
    }
    while (j < right.length) {
      working[k] = right[j++];
      pushStep(steps, `Copy leftover right value ${working[k]} into position ${k}.`, cloneArraySnapshot(working, { swap: [k] }));
      k += 1;
    }
  }

  mergeSort(0, working.length - 1);
  pushStep(steps, "Merge Sort completed.", cloneArraySnapshot(working, { sorted: range(0, working.length - 1) }));
  return { steps, finalOutput: `Sorted Array: ${toBracketArray(working)}` };
}

function runQuickSort({ array }) {
  const working = [...array];
  const steps = [];

  function quickSort(low, high) {
    if (low >= high) return;
    const pivot = working[high];
    let i = low;
    pushStep(steps, `Choose pivot ${pivot} at index ${high}.`, cloneArraySnapshot(working, { pivot: high, compare: range(low, high) }));
    for (let j = low; j < high; j += 1) {
      pushStep(steps, `Compare ${working[j]} with pivot ${pivot}.`, cloneArraySnapshot(working, { compare: [j], pivot: high }));
      if (working[j] <= pivot) {
        [working[i], working[j]] = [working[j], working[i]];
        pushStep(steps, `Swap indices ${i} and ${j}.`, cloneArraySnapshot(working, { swap: [i, j], pivot: high }));
        i += 1;
      }
    }
    [working[i], working[high]] = [working[high], working[i]];
    pushStep(steps, `Place pivot in final position ${i}.`, cloneArraySnapshot(working, { swap: [i], pivot: i }));
    quickSort(low, i - 1);
    quickSort(i + 1, high);
  }

  quickSort(0, working.length - 1);
  pushStep(steps, "Quick Sort completed.", cloneArraySnapshot(working, { sorted: range(0, working.length - 1) }));
  return { steps, finalOutput: `Sorted Array: ${toBracketArray(working)}` };
}

function runHeapSort({ array }) {
  const working = [...array];
  const steps = [];

  function heapify(length, index) {
    let largest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;
    if (left < length) pushStep(steps, `Compare parent ${working[index]} with left child ${working[left]}.`, cloneArraySnapshot(working, { compare: [index, left] }));
    if (left < length && working[left] > working[largest]) largest = left;
    if (right < length) pushStep(steps, `Compare current max with right child ${working[right]}.`, cloneArraySnapshot(working, { compare: [largest, right] }));
    if (right < length && working[right] > working[largest]) largest = right;
    if (largest !== index) {
      [working[index], working[largest]] = [working[largest], working[index]];
      pushStep(steps, `Swap ${working[largest]} and ${working[index]} to restore heap order.`, cloneArraySnapshot(working, { swap: [index, largest] }));
      heapify(length, largest);
    }
  }

  for (let i = Math.floor(working.length / 2) - 1; i >= 0; i -= 1) heapify(working.length, i);
  const sorted = [];
  for (let end = working.length - 1; end > 0; end -= 1) {
    [working[0], working[end]] = [working[end], working[0]];
    sorted.unshift(end);
    pushStep(steps, `Move max element to position ${end}.`, cloneArraySnapshot(working, { swap: [0, end], sorted: [...sorted] }));
    heapify(end, 0);
  }
  pushStep(steps, "Heap Sort completed.", cloneArraySnapshot(working, { sorted: range(0, working.length - 1) }));
  return { steps, finalOutput: `Sorted Array: ${toBracketArray(working)}` };
}

function runFractionalKnapsack({ weights, values, capacity }) {
  if (weights.length !== values.length) throw new Error("Weights and Values must have the same length.");
  const items = weights.map((weight, index) => {
    if (weight <= 0) throw new Error("Weights must be positive.");
    return {
      id: index + 1,
      weight,
      value: values[index],
      ratio: values[index] / weight,
    };
  }).sort((a, b) => b.ratio - a.ratio);

  let remaining = capacity;
  let totalValue = 0;
  const selected = [];
  const steps = [];

  items.forEach((item) => {
    const fraction = remaining <= 0 ? 0 : Math.min(1, remaining / item.weight);
    if (fraction <= 0) return;
    remaining -= item.weight * fraction;
    totalValue += item.value * fraction;
    selected.push({ ...item, fraction });
    pushStep(steps, `Select ${Math.round(fraction * 100)}% of item ${item.id} based on the best ratio.`, {
      rows: buildKnapsackRows(items, selected),
      note: `Remaining Capacity: ${remaining.toFixed(2)} | Maximum Value So Far: ${totalValue.toFixed(2)}`,
    });
  });

  if (!steps.length) {
    pushStep(steps, "Capacity is zero, so no item can be selected.", {
      rows: buildKnapsackRows(items, selected),
      note: "No selection made.",
    });
  }

  return {
    steps,
    finalOutput: `Maximum Value: ${totalValue.toFixed(2)}\nItems Selected: ${selected.map((item) => `Item ${item.id} (${Math.round(item.fraction * 100)}%)`).join(", ") || "None"}`,
  };
}

function runHuffmanCoding({ characters, frequencies }) {
  if (characters.length !== frequencies.length) throw new Error("Characters and Frequencies must have the same length.");
  if (new Set(characters).size !== characters.length) throw new Error("Characters must be unique.");

  let idCounter = 0;
  let forest = characters.map((char, index) => {
    const freq = frequencies[index];
    if (freq <= 0) throw new Error("Frequencies must be positive.");
    return { id: `n${idCounter++}`, label: char, char, weight: freq, left: null, right: null };
  });

  const steps = [];
  pushStep(steps, "Initialize the priority queue with all characters.", {
    queue: forest.slice().sort((a, b) => a.weight - b.weight).map((node) => ({ label: node.label, weight: node.weight, state: "leaf" })),
    note: "Lowest frequencies will be merged first.",
  });

  while (forest.length > 1) {
    forest.sort((a, b) => a.weight - b.weight);
    const left = forest.shift();
    const right = forest.shift();
    const merged = {
      id: `n${idCounter++}`,
      label: `${left.label}${right.label}`,
      weight: left.weight + right.weight,
      left,
      right,
      char: null,
    };
    forest.push(merged);
    pushStep(steps, `Merge ${left.label} (${left.weight}) and ${right.label} (${right.weight}) into ${merged.weight}.`, {
      queue: forest.slice().sort((a, b) => a.weight - b.weight).map((node) => ({ label: node.label, weight: node.weight, state: node.char ? "leaf" : "merged" })),
      root: merged,
      note: "Left edge = 0, Right edge = 1",
    });
  }

  const root = forest[0];
  const codes = [];
  collectHuffmanCodes(root, "", codes);
  codes.sort((a, b) => a.char.localeCompare(b.char));
  codes.forEach((entry) => {
    pushStep(steps, `Trace root to ${entry.char} to generate code ${entry.code}.`, {
      root,
      codes,
      highlightChar: entry.char,
      note: `Highlighted path shows ${entry.char} -> ${entry.code}`,
    });
  });

  return {
    steps,
    finalOutput: `Huffman Codes:\n${codes.map((entry) => `${entry.char} -> ${entry.code}`).join("\n")}`,
  };
}

function runZeroOneKnapsack({ weights, values, capacity }) {
  if (weights.length !== values.length) throw new Error("Weights and Values must have the same length.");
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0));
  const steps = [];

  for (let i = 1; i <= n; i += 1) {
    for (let w = 0; w <= capacity; w += 1) {
      if (weights[i - 1] <= w) {
        const include = values[i - 1] + dp[i - 1][w - weights[i - 1]];
        const exclude = dp[i - 1][w];
        dp[i][w] = Math.max(include, exclude);
        pushStep(steps, `Fill DP[${i}, ${w}] by comparing include=${include} and exclude=${exclude}.`, {
          grid: buildKnapsackDpGrid(dp, i, w),
          note: `Current decision: ${include >= exclude ? "Include" : "Exclude"} item ${i}`,
        });
      } else {
        dp[i][w] = dp[i - 1][w];
        pushStep(steps, `Item ${i} is too heavy for capacity ${w}, so copy the exclude value.`, {
          grid: buildKnapsackDpGrid(dp, i, w),
          note: "Current decision: Exclude",
        });
      }
    }
  }

  const selected = [];
  let i = n;
  let w = capacity;
  while (i > 0 && w >= 0) {
    if (dp[i][w] !== dp[i - 1][w]) {
      selected.unshift(i);
      pushStep(steps, `Backtrack: item ${i} was included.`, {
        grid: buildKnapsackDpGrid(dp, i, w, [[i, w]]),
        note: `Selected items so far: ${selected.join(", ")}`,
      });
      w -= weights[i - 1];
    }
    i -= 1;
  }

  return {
    steps,
    finalOutput: `Maximum Value: ${dp[n][capacity]}\nSelected Items: ${selected.length ? selected.map((item) => `Item ${item}`).join(", ") : "None"}`,
  };
}

function runLcs({ first, second }) {
  if (!first || !second) throw new Error("Both strings are required.");
  const dp = Array.from({ length: first.length + 1 }, () => Array(second.length + 1).fill(0));
  const steps = [];

  for (let i = 1; i <= first.length; i += 1) {
    for (let j = 1; j <= second.length; j += 1) {
      if (first[i - 1] === second[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
        pushStep(steps, `Characters match (${first[i - 1]}), so take diagonal + 1 at DP[${i}, ${j}].`, {
          grid: buildLcsGrid(dp, first, second, i, j),
          note: "Matching characters highlighted by the active cell.",
        });
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
        pushStep(steps, `Characters differ (${first[i - 1]} vs ${second[j - 1]}), so take the larger neighbor.`, {
          grid: buildLcsGrid(dp, first, second, i, j),
          note: "Current cell chooses top or left.",
        });
      }
    }
  }

  let i = first.length;
  let j = second.length;
  let sequence = "";
  const path = [];
  while (i > 0 && j > 0) {
    path.push([i, j]);
    if (first[i - 1] === second[j - 1]) {
      sequence = first[i - 1] + sequence;
      pushStep(steps, `Backtrack through a match: add ${first[i - 1]} to the LCS.`, {
        grid: buildLcsGrid(dp, first, second, i, j, path),
        note: `Current LCS: ${sequence}`,
      });
      i -= 1;
      j -= 1;
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      pushStep(steps, `Move upward while backtracking from DP[${i}, ${j}].`, {
        grid: buildLcsGrid(dp, first, second, i, j, path),
        note: `Current LCS: ${sequence || "(empty)"}`,
      });
      i -= 1;
    } else {
      pushStep(steps, `Move left while backtracking from DP[${i}, ${j}].`, {
        grid: buildLcsGrid(dp, first, second, i, j, path),
        note: `Current LCS: ${sequence || "(empty)"}`,
      });
      j -= 1;
    }
  }

  return {
    steps,
    finalOutput: `LCS String: ${sequence || "(empty)"}\nLength: ${sequence.length}`,
  };
}

function runMatrixChain({ dimensions }) {
  if (dimensions.length < 2) throw new Error("Dimensions must contain at least two values.");
  if (dimensions.some((value) => value <= 0)) throw new Error("Dimensions must all be positive.");
  const n = dimensions.length - 1;
  const cost = Array.from({ length: n }, () => Array(n).fill(0));
  const split = Array.from({ length: n }, () => Array(n).fill(null));
  const steps = [];

  for (let len = 2; len <= n; len += 1) {
    for (let i = 0; i <= n - len; i += 1) {
      const j = i + len - 1;
      cost[i][j] = Number.POSITIVE_INFINITY;
      for (let k = i; k < j; k += 1) {
        const candidate = cost[i][k] + cost[k + 1][j] + dimensions[i] * dimensions[k + 1] * dimensions[j + 1];
        if (candidate < cost[i][j]) {
          cost[i][j] = candidate;
          split[i][j] = k;
        }
        pushStep(steps, `Evaluate split k=${k + 1} for matrices A${i + 1}..A${j + 1}.`, {
          grid: buildMatrixChainGrid(cost, split, i, j),
          note: `Best split so far for A${i + 1}..A${j + 1}: ${split[i][j] !== null ? `k=${split[i][j] + 1}` : "none"}`,
        });
      }
    }
  }

  const parenthesization = buildMatrixParenthesization(split, 0, n - 1);
  const tree = buildMatrixChainTree(split, 0, n - 1);
  pushStep(steps, "Matrix Chain DP complete. Read the optimal parenthesization tree.", {
    grid: buildMatrixChainGrid(cost, split, 0, n - 1),
    tree,
    note: `Optimal parenthesization: ${parenthesization}`,
  });

  return {
    steps,
    finalOutput: `Minimum Multiplication Cost: ${cost[0][n - 1]}\nOptimal Parenthesization: ${parenthesization}`,
  };
}

function runNQueens({ size }) {
  if (size < 4 || size > 8) throw new Error("N must be between 4 and 8.");
  const board = Array.from({ length: size }, () => Array(size).fill(0));
  const steps = [];
  const solutions = [];

  function isSafe(row, col) {
    for (let r = 0; r < row; r += 1) if (board[r][col] === 1) return false;
    for (let r = row - 1, c = col - 1; r >= 0 && c >= 0; r -= 1, c -= 1) if (board[r][c] === 1) return false;
    for (let r = row - 1, c = col + 1; r >= 0 && c < size; r -= 1, c += 1) if (board[r][c] === 1) return false;
    return true;
  }

  function attackState(row, col) {
    return {
      rows: [row],
      cols: [col],
      diag1: [row - col],
      diag2: [row + col],
    };
  }

  function backtrack(row) {
    if (row === size) {
      const solution = board.map((line) => line.indexOf(1) + 1);
      solutions.push(solution);
      pushStep(steps, `Valid configuration ${solutions.length} found.`, {
        board,
        size,
        note: `Solution ${solutions.length}: ${solution.map((col, index) => `Q${index + 1}->C${col}`).join(", ")}`,
      });
      return;
    }
    for (let col = 0; col < size; col += 1) {
      pushStep(steps, `Try placing a queen at row ${row + 1}, column ${col + 1}.`, {
        board,
        size,
        active: [row, col],
        attacks: attackState(row, col),
        note: "Highlighted row, column, and diagonals are under test.",
      });
      if (isSafe(row, col)) {
        board[row][col] = 1;
        pushStep(steps, `Place the queen at row ${row + 1}, column ${col + 1}.`, {
          board,
          size,
          active: [row, col],
          attacks: attackState(row, col),
          note: "Placement is safe, continue to the next row.",
        });
        backtrack(row + 1);
        board[row][col] = 0;
        pushStep(steps, `Backtrack: remove the queen from row ${row + 1}, column ${col + 1}.`, {
          board,
          size,
          active: [row, col],
          attacks: attackState(row, col),
          note: "Backtracking after exploring deeper branches.",
        });
      } else {
        pushStep(steps, `Conflict detected at row ${row + 1}, column ${col + 1}.`, {
          board,
          size,
          active: [row, col],
          attacks: attackState(row, col),
          note: "This square is under attack.",
        });
      }
    }
  }

  backtrack(0);
  if (!solutions.length) {
    pushStep(steps, "No valid configuration exists for this N.", { board, size, note: "No solution found." });
  }
  return {
    steps,
    finalOutput: `Total Solutions: ${solutions.length}\nConfigurations:\n${solutions.map((solution, index) => `${index + 1}. [${solution.join(", ")}]`).join("\n") || "None"}`,
  };
}

function runBfs({ nodes, edges, start }) {
  const graphNodes = structuredClone(nodes);
  const graphEdges = structuredClone(edges).map((edge) => ({ ...edge }));
  const adjacency = buildAdjacency(graphNodes, graphEdges);
  const queue = [start];
  const visited = new Set([start]);
  const order = [];
  const levelMap = { [start]: 0 };
  const steps = [];

  while (queue.length) {
    const current = queue.shift();
    order.push(current);
    pushStep(steps, `Dequeue ${current} and expand its neighbors.`, graphSnapshot(graphNodes, graphEdges, visited, current, {
      queue,
      levels: buildLevelGroups(levelMap),
    }));
    adjacency[current].forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
        levelMap[neighbor] = levelMap[current] + 1;
        markEdge(graphEdges, current, neighbor, "selected");
        pushStep(steps, `Enqueue ${neighbor} at level ${levelMap[neighbor]}.`, graphSnapshot(graphNodes, graphEdges, visited, neighbor, {
          queue,
          levels: buildLevelGroups(levelMap),
        }));
      }
    });
  }

  const levels = buildLevelGroups(levelMap);
  return {
    steps,
    finalOutput: `Traversal Order: ${order.join(" -> ")}\n${Object.entries(levels).map(([level, values]) => `Level ${level}: ${values.join(", ")}`).join("\n")}`,
  };
}

function runDfs({ nodes, edges, start }) {
  const graphNodes = structuredClone(nodes);
  const graphEdges = structuredClone(edges).map((edge) => ({ ...edge }));
  const adjacency = buildAdjacency(graphNodes, graphEdges);
  const visited = new Set();
  const order = [];
  const steps = [];

  function dfs(node, stack = []) {
    visited.add(node);
    order.push(node);
    pushStep(steps, `Visit ${node}; push it onto the recursion stack.`, graphSnapshot(graphNodes, graphEdges, visited, node, {
      stack: [...stack, node],
    }));
    adjacency[node].forEach((neighbor) => {
      if (!visited.has(neighbor)) {
        markEdge(graphEdges, node, neighbor, "selected");
        dfs(neighbor, [...stack, node]);
        markEdge(graphEdges, node, neighbor, "backtrack");
        pushStep(steps, `Backtrack from ${neighbor} to ${node}.`, graphSnapshot(graphNodes, graphEdges, visited, node, {
          stack: [...stack, node],
        }));
      }
    });
  }

  dfs(start);
  return {
    steps,
    finalOutput: `Traversal Order: ${order.join(" -> ")}`,
  };
}

function runPrims({ nodes, edges, start }) {
  const graphNodes = structuredClone(nodes);
  const graphEdges = structuredClone(edges).map((edge) => ({ ...edge }));
  const visited = new Set([start]);
  const mst = [];
  const steps = [];

  while (visited.size < graphNodes.length) {
    let candidate = null;
    graphEdges.forEach((edge) => {
      const crosses = visited.has(edge.from) !== visited.has(edge.to);
      if (crosses && (!candidate || edge.weight < candidate.weight)) candidate = edge;
    });
    if (!candidate) throw new Error("Provided graph cannot form an MST from the selected start node.");
    candidate.state = "selected";
    visited.add(candidate.from);
    visited.add(candidate.to);
    mst.push(candidate);
    pushStep(steps, `Select edge ${candidate.from}-${candidate.to} (${candidate.weight}) to grow the MST.`, graphSnapshot(graphNodes, graphEdges, visited, candidate.to, {
      mst,
    }));
  }

  return {
    steps,
    finalOutput: `MST Edges: ${mst.map((edge) => `${edge.from}-${edge.to} (${edge.weight})`).join(", ")}\nTotal Weight: ${mst.reduce((sum, edge) => sum + edge.weight, 0)}`,
  };
}

function runKruskals({ nodes, edges }) {
  const graphNodes = structuredClone(nodes);
  const graphEdges = structuredClone(edges).map((edge) => ({ ...edge })).sort((a, b) => a.weight - b.weight);
  const parent = Object.fromEntries(graphNodes.map((node) => [node.id, node.id]));
  const steps = [];
  const mst = [];
  const sortedEdgesOutput = graphEdges.map((edge) => `${edge.from}-${edge.to} (${edge.weight})`);

  function find(node) {
    if (parent[node] !== node) parent[node] = find(parent[node]);
    return parent[node];
  }

  function union(a, b) {
    parent[find(a)] = find(b);
  }

  graphEdges.forEach((edge) => {
    edge.state = "considering";
    pushStep(steps, `Consider edge ${edge.from}-${edge.to} (${edge.weight}).`, graphSnapshot(graphNodes, graphEdges, new Set(mst.flatMap((item) => [item.from, item.to])), edge.to, {
      sortedEdges: graphEdges,
    }));
    if (find(edge.from) !== find(edge.to)) {
      union(edge.from, edge.to);
      edge.state = "selected";
      mst.push(edge);
      pushStep(steps, `Accept edge ${edge.from}-${edge.to}; no cycle is formed.`, graphSnapshot(graphNodes, graphEdges, new Set(mst.flatMap((item) => [item.from, item.to])), edge.to, {
        sortedEdges: graphEdges,
      }));
    } else {
      edge.state = "rejected";
      pushStep(steps, `Reject edge ${edge.from}-${edge.to}; it would create a cycle.`, graphSnapshot(graphNodes, graphEdges, new Set(mst.flatMap((item) => [item.from, item.to])), edge.to, {
        sortedEdges: graphEdges,
      }));
    }
  });

  if (mst.length !== graphNodes.length - 1) throw new Error("Provided graph cannot form an MST.");
  return {
    steps,
    finalOutput: `Sorted Edges: ${sortedEdgesOutput.join(", ")}\nMST Edges: ${mst.map((edge) => `${edge.from}-${edge.to} (${edge.weight})`).join(", ")}\nTotal Weight: ${mst.reduce((sum, edge) => sum + edge.weight, 0)}`,
  };
}

function buildKnapsackRows(items, selected) {
  const selectedMap = new Map(selected.map((item) => [item.id, item]));
  return [
    [
      { label: "Item" },
      { label: "Weight" },
      { label: "Value" },
      { label: "Ratio" },
      { label: "Taken %" },
    ],
    ...items.map((item) => {
      const chosen = selectedMap.get(item.id);
      return [
        { label: `#${item.id}`, state: chosen ? "active" : undefined },
        { label: String(item.weight), state: chosen ? "active" : undefined },
        { label: String(item.value), state: chosen ? "active" : undefined },
        { label: item.ratio.toFixed(2), state: chosen ? "active" : undefined },
        { label: chosen ? `${Math.round(chosen.fraction * 100)}%` : "0%", state: chosen ? "selected" : undefined },
      ];
    }),
  ];
}

function collectHuffmanCodes(node, prefix, output) {
  if (node.char) {
    output.push({ char: node.char, freq: node.weight, code: prefix || "0" });
    return;
  }
  collectHuffmanCodes(node.left, `${prefix}0`, output);
  collectHuffmanCodes(node.right, `${prefix}1`, output);
}

function buildKnapsackDpGrid(dp, activeRow, activeCol, highlightPath = []) {
  return dp.map((row, rowIndex) =>
    row.map((cell, colIndex) => ({
      label: String(cell),
      subtext: rowIndex === 0 ? `W${colIndex}` : colIndex === 0 ? `I${rowIndex}` : "",
      state:
        rowIndex === activeRow && colIndex === activeCol
          ? "active"
          : highlightPath.some(([r, c]) => r === rowIndex && c === colIndex)
            ? "considering"
            : rowIndex < activeRow || (rowIndex === activeRow && colIndex < activeCol)
              ? "filled"
              : undefined,
    })),
  );
}

function buildLcsGrid(dp, first, second, activeRow, activeCol, path = []) {
  return dp.map((row, rowIndex) =>
    row.map((cell, colIndex) => ({
      label: String(cell),
      subtext:
        rowIndex === 0 && colIndex > 0
          ? second[colIndex - 1]
          : colIndex === 0 && rowIndex > 0
            ? first[rowIndex - 1]
            : "",
      state:
        rowIndex === activeRow && colIndex === activeCol
          ? "active"
          : path.some(([r, c]) => r === rowIndex && c === colIndex)
            ? "considering"
            : rowIndex < activeRow || (rowIndex === activeRow && colIndex < activeCol)
              ? "filled"
              : undefined,
    })),
  );
}

function buildMatrixChainGrid(cost, split, activeRow, activeCol) {
  return cost.map((row, rowIndex) =>
    row.map((cell, colIndex) => ({
      label: rowIndex > colIndex ? "-" : Number.isFinite(cell) ? String(cell) : "∞",
      subtext: split[rowIndex][colIndex] !== null ? `k=${split[rowIndex][colIndex] + 1}` : `A${rowIndex + 1}-${colIndex + 1}`,
      state:
        rowIndex === activeRow && colIndex === activeCol
          ? "active"
          : Number.isFinite(cell) && rowIndex <= colIndex && cell !== 0
            ? "filled"
            : undefined,
    })),
  );
}

function buildMatrixParenthesization(split, i, j) {
  if (i === j) return `A${i + 1}`;
  const k = split[i][j];
  return `(${buildMatrixParenthesization(split, i, k)}${buildMatrixParenthesization(split, k + 1, j)})`;
}

function buildMatrixChainTree(split, i, j) {
  if (i === j) {
    return { id: `A${i + 1}`, label: `A${i + 1}`, weight: "", left: null, right: null, char: `A${i + 1}` };
  }
  const k = split[i][j];
  return {
    id: `M${i + 1}-${j + 1}`,
    label: `×`,
    weight: `A${i + 1}-${j + 1}`,
    left: buildMatrixChainTree(split, i, k),
    right: buildMatrixChainTree(split, k + 1, j),
    char: null,
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
  Object.values(adjacency).forEach((neighbors) => neighbors.sort());
  return adjacency;
}

function graphSnapshot(nodes, edges, visited, active, meta = {}) {
  const metaRows = [];
  if (meta.queue) {
    metaRows.push([
      { label: "Queue" },
      { label: meta.queue.length ? meta.queue.join(" -> ") : "(empty)" },
    ]);
  }
  if (meta.stack) {
    metaRows.push([
      { label: "Stack" },
      { label: meta.stack.join(" -> ") },
    ]);
  }
  if (meta.levels) {
    Object.entries(meta.levels).forEach(([level, values]) => {
      metaRows.push([{ label: `Level ${level}` }, { label: values.join(", ") }]);
    });
  }
  if (meta.sortedEdges) {
    metaRows.push(...meta.sortedEdges.map((edge) => [
      { label: `${edge.from}-${edge.to}`, state: edge.state === "selected" ? "selected" : edge.state === "considering" ? "considering" : edge.state === "rejected" ? "active" : undefined },
      { label: String(edge.weight), subtext: edge.state || "pending" },
    ]));
  }
  return {
    nodes: nodes.map((node) => ({
      ...node,
      state: node.id === active ? "active" : visited.has(node.id) ? "visited" : undefined,
    })),
    edges: edges.map((edge) => ({ ...edge })),
    metaRows,
    note: meta.mst ? `MST set: ${meta.mst.map((edge) => `${edge.from}-${edge.to}`).join(", ")}` : undefined,
  };
}

function markEdge(edges, a, b, state) {
  const edge = edges.find((item) => (item.from === a && item.to === b) || (item.from === b && item.to === a));
  if (edge) edge.state = state;
}

function buildLevelGroups(levelMap) {
  return Object.entries(levelMap).reduce((acc, [node, level]) => {
    const key = String(level);
    if (!acc[key]) acc[key] = [];
    acc[key].push(node);
    return acc;
  }, {});
}

function isSortedAscending(array) {
  for (let i = 1; i < array.length; i += 1) {
    if (array[i] < array[i - 1]) return false;
  }
  return true;
}

function toBracketArray(values) {
  return `[${values.join(", ")}]`;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomWord(length) {
  const alphabet = "ABCDEFXYZ";
  return Array.from({ length }, () => alphabet[randomInt(0, alphabet.length - 1)]).join("");
}

function range(start, end) {
  return Array.from({ length: Math.max(end - start + 1, 0) }, (_, index) => start + index);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function labelForSpeed(speed) {
  if (speed >= 1400) return "slow";
  if (speed >= 850) return "medium";
  return "fast";
}

function shouldShowDetailedInsights(algorithm) {
  return algorithm.id !== "n-queens";
}

init();
