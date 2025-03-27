// ===== Placeholder Function Definitions =====
function updateBlock3(instrumentName) {
  document.getElementById("block3-trendscore").innerHTML =
    "Default block3 content for " + instrumentName;
}

function loadThematicPortfolio() {
  document.getElementById("thematic-portfolio-template").innerHTML =
    "Thematic Portfolio Loaded.";
}

function attachPortfolioTableSorting() {
  // Placeholder: Table sorting is not implemented.
}

// ===== Begin Full scripts.js Content =====

document.addEventListener('DOMContentLoaded', function(){
  window.defaultDashboardHTML = document.getElementById("main-content").innerHTML;
  
  /* ===============================
     PORTFOLIO BUILDER & FILTERS
     =============================== */
  
  function parseGap(val) {
    return (val === "-" || isNaN(parseFloat(val))) ? 0 : parseFloat(val);
  }
  
  var filterMappingStocks = {
    "Score": { source: "left", index: 0 },
    "Gap to Peak": { source: "left", index: 3 },
    "S&P500 Correlation": { source: "right", index: 0 },
    "S&P500 Volatility Ratio": { source: "right", index: 1 },
    "Bullish Alpha": { source: "right", index: 2 },
    "Bearish Alpha": { source: "right", index: 3 },
    "Alpha Strength": { source: "right", index: 4 }
  };
  var filterMappingETFs = Object.assign({}, filterMappingStocks);
  var filterMappingFutures = {
    "Score": { source: "left", index: 0 },
    "Gap to Peak": { source: "left", index: 3 },
    "S&P500 Correlation": { source: "right", index: 0 },
    "S&P500 Volatility Ratio": { source: "right", index: 1 },
    "Alpha Strength": { source: "right", index: 2 }
  };
  var filterMappingFX = {
    "Score": { source: "left", index: 0 },
    "Gap to Peak": { source: "left", index: 2 },
    "AVERAGE DAILY VOLATILITY": { source: "right", index: 0 },
    "FX Volatility Ratio": { source: "right", index: 1 },
    "30 DAYS PROJECTION": { source: "right", index: 2 },
    "LONG TERM - MACRO": { source: "right", index: 3 },
    "MEDIUM TERM - MATH": { source: "right", index: 4 },
    "MEDIUM TERM - STATS": { source: "right", index: 5 },
    "SHORT TERM - TECH": { source: "right", index: 6 }
  };
  
  var portfolioFilters = [];
  
  function loadPortfolioBuilder() {
    portfolioFilters = [];
    var builderContainer = document.getElementById("portfolio-builder-template");
    builderContainer.innerHTML = `
      <div id="portfolio-builder-page">
        <div id="portfolio-builder-container">
          <div id="portfolio_builder1">
            <div id="portfolio-builder-steps">
              <p id="portfolio-builder-instructions">
                <button id="add-filter-btn">+</button> Add your filters and build your portfolio
              </p>
            </div>
            <div id="portfolio-builder-actions">
              <button id="generate-portfolio-btn">GENERATE PORTFOLIO</button>
            </div>
          </div>
          <div id="portfolio_builder2">
            <div id="portfolio-results"></div>
          </div>
        </div>
      </div>
    `;
    document.getElementById("add-filter-btn").addEventListener("click", openFilterSelector);
    document.getElementById("generate-portfolio-btn").addEventListener("click", generatePortfolioNew);
  }
  
  function openFilterSelector() {
    var availableFilters = [];
    var assetType = (portfolioFilters.length > 0) ? portfolioFilters[0].value : null;
    var allFilters;
    if (assetType === "FUTURES") {
      allFilters = ["Score", "Gap to Peak", "S&P500 Correlation", "S&P500 Volatility Ratio", "Alpha Strength"];
    } else if (assetType === "FX") {
      allFilters = ["Score", "Gap to Peak", "AVERAGE DAILY VOLATILITY", "FX Volatility Ratio", "30 DAYS PROJECTION", "LONG TERM - MACRO", "MEDIUM TERM - MATH", "MEDIUM TERM - STATS", "SHORT TERM - TECH"];
    } else {
      allFilters = ["Score", "Gap to Peak", "S&P500 Correlation", "S&P500 Volatility Ratio", "Bullish Alpha", "Bearish Alpha", "Alpha Strength"];
    }
    
    if (portfolioFilters.length === 0) {
      availableFilters.push("Asset Class");
    } else {
      availableFilters = allFilters.filter(f => portfolioFilters.findIndex(item => item.filterName === f) === -1);
    }
    var selectorDiv = document.createElement("div");
    selectorDiv.className = "filter-selector";
    var selectEl = document.createElement("select");
    availableFilters.forEach(filterName => {
      var opt = document.createElement("option");
      opt.value = filterName;
      opt.textContent = filterName;
      selectEl.appendChild(opt);
    });
    selectorDiv.appendChild(selectEl);
    var inputContainer = document.createElement("span");
    selectorDiv.appendChild(inputContainer);
    function updateInputFields() {
      inputContainer.innerHTML = "";
      var selectedFilter = selectEl.value;
      if (selectedFilter === "Asset Class") {
        var assetSelect = document.createElement("select");
        ["STOCKS", "ETFS", "FUTURES", "FX"].forEach(asset => {
          var opt = document.createElement("option");
          opt.value = asset;
          opt.textContent = asset;
          assetSelect.appendChild(opt);
        });
        inputContainer.appendChild(assetSelect);
      } else {
        var opSelect = document.createElement("select");
        ["≥", "≤"].forEach(op => {
          var opt = document.createElement("option");
          opt.value = op;
          opt.textContent = op;
          opSelect.appendChild(opt);
        });
        var numInput = document.createElement("input");
        numInput.type = "number";
        numInput.placeholder = "Numeric value";
        inputContainer.appendChild(opSelect);
        inputContainer.appendChild(numInput);
      }
    }
    selectEl.addEventListener("change", updateInputFields);
    updateInputFields();
    var addBtn = document.createElement("button");
    addBtn.textContent = "Add Filter";
    addBtn.style.marginLeft = "10px";
    addBtn.addEventListener("click", function() {
      var newFilter = { filterName: selectEl.value };
      if (selectEl.value === "Asset Class") {
        newFilter.value = inputContainer.querySelector("select").value;
      } else {
        newFilter.operator = inputContainer.querySelector("select").value;
        newFilter.value = inputContainer.querySelector("input").value;
      }
      portfolioFilters.push(newFilter);
      updatePortfolioSteps();
      selectorDiv.parentNode.removeChild(selectorDiv);
    });
    selectorDiv.appendChild(addBtn);
    document.getElementById("portfolio_builder1").appendChild(selectorDiv);
  }
  
  function updatePortfolioSteps() {
    var stepsContainer = document.getElementById("portfolio-builder-steps");
    stepsContainer.innerHTML = "";
    portfolioFilters.forEach(function(step, index) {
      var stepDiv = document.createElement("div");
      stepDiv.className = "filter-step";
      var desc = step.filterName;
      if (step.filterName === "Asset Class") {
        desc += ": " + step.value;
      } else {
        desc += " " + step.operator + " " + step.value;
      }
      var descSpan = document.createElement("span");
      descSpan.textContent = desc;
      stepDiv.appendChild(descSpan);
      var removeBtn = document.createElement("button");
      removeBtn.className = "remove-filter-btn";
      removeBtn.textContent = "✕";
      removeBtn.addEventListener("click", function() {
        portfolioFilters.splice(index, 1);
        updatePortfolioSteps();
      });
      stepDiv.appendChild(removeBtn);
      stepsContainer.appendChild(stepDiv);
    });
    var instr = document.createElement("p");
    instr.id = "portfolio-builder-instructions";
    instr.style.textAlign = "center";
    instr.style.fontSize = "16px";
    instr.style.color = "#cccccc";
    instr.innerHTML = '<button id="add-filter-btn">+</button> Add another filter';
    stepsContainer.appendChild(instr);
    document.getElementById("add-filter-btn").addEventListener("click", openFilterSelector);
  }
  
  function generatePortfolioNew() {
    if (portfolioFilters.length === 0 || portfolioFilters[0].filterName !== "Asset Class") {
      alert("Please add the Asset Class filter as your first filter.");
      return;
    }
    var asset = portfolioFilters[0].value;
    var dataObj;
    var mapping;
    if (asset === "STOCKS") { 
        dataObj = stocksFullData;
        mapping = filterMappingStocks;
    }
    else if (asset === "ETFS") { 
        dataObj = etfFullData;
        mapping = filterMappingETFs;
    }
    else if (asset === "FUTURES") { 
        dataObj = futuresFullData;
        mapping = filterMappingFutures;
    }
    else if (asset === "FX") { 
        dataObj = fxFullData;
        mapping = filterMappingFX;
    }
    else {
      alert("Invalid asset class.");
      return;
    }
    var results = [];
    for (var instrument in dataObj) {
      var info = dataObj[instrument];
      var include = true;
      for (var i = 1; i < portfolioFilters.length; i++) {
        var filt = portfolioFilters[i];
        var map = mapping[filt.filterName];
        if (!map) continue;
        var val = (map.source === "left") 
                    ? parseFloat(info.summaryLeft[map.index]) 
                    : parseFloat(info.summaryRight[map.index]);
        var condition = (filt.operator === "≥") 
                        ? (val >= parseFloat(filt.value)) 
                        : (val <= parseFloat(filt.value));
        include = include && condition;
      }
      if (include) {
        if (asset === "FX") {
          var score = parseFloat(info.summaryLeft[0]);
          if (score >= 75 || score <= -75) {
            results.push({
              instrument: instrument,
              score: score,
              trend: info.summaryLeft[1],
              approach: info.summaryLeft[3],
              gap: parseGap(info.summaryLeft[2]),
              keyArea: info.summaryLeft[4],
              fxVolatilityRatio: parseFloat(info.summaryRight[1]),
              avgDailyVolatility: parseFloat(info.summaryRight[0])
            });
          }
        } else {
          var score = parseFloat(info.summaryLeft[0]);
          if (asset === "FUTURES") {
            if (score === 100 || score === -100) {
              results.push({
                instrument: instrument,
                score: score,
                trend: info.summaryLeft[1],
                approach: info.summaryLeft[2],
                gap: parseGap(info.summaryLeft[3]),
                keyArea: info.summaryLeft[4],
                correlation: parseFloat(info.summaryRight[0]),
                volatility: parseFloat(info.summaryRight[1])
              });
            }
          } else {
            results.push({
              instrument: instrument,
              score: score,
              gap: parseGap(info.summaryLeft[3]),
              correlation: parseFloat(info.summaryRight[0]),
              volatility: parseFloat(info.summaryRight[1]),
              bullish: parseFloat(info.summaryRight[ asset==="FUTURES" ? 0 : 2 ]) || 0,
              bearish: parseFloat(info.summaryRight[ asset==="FUTURES" ? 0 : 3 ]) || 0,
              alphaStrength: parseFloat(info.summaryRight[ asset==="FUTURES" ? 2 : 4 ]) || 0,
              trend: info.summaryLeft[1],
              approach: info.summaryLeft[2],
              keyArea: info.summaryLeft[4]
            });
          }
        }
      }
    }
    var userFilters = portfolioFilters.slice(1);
    var html = "";
    if (results.length === 0) {
      html = "<p>No instrument meet this criteria.</p>";
    } else {
      html += "<table id='portfolio-table'><thead><tr>";
      html += "<th>Instrument</th>";
      userFilters.forEach(filter => {
        html += `<th>${filter.filterName}</th>`;
      });
      html += "</tr></thead><tbody>";
      results.forEach(function(r) {
        html += `<tr>`;
        html += `<td>${r.instrument}</td>`;
        userFilters.forEach(function(filter) {
          var map = mapping[filter.filterName];
          var field = "";
          if (map) {
            if (map.source === "left") {
              field = (filter.filterName === "Score") ? r.score : r.gap;
            } else if (map.source === "right") {
              if (filter.filterName === "S&P500 Correlation") field = r.correlation;
              else if (filter.filterName === "S&P500 Volatility Ratio") field = r.volatility;
              else if (filter.filterName === "Bullish Alpha") field = r.bullish;
              else if (filter.filterName === "Bearish Alpha") field = r.bearish;
              else if (filter.filterName === "Alpha Strength") field = r.alphaStrength;
              else if (filter.filterName === "AVERAGE DAILY VOLATILITY") field = r.avgDailyVolatility;
              else if (filter.filterName === "FX Volatility Ratio") field = r.fxVolatilityRatio;
              else if (filter.filterName === "30 DAYS PROJECTION") field = r.projection30;
              else if (filter.filterName === "LONG TERM - MACRO") field = r.longTermMacro;
              else if (filter.filterName === "MEDIUM TERM - MATH") field = r.mediumMath;
              else if (filter.filterName === "MEDIUM TERM - STATS") field = r.mediumStats;
              else if (filter.filterName === "SHORT TERM - TECH") field = r.shortTech;
            }
          }
          html += `<td>${field}</td>`;
        });
        html += `</tr>`;
      });
      html += "</tbody></table>";
    }
    document.getElementById("portfolio-results").innerHTML = html;
    attachPortfolioTableSorting();
  }
  
  /* ===============================
     THEMATIC PORTFOLIO FUNCTIONS
     =============================== */
  
  function destroyChartIfExists(canvasId) {
    const existing = Chart.getChart(canvasId);
    if (existing) { existing.destroy(); }
  }
  
  function computeSectorDistribution(portfolioData) {
    var sectorCount = {};
    Object.keys(data.ETFs).forEach(sector => { sectorCount[sector] = 0; });
    portfolioData.forEach(item => {
      var instrument = item.instrument;
      for (var sector in data.ETFs) {
        if (data.ETFs[sector].includes(instrument)) {
          sectorCount[sector]++;
          break;
        }
      }
    });
    for (var sector in sectorCount) {
      if (sectorCount[sector] === 0) { delete sectorCount[sector]; }
    }
    var total = Object.values(sectorCount).reduce((sum, v) => sum + v, 0);
    var labels = [];
    var percentages = [];
    for (var country in sectorCount) {
      labels.push(country);
      percentages.push(Math.round((sectorCount[country] / total) * 100));
    }
    return { labels: labels, data: percentages };
  }
  
  function computeFuturesDistribution(portfolioData) {
    const categoryMapping = {
      "FTSE 100": "Indices",
      "CAC 40": "Indices",
      "DAX40": "Indices",
      "FTSE MIB": "Indices",
      "EUROSTOXX50": "Indices",
      "S&P500": "Indices",
      "DOW JONES": "Indices",
      "NASDAQ100": "Indices",
      "RUSSELL2000": "Indices",
      "GOLD": "Metals",
      "SILVER": "Metals",
      "COPPER": "Metals",
      "WTI": "Energy",
      "NATURAL GAS": "Energy",
      "CORN": "Agricultural",
      "SOYBEANS": "Agricultural"
    };
  
    const counts = {};
    portfolioData.forEach(item => {
      const instrument = item.instrument;
      const category = categoryMapping[instrument];
      if (category) {
        counts[category] = (counts[category] || 0) + 1;
      }
    });
    const total = Object.values(counts).reduce((sum, v) => sum + v, 0);
    const labels = Object.keys(counts);
    const data = labels.map(label => Math.round((counts[label] / total) * 100));
    return { labels, data };
  }
  
  function computeFXBaseDistribution(portfolioData) {
    const baseCounts = {};
    portfolioData.forEach(item => {
      const instrument = item.instrument;
      if (instrument && instrument.length >= 6) {
        const base = instrument.substring(0,3);
        baseCounts[base] = (baseCounts[base] || 0) + 1;
      }
    });
    const total = Object.values(baseCounts).reduce((sum, v) => sum + v, 0);
    const labels = Object.keys(baseCounts);
    const data = labels.map(label => Math.round((baseCounts[label] / total) * 100));
    return { labels, data };
  }
  
  // Chart Rendering Functions for Portfolios
  function renderPortfolio1Charts(portfolioData, barCanvasId, pieCanvasId, distributionFunction) {
    barCanvasId = barCanvasId || "portfolio1_bar";
    pieCanvasId = pieCanvasId || "portfolio1_pie";
    destroyChartIfExists(barCanvasId);
    destroyChartIfExists(pieCanvasId);
    var ctxBar = document.getElementById(barCanvasId).getContext("2d");
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: portfolioData.map(d => d.instrument),
        datasets: [{
          label: 'GAP TO PEAK',
          data: portfolioData.map(d => parseFloat(d.gap) || 0),
          backgroundColor: 'rgba(75, 192, 192, 0.7)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { 
          x: { ticks: { display: false } },
          y: { 
            ticks: { 
              color: 'white',
              callback: function(value) { return value + '%'; }
            }
          }
        },
        plugins: { 
          legend: { labels: { boxWidth: 0, color: 'white' } },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) label += ': ';
                if (context.parsed.y !== null) {
                  label += context.parsed.y + '%';
                }
                return label;
              }
            }
          }
        }
      }
    });
    
    var distribution = (distributionFunction) ? distributionFunction(portfolioData) : computeGeoDistribution(portfolioData);
    destroyChartIfExists(pieCanvasId);
    var ctxPie = document.getElementById(pieCanvasId).getContext("2d");
    new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: distribution.labels,
        datasets: [{
          data: distribution.data,
          backgroundColor: orangeShades.slice(0, distribution.labels.length),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: 'white' } } }
      }
    });
  }
  
  function renderPortfolio2Charts(portfolioData, barCanvasId, pieCanvasId, distributionFunction) {
    barCanvasId = barCanvasId || "portfolio2_bar";
    pieCanvasId = pieCanvasId || "portfolio2_pie";
    destroyChartIfExists(barCanvasId);
    destroyChartIfExists(pieCanvasId);
    var ctxBar = document.getElementById(barCanvasId).getContext("2d");
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: portfolioData.map(d => d.instrument),
        datasets: [{
          label: 'S&P500 CORRELATION',
          data: portfolioData.map(d => parseFloat(d.correlation) || 0),
          backgroundColor: 'rgba(75, 192, 192, 0.7)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { 
          x: { ticks: { display: false } }, 
          y: { ticks: { color: 'white' } }
        },
        plugins: { legend: { labels: { boxWidth: 0, color: 'white' } } }
      }
    });
    
    var distribution = (distributionFunction) ? distributionFunction(portfolioData) : computeGeoDistribution(portfolioData);
    destroyChartIfExists(pieCanvasId);
    var ctxPie = document.getElementById(pieCanvasId).getContext("2d");
    new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: distribution.labels,
        datasets: [{
          data: distribution.data,
          backgroundColor: orangeShades.slice(0, distribution.labels.length),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: 'white' } } }
      }
    });
  }
  
  function renderPortfolio3Charts(portfolioData, barCanvasId, pieCanvasId, distributionFunction) {
    barCanvasId = barCanvasId || "portfolio3_bar";
    pieCanvasId = pieCanvasId || "portfolio3_pie";
    destroyChartIfExists(barCanvasId);
    destroyChartIfExists(pieCanvasId);
    var ctxBar = document.getElementById(barCanvasId).getContext("2d");
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: portfolioData.map(d => d.instrument),
        datasets: [{
          label: 'S&P500 VOLATILITY RATIO',
          data: portfolioData.map(d => parseFloat(d.volatility) || 0),
          backgroundColor: 'rgba(75, 192, 192, 0.7)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { 
          x: { ticks: { display: false } },
          y: { ticks: { color: 'white' } }
        },
        plugins: { legend: { labels: { boxWidth: 0, color: 'white' } } }
      }
    });
    
    var distribution = (distributionFunction) ? distributionFunction(portfolioData) : computeGeoDistribution(portfolioData);
    destroyChartIfExists(pieCanvasId);
    var ctxPie = document.getElementById(pieCanvasId).getContext("2d");
    new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: distribution.labels,
        datasets: [{
          data: distribution.data,
          backgroundColor: orangeShades.slice(0, distribution.labels.length),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: 'white' } } }
      }
    });
  }
  
  function renderPortfolio4Charts(portfolioData, bullishCanvasId, bearishCanvasId, alphaCanvasId) {
    bullishCanvasId = bullishCanvasId || "portfolio4_bullish";
    bearishCanvasId = bearishCanvasId || "portfolio4_bearish";
    alphaCanvasId = alphaCanvasId || "portfolio4_alpha";
    destroyChartIfExists(bullishCanvasId);
    destroyChartIfExists(bearishCanvasId);
    destroyChartIfExists(alphaCanvasId);
    
    var ctxBullish = document.getElementById(bullishCanvasId).getContext("2d");
    new Chart(ctxBullish, {
      type: 'bar',
      data: {
        labels: portfolioData.map(d => d.instrument),
        datasets: [{
          label: 'BULLISH ALPHA',
          data: portfolioData.map(d => parseFloat(d.bullish) || 0),
          backgroundColor: 'rgba(75, 192, 192, 0.7)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { 
          x: { ticks: { display: false } },
          y: { ticks: { color: 'white', font: { size: 10 } } }
        },
        plugins: { legend: { labels: { boxWidth: 0, color: 'white' } } }
      }
    });
    
    var ctxBearish = document.getElementById(bearishCanvasId).getContext("2d");
    new Chart(ctxBearish, {
      type: 'bar',
      data: {
        labels: portfolioData.map(d => d.instrument),
        datasets: [{
          label: 'BEARISH ALPHA',
          data: portfolioData.map(d => parseFloat(d.bearish) || 0),
          backgroundColor: 'rgba(75, 192, 192, 0.7)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { 
          x: { ticks: { display: false } },
          y: { ticks: { color: 'white', font: { size: 10 } } }
        },
        plugins: { legend: { labels: { boxWidth: 0, color: 'white' } } }
      }
    });
    
    var ctxAlpha = document.getElementById(alphaCanvasId).getContext("2d");
    new Chart(ctxAlpha, {
      type: 'bar',
      data: {
        labels: portfolioData.map(d => d.instrument),
        datasets: [{
          label: 'ALPHA STRENGHT',
          data: portfolioData.map(d => parseFloat(d.alphaStrength) || 0),
          backgroundColor: 'rgba(75, 192, 192, 0.7)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { 
          x: { ticks: { display: false } },
          y: { ticks: { color: 'white', font: { size: 10 } } }
        },
        plugins: { legend: { labels: { boxWidth: 0, color: 'white' } } }
      }
    });
  }
  
  // FX chart rendering functions
  function renderPortfolio1ChartsFX(portfolioData, barCanvasId, pieCanvasId, distributionFunction) {
    barCanvasId = barCanvasId || "fx_portfolio1_bar";
    pieCanvasId = pieCanvasId || "fx_portfolio1_pie";
    destroyChartIfExists(barCanvasId);
    destroyChartIfExists(pieCanvasId);
    var ctxBar = document.getElementById(barCanvasId).getContext("2d");
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: portfolioData.map(d => d.instrument),
        datasets: [{
          label: 'GAP TO PEAK',
          data: portfolioData.map(d => parseFloat(d.gap) || 0),
          backgroundColor: 'rgba(75, 192, 192, 0.7)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { 
          x: { ticks: { display: false } },
          y: { ticks: { color: 'white', callback: function(value) { return value + '%'; } } }
        },
        plugins: { legend: { labels: { boxWidth: 0, color: 'white' } } }
      }
    });
    var distribution = (distributionFunction) ? distributionFunction(portfolioData) : computeAlphaDistribution(portfolioData);
    destroyChartIfExists(pieCanvasId);
    var ctxPie = document.getElementById(pieCanvasId).getContext("2d");
    new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: distribution.labels,
        datasets: [{
          data: distribution.data,
          backgroundColor: orangeShades.slice(0, distribution.labels.length),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: 'white' } } }
      }
    });
  }
  
  function renderPortfolio2ChartsFX(portfolioData, barCanvasId, pieCanvasId, distributionFunction) {
    barCanvasId = barCanvasId || "fx_portfolio2_bar";
    pieCanvasId = pieCanvasId || "fx_portfolio2_pie";
    destroyChartIfExists(barCanvasId);
    destroyChartIfExists(pieCanvasId);
    var ctxBar = document.getElementById(barCanvasId).getContext("2d");
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: portfolioData.map(d => d.instrument),
        datasets: [{
          label: 'FX VOLATILITY RATIO',
          data: portfolioData.map(d => parseFloat(d.fxVolatilityRatio) || 0),
          backgroundColor: 'rgba(75, 192, 192, 0.7)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { 
          x: { ticks: { display: false } }, 
          y: { ticks: { color: 'white' } }
        },
        plugins: { legend: { labels: { boxWidth: 0, color: 'white' } } }
      }
    });
    var distribution = (distributionFunction) ? distributionFunction(portfolioData) : computeAlphaDistribution(portfolioData);
    destroyChartIfExists(pieCanvasId);
    var ctxPie = document.getElementById(pieCanvasId).getContext("2d");
    new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: distribution.labels,
        datasets: [{
          data: distribution.data,
          backgroundColor: orangeShades.slice(0, distribution.labels.length),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: 'white' } } }
      }
    });
  }
  
  function renderPortfolio3ChartsFX(portfolioData, barCanvasId, pieCanvasId, distributionFunction) {
    barCanvasId = barCanvasId || "fx_portfolio3_bar";
    pieCanvasId = pieCanvasId || "fx_portfolio3_pie";
    destroyChartIfExists(barCanvasId);
    destroyChartIfExists(pieCanvasId);
    var ctxBar = document.getElementById(barCanvasId).getContext("2d");
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: portfolioData.map(d => d.instrument),
        datasets: [{
          label: 'AVERAGE DAILY VOLATILITY',
          data: portfolioData.map(d => parseFloat(d.avgDailyVolatility) || 0),
          backgroundColor: 'rgba(75, 192, 192, 0.7)'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: { 
          x: { ticks: { display: false } },
          y: { ticks: { color: 'white' } }
        },
        plugins: { legend: { labels: { boxWidth: 0, color: 'white' } } }
      }
    });
    var distribution = (distributionFunction) ? distributionFunction(portfolioData) : computeAlphaDistribution(portfolioData);
    destroyChartIfExists(pieCanvasId);
    var ctxPie = document.getElementById(pieCanvasId).getContext("2d");
    new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: distribution.labels,
        datasets: [{
          data: distribution.data,
          backgroundColor: orangeShades.slice(0, distribution.labels.length),
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: 'white' } } }
      }
    });
  }
  
  var orangeShades = ['rgba(255, 165, 0, 0.8)', 'rgba(255, 140, 0, 0.8)', 'rgba(255, 120, 0, 0.8)'];
  
  function computeGeoDistribution(portfolioData) {
    var geo = {"US": 0, "ITALY": 0, "GERMANY": 0};
    portfolioData.forEach(stock => {
      var inst = stock.instrument;
      if (data && data.STOCKS) {
        if (data.STOCKS.US.indexOf(inst) > -1) geo["US"]++;
        else if (data.STOCKS.ITALY.indexOf(inst) > -1) geo["ITALY"]++;
        else if (data.STOCKS.GERMANY.indexOf(inst) > -1) geo["GERMANY"]++;
      }
    });
    for (var country in geo) {
      if (geo[country] === 0) { delete geo[country]; }
    }
    var total = Object.values(geo).reduce((sum, v) => sum + v, 0);
    var labels = [];
    var percentages = [];
    for (var country in geo) {
      labels.push(country);
      percentages.push(Math.round((geo[country] / total) * 100));
    }
    return { labels: labels, data: percentages };
  }
  
  /* ===============================
     DATA & CSV PARSING
     =============================== */
  
  const data = {
    STOCKS: {
      US: [
        "AMAZON", "AMD", "AMERICAN AIRLINES", "APPLE", "AT&T", "BANK OF AMERICA", "COCA COLA",
        "EXXON", "FORD", "GENERAL MOTORS", "GOOGLE", "INTEL", "META", "MICROSOFT",
        "NVIDIA", "PFIZER", "TESLA", "WARNER BROS"
      ],
      ITALY: [
        "FERRARI", "ENEL", "INTESA SAN PAOLO", "STELLANTIS", "ENI", "GENERALI", "ST MICRO",
        "TENARIS", "MONCLER", "POSTE ITALIANE", "TERNA", "PRYSMIAN", "SNAM", "LEONARDO",
        "MEDIOBANCA", "CAMPARI", "BPM", "FINECO BANK", "UNICREDIT"
      ],
      GERMANY: [
        "ADIDAS", "AIRBUS", "ALLIANZ", "BASF", "BAYER", "BMW", "COMMERZBANK", "CONTINENTAL",
        "DEUTSCHE BOERSE", "DEUTSCHE BANK", "DEUTSCHE POST", "HENKEL", "MERCEDES", "MERCK",
        "PORSCHE", "SAP", "VOLKSWAGEN", "ZALANDO"
      ]
    },
    ETFs: {
      "ARTIFICIAL INTELLIGENCE": [
        "L&G ARTIFICIAL INTELLIGENCE",
        "GLOBAL X ROBO & ARTIFICIAL",
        "WISDOMTREE ARTIFICIAL INTELLIGENCE USD"
      ],
      BATTERIES: [
        "GLOBAL X LITHIUM & BATTERY",
        "L&G BATTERY VALUE-CHAIN",
        "WISDOMTREE BATTERY SOLUTIONS"
      ],
      BIOTECH: [
        "GLOBAL X GENOMICS & BIOTECHNOL",
        "INVESCO NASDAQ BIOTECH",
        "iShares NASDAQ US BIOTECH",
        "WISDOMTREE BIOREVOLUTION"
      ],
      BONDS: [
        "GLOBAL X GENOMICS & BATTERYNO L",
        "ISHARES CORE EU GOVT BOND",
        "ISHARES $ TREASURY 3-7YR",
        "VANGUARD USD CORPORATE BOND"
      ],
      COMMODITIES: [
        "INVESCO BLOOMBERG COMMODITY",
        "WISDOMTREE WHEAT",
        "WISDOMTREE COFFEE",
        "WISDOMTREE CORN",
        "WISDOMTREE NATURAL GAS",
        "WISDOMTREE SUGAR",
        "WISDOMTREE COTTON",
        "WISDOMTREE WTI CRUDE OIL",
        "WISDOMTREE COPPER",
        "WISDOMTREE NICKEL",
        "WISDOMTREE ALUMINIUN"
      ],
      "ENERGY TRANSITION": [
        "AMUNDI MSCI EUR ESG BRD CTB DR",
        "L BNPP EASY LOW CARB EUROPE",
        "L&G MSCI EUROPE CLIMATE PATHWAY",
        "JPM CARBON TRAN GLB EQUITY USD"
      ],
      METAVERSE: [
        "ISHARES METAVERSE"
      ],
      "MONEY MARKET": [
        "AMNDI FED FNDS US DOLLAR CASH",
        "PIMCO US DOLLAR SHORT MATURITY",
        "XTRACKERS MSCI EU SMALLCAP"
      ],
      ROBOTICS: [
        "ISHARES AUTOMAT & ROBOTICS",
        "L&G GLOBAL ROBO AND AUTO",
        "iShares AUTOMATION & ROBOTICS"
      ],
      SEMICONDUCTORS: [
        "VANECK SEMICONDUCTOR",
        "ISHARES MSCI GLB SEMICONDUCTOR",
        "AMUNDI MSCI SEMICONDUCTORS ESG SCREENED",
        "HSBC NASDAQ GLOB SEMICONDUCTOR"
      ],
      STOCK_MARKET: [
        "ISHARES MSCI WORLD EUR HDG",
        "ISHARES S&P 500 EUR HEDGED",
        "AMUNDI NASDAQ-100 EUR",
        "AMUNDI MSCI EMERGING MARKETS III",
        "XTRACKERS MSCI EU SMALLCAP",
        "ISHARES CORE MSCI EUROPE"
      ]
    },
    SPREAD: [
      "FTSE100 / EU50", "FTSE100 / CAC40", "CAC40 / EU50", "DAX40 / EU50", "DOW30 / S&P500",
      "DOW30 / NASDAQ100", "DOW30 / RUSSELL2000", "NASDAQ100 / S&P500", "NASDAQ100 / RUSSELL2000",
      "S&P500 / RUSSELL2000", "GOLD / SILVER", "GOLD / PLATINUM", "PLATINUM / SILVER",
      "WTI / BRENT", "CORN / WHEAT", "SOYBEANS / CORN", "BITCOIN / ETHEREUM"
    ],
    FUTURES: [
      "FTSE 100", "CAC 40", "DAX40", "FTSE MIB", "EUROSTOXX50", "S&P500", "DOW JONES",
      "NASDAQ100", "RUSSELL2000", "GOLD", "SILVER", "COPPER", "WTI", "NATURAL GAS", "CORN", "SOYBEANS"
    ],
    FX: [
      "AUDCAD", "AUDJPY", "AUDNZD", "AUDUSD", "EURAUD", "EURCAD", "EURJPY", "EURUSD",
      "GBPAUD", "GBPCAD", "GBPJPY", "GBPUSD", "NZDCAD", "NZDCHF", "NZDJPY", "NZDUSD",
      "USDCAD", "USDCHF", "USDJPY"
    ],
    CRYPTO: [
      "XRP", "SOLANA", "BNB", "DOGE", "ADA", "TRX",
      "CHAINLINK", "SUI", "AVALANCHE", "STELLAR LUMENS", "SHIBA INU", "LITECOIN",
      "POLKADOT", "MANTRA", "UNISWAP", "DAI", "PEPE"
    ],
    "PORTFOLIO BUILDER": [],
    "THEMATIC PORTFOLIO": [],
    "LIVE TV": [],
    "MEMBERS CHAT": [],
    SUPPORT: []
  };
  
  // CSV Parsing for ETFs
  const etfFullDataCSVUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRDNzpc6NaFGIb2r86Y4gc77XjqF9JBu6uVR6FILtNQsm756JkGpDS8Jt0ESb2q3i_XAqgf38huFWPl/pub?gid=1661223660&single=true&output=csv";
  let etfFullData = {};
  let etfPrices = {};
  fetch(etfFullDataCSVUrl)
    .then(resp => resp.text())
    .then(csvText => {
      const lines = csvText.trim().split('\n').map(r => r.split(','));
      const totalCols = lines[0].length; 
      for (let col = 0; col < totalCols; col++) {
        const etfName = lines[0][col].trim();
        if (!etfName) continue;
        let prices = [];
        for (let r = 1; r <= 100; r++){
          const val = parseFloat(lines[r][col]);
          if (!isNaN(val)) prices.push(val);
        }
        const summaryLeft = [];
        for (let r = 101; r <= 108; r++){
          const val = lines[r] && lines[r][col] ? lines[r][col].trim() : "";
          summaryLeft.push(val);
        }
        const summaryRight = [];
        for (let r = 109; r <= 116; r++){
          const val = lines[r] && lines[r][col] ? lines[r][col].trim() : "";
          summaryRight.push(val);
        }
        const tvSymbol = (lines[117] && lines[117][col]) ? lines[117][col].trim() : "";
        etfFullData[etfName] = { tvSymbol, summaryLeft, summaryRight };
        etfPrices[etfName] = prices;
      }
    })
    .catch(err => { console.error("Error loading new ETF summary CSV:", err); });
  
  // CSV Parsing for FUTURES
  const futuresFullDataCSVUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSB-5fS6uIw_KpcadopUGId0MaH55AS8SOaau4V0GGQ9TNI6nKibTOy_e9UmZWXj4L7aXbxVd7Awd3I/pub?gid=1387684053&single=true&output=csv";
  let futuresFullData = {};
  let futuresPrices = {};
  let futuresCorrelationDataLoaded = false;
  fetch(futuresFullDataCSVUrl)
    .then(resp => resp.text())
    .then(csvText => {
      const parsed = Papa.parse(csvText, { skipEmptyLines: true });
      const lines = parsed.data;
      const totalCols = lines[0].length;
      for (let col = 0; col < totalCols; col++) {
        let futName = lines[0][col].trim();
        if (!futName) continue;
        if (futName.replace(/\s/g, "").toUpperCase() === "FTSE100") {
            futName = "FTSE 100";
        } else if (futName.replace(/\s/g, "").toUpperCase() === "CAC40") {
            futName = "CAC 40";
        }
        let prices = [];
        for (let r = 1; r <= 100; r++) {
          if (lines[r] && lines[r][col]) {
            const cellVal = lines[r][col].replace(/,/g, '.');
            const num = parseFloat(cellVal);
            if (!isNaN(num)) prices.push(num);
          }
        }
        let summaryLeft = [];
        for (let r = 101; r <= 107; r++){
          const val = lines[r] && lines[r][col] ? lines[r][col].trim() : "";
          summaryLeft.push(val);
        }
        let summaryRight = [];
        for (let r = 108; r <= 114; r++){
          const val = lines[r] && lines[r][col] ? lines[r][col].trim() : "";
          summaryRight.push(val);
        }
        const tvSymbol = (lines[115] && lines[115][col]) ? lines[115][col].trim() : "";
        futuresFullData[futName] = { tvSymbol, summaryLeft, summaryRight };
        futuresPrices[futName] = prices;
      }
      futuresCorrelationDataLoaded = true;
    })
    .catch(err => { console.error("Error loading FUTURES summary CSV:", err); });
  
  // CSV Parsing for FX
  const fxFullDataCSVUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEnbbjI0LycvT_Z0pdwpnhYGGzqZ8jIUiKiekX_2l2OrzIyTWpmy8cDd44PwY1pzehLDH08-9EKiu7/pub?gid=1689646190&single=true&output=csv";
  let fxFullData = {};
  let fxPrices = {};
  let fxCorrelationDataLoaded = false;
  fetch(fxFullDataCSVUrl)
    .then(resp => resp.text())
    .then(csvText => {
      const parsed = Papa.parse(csvText, { skipEmptyLines: true });
      const lines = parsed.data;
      const totalCols = lines[0].length;
      for (let col = 0; col < totalCols; col++) {
        const fxName = lines[0][col].trim();
        if (!fxName) continue;
        let prices = [];
        for (let r = 1; r <= 99; r++) {
          const num = parseFloat(lines[r] && lines[r][col]);
          if (!isNaN(num)) prices.push(num);
        }
        let summaryLeft = [];
        for (let r = 100; r <= 106; r++){
          const val = lines[r] && lines[r][col] ? lines[r][col].trim() : "";
          summaryLeft.push(val);
        }
        let summaryRight = [];
        for (let r = 107; r <= 113; r++){
          const val = lines[r] && lines[r][col] ? lines[r][col].trim() : "";
          summaryRight.push(val);
        }
        const tvSymbol = (lines[114] && lines[114][col]) ? lines[114][col].trim() : "";
        fxFullData[fxName] = { tvSymbol, summaryLeft, summaryRight };
        fxPrices[fxName] = prices;
      }
      fxCorrelationDataLoaded = true;
    })
    .catch(err => { console.error("Error loading FX summary CSV:", err); });
  
  // CSV Parsing for STOCKS
  const stocksFullDataCSVUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSx30p9-V05ZEnvt4CYA1K4Xv1XmuR2Yi1rjH3yHEbaxtRPdMXfp8TNjSYYBXQQkIOu8WSaQVxmqodY/pub?gid=1481817692&single=true&output=csv";
  let stocksFullData = {};
  let stockPrices = {};
  let stocksCorrelationDataLoaded = false;
  fetch(stocksFullDataCSVUrl)
    .then(response => response.text())
    .then(csvText => {
      const lines = csvText.trim().split('\n').map(r => r.split(','));
      const totalCols = lines[0].length;
      for (let col = 0; col < totalCols; col++) {
        const instrumentName = lines[0][col].trim();
        if (!instrumentName) continue;
        let prices = [];
        for (let r = 1; r <= 100; r++) {
          const val = parseFloat(lines[r][col]);
          if (!isNaN(val)) prices.push(val);
        }
        let summaryLeft = [];
        for (let r = 101; r <= 109; r++) {
          const val = lines[r] && lines[r][col] ? lines[r][col].trim() : "";
          summaryLeft.push(val);
        }
        let summaryRight = [];
        for (let r = 110; r <= 118; r++) {
          const val = lines[r] && lines[r][col] ? lines[r][col].trim() : "";
          summaryRight.push(val);
        }
        const tvSymbol = (lines[119] && lines[119][col]) ? lines[119][col].trim() : "";
        stocksFullData[instrumentName] = { tvSymbol, summaryLeft, summaryRight };
        stockPrices[instrumentName] = prices;
      }
      stocksCorrelationDataLoaded = true;
      if (currentInstrument === "AMAZON") {
        updateBlock3("AMAZON");
        updateBlock4("AMAZON");
      }
    })
    .catch(err => { console.error("Error loading single CSV for STOCKS:", err); });
  
  /* ===============================
     CORRELATION HELPERS & CHARTS
     =============================== */
  
  const pearsonCorrelation = (x, y) => {
    const n = x.length;
    if (y.length !== n || n === 0) return 0;
    const meanX = x.reduce((a, b) => a + b, 0) / n;
    const meanY = y.reduce((a, b) => a + b, 0) / n;
    let numerator = 0, denomX = 0, denomY = 0;
    for (let i = 0; i < n; i++){
      const dx = x[i] - meanX;
      const dy = y[i] - meanY;
      numerator += dx * dy;
      denomX += dx * dx;
      denomY += dy * dy;
    }
    if (denomX === 0 || denomY === 0) return 0;
    return numerator / Math.sqrt(denomX * denomY);
  };
  
  function drawMostCorrelatedChart(top10) {
    let chartContainer = document.getElementById('block4chart');
    if (!chartContainer) {
      chartContainer = document.createElement('div');
      chartContainer.id = "block4chart";
      document.getElementById("block4").appendChild(chartContainer);
    }
    chartContainer.innerHTML = '<canvas id="correlationChart"></canvas>';
    chartContainer.style.height = '100%';
    const ctx = document.getElementById('correlationChart').getContext('2d');
    const labels = top10.map(item => item[0]);
    const data = top10.map(item => item[1]);
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'CORRELATION',
          data: data,
          backgroundColor: 'rgba(255, 165, 0, 0.7)',
          borderColor: 'rgba(255, 165, 0, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        scales: {
          x: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.2)' } },
          y: { ticks: { color: 'white' }, grid: { color: 'rgba(255,255,255,0.2)' } }
        },
        plugins: {
          legend: { display: false },
          title: {
            display: true,
            text: '10 MOST CORRELATED INSTRUMENTS',
            color: 'white',
            font: { size: 14, family: 'Arial' }
          }
        }
      }
    });
  }
  
  const getCorrelationListForCategory = (instrumentName, category) => {
    let selectedData = null, compareList = [];
    if (category === "stocks") {
      selectedData = stockPrices[instrumentName];
      compareList = Object.keys(stockPrices);
    } else if (category === "etfs") {
      selectedData = etfPrices[instrumentName];
      compareList = Object.keys(etfPrices);
    } else if (category === "futures") {
      selectedData = futuresPrices[instrumentName];
      compareList = Object.keys(futuresPrices);
    } else if (category === "fx") {
      selectedData = fxPrices[instrumentName];
      compareList = Object.keys(fxPrices);
    } else if (category === "all") {
      selectedData = stockPrices[instrumentName] || etfPrices[instrumentName] || futuresPrices[instrumentName] || fxPrices[instrumentName];
      compareList = [
        ...Object.keys(stockPrices),
        ...Object.keys(etfPrices),
        ...Object.keys(futuresPrices),
        ...Object.keys(fxPrices)
      ];
    } else {
      return [];
    }
    if (!selectedData || selectedData.length === 0) return [];
    compareList = compareList.filter(name => name !== instrumentName);
    const correlations = [];
    compareList.forEach(other => {
      let otherData = stockPrices[other] || etfPrices[other] || futuresPrices[other] || fxPrices[other];
      if (otherData) { correlations.push([other, pearsonCorrelation(selectedData, otherData)]); }
    });
    correlations.sort((a, b) => b[1] - a[1]);
    return correlations.slice(0, 10);
  };
  
  const showTabCorrelation = (instrumentName, category) => {
    const block4 = document.getElementById("block4");
    block4.querySelectorAll("#block4chart, #block4-message").forEach(el => el.remove());
    if ((category === "stocks" && !stocksCorrelationDataLoaded) ||
        (category === "futures" && !futuresCorrelationDataLoaded) ||
        (category === "fx" && !fxCorrelationDataLoaded)) {
      const loadingMsg = document.createElement('p');
      loadingMsg.id = "block4-message"; 
      loadingMsg.style.color = "white";
      loadingMsg.textContent = "Loading correlation data...";
      block4.appendChild(loadingMsg);
      return;
    }
    const result = getCorrelationListForCategory(instrumentName, category);
    if (typeof result === "string") {
      const msg = document.createElement('p');
      msg.id = "block4-message"; 
      msg.style.color = "white";
      msg.textContent = result;
      block4.appendChild(msg);
      return;
    }
    if (!result || result.length === 0) {
      const msg = document.createElement('p');
      msg.id = "block4-message"; 
      msg.style.color = "white";
      msg.textContent = "No correlation data found for " + instrumentName;
      block4.appendChild(msg);
      return;
    }
    drawMostCorrelatedChart(result);
  };
  
  const updateBlock4 = (instrumentName) => {
    const block4 = document.getElementById("block4");
    block4.innerHTML = '<div class="loading-message"><span>CALCULATING...</span></div>';
    let defaultCategory = "stocks";
    if (etfPrices[instrumentName] && etfPrices[instrumentName].length > 0) { defaultCategory = "etfs"; }
    if (futuresPrices[instrumentName] && futuresPrices[instrumentName].length > 0) { defaultCategory = "futures"; }
    if (fxPrices[instrumentName] && fxPrices[instrumentName].length > 0) { defaultCategory = "fx"; }
    setTimeout(() => {
      block4.innerHTML = "";
      showTabCorrelation(instrumentName, defaultCategory);
    }, 300);
  };
  
  const updateChartGeneric = (instrumentName, dataObj) => {
    const info = dataObj[instrumentName];
    const symbol = (info && info.tvSymbol) ? info.tvSymbol : "NASDAQ:AMZN";
    const block1 = document.getElementById("block1");
    const container = block1.querySelector(".tradingview-widget-container");
    container.innerHTML = '<div class="tradingview-widget-container__widget" style="height:calc(100% - 32px);width:100%"></div>';
    var script = document.createElement('script');
    script.type = "text/javascript";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.textContent = `{
        "autosize": true,
        "symbol": "${symbol}",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "withdateranges": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": false,
        "backgroundColor": "#001122",
        "details": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com"
    }`;
    container.appendChild(script);
  };
  
  const updateChart = (instrumentName) => updateChartGeneric(instrumentName, stocksFullData);
  const updateChartETF = (instrumentName) => updateChartGeneric(instrumentName, etfFullData);
  const updateChartFutures = (instrumentName) => updateChartGeneric(instrumentName, futuresFullData);
  const updateChartFX = (instrumentName) => updateChartGeneric(instrumentName, fxFullData);
  
  const updateSymbolOverviewGeneric = (instrumentName, dataObj) => {
    const info = dataObj[instrumentName];
    const symbol = (info && info.tvSymbol) ? info.tvSymbol : "NASDAQ:AMZN";
    const block2 = document.getElementById("block2");
    const container = block2.querySelector("#symbol-info-container");
    container.innerHTML = `<div class="tradingview-widget-container__widget"></div>`;
    const overviewScript = document.createElement('script');
    overviewScript.type = "text/javascript";
    overviewScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
    overviewScript.async = true;
    overviewScript.textContent = `
      {
        "symbols": [
          [ "${symbol}|1D" ]
        ],
        "chartOnly": false,
        "width": "100%",
        "height": "100%",
        "locale": "en",
        "colorTheme": "dark",
        "autosize": true,
        "showVolume": false,
        "showMA": false,
        "hideDateRanges": false,
        "hideMarketStatus": false,
        "hideSymbolLogo": false,
        "scalePosition": "right",
        "scaleMode": "Normal",
        "fontFamily": "-apple-system, BlinkMacSystemFont, Roboto, Ubuntu, sans-serif",
        "fontSize": "10",
        "noTimeScale": false,
        "valuesTracking": "1",
        "changeMode": "price-and-percent",
        "chartType": "area",
        "maLineColor": "#2962FF",
        "maLineWidth": 1,
        "maLength": 9,
        "headerFontSize": "medium",
        "backgroundColor": "rgba(19, 23, 34, 0)",
        "widgetFontColor": "rgba(255, 152, 0, 1)",
        "lineWidth": 2,
        "lineType": 0,
        "dateRanges": [ "1d|1", "1m|30", "3m|60", "12m|1D", "60m|1W", "all|1M" ]
      }
    `;
    container.appendChild(overviewScript);
  };
  
  const updateSymbolOverview = (instrumentName) => updateSymbolOverviewGeneric(instrumentName, stocksFullData);
  const updateSymbolOverviewETF = (instrumentName) => updateSymbolOverviewGeneric(instrumentName, etfFullData);
  const updateSymbolOverviewFutures = (instrumentName) => updateSymbolOverviewGeneric(instrumentName, futuresFullData);
  const updateSymbolOverviewFX = (instrumentName) => updateSymbolOverviewGeneric(instrumentName, fxFullData);
  
  let currentInstrument = "AMAZON";
  
  function generateSidebarContent() {
    const sidebarList = document.getElementById('sidebar-list');
    const skipCategories = ["SPREAD", "CRYPTO", "MEMBERS CHAT", "SUPPORT"];
    Object.keys(data).forEach(category => {
      if (skipCategories.includes(category)) return;
      let displayName = (category === "THEMATIC PORTFOLIO") ? "PORTFOLIO IDEAS" : category;
      const items = data[category];
      if (Array.isArray(items)) {
        const categoryItem = document.createElement('li');
        categoryItem.textContent = displayName;
        sidebarList.appendChild(categoryItem);
        if (items.length > 0) {
          categoryItem.classList.add('expandable');
          const toggleBtn = document.createElement('div');
          toggleBtn.classList.add('toggle-btn');
          toggleBtn.innerHTML = `${displayName} <span>+</span>`;
          categoryItem.textContent = '';
          categoryItem.appendChild(toggleBtn);
          const subList = document.createElement('ul');
          subList.classList.add('sub-list');
          items.forEach(instrument => {
            const listItem = document.createElement('li');
            listItem.classList.add("instrument-item");
            listItem.textContent = instrument;
            subList.appendChild(listItem);
          });
          categoryItem.appendChild(subList);
          toggleBtn.addEventListener('click', () => {
            categoryItem.classList.toggle('expanded');
            const span = toggleBtn.querySelector('span');
            span.textContent = categoryItem.classList.contains('expanded') ? '-' : '+';
          });
        }
      } else {
        const categoryItem = document.createElement('li');
        categoryItem.classList.add('expandable');
        const toggleBtn = document.createElement('div');
        toggleBtn.classList.add('toggle-btn');
        toggleBtn.innerHTML = `${displayName} <span>+</span>`;
        categoryItem.appendChild(toggleBtn);
        const subList = document.createElement('ul');
        subList.classList.add('sub-list');
        Object.keys(items).forEach(subCategory => {
          const subCategoryItem = document.createElement('li');
          subCategoryItem.classList.add('expandable');
          const subToggleBtn = document.createElement('div');
          subToggleBtn.classList.add('toggle-btn');
          subToggleBtn.innerHTML = `${subCategory} <span>+</span>`;
          subCategoryItem.appendChild(subToggleBtn);
          const instrumentList = document.createElement('ul');
          instrumentList.classList.add('sub-list');
          items[subCategory].forEach(instrument => {
            const instrumentItem = document.createElement('li');
            instrumentItem.classList.add("instrument-item");
            instrumentItem.textContent = instrument;
            instrumentList.appendChild(instrumentItem);
          });
          subCategoryItem.appendChild(instrumentList);
          subList.appendChild(subCategoryItem);
          subToggleBtn.addEventListener('click', () => {
            subCategoryItem.classList.toggle('expanded');
            const span = subToggleBtn.querySelector('span');
            span.textContent = subCategoryItem.classList.contains('expanded') ? '-' : '+';
          });
        });
        categoryItem.appendChild(subList);
        sidebarList.appendChild(categoryItem);
        toggleBtn.addEventListener('click', () => {
          categoryItem.classList.toggle('expanded');
          const span = toggleBtn.querySelector('span');
          span.textContent = categoryItem.classList.contains('expanded') ? '-' : '+';
        });
      }
    });
    const sidebarListEl = document.getElementById("sidebar-list");
    const fullscreenPlatformItem = document.createElement("li");
    fullscreenPlatformItem.id = "sidebar-fullscreen";
    fullscreenPlatformItem.textContent = "FULL SCREEN PLATFORM";
    fullscreenPlatformItem.style.cursor = "pointer";
    fullscreenPlatformItem.style.display = "none";
    sidebarListEl.appendChild(fullscreenPlatformItem);
    fullscreenPlatformItem.addEventListener("click", (e) => {
      e.stopPropagation();
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    });
  }
  generateSidebarContent();
  
  document.addEventListener('click', (e) => {
    if (e.target && e.target.tagName === 'LI') {
      if (!e.target.classList.contains('expandable')) {
        if (e.target.id === "sidebar-fullscreen") return;
        if (e.target.textContent.trim().toUpperCase() === "LIVE TV") {
          openYouTubePopup();
          return;
        }
        document.querySelectorAll('#sidebar li.selected').forEach(item => item.classList.remove('selected'));
        e.target.classList.add('selected');
        const instrumentName = e.target.textContent.trim();
        if (instrumentName.toUpperCase() === "PORTFOLIO BUILDER") {
          document.getElementById("main-content").style.display = "none";
          document.getElementById("thematic-portfolio-template").style.display = "none";
          document.getElementById("portfolio-builder-template").style.display = "block";
          loadPortfolioBuilder();
          return;
        } else if (instrumentName.toUpperCase() === "THEMATIC PORTFOLIO" || instrumentName.toUpperCase() === "PORTFOLIO IDEAS") {
          document.getElementById("main-content").style.display = "none";
          document.getElementById("portfolio-builder-template").style.display = "none";
          document.getElementById("thematic-portfolio-template").style.display = "block";
          loadThematicPortfolio();
          return;
        } else {
          document.getElementById("portfolio-builder-template").style.display = "none";
          document.getElementById("thematic-portfolio-template").style.display = "none";
          document.getElementById("main-content").style.display = "grid";
        }
        currentInstrument = instrumentName;
        if (stocksFullData[instrumentName]) {
          updateChart(instrumentName);
          updateSymbolOverview(instrumentName);
          updateBlock3(instrumentName);
          updateBlock4(instrumentName);
        } else if (etfFullData[instrumentName]) {
          updateChartETF(instrumentName);
          updateSymbolOverviewETF(instrumentName);
          updateBlock3ETF(instrumentName);
          updateBlock4(instrumentName);
        } else if (futuresFullData[instrumentName]) {
          updateChartFutures(instrumentName);
          updateSymbolOverviewFutures(instrumentName);
          updateBlock3Futures(instrumentName);
          updateBlock4(instrumentName);
        } else if (fxFullData[instrumentName]) {
          updateChartFX(instrumentName);
          updateSymbolOverviewFX(instrumentName);
          updateBlock3FX(instrumentName);
          updateBlock4(instrumentName);
        } else {
          updateBlock3(instrumentName);
        }
      }
    }
  });
  
  document.getElementById("block3-trendscore").innerHTML = '<div class="loading-message"><span>CALCULATING...</span></div>';
  document.getElementById("block4").innerHTML = '<div class="loading-message"><span>CALCULATING...</span></div>';
  updateSymbolOverview("AMAZON");
  updateBlock3("AMAZON");
  updateBlock4("AMAZON");
  
  const block3TabButtons = document.querySelectorAll("#block3-tabs button");
  block3TabButtons.forEach(btn => {
    btn.addEventListener("click", () => { showBlock3Tab(btn.dataset.tab); });
  });
  function showBlock3Tab(tabName) {
    const trendBtn = document.querySelector('#block3-tabs button[data-tab="trendscore"]');
    const tvBtn = document.querySelector('#block3-tabs button[data-tab="tradingview"]');
    const trendDiv = document.getElementById('block3-trendscore');
    const tvDiv = document.getElementById('block3-tradingview');
    trendBtn.classList.remove('active-tab');
    tvBtn.classList.remove('active-tab');
    trendDiv.style.display = 'none';
    tvDiv.style.display = 'none';
    if (tabName === 'trendscore') {
      trendBtn.classList.add('active-tab');
      trendDiv.style.display = 'block';
    } else {
      tvBtn.classList.add('active-tab');
      tvDiv.style.display = 'block';
    }
  }
  
  document.getElementById("fullscreen-button").addEventListener("click", () => {
    const block1 = document.getElementById("block1");
    if (block1.requestFullscreen) { block1.requestFullscreen(); }
    else if (block1.webkitRequestFullscreen) { block1.webkitRequestFullscreen(); }
    else { console.error("Fullscreen API not supported"); }
  });
  
  document.addEventListener("fullscreenchange", () => {
    const btn = document.getElementById("fullscreen-button");
    const block1 = document.getElementById("block1");
    if (document.fullscreenElement === null) {
      btn.innerHTML = '<span class="arrow">&#8598;</span><span class="arrow">&#8599;</span><br><span class="arrow">&#8601;</span><span class="arrow">&#8600;</span>';
    } else {
      btn.innerHTML = '<span class="arrow">&#8598;</span><span class="arrow">&#8599;</span><br><span class="arrow">&#8601;</span><span class="arrow">&#8600;</span>';
    }
  });
  
  document.addEventListener("fullscreenchange", () => {
    const sidebarFS = document.getElementById("sidebar-fullscreen");
    if (sidebarFS) {
      if (document.fullscreenElement) {
        sidebarFS.textContent = "EXIT FULLSCREEN PLATFORM";
      } else {
        sidebarFS.textContent = "FULL SCREEN PLATFORM";
      }
    }
  });
  
  function openYouTubePopup() {
    document.getElementById("youtube-popup").style.display = "block";
    $("#youtube-popup").draggable({ handle: "#youtube-popup-header" });
  }
  
  function updateYouTubePlayer() {
    var url = document.getElementById("youtube-url").value.trim();
    document.getElementById("youtube-iframe").src = url;
  }
  
  document.getElementById("youtube-popup-close").addEventListener("click", function() {
    document.getElementById("youtube-popup").style.display = "none";
  });
});
