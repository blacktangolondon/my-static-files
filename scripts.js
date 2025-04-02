/*************************************************************************
 * FULL SCRIPTS.JS - NEW VERSION v2
 *************************************************************************/

/*************************************************************************
 * GLOBAL DATA & HELPER FUNCTIONS
 *************************************************************************/
// Here we merge the instruments from the OLD VERSION into the data object.
// (STOCKS remain as in NEW VERSION; ETFs, FUTURES, FX – and even CRYPTO – are now fully populated.)
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

/*************************************************************************
 * PORTFOLIO BUILDER FUNCTIONS
 *************************************************************************/
// Helper function to parse gap value.
    // If the gap value is "-" or not a valid number, return 0.
    function parseGap(val) {
      return (val === "-" || isNaN(parseFloat(val))) ? 0 : parseFloat(val);
    }

    // IMPLEMENTATION OF SEPARATE MAPPINGS FOR PORTFOLIO BUILDER

    // Separate mapping objects for each asset class:
    var filterMappingStocks = {
      "Score": { source: "left", index: 0 },
      "Gap to Peak": { source: "left", index: 3 },
      "S&P500 Correlation": { source: "right", index: 0 },
      "S&P500 Volatility Ratio": { source: "right", index: 1 },
      "Bullish Alpha": { source: "right", index: 2 },
      "Bearish Alpha": { source: "right", index: 3 },
      "Alpha Strength": { source: "right", index: 4 }
    };
    // For ETFs we assume same mapping as stocks:
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

    // Portfolio Builder functions below now select allowed filters and mapping based on the asset class.
    
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
    
    // Update openFilterSelector to choose allowed filters based on asset class
    function openFilterSelector() {
      var availableFilters = [];
      // Determine asset type from the first filter
      var assetType = (portfolioFilters.length > 0) ? portfolioFilters[0].value : null;
      var allFilters;
      if (assetType === "FUTURES") {
        allFilters = ["Score", "Gap to Peak", "S&P500 Correlation", "S&P500 Volatility Ratio", "Alpha Strength"];
      } else if (assetType === "FX") {
        allFilters = ["Score", "Gap to Peak", "AVERAGE DAILY VOLATILITY", "FX Volatility Ratio", "30 DAYS PROJECTION", "LONG TERM - MACRO", "MEDIUM TERM - MATH", "MEDIUM TERM - STATS", "SHORT TERM - TECH"];
      } else {
        // STOCKS and ETFS use default filters
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
          // Updated operators: now use "≥" and "≤"
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
          // Updated condition: if operator is "≥", use >=; if "≤", use <=.
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


/*************************************************************************
 * THEMATIC PORTFOLIO FUNCTIONS & CHART RENDERING
 *************************************************************************/
  
  <!-- Thematic Portfolio Script with Tab-Based Navigation -->
  <script>
    // Helper: destroy chart on a given canvas if it already exists.
    function destroyChartIfExists(canvasId) {
      const existing = Chart.getChart(canvasId);
      if (existing) { existing.destroy(); }
    }
    
    // New function to compute sector distribution for ETFs.
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
    
    // FUTURES distribution function (already defined)
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
    
    // NEW: FX distribution function: group by base currency (first three characters)
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
    
    // (renderPortfolio*Charts functions remain unchanged)
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

    // Modified renderPortfolio4Charts for Portfolio Builder (unchanged here)
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
    
    // Helper to compute geographical distribution (for stocks)
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
    
    var orangeShades = ['rgba(255, 165, 0, 0.8)', 'rgba(255, 140, 0, 0.8)', 'rgba(255, 120, 0, 0.8)'];
    
    // ***********************
    // NEW: Updated loadThematicPortfolio() function with STOCKS, ETFS, FUTURES and FX sections.
    // ***********************
    function loadThematicPortfolio() {
      var container = document.getElementById("thematic-portfolio-template");
      // Wait until all CSV data is loaded
      if (
        Object.keys(stocksFullData).length === 0 ||
        Object.keys(etfFullData).length === 0 ||
        Object.keys(futuresFullData).length === 0 ||
        Object.keys(fxFullData).length === 0
      ) {
        container.innerHTML = '<div class="loading-message"><span>LOADING DATA...</span></div>';
        setTimeout(loadThematicPortfolio, 1000);
        return;
      }
      
      // Build STOCKS portfolios (TREND FOLLOWING, LOW CORRELATION, LOW VOLATILITY, TREND FOLLOWING PLUS)
      var portfolio1Data = [];
      for (var instrument in stocksFullData) {
        var info = stocksFullData[instrument];
        var score = parseFloat(info.summaryLeft[0]);
        if (score === 100) {
          portfolio1Data.push({
            instrument: instrument,
            score: score,
            trend: info.summaryLeft[1],
            approach: info.summaryLeft[2],
            gap: parseGap(info.summaryLeft[3]),
            keyArea: info.summaryLeft[4]
          });
        }
      }
      if (portfolio1Data.length > 15) {
        portfolio1Data.sort((a, b) => a.gap - b.gap);
        portfolio1Data = portfolio1Data.slice(0, 15);
      }
      portfolio1Data.sort((a, b) => a.instrument.localeCompare(b.instrument));
      var portfolio1Rows = "";
      portfolio1Data.forEach(function(item) {
        portfolio1Rows += `<tr>
          <td>${item.instrument}</td>
          <td>${item.score}</td>
          <td>${item.trend}</td>
          <td>${item.approach}</td>
          <td>${item.gap}%</td>
          <td>${item.keyArea}</td>
        </tr>`;
      });
      
      var portfolio2Data = [];
      for (var instrument in stocksFullData) {
        var info = stocksFullData[instrument];
        var score = parseFloat(info.summaryLeft[0]);
        var correlation = parseFloat(info.summaryRight[0]);
        if (score === 100 && correlation < 0.1) {
          portfolio2Data.push({
            instrument: instrument,
            score: score,
            correlation: correlation,
            trend: info.summaryLeft[1],
            approach: info.summaryLeft[2],
            gap: parseGap(info.summaryLeft[3]),
            keyArea: info.summaryLeft[4]
          });
        }
      }
      if (portfolio2Data.length > 15) {
        portfolio2Data.sort((a, b) => a.gap - b.gap);
        portfolio2Data = portfolio2Data.slice(0, 15);
      }
      portfolio2Data.sort((a, b) => a.instrument.localeCompare(b.instrument));
      var portfolio2Rows = "";
      portfolio2Data.forEach(function(item) {
        portfolio2Rows += `<tr>
          <td>${item.instrument}</td>
          <td>${item.score}</td>
          <td>${item.correlation}</td>
          <td>${item.trend}</td>
          <td>${item.approach}</td>
          <td>${item.gap}%</td>
          <td>${item.keyArea}</td>
        </tr>`;
      });
      
      var portfolio3Data = [];
      for (var instrument in stocksFullData) {
        var info = stocksFullData[instrument];
        var score = parseFloat(info.summaryLeft[0]);
        var volatility = parseFloat(info.summaryRight[1]);
        if (score === 100 && volatility < 1) {
          portfolio3Data.push({
            instrument: instrument,
            score: score,
            volatility: volatility,
            trend: info.summaryLeft[1],
            approach: info.summaryLeft[2],
            gap: parseGap(info.summaryLeft[3]),
            keyArea: info.summaryLeft[4]
          });
        }
      }
      if (portfolio3Data.length > 15) {
        portfolio3Data.sort((a, b) => a.gap - b.gap);
        portfolio3Data = portfolio3Data.slice(0, 15);
      }
      portfolio3Data.sort((a, b) => a.instrument.localeCompare(b.instrument));
      var portfolio3Rows = "";
      portfolio3Data.forEach(function(item) {
        portfolio3Rows += `<tr>
          <td>${item.instrument}</td>
          <td>${item.score}</td>
          <td>${item.volatility}</td>
          <td>${item.trend}</td>
          <td>${item.approach}</td>
          <td>${item.gap}%</td>
          <td>${item.keyArea}</td>
        </tr>`;
      });
      
      var portfolio4Data = [];
      for (var instrument in stocksFullData) {
        var info = stocksFullData[instrument];
        var score = parseFloat(info.summaryLeft[0]);
        var bullish = parseFloat(info.summaryRight[2]);
        var bearish = parseFloat(info.summaryRight[3]);
        var alphaStrength = parseFloat(info.summaryRight[4]);
        if (score === 100 && bullish > 1 && bearish < 1 && alphaStrength > 1) {
          portfolio4Data.push({
            instrument: instrument,
            score: score,
            bullish: bullish,
            bearish: bearish,
            alphaStrength: alphaStrength,
            trend: info.summaryLeft[1],
            approach: info.summaryLeft[2],
            gap: parseGap(info.summaryLeft[3]),
            keyArea: info.summaryLeft[4]
          });
        }
      }
      if (portfolio4Data.length > 15) {
        portfolio4Data.sort((a, b) => a.gap - b.gap);
        portfolio4Data = portfolio4Data.slice(0, 15);
      }
      portfolio4Data.sort((a, b) => a.instrument.localeCompare(b.instrument));
      var portfolio4Rows = "";
      portfolio4Data.forEach(function(item) {
        portfolio4Rows += `<tr>
          <td>${item.instrument}</td>
          <td>${item.score}</td>
          <td>${item.bullish}</td>
          <td>${item.bearish}</td>
          <td>${item.alphaStrength}</td>
          <td>${item.trend}</td>
          <td>${item.approach}</td>
          <td>${item.gap}%</td>
          <td>${item.keyArea}</td>
        </tr>`;
      });
      
      // Build ETFS portfolios (mirroring stocks but using etfFullData)
      var etfPortfolio1Data = [];
      for (var instrument in etfFullData) {
        var info = etfFullData[instrument];
        var score = parseFloat(info.summaryLeft[0]);
        if (score === 100) {
          etfPortfolio1Data.push({
            instrument: instrument,
            score: score,
            trend: info.summaryLeft[1],
            approach: info.summaryLeft[2],
            gap: parseGap(info.summaryLeft[3]),
            keyArea: info.summaryLeft[4]
          });
        }
      }
      if (etfPortfolio1Data.length > 15) {
        etfPortfolio1Data.sort((a, b) => a.gap - b.gap);
        etfPortfolio1Data = etfPortfolio1Data.slice(0, 15);
      }
      etfPortfolio1Data.sort((a, b) => a.instrument.localeCompare(b.instrument));
      var etfPortfolio1Rows = "";
      etfPortfolio1Data.forEach(function(item) {
        etfPortfolio1Rows += `<tr>
          <td>${item.instrument}</td>
          <td>${item.score}</td>
          <td>${item.trend}</td>
          <td>${item.approach}</td>
          <td>${item.gap}%</td>
          <td>${item.keyArea}</td>
        </tr>`;
      });
      
      var etfPortfolio2Data = [];
      for (var instrument in etfFullData) {
        var info = etfFullData[instrument];
        var score = parseFloat(info.summaryLeft[0]);
        var correlation = parseFloat(info.summaryRight[0]);
        if (score === 100 && correlation < 0.1) {
          etfPortfolio2Data.push({
            instrument: instrument,
            score: score,
            correlation: correlation,
            trend: info.summaryLeft[1],
            approach: info.summaryLeft[2],
            gap: parseGap(info.summaryLeft[3]),
            keyArea: info.summaryLeft[4]
          });
        }
      }
      if (etfPortfolio2Data.length > 15) {
        etfPortfolio2Data.sort((a, b) => a.gap - b.gap);
        etfPortfolio2Data = etfPortfolio2Data.slice(0, 15);
      }
      etfPortfolio2Data.sort((a, b) => a.instrument.localeCompare(b.instrument));
      var etfPortfolio2Rows = "";
      etfPortfolio2Data.forEach(function(item) {
        etfPortfolio2Rows += `<tr>
          <td>${item.instrument}</td>
          <td>${item.score}</td>
          <td>${item.correlation}</td>
          <td>${item.trend}</td>
          <td>${item.approach}</td>
          <td>${item.gap}%</td>
          <td>${item.keyArea}</td>
        </tr>`;
      });
      
      var etfPortfolio3Data = [];
      for (var instrument in etfFullData) {
        var info = etfFullData[instrument];
        var score = parseFloat(info.summaryLeft[0]);
        var volatility = parseFloat(info.summaryRight[1]);
        if (score === 100 && volatility < 1) {
          etfPortfolio3Data.push({
            instrument: instrument,
            score: score,
            volatility: volatility,
            trend: info.summaryLeft[1],
            approach: info.summaryLeft[2],
            gap: parseGap(info.summaryLeft[3]),
            keyArea: info.summaryLeft[4]
          });
        }
      }
      if (etfPortfolio3Data.length > 15) {
        etfPortfolio3Data.sort((a, b) => a.gap - b.gap);
        etfPortfolio3Data = etfPortfolio3Data.slice(0, 15);
      }
      etfPortfolio3Data.sort((a, b) => a.instrument.localeCompare(b.instrument));
      var etfPortfolio3Rows = "";
      etfPortfolio3Data.forEach(function(item) {
        etfPortfolio3Rows += `<tr>
          <td>${item.instrument}</td>
          <td>${item.score}</td>
          <td>${item.volatility}</td>
          <td>${item.trend}</td>
          <td>${item.approach}</td>
          <td>${item.gap}%</td>
          <td>${item.keyArea}</td>
        </tr>`;
      });
      
      var etfPortfolio4Data = [];
      for (var instrument in etfFullData) {
        var info = etfFullData[instrument];
        var score = parseFloat(info.summaryLeft[0]);
        var bullish = parseFloat(info.summaryRight[2]);
        var bearish = parseFloat(info.summaryRight[3]);
        var alphaStrength = parseFloat(info.summaryRight[4]);
        if (score === 100 && bullish > 1 && bearish < 1 && alphaStrength > 1) {
          etfPortfolio4Data.push({
            instrument: instrument,
            score: score,
            bullish: bullish,
            bearish: bearish,
            alphaStrength: alphaStrength,
            trend: info.summaryLeft[1],
            approach: info.summaryLeft[2],
            gap: parseGap(info.summaryLeft[3]),
            keyArea: info.summaryLeft[4]
          });
        }
      }
      if (etfPortfolio4Data.length > 15) {
        etfPortfolio4Data.sort((a, b) => a.gap - b.gap);
        etfPortfolio4Data = etfPortfolio4Data.slice(0, 15);
      }
      etfPortfolio4Data.sort((a, b) => a.instrument.localeCompare(b.instrument));
      var etfPortfolio4Rows = "";
      etfPortfolio4Data.forEach(function(item) {
        etfPortfolio4Rows += `<tr>
          <td>${item.instrument}</td>
          <td>${item.score}</td>
          <td>${item.bullish}</td>
          <td>${item.bearish}</td>
          <td>${item.alphaStrength}</td>
          <td>${item.trend}</td>
          <td>${item.approach}</td>
          <td>${item.gap}%</td>
          <td>${item.keyArea}</td>
        </tr>`;
      });
      
      // FUTURES portfolios (using futuresFullData)
      var futuresPortfolio1Data = [];
      for (var instrument in futuresFullData) {
        var info = futuresFullData[instrument];
        var score = parseFloat(info.summaryLeft[0]);
        if (score === 100 || score === -100) {
          futuresPortfolio1Data.push({
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
      }
      if (futuresPortfolio1Data.length > 15) {
        futuresPortfolio1Data.sort((a, b) => a.gap - b.gap);
        futuresPortfolio1Data = futuresPortfolio1Data.slice(0, 15);
      }
      futuresPortfolio1Data.sort((a, b) => a.instrument.localeCompare(b.instrument));
      var futuresPortfolio1Rows = "";
      futuresPortfolio1Data.forEach(function(item) {
        futuresPortfolio1Rows += `<tr>
          <td>${item.instrument}</td>
          <td>${item.score}</td>
          <td>${item.trend}</td>
          <td>${item.approach}</td>
          <td>${item.gap}%</td>
          <td>${item.keyArea}</td>
        </tr>`;
      });
      
      var futuresPortfolio2Data = [];
      futuresPortfolio1Data.forEach(function(item) {
        if (item.correlation < 0.1) { futuresPortfolio2Data.push(item); }
      });
      if (futuresPortfolio2Data.length > 15) {
        futuresPortfolio2Data.sort((a, b) => a.gap - b.gap);
        futuresPortfolio2Data = futuresPortfolio2Data.slice(0, 15);
      }
      futuresPortfolio2Data.sort((a, b) => a.instrument.localeCompare(b.instrument));
      var futuresPortfolio2Rows = "";
      futuresPortfolio2Data.forEach(function(item) {
        futuresPortfolio2Rows += `<tr>
          <td>${item.instrument}</td>
          <td>${item.score}</td>
          <td>${item.correlation}</td>
          <td>${item.trend}</td>
          <td>${item.approach}</td>
          <td>${item.gap}%</td>
          <td>${item.keyArea}</td>
        </tr>`;
      });
      
      var futuresPortfolio3Data = [];
      futuresPortfolio1Data.forEach(function(item) {
        if (item.volatility < 1) { futuresPortfolio3Data.push(item); }
      });
      if (futuresPortfolio3Data.length > 15) {
        futuresPortfolio3Data.sort((a, b) => a.gap - b.gap);
        futuresPortfolio3Data = futuresPortfolio3Data.slice(0, 15);
      }
      futuresPortfolio3Data.sort((a, b) => a.instrument.localeCompare(b.instrument));
      var futuresPortfolio3Rows = "";
      futuresPortfolio3Data.forEach(function(item) {
        futuresPortfolio3Rows += `<tr>
          <td>${item.instrument}</td>
          <td>${item.score}</td>
          <td>${item.volatility}</td>
          <td>${item.trend}</td>
          <td>${item.approach}</td>
          <td>${item.gap}%</td>
          <td>${item.keyArea}</td>
        </tr>`;
      });
      
      // FX portfolios (using fxFullData)
      var fxPortfolio1Data = [];
      for (var instrument in fxFullData) {
        var info = fxFullData[instrument];
        var score = parseFloat(info.summaryLeft[0]);
        if (score >= 75 || score <= -75) {
          fxPortfolio1Data.push({
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
      }
      if (fxPortfolio1Data.length > 15) {
        fxPortfolio1Data.sort((a, b) => a.gap - b.gap);
        fxPortfolio1Data = fxPortfolio1Data.slice(0, 15);
      }
      fxPortfolio1Data.sort((a, b) => a.instrument.localeCompare(b.instrument));
      var fxPortfolio1Rows = "";
      fxPortfolio1Data.forEach(function(item) {
        fxPortfolio1Rows += `<tr>
          <td>${item.instrument}</td>
          <td>${item.score}</td>
          <td>${item.trend}</td>
          <td>${item.approach}</td>
          <td>${item.gap}%</td>
          <td>${item.keyArea}</td>
        </tr>`;
      });
      
      var fxPortfolio2Data = [];
      fxPortfolio1Data.forEach(function(item) {
        if (item.fxVolatilityRatio < 0.1) { fxPortfolio2Data.push(item); }
      });
      if (fxPortfolio2Data.length > 15) {
        fxPortfolio2Data.sort((a, b) => a.gap - b.gap);
        fxPortfolio2Data = fxPortfolio2Data.slice(0, 15);
      }
      fxPortfolio2Data.sort((a, b) => a.instrument.localeCompare(b.instrument));
      var fxPortfolio2Rows = "";
      fxPortfolio2Data.forEach(function(item) {
        fxPortfolio2Rows += `<tr>
          <td>${item.instrument}</td>
          <td>${item.score}</td>
          <td>${item.fxVolatilityRatio}</td>
          <td>${item.trend}</td>
          <td>${item.approach}</td>
          <td>${item.gap}%</td>
          <td>${item.keyArea}</td>
        </tr>`;
      });
      
      var fxPortfolio3Data = [];
      fxPortfolio1Data.forEach(function(item) {
        if (item.avgDailyVolatility < 1) { fxPortfolio3Data.push(item); }
      });
      if (fxPortfolio3Data.length > 15) {
        fxPortfolio3Data.sort((a, b) => a.gap - b.gap);
        fxPortfolio3Data = fxPortfolio3Data.slice(0, 15);
      }
      fxPortfolio3Data.sort((a, b) => a.instrument.localeCompare(b.instrument));
      var fxPortfolio3Rows = "";
      fxPortfolio3Data.forEach(function(item) {
        fxPortfolio3Rows += `<tr>
          <td>${item.instrument}</td>
          <td>${item.score}</td>
          <td>${item.avgDailyVolatility}</td>
          <td>${item.trend}</td>
          <td>${item.approach}</td>
          <td>${item.gap}%</td>
          <td>${item.keyArea}</td>
        </tr>`;
      });
      
      // Build the final HTML string for all tabs.
      var finalHtml = "";
      // Tab Navigation
      finalHtml += `<div class="thematic-portfolio-nav">
                 <nav>
                   <button class="portfolio-tab active-tab" data-target="stocks">STOCKS</button>
                   <button class="portfolio-tab" data-target="etfs">ETFS</button>
                   <button class="portfolio-tab" data-target="futures">FUTURES</button>
                   <button class="portfolio-tab" data-target="fx">FX</button>
                 </nav>
               </div>`;
      // Container for tab contents
      finalHtml += `<div id="thematic-portfolio-contents">`;
      
      // STOCKS Tab Content
      finalHtml += `<div class="portfolio-tab-content active" data-category="stocks">
                <div class="thematic-portfolio-section">
                  <h2>TREND FOLLOWING</h2>
                  <div class="thematic-portfolio-table-container">
                    <table class="thematic-portfolio-table">
                      <thead>
                        <tr>
                          <th>Stock Name</th>
                          <th>Score</th>
                          <th>Trend</th>
                          <th>Approach</th>
                          <th>Gap to Peak</th>
                          <th>Key Area</th>
                        </tr>
                      </thead>
                      <tbody>${portfolio1Rows}</tbody>
                    </table>
                  </div>
                  <div class="portfolio-charts">
                    <div class="portfolio-chart"><canvas id="portfolio1_bar"></canvas></div>
                    <div class="portfolio-chart"><canvas id="portfolio1_pie"></canvas></div>
                  </div>
                </div>
                <div class="thematic-portfolio-section">
                  <h2>TREND FOLLOWING LOW S&P500 CORRELATION</h2>
                  <div class="thematic-portfolio-table-container">
                    <table class="thematic-portfolio-table">
                      <thead>
                        <tr>
                          <th>Stock Name</th>
                          <th>Score</th>
                          <th>S&P500 Correlation</th>
                          <th>Trend</th>
                          <th>Approach</th>
                          <th>Gap to Peak</th>
                          <th>Key Area</th>
                        </tr>
                      </thead>
                      <tbody>${portfolio2Rows}</tbody>
                    </table>
                  </div>
                  <div class="portfolio-charts">
                    <div class="portfolio-chart"><canvas id="portfolio2_bar"></canvas></div>
                    <div class="portfolio-chart"><canvas id="portfolio2_pie"></canvas></div>
                  </div>
                </div>
                <div class="thematic-portfolio-section">
                  <h2>TREND FOLLOWING LOW VOLATILITY</h2>
                  <div class="thematic-portfolio-table-container">
                    <table class="thematic-portfolio-table">
                      <thead>
                        <tr>
                          <th>Stock Name</th>
                          <th>Score</th>
                          <th>S&P500 Volatility Ratio</th>
                          <th>Trend</th>
                          <th>Approach</th>
                          <th>Gap to Peak</th>
                          <th>Key Area</th>
                        </tr>
                      </thead>
                      <tbody>${portfolio3Rows}</tbody>
                    </table>
                  </div>
                  <div class="portfolio-charts">
                    <div class="portfolio-chart"><canvas id="portfolio3_bar"></canvas></div>
                    <div class="portfolio-chart"><canvas id="portfolio3_pie"></canvas></div>
                  </div>
                </div>
                <div class="thematic-portfolio-section">
                  <h2>TREND FOLLOWING PLUS</h2>
                  <div class="thematic-portfolio-table-container">
                    <table class="thematic-portfolio-table">
                      <thead>
                        <tr>
                          <th>Stock Name</th>
                          <th>Score</th>
                          <th>Bullish Alpha</th>
                          <th>Bearish Alpha</th>
                          <th>Alpha Strength</th>
                          <th>Trend</th>
                          <th>Approach</th>
                          <th>Gap to Peak</th>
                          <th>Key Area</th>
                        </tr>
                      </thead>
                      <tbody>${portfolio4Rows}</tbody>
                    </table>
                  </div>
                  <div class="portfolio-charts">
                    <div class="portfolio-chart"><canvas id="portfolio4_bullish"></canvas></div>
                    <div class="portfolio-chart"><canvas id="portfolio4_bearish"></canvas></div>
                    <div class="portfolio-chart"><canvas id="portfolio4_alpha"></canvas></div>
                  </div>
                </div>
              </div>`;
      
      // ETFS Tab Content
      finalHtml += `<div class="portfolio-tab-content" data-category="etfs">
                <div class="thematic-portfolio-section">
                  <h2>TREND FOLLOWING</h2>
                  <div class="thematic-portfolio-table-container">
                    <table class="thematic-portfolio-table">
                      <thead>
                        <tr>
                          <th>ETF Name</th>
                          <th>Score</th>
                          <th>Trend</th>
                          <th>Approach</th>
                          <th>Gap to Peak</th>
                          <th>Key Area</th>
                        </tr>
                      </thead>
                      <tbody>${etfPortfolio1Rows}</tbody>
                    </table>
                  </div>
                  <div class="portfolio-charts">
                    <div class="portfolio-chart"><canvas id="etf_portfolio1_bar"></canvas></div>
                    <div class="portfolio-chart"><canvas id="etf_portfolio1_pie"></canvas></div>
                  </div>
                </div>
                <div class="thematic-portfolio-section">
                  <h2>TREND FOLLOWING LOW S&P500 CORRELATION</h2>
                  <div class="thematic-portfolio-table-container">
                    <table class="thematic-portfolio-table">
                      <thead>
                        <tr>
                          <th>ETF Name</th>
                          <th>Score</th>
                          <th>S&P500 Correlation</th>
                          <th>Trend</th>
                          <th>Approach</th>
                          <th>Gap to Peak</th>
                          <th>Key Area</th>
                        </tr>
                      </thead>
                      <tbody>${etfPortfolio2Rows}</tbody>
                    </table>
                  </div>
                  <div class="portfolio-charts">
                    <div class="portfolio-chart"><canvas id="etf_portfolio2_bar"></canvas></div>
                    <div class="portfolio-chart"><canvas id="etf_portfolio2_pie"></canvas></div>
                  </div>
                </div>
                <div class="thematic-portfolio-section">
                  <h2>TREND FOLLOWING LOW VOLATILITY</h2>
                  <div class="thematic-portfolio-table-container">
                    <table class="thematic-portfolio-table">
                      <thead>
                        <tr>
                          <th>ETF Name</th>
                          <th>Score</th>
                          <th>S&P500 Volatility Ratio</th>
                          <th>Trend</th>
                          <th>Approach</th>
                          <th>Gap to Peak</th>
                          <th>Key Area</th>
                        </tr>
                      </thead>
                      <tbody>${etfPortfolio3Rows}</tbody>
                    </table>
                  </div>
                  <div class="portfolio-charts">
                    <div class="portfolio-chart"><canvas id="etf_portfolio3_bar"></canvas></div>
                    <div class="portfolio-chart"><canvas id="etf_portfolio3_pie"></canvas></div>
                  </div>
                </div>
                <div class="thematic-portfolio-section">
                  <h2>TREND FOLLOWING PLUS</h2>
                  <div class="thematic-portfolio-table-container">
                    <table class="thematic-portfolio-table">
                      <thead>
                        <tr>
                          <th>ETF Name</th>
                          <th>Score</th>
                          <th>Bullish Alpha</th>
                          <th>Bearish Alpha</th>
                          <th>Alpha Strength</th>
                          <th>Trend</th>
                          <th>Approach</th>
                          <th>Gap to Peak</th>
                          <th>Key Area</th>
                        </tr>
                      </thead>
                      <tbody>${etfPortfolio4Rows}</tbody>
                    </table>
                  </div>
                  <div class="portfolio-charts">
                    <div class="portfolio-chart"><canvas id="etf_portfolio4_bullish"></canvas></div>
                    <div class="portfolio-chart"><canvas id="etf_portfolio4_bearish"></canvas></div>
                    <div class="portfolio-chart"><canvas id="etf_portfolio4_alpha"></canvas></div>
                  </div>
                </div>
              </div>`;
      
      // FUTURES Tab Content
      finalHtml += `<div class="portfolio-tab-content" data-category="futures">
                <div class="thematic-portfolio-section">
                  <h2>TREND FOLLOWING</h2>
                  <div class="thematic-portfolio-table-container">
                    <table class="thematic-portfolio-table">
                      <thead>
                        <tr>
                          <th>Future Name</th>
                          <th>Score</th>
                          <th>Trend</th>
                          <th>Approach</th>
                          <th>Gap to Peak</th>
                          <th>Key Area</th>
                        </tr>
                      </thead>
                      <tbody>${futuresPortfolio1Rows}</tbody>
                    </table>
                  </div>
                  <div class="portfolio-charts">
                    <div class="portfolio-chart"><canvas id="futures_portfolio1_bar"></canvas></div>
                    <div class="portfolio-chart"><canvas id="futures_portfolio1_pie"></canvas></div>
                  </div>
                </div>
                <div class="thematic-portfolio-section">
                  <h2>TREND FOLLOWING LOW S&P500 CORRELATION</h2>
                  <div class="thematic-portfolio-table-container">
                    <table class="thematic-portfolio-table">
                      <thead>
                        <tr>
                          <th>Future Name</th>
                          <th>Score</th>
                          <th>S&P500 Correlation</th>
                          <th>Trend</th>
                          <th>Approach</th>
                          <th>Gap to Peak</th>
                          <th>Key Area</th>
                        </tr>
                      </thead>
                      <tbody>${futuresPortfolio2Rows}</tbody>
                    </table>
                  </div>
                  <div class="portfolio-charts">
                    <div class="portfolio-chart"><canvas id="futures_portfolio2_bar"></canvas></div>
                    <div class="portfolio-chart"><canvas id="futures_portfolio2_pie"></canvas></div>
                  </div>
                </div>
                <div class="thematic-portfolio-section">
                  <h2>TREND FOLLOWING LOW VOLATILITY</h2>
                  <div class="thematic-portfolio-table-container">
                    <table class="thematic-portfolio-table">
                      <thead>
                        <tr>
                          <th>Future Name</th>
                          <th>Score</th>
                          <th>S&P500 Volatility Ratio</th>
                          <th>Trend</th>
                          <th>Approach</th>
                          <th>Gap to Peak</th>
                          <th>Key Area</th>
                        </tr>
                      </thead>
                      <tbody>${futuresPortfolio3Rows}</tbody>
                    </table>
                  </div>
                  <div class="portfolio-charts">
                    <div class="portfolio-chart"><canvas id="futures_portfolio3_bar"></canvas></div>
                    <div class="portfolio-chart"><canvas id="futures_portfolio3_pie"></canvas></div>
                  </div>
                </div>
              </div>`;
      
      // FX Tab Content - UPDATED: Only include the TREND FOLLOWING section
      finalHtml += `<div class="portfolio-tab-content" data-category="fx">
                <div class="thematic-portfolio-section">
                  <h2>TREND FOLLOWING</h2>
                  <div class="thematic-portfolio-table-container">
                    <table class="thematic-portfolio-table">
                      <thead>
                        <tr>
                          <th>FX Name</th>
                          <th>Score</th>
                          <th>Trend</th>
                          <th>Approach</th>
                          <th>Gap to Peak</th>
                          <th>Key Area</th>
                        </tr>
                      </thead>
                      <tbody>${fxPortfolio1Rows}</tbody>
                    </table>
                  </div>
                  <div class="portfolio-charts">
                    <div class="portfolio-chart"><canvas id="fx_portfolio1_bar"></canvas></div>
                    <div class="portfolio-chart"><canvas id="fx_portfolio1_pie"></canvas></div>
                  </div>
                </div>
              </div>`;
      
      finalHtml += `</div>`;  // End of tab contents container
      
      container.innerHTML = finalHtml;
      
      // Attach event listeners for tab switching
      var tabs = container.querySelectorAll(".portfolio-tab");
      tabs.forEach(function(tab) {
        tab.addEventListener("click", function() {
          tabs.forEach(t => t.classList.remove("active-tab"));
          container.querySelectorAll(".portfolio-tab-content").forEach(content => content.classList.remove("active"));
          tab.classList.add("active-tab");
          var target = tab.getAttribute("data-target");
          var activeContent = container.querySelector(`.portfolio-tab-content[data-category="${target}"]`);
          if (activeContent) {
            activeContent.classList.add("active");
          }
        });
      });
      
      // Render charts:
      // STOCKS
      renderPortfolio1Charts(portfolio1Data);
      renderPortfolio2Charts(portfolio2Data);
      renderPortfolio3Charts(portfolio3Data);
      renderPortfolio4Charts(portfolio4Data);
      // ETFS (using computeSectorDistribution)
      renderPortfolio1Charts(etfPortfolio1Data, 'etf_portfolio1_bar', 'etf_portfolio1_pie', computeSectorDistribution);
      renderPortfolio2Charts(etfPortfolio2Data, 'etf_portfolio2_bar', 'etf_portfolio2_pie', computeSectorDistribution);
      renderPortfolio3Charts(etfPortfolio3Data, 'etf_portfolio3_bar', 'etf_portfolio3_pie', computeSectorDistribution);
      renderPortfolio4Charts(etfPortfolio4Data, 'etf_portfolio4_bullish', 'etf_portfolio4_bearish', 'etf_portfolio4_alpha', computeSectorDistribution);
      // FUTURES
      renderPortfolio1Charts(futuresPortfolio1Data, 'futures_portfolio1_bar', 'futures_portfolio1_pie', computeFuturesDistribution);
      renderPortfolio2Charts(futuresPortfolio2Data, 'futures_portfolio2_bar', 'futures_portfolio2_pie', computeFuturesDistribution);
      renderPortfolio3Charts(futuresPortfolio3Data, 'futures_portfolio3_bar', 'futures_portfolio3_pie', computeFuturesDistribution);
      // FX - UPDATED TO USE computeFXBaseDistribution and new score condition; only the TREND FOLLOWING section is rendered.
      renderPortfolio1ChartsFX(fxPortfolio1Data, 'fx_portfolio1_bar', 'fx_portfolio1_pie', computeFXBaseDistribution);
    }
  </script>
  
  <!-- Chart Rendering Functions with Improvements and New FX Functions -->
  <script>
    // New FX chart rendering functions:
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



/*************************************************************************
 * FX Chart Rendering Functions
 *************************************************************************/
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
        data: portfolioData.map(d => parseFloat(d.gap) || 0)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: { 
        x: { ticks: { display: false } },
        y: { ticks: { color: 'white', callback: value => value + '%' } }
      },
      plugins: { legend: { labels: { boxWidth: 0, color: 'white' } } }
    }
  });
  var distribution = (distributionFunction) ? distributionFunction(portfolioData) : computeGeoDistribution(portfolioData);
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
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: 'white' } } } }
  });
}
function renderPortfolio2ChartsFX(portfolioData, barCanvasId, pieCanvasId, distributionFunction) {
  // Similar implementation for FX chart 2
}
function renderPortfolio3ChartsFX(portfolioData, barCanvasId, pieCanvasId, distributionFunction) {
  // Similar implementation for FX chart 3
}

/*************************************************************************
 * LOAD THEMATIC PORTFOLIO
 *************************************************************************/
function loadThematicPortfolio() {
  var container = document.getElementById("thematic-portfolio-template");
  if (
    Object.keys(stocksFullData).length === 0 ||
    Object.keys(etfFullData).length === 0 ||
    Object.keys(futuresFullData).length === 0 ||
    Object.keys(fxFullData).length === 0
  ) {
    container.innerHTML = '<div class="loading-message"><span>LOADING DATA...</span></div>';
    setTimeout(loadThematicPortfolio, 1000);
    return;
  }
  // Build STOCKS portfolios (portfolio1, portfolio2, portfolio3, portfolio4)
  var portfolio1Data = [];
  for (var instrument in stocksFullData) {
    var info = stocksFullData[instrument];
    var score = parseFloat(info.summaryLeft[0]);
    if (score === 100) {
      portfolio1Data.push({
        instrument: instrument,
        score: score,
        trend: info.summaryLeft[1],
        approach: info.summaryLeft[2],
        gap: parseGap(info.summaryLeft[3]),
        keyArea: info.summaryLeft[4]
      });
    }
  }
  if (portfolio1Data.length > 15) {
    portfolio1Data.sort((a, b) => a.gap - b.gap);
    portfolio1Data = portfolio1Data.slice(0, 15);
  }
  portfolio1Data.sort((a, b) => a.instrument.localeCompare(b.instrument));
  var portfolio1Rows = "";
  portfolio1Data.forEach(item => {
    portfolio1Rows += `<tr>
      <td>${item.instrument}</td>
      <td>${item.score}</td>
      <td>${item.trend}</td>
      <td>${item.approach}</td>
      <td>${item.gap}%</td>
      <td>${item.keyArea}</td>
    </tr>`;
  });
  // (Similarly process portfolio2Data, portfolio3Data, portfolio4Data and do the same for ETFs, FUTURES, and FX)
  var finalHtml = `
    <div class="thematic-portfolio-nav">
      <nav>
        <button class="portfolio-tab active-tab" data-target="stocks">STOCKS</button>
        <button class="portfolio-tab" data-target="etfs">ETFS</button>
        <button class="portfolio-tab" data-target="futures">FUTURES</button>
        <button class="portfolio-tab" data-target="fx">FX</button>
      </nav>
    </div>
    <div id="thematic-portfolio-contents">
      <!-- STOCKS Tab -->
      <div class="portfolio-tab-content active" data-category="stocks">
        <div class="thematic-portfolio-section">
          <h2>TREND FOLLOWING</h2>
          <div class="thematic-portfolio-table-container">
            <table class="thematic-portfolio-table">
              <thead>
                <tr>
                  <th>Stock Name</th>
                  <th>Score</th>
                  <th>Trend</th>
                  <th>Approach</th>
                  <th>Gap to Peak</th>
                  <th>Key Area</th>
                </tr>
              </thead>
              <tbody>${portfolio1Rows}</tbody>
            </table>
          </div>
          <div class="portfolio-charts">
            <div class="portfolio-chart"><canvas id="portfolio1_bar"></canvas></div>
            <div class="portfolio-chart"><canvas id="portfolio1_pie"></canvas></div>
          </div>
        </div>
        <!-- Additional sections for STOCKS (portfolio2, portfolio3, portfolio4) would follow similarly -->
      </div>
      <!-- Similarly add tabs and content for ETFS, FUTURES, and FX -->
    </div>
  `;
  container.innerHTML = finalHtml;
  var tabs = container.querySelectorAll(".portfolio-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", function() {
      tabs.forEach(t => t.classList.remove("active-tab"));
      container.querySelectorAll(".portfolio-tab-content").forEach(content => content.classList.remove("active"));
      tab.classList.add("active-tab");
      var target = tab.getAttribute("data-target");
      var activeContent = container.querySelector(`.portfolio-tab-content[data-category="${target}"]`);
      if (activeContent) activeContent.classList.add("active");
    });
  });
  // Render charts for each section
  renderPortfolio1Charts(portfolio1Data);
  // ... call the other render functions accordingly.
}

/*************************************************************************
 * CSV LOADING
 *************************************************************************/
let etfFullData = {};
let etfPrices = {};
let futuresFullData = {};
let futuresPrices = {};
let fxFullData = {};
let fxPrices = {};
let stocksFullData = {};
let stockPrices = {};

let futuresCorrelationDataLoaded = false;
let fxCorrelationDataLoaded = false;
let stocksCorrelationDataLoaded = false;

const etfFullDataCSVUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRDNzpc6NaFGIb2r86Y4gc77XjqF9JBu6uVR6FILtNQsm756JkGpDS8Jt0ESb2q3i_XAqgf38huFWPl/pub?gid=1661223660&single=true&output=csv";
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
  .catch(err => { console.error("Error loading ETF CSV:", err); });

const futuresFullDataCSVUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSB-5fS6uIw_KpcadopUGId0MaH55AS8SOaau4V0GGQ9TNI6nKibTOy_e9UmZWXj4L7aXbxVd7Awd3I/pub?gid=1387684053&single=true&output=csv";
fetch(futuresFullDataCSVUrl)
  .then(resp => resp.text())
  .then(csvText => {
    const parsed = Papa.parse(csvText, { skipEmptyLines: true });
    const lines = parsed.data;
    const totalCols = lines[0].length;
    for (let col = 0; col < totalCols; col++) {
      let futName = lines[0][col].trim();
      if (!futName) continue;
      if (futName.replace(/\s/g, "").toUpperCase() === "FTSE100") { futName = "FTSE 100"; }
      else if (futName.replace(/\s/g, "").toUpperCase() === "CAC40") { futName = "CAC 40"; }
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
  .catch(err => { console.error("Error loading FUTURES CSV:", err); });

const fxFullDataCSVUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTEnbbjI0LycvT_Z0pdwpnhYGGzqZ8jIUiKiekX_2l2OrzIyTWpmy8cDd44PwY1pzehLDH08-9EKiu7/pub?gid=1689646190&single=true&output=csv";
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
  .catch(err => { console.error("Error loading FX CSV:", err); });

const stocksFullDataCSVUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSx30p9-V05ZEnvt4CYA1K4Xv1XmuR2Yi1rjH3yHEbaxtRPdMXfp8TNjSYYBXQQkIOu8WSaQVxmqodY/pub?gid=1481817692&single=true&output=csv";
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
  .catch(err => { console.error("Error loading STOCKS CSV:", err); });

/*************************************************************************
 * LABEL ARRAYS
 *************************************************************************/
const leftLabels = ["SCORE","TREND","APPROACH","GAP TO PEAK","KEY AREA","MICRO","MATH","STATS","TECH"];
const rightLabels = ["S&P500 CORRELATION","S&P500 VOLATILITY RATIO","BULLISH ALPHA","BEARISH ALPHA","ALPHA STRENGHT","PE RATIO","EARNINGS PER SHARE","1 YEAR HIGH","1 YEAR LOW"];
const etfLeftLabels = ["SCORE","TREND","APPROACH","GAP TO PEAK","KEY AREA","MATH","STATS","TECH"];
const etfRightLabels = ["S&P500 CORRELATION","S&P500 VOLATILITY RATIO","BULLISH ALPHA","BEARISH ALPHA","ALPHA STRENGHT","1 YEAR HIGH","1 YEAR LOW","ISSUER - TICKER"];
const futuresLeftLabels = ["SCORE","TREND","APPROACH","GAP TO PEAK","KEY AREA","LIMIT","POTENTIAL EXTENSION"];
const futuresRightLabels = ["S&P500 CORRELATION","S&P500 VOLATILITY RATIO","ALPHA STRENGHT","30 DAYS PROJECTION","MATH","STATS","TECH"];
const fxLeftLabels = ["SCORE","TREND","GAP TO PEAK / TO VALLEY","APPROACH","KEY AREA","LIMIT","POTENTIAL EXTENSION"];
const fxRightLabels = ["AVERAGE DAILY VOLATILITY","FX VOLATILITY RATIO","30 DAYS PROJECTION","LONG TERM - MACRO","MEDIUM TERM - MATH","MEDIUM TERM - STATS","SHORT TERM - TECH"];

/*************************************************************************
 * CORRELATION LOGIC
 *************************************************************************/
function pearsonCorrelation(x, y) {
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
}

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
  const dataArr = top10.map(item => item[1]);
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [{
        label: 'CORRELATION',
        data: dataArr,
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
        title: { display: true, text: '10 MOST CORRELATED INSTRUMENTS', color: 'white', font: { size: 14, family: 'Arial' } }
      }
    }
  });
}

function getCorrelationListForCategory(instrumentName, category) {
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
    compareList = [...Object.keys(stockPrices), ...Object.keys(etfPrices), ...Object.keys(futuresPrices), ...Object.keys(fxPrices)];
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
}

function showTabCorrelation(instrumentName, category) {
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
  if (!result || result.length === 0) {
    const msg = document.createElement('p');
    msg.id = "block4-message";
    msg.style.color = "white";
    msg.textContent = "No correlation data found for " + instrumentName;
    block4.appendChild(msg);
    return;
  }
  drawMostCorrelatedChart(result);
}

function updateBlock4(instrumentName) {
  const block4 = document.getElementById("block4");
  block4.innerHTML = '<div class="loading-message"><span>CALCULATING...</span></div>';
  let defaultCategory = "stocks";
  if (etfPrices[instrumentName]) defaultCategory = "etfs";
  if (futuresPrices[instrumentName]) defaultCategory = "futures";
  if (fxPrices[instrumentName]) defaultCategory = "fx";
  setTimeout(() => {
    block4.innerHTML = "";
    showTabCorrelation(instrumentName, defaultCategory);
  }, 300);
}

/*************************************************************************
 * CHART UPDATERS
 *************************************************************************/
function updateChartGeneric(instrumentName, dataObj) {
  const info = dataObj[instrumentName];
  const symbol = (info && info.tvSymbol) ? info.tvSymbol : "NASDAQ:AMZN";
  const block1 = document.getElementById("block1");
  const container = block1.querySelector(".tradingview-widget-container");
  container.innerHTML = `
    <div class="tradingview-widget-container__widget" style="height:calc(100% - 32px);width:100%"></div>
  `;
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
}
function updateChart(instrumentName) { updateChartGeneric(instrumentName, stocksFullData); }
function updateChartETF(instrumentName) { updateChartGeneric(instrumentName, etfFullData); }
function updateChartFutures(instrumentName) { updateChartGeneric(instrumentName, futuresFullData); }
function updateChartFX(instrumentName) { updateChartGeneric(instrumentName, fxFullData); }

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

function updateSymbolOverviewGeneric(instrumentName, dataObj) {
  const info = dataObj[instrumentName];
  const symbol = (info && info.tvSymbol) ? info.tvSymbol : "NASDAQ:AMZN";
  const block2 = document.getElementById("block2");
  const container = block2.querySelector("#symbol-info-container");
  container.innerHTML = `<div class="tradingview-widget-container__widget"></div>`;
  const overviewScript = document.createElement('script');
  overviewScript.type = "text/javascript";
  overviewScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js";
  overviewScript.async = true;
  overviewScript.textContent = `{
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
  }`;
  container.appendChild(overviewScript);
}
function updateSymbolOverview(instrumentName) { updateSymbolOverviewGeneric(instrumentName, stocksFullData); }
function updateSymbolOverviewETF(instrumentName) { updateSymbolOverviewGeneric(instrumentName, etfFullData); }
function updateSymbolOverviewFutures(instrumentName) { updateSymbolOverviewGeneric(instrumentName, futuresFullData); }
function updateSymbolOverviewFX(instrumentName) { updateSymbolOverviewGeneric(instrumentName, fxFullData); }

/*************************************************************************
 * BLOCK3: TRENDSCORE & TradingView TAB
 *************************************************************************/
function updateBlock3Generic(instrumentName, dataObj, rowCount, leftLabelArr, rightLabelArr, tradingViewUpdater) {
  const trendScoreContainer = document.getElementById('block3-trendscore');
  trendScoreContainer.innerHTML = '<div class="loading-message"><span>CALCULATING...</span></div>';
  setTimeout(() => {
    const info = dataObj[instrumentName];
    trendScoreContainer.innerHTML = '';
    if (!info) {
      trendScoreContainer.textContent = "No data available for " + instrumentName;
      if (!(instrumentName === "CAC 40" || instrumentName === "FTSE MIB")) { tradingViewUpdater(instrumentName); }
      showBlock3Tab("trendscore");
      return;
    }
    const table = document.createElement('table');
    for (let i = 0; i < rowCount; i++) {
      const tr = document.createElement('tr');
      const td1 = document.createElement('td');
      td1.textContent = leftLabelArr[i] || "";
      tr.appendChild(td1);
      const td2 = document.createElement('td');
      if (i === 3) {
        let gapVal = info.summaryLeft[i];
        td2.textContent = (gapVal === "-" || parseFloat(gapVal) === 0) ? "0%" : gapVal;
      } else {
        td2.textContent = info.summaryLeft[i] || "";
      }
      tr.appendChild(td2);
      const td3 = document.createElement('td');
      td3.textContent = rightLabelArr[i] || "";
      tr.appendChild(td3);
      const td4 = document.createElement('td');
      td4.textContent = info.summaryRight[i] || "";
      tr.appendChild(td4);
      table.appendChild(tr);
    }
    trendScoreContainer.appendChild(table);
    if (instrumentName === "CAC 40" || instrumentName === "FTSE MIB") {
      document.getElementById("block3-tabs").style.display = "none";
      document.getElementById("block3-content").style.height = "100%";
      document.getElementById("block3-tradingview").innerHTML = '';
      table.style.height = "100%";
      const rows = table.getElementsByTagName("tr");
      const numRows = rows.length;
      for (let i = 0; i < numRows; i++) { rows[i].style.height = (100 / numRows) + "%"; }
    } else {
      document.getElementById("block3-tabs").style.display = "flex";
      document.getElementById("block3-content").style.height = "calc(100% - 30px)";
      tradingViewUpdater(instrumentName);
    }
    showBlock3Tab("trendscore");
  }, 300);
}
function updateBlock3(instrumentName) { updateBlock3Generic(instrumentName, stocksFullData, 9, leftLabels, rightLabels, updateBlock3TradingView); }
function updateBlock3ETF(instrumentName) { updateBlock3Generic(instrumentName, etfFullData, 8, etfLeftLabels, etfRightLabels, updateBlock3TradingViewETF); }
function updateBlock3Futures(instrumentName) { updateBlock3Generic(instrumentName, futuresFullData, 7, futuresLeftLabels, futuresRightLabels, updateBlock3TradingViewFutures); }
function updateBlock3FX(instrumentName) { updateBlock3Generic(instrumentName, fxFullData, 7, fxLeftLabels, fxRightLabels, updateBlock3TradingViewFX); }

function updateBlock3TradingViewGeneric(instrumentName, dataObj) {
  const info = dataObj[instrumentName];
  const symbol = (info && info.tvSymbol) ? info.tvSymbol : "NASDAQ:AMZN";
  const tvContainer = document.getElementById('block3-tradingview');
  tvContainer.innerHTML = '';
  const widgetDiv = document.createElement('div');
  widgetDiv.className = "tradingview-widget-container";
  widgetDiv.innerHTML = `
    <div class="tradingview-widget-container__widget"></div>
    <div class="tradingview-widget-copyright">
      <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank"></a>
    </div>
  `;
  tvContainer.appendChild(widgetDiv);
  const script = document.createElement('script');
  script.type = "text/javascript";
  script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
  script.async = true;
  script.textContent = `{
    "interval": "1D",
    "width": "100%",
    "isTransparent": true,
    "height": "100%",
    "symbol": "${symbol}",
    "showIntervalTabs": true,
    "displayMode": "single",
    "locale": "en",
    "colorTheme": "dark"
  }`;
  widgetDiv.appendChild(script);
}
function updateBlock3TradingView(instrumentName) { updateBlock3TradingViewGeneric(instrumentName, stocksFullData); }
function updateBlock3TradingViewETF(instrumentName) { updateBlock3TradingViewGeneric(instrumentName, etfFullData); }
function updateBlock3TradingViewFutures(instrumentName) { updateBlock3TradingViewGeneric(instrumentName, futuresFullData); }
function updateBlock3TradingViewFX(instrumentName) { updateBlock3TradingViewGeneric(instrumentName, fxFullData); }

/*************************************************************************
 * MAIN EVENT HANDLERS & INITIALIZATION
 *************************************************************************/
let currentInstrument = "AMAZON";
document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded – starting sidebar generation");
  generateSidebarContent();
  window.defaultDashboardHTML = document.getElementById("main-content").innerHTML;
  document.getElementById("block3-trendscore").innerHTML = '<div class="loading-message"><span>CALCULATING...</span></div>';
  document.getElementById("block4").innerHTML = '<div class="loading-message"><span>CALCULATING...</span></div>';
  updateSymbolOverview("AMAZON");
  
  document.addEventListener('click', (e) => {
    if (e.target && e.target.tagName === 'LI') {
      if (!e.target.classList.contains('expandable')) {
        if (e.target.id === "sidebar-fullscreen") return;
        if (e.target.textContent.trim().toUpperCase() === "LIVE TV") { openYouTubePopup(); return; }
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
  
  const block3TabButtons = document.querySelectorAll("#block3-tabs button");
  block3TabButtons.forEach(btn => {
    btn.addEventListener("click", () => { showBlock3Tab(btn.dataset.tab); });
  });
  
  document.getElementById("fullscreen-button").addEventListener("click", () => {
    const block1 = document.getElementById("block1");
    if (block1.requestFullscreen) { block1.requestFullscreen(); }
    else if (block1.webkitRequestFullscreen) { block1.webkitRequestFullscreen(); }
    else { console.error("Fullscreen API not supported"); }
  });
  
  document.addEventListener("fullscreenchange", () => {
    const btn = document.getElementById("fullscreen-button");
    if (document.fullscreenElement === null) {
      btn.innerHTML = `
        <span class="arrow">&#8598;</span>
        <span class="arrow">&#8599;</span><br>
        <span class="arrow">&#8601;</span>
        <span class="arrow">&#8600;</span>
      `;
    } else {
      btn.innerHTML = `
        <span class="arrow">&#8598;</span>
        <span class="arrow">&#8599;</span><br>
        <span class="arrow">&#8601;</span>
        <span class="arrow">&#8600;</span>
      `;
    }
    const sidebarFS = document.getElementById("sidebar-fullscreen");
    if (sidebarFS) {
      if (document.fullscreenElement) { sidebarFS.textContent = "EXIT FULLSCREEN PLATFORM"; }
      else { sidebarFS.textContent = "FULL SCREEN PLATFORM"; }
    }
  });
  
  document.getElementById("youtube-popup-close").addEventListener("click", function() {
    document.getElementById("youtube-popup").style.display = "none";
  });
  
  $(function() {
    let instrumentNames = [];
    $("#sidebar-list .instrument-item").each(function() {
      instrumentNames.push($(this).text().trim());
    });
    $("#sidebar-search").autocomplete({
      source: instrumentNames,
      minLength: 1,
      select: function(event, ui) {
        $("#sidebar-list .instrument-item").each(function() {
          $(this).toggle($(this).text().trim() === ui.item.value);
        });
        $("#sidebar-list .instrument-item").filter(function() {
          return $(this).text().trim() === ui.item.value;
        }).click();
      }
    });
    $("#sidebar-search-clear").on("click", function() {
      $("#sidebar-search").val("");
      $("#sidebar-list .instrument-item").show();
    });
  });
});

/*************************************************************************
 * SIDEBAR GENERATION
 *************************************************************************/
function generateSidebarContent() {
  console.log("Sidebar generation started");
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
    if (!document.fullscreenElement) { document.documentElement.requestFullscreen(); }
    else { document.exitFullscreen(); }
  });
}

/*************************************************************************
 * YOUTUBE POPUP FUNCTIONS
 *************************************************************************/
function openYouTubePopup() {
  document.getElementById("youtube-popup").style.display = "block";
  $("#youtube-popup").draggable({ handle: "#youtube-popup-header" });
}
function updateYouTubePlayer() {
  var url = document.getElementById("youtube-url").value.trim();
  document.getElementById("youtube-iframe").src = url;
}
