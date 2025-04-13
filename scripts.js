"use strict";

/*************************************************************************
 * FULL SCRIPTS.JS - NEW VERSION v2 (JSON DATA VERSION)
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

// Helper function to parse the gap value
function parseGap(val) {
  return (val === "-" || isNaN(parseFloat(val))) ? 0 : parseFloat(val);
}

function updateSymbolOverview(instrumentName) {
  console.log("updateSymbolOverview non è ancora stata implementata. Ricevuto:", instrumentName);
}


/*************************************************************************
 * JSON DATA LOADING & MAPPING FUNCTIONS
 *************************************************************************/
// Global variables for data loaded from the JSON
let stocksFullData = {};
let etfFullData = {};
let futuresFullData = {};
let fxFullData = {};

// Mapping functions: convert each JSON object into the expected format (summaryLeft, summaryRight)
function mapStockInstrument(item) {
  return {
    summaryLeft: [
      item.final_score,     // SCORE
      item.trend,           // TREND
      item.approach,        // APPROACH
      item.gap_to_peak,     // GAP TO PEAK
      item.key_area,        // KEY AREA
      item.micro || "",
      item.math || "",
      item.stats || "",
      item.tech || ""
    ],
    summaryRight: [
      item.sp500_correlation || 0,      // S&P500 CORRELATION
      item.sp500_volatility_ratio || 0,   // S&P500 VOLATILITY RATIO
      item.bullish_alpha || 0,            // BULLISH ALPHA
      item.bearish_alpha || 0,            // BEARISH ALPHA
      item.alpha_strength || 0,           // ALPHA STRENGHT
      item.pe_ratio || "",
      item.eps || "",
      item.one_year_high || "",
      item.one_year_low || ""
    ]
  };
}

function mapETFInstrument(item) {
  return {
    summaryLeft: [
      item.final_score,    // SCORE
      item.trend,          // TREND
      item.approach,       // APPROACH
      item.gap_to_peak,    // GAP TO PEAK
      item.key_area,       // KEY AREA
      item.math || "",
      item.stats || "",
      item.tech || ""
    ],
    summaryRight: [
      item.sp500_correlation || 0,      // S&P500 CORRELATION
      item.sp500_volatility_ratio || 0,   // S&P500 VOLATILITY RATIO
      item.bullish_alpha || 0,            // BULLISH ALPHA
      item.bearish_alpha || 0,            // BEARISH ALPHA
      item.alpha_strength || 0,           // ALPHA STRENGHT
      item.one_year_high || "",
      item.one_year_low || "",
      item.tvSymbol || ""
    ]
  };
}

function mapFuturesInstrument(item) {
  return {
    summaryLeft: [
      item.final_score,       // SCORE
      item.trend,             // TREND
      item.approach,          // APPROACH
      item.gap_to_peak,       // GAP TO PEAK
      item.key_area,          // KEY AREA
      item.limit || "",       // LIMIT
      item.extension || ""    // POTENTIAL EXTENSION
    ],
    summaryRight: [
      item.sp500_correlation || 0,      // S&P500 CORRELATION
      item.sp500_volatility_ratio || 0,   // S&P500 VOLATILITY RATIO
      item.alpha_strength || 0,           // ALPHA STRENGHT
      item.projection_30 || 0,            // 30 DAYS PROJECTION
      item.math || "",
      item.stats || "",
      item.tech || ""
    ]
  };
}

function mapFXInstrument(item) {
  return {
    summaryLeft: [
      item.final_score,      // SCORE
      item.trend,            // TREND
      item.gap_to_peak,      // GAP TO PEAK / TO VALLEY
      item.approach,         // APPROACH
      item.key_area,         // KEY AREA
      item.limit || "",      // LIMIT
      item.extension || ""   // POTENTIAL EXTENSION
    ],
    summaryRight: [
      item.sp500_volatility_ratio || 0,  // AVERAGE DAILY VOLATILITY (placeholder)
      item.sp500_volatility_ratio || 0,  // FX VOLATILITY RATIO (placeholder)
      item.projection_30 || 0,           // 30 DAYS PROJECTION
      item.math || "",                   // LONG TERM - MACRO
      item.stats || "",                  // MEDIUM TERM - MATH
      item.tech || "",                   // MEDIUM TERM - STATS
      item.tech || ""                    // SHORT TERM - TECH
    ]
  };
}

/*************************************************************************
 * JSON DATA LOADING
 *************************************************************************/
// Carica instruments.json dalla root (assicurati che il file si trovi in Desktop/TrendScore/trendscore-data-engine/instruments.json)
let allInstrumentsData = [];
function loadInstrumentsData() {
  return fetch("instruments.json")
    .then(response => response.json())
    .then(dataArray => {
      allInstrumentsData = dataArray;
      dataArray.forEach(item => {
        if (item.asset_class === "stock") {
          stocksFullData[item.ticker] = mapStockInstrument(item);
        } else if (item.asset_class === "etf") {
          etfFullData[item.ticker] = mapETFInstrument(item);
        } else if (item.asset_class === "future") {
          futuresFullData[item.ticker] = mapFuturesInstrument(item);
        } else if (item.asset_class === "fx") {
          fxFullData[item.ticker] = mapFXInstrument(item);
        }
      });
    })
    .catch(error => console.error("Errore durante il caricamento di instruments.json:", error));
}

/*************************************************************************
 * INITIALIZATION
 *************************************************************************/
window.addEventListener("DOMContentLoaded", function() {
  loadInstrumentsData().then(() => {
    generateSidebarContent();
    currentInstrument = "AMAZON";  // Dichiarata una sola volta
    if (stocksFullData[currentInstrument]) {
      updateChart(currentInstrument);
      updateSymbolOverview(currentInstrument);
      updateBlock3(currentInstrument);
      updateBlock4(currentInstrument);
    } else if (etfFullData[currentInstrument]) {
      updateChartETF(currentInstrument);
      updateSymbolOverviewETF(currentInstrument);
      updateBlock3ETF(currentInstrument);
      updateBlock4(currentInstrument);
    } else if (futuresFullData[currentInstrument]) {
      updateChartFutures(currentInstrument);
      updateSymbolOverviewFutures(currentInstrument);
      updateBlock3Futures(currentInstrument);
      updateBlock4(currentInstrument);
    } else if (fxFullData[currentInstrument]) {
      updateChartFX(currentInstrument);
      updateSymbolOverviewFX(currentInstrument);
      updateBlock3FX(currentInstrument);
      updateBlock4(currentInstrument);
    }
  });
});

/*************************************************************************
 * PORTFOLIO BUILDER FUNCTIONS
 * (Il codice per openFilterSelector, updatePortfolioSteps, generatePortfolioNew, etc. rimane invariato)
 *************************************************************************/
// [START Portfolio Builder Code - invariato]
// Inserisci qui il codice esistente per il portfolio builder
// [END Portfolio Builder Code]

/*************************************************************************
 * CHART RENDERING FUNCTIONS (INVARIATI)
 *************************************************************************/
var orangeShades = ['rgba(255,165,0,0.8)', 'rgba(255,140,0,0.8)', 'rgba(255,120,0,0.8)'];
function destroyChartIfExists(canvasId) {
  const existing = Chart.getChart(canvasId);
  if (existing) { existing.destroy(); }
}
function renderPortfolio1Charts(portfolioData, barCanvasId, pieCanvasId, distributionFunction) {
  barCanvasId = barCanvasId || "portfolio1_bar";
  pieCanvasId = pieCanvasId || "portfolio1_pie";
  destroyChartIfExists(barCanvasId);
  destroyChartIfExists(pieCanvasId);
  const ctxBar = document.getElementById(barCanvasId).getContext("2d");
  new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: portfolioData.map(d => d.instrument),
      datasets: [{
        label: 'GAP TO PEAK',
        data: portfolioData.map(d => parseFloat(d.gap) || 0),
        backgroundColor: 'rgba(75,192,192,0.7)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { ticks: { display: false } },
        y: { ticks: { color: 'white', callback: (value) => value + '%' } }
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
  if (distributionFunction) {
    const distribution = distributionFunction(portfolioData);
    destroyChartIfExists(pieCanvasId);
    const ctxPie = document.getElementById(pieCanvasId).getContext("2d");
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
}
function renderPortfolio2Charts(portfolioData, barCanvasId, pieCanvasId, distributionFunction) {
  barCanvasId = barCanvasId || "portfolio2_bar";
  pieCanvasId = pieCanvasId || "portfolio2_pie";
  destroyChartIfExists(barCanvasId);
  destroyChartIfExists(pieCanvasId);
  const ctxBar = document.getElementById(barCanvasId).getContext("2d");
  new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: portfolioData.map(d => d.instrument),
      datasets: [{
        label: 'S&P500 CORRELATION',
        data: portfolioData.map(d => parseFloat(d.correlation) || 0),
        backgroundColor: 'rgba(75,192,192,0.7)'
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
  if (distributionFunction) {
    const distribution = distributionFunction(portfolioData);
    destroyChartIfExists(pieCanvasId);
    const ctxPie = document.getElementById(pieCanvasId).getContext("2d");
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
}
function renderPortfolio3Charts(portfolioData, barCanvasId, pieCanvasId, distributionFunction) {
  barCanvasId = barCanvasId || "portfolio3_bar";
  pieCanvasId = pieCanvasId || "portfolio3_pie";
  destroyChartIfExists(barCanvasId);
  destroyChartIfExists(pieCanvasId);
  const ctxBar = document.getElementById(barCanvasId).getContext("2d");
  new Chart(ctxBar, {
    type: 'bar',
    data: {
      labels: portfolioData.map(d => d.instrument),
      datasets: [{
        label: 'S&P500 VOLATILITY RATIO',
        data: portfolioData.map(d => parseFloat(d.volatility) || 0),
        backgroundColor: 'rgba(75,192,192,0.7)'
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
  if (distributionFunction) {
    const distribution = distributionFunction(portfolioData);
    destroyChartIfExists(pieCanvasId);
    const ctxPie = document.getElementById(pieCanvasId).getContext("2d");
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
}
function renderPortfolio4Charts(portfolioData, bullishCanvasId, bearishCanvasId, alphaCanvasId) {
  bullishCanvasId = bullishCanvasId || "portfolio4_bullish";
  bearishCanvasId = bearishCanvasId || "portfolio4_bearish";
  alphaCanvasId = alphaCanvasId || "portfolio4_alpha";
  destroyChartIfExists(bullishCanvasId);
  destroyChartIfExists(bearishCanvasId);
  destroyChartIfExists(alphaCanvasId);
  const ctxBullish = document.getElementById(bullishCanvasId).getContext("2d");
  new Chart(ctxBullish, {
    type: 'bar',
    data: {
      labels: portfolioData.map(d => d.instrument),
      datasets: [{
        label: 'BULLISH ALPHA',
        data: portfolioData.map(d => parseFloat(d.bullish) || 0),
        backgroundColor: 'rgba(75,192,192,0.7)'
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
  const ctxBearish = document.getElementById(bearishCanvasId).getContext("2d");
  new Chart(ctxBearish, {
    type: 'bar',
    data: {
      labels: portfolioData.map(d => d.instrument),
      datasets: [{
        label: 'BEARISH ALPHA',
        data: portfolioData.map(d => parseFloat(d.bearish) || 0),
        backgroundColor: 'rgba(75,192,192,0.7)'
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
  const ctxAlpha = document.getElementById(alphaCanvasId).getContext("2d");
  new Chart(ctxAlpha, {
    type: 'bar',
    data: {
      labels: portfolioData.map(d => d.instrument),
      datasets: [{
        label: 'ALPHA STRENGHT',
        data: portfolioData.map(d => parseFloat(d.alphaStrength) || 0),
        backgroundColor: 'rgba(75,192,192,0.7)'
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

/*************************************************************************
 * FX CHART RENDERING FUNCTIONS
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
  var distribution = (distributionFunction) ? distributionFunction(portfolioData) : computeFXBaseDistribution(portfolioData);
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
 * THEMATIC PORTFOLIO FUNCTIONS & CHART RENDERING
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
  
  // Esempio per STOCKS
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
        keyArea: info.summaryLeft[4],
        region: info.region
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
  
  // Esempio per FX
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
      <!-- STOCKS Tab Content -->
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
      </div>
      
      <!-- FX Tab Content -->
      <div class="portfolio-tab-content" data-category="fx">
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
                  <th>Gap to Peak / to Valley</th>
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
      </div>
    </div>
  `;
  
  container.innerHTML = finalHtml;
  
  const tabs = container.querySelectorAll(".portfolio-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", function() {
      tabs.forEach(t => t.classList.remove("active-tab"));
      container.querySelectorAll(".portfolio-tab-content").forEach(content => content.classList.remove("active"));
      tab.classList.add("active-tab");
      const target = tab.getAttribute("data-target");
      const activeContent = container.querySelector(`.portfolio-tab-content[data-category="${target}"]`);
      if (activeContent) { activeContent.classList.add("active"); }
    });
  });
  
  // Render Charts for FX
  renderPortfolio1ChartsFX(fxPortfolio1Data, 'fx_portfolio1_bar', 'fx_portfolio1_pie', computeFXBaseDistribution);
}

/*************************************************************************
 * CORRELATION & CHART UPDATERS (INVARIATI)
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
        backgroundColor: 'rgba(255,165,0,0.7)',
        borderColor: 'rgba(255,165,0,1)',
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
  if (etfPrices[instrumentName] && etfPrices[instrumentName].length > 0) { defaultCategory = "etfs"; }
  if (futuresPrices[instrumentName] && futuresPrices[instrumentName].length > 0) { defaultCategory = "futures"; }
  if (fxPrices[instrumentName] && fxPrices[instrumentName].length > 0) { defaultCategory = "fx"; }
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
    if (dataObj === futuresFullData || instrumentName === "CAC 40" || instrumentName === "FTSE MIB") {
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

let currentInstrument = "AMAZON";  // Assicurati che questa dichiarazione esista una sola volta

/*************************************************************************
 * MAIN EVENT HANDLERS & INITIALIZATION
 *************************************************************************/
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
      btn.innerHTML = `<span class="arrow">&#8598;</span>
                       <span class="arrow">&#8599;</span><br>
                       <span class="arrow">&#8601;</span>
                       <span class="arrow">&#8600;</span>`;
    } else {
      btn.innerHTML = `<span class="arrow">&#8598;</span>
                       <span class="arrow">&#8599;</span><br>
                       <span class="arrow">&#8601;</span>
                       <span class="arrow">&#8600;</span>`;
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

/*************************************************************************
 * LABEL ARRAYS
 *************************************************************************/
const leftLabels = ["SCORE", "TREND", "APPROACH", "GAP TO PEAK", "KEY AREA", "MICRO", "MATH", "STATS", "TECH"];
const rightLabels = ["S&P500 CORRELATION", "S&P500 VOLATILITY RATIO", "BULLISH ALPHA", "BEARISH ALPHA", "ALPHA STRENGHT", "PE RATIO", "EARNINGS PER SHARE", "1 YEAR HIGH", "1 YEAR LOW"];
const etfLeftLabels = ["SCORE", "TREND", "APPROACH", "GAP TO PEAK", "KEY AREA", "MATH", "STATS", "TECH"];
const etfRightLabels = ["S&P500 CORRELATION", "S&P500 VOLATILITY RATIO", "BULLISH ALPHA", "BEARISH ALPHA", "ALPHA STRENGHT", "1 YEAR HIGH", "1 YEAR LOW", "ISSUER - TICKER"];
const futuresLeftLabels = ["SCORE", "TREND", "APPROACH", "GAP TO PEAK", "KEY AREA", "LIMIT", "POTENTIAL EXTENSION"];
const futuresRightLabels = ["S&P500 CORRELATION", "S&P500 VOLATILITY RATIO", "ALPHA STRENGHT", "30 DAYS PROJECTION", "MATH", "STATS", "TECH"];
const fxLeftLabels = ["SCORE", "TREND", "GAP TO PEAK / TO VALLEY", "APPROACH", "KEY AREA", "LIMIT", "POTENTIAL EXTENSION"];
const fxRightLabels = ["AVERAGE DAILY VOLATILITY", "FX VOLATILITY RATIO", "30 DAYS PROJECTION", "LONG TERM - MACRO", "MEDIUM TERM - MATH", "MEDIUM TERM - STATS", "SHORT TERM - TECH"];

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
        backgroundColor: 'rgba(255,165,0,0.7)',
        borderColor: 'rgba(255,165,0,1)',
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
  if (etfPrices[instrumentName] && etfPrices[instrumentName].length > 0) { defaultCategory = "etfs"; }
  if (futuresPrices[instrumentName] && futuresPrices[instrumentName].length > 0) { defaultCategory = "futures"; }
  if (fxPrices[instrumentName] && fxPrices[instrumentName].length > 0) { defaultCategory = "fx"; }
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
    if (dataObj === futuresFullData || instrumentName === "CAC 40" || instrumentName === "FTSE MIB") {
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
      btn.innerHTML = `<span class="arrow">&#8598;</span>
                       <span class="arrow">&#8599;</span><br>
                       <span class="arrow">&#8601;</span>
                       <span class="arrow">&#8600;</span>`;
    } else {
      btn.innerHTML = `<span class="arrow">&#8598;</span>
                       <span class="arrow">&#8599;</span><br>
                       <span class="arrow">&#8601;</span>
                       <span class="arrow">&#8600;</span>`;
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

/*************************************************************************
 * INITIALIZATION OF JSON DATA LOADING
 *************************************************************************/
// Carica instruments.json dalla root (assicurati che il file si trovi in Desktop/TrendScore/trendscore-data-engine/instruments.json)
loadInstrumentsData();

/*************************************************************************
 * MAIN EVENT HANDLERS & INITIALIZATION
 *************************************************************************/
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
      btn.innerHTML = `<span class="arrow">&#8598;</span>
                       <span class="arrow">&#8599;</span><br>
                       <span class="arrow">&#8601;</span>
                       <span class="arrow">&#8600;</span>`;
    } else {
      btn.innerHTML = `<span class="arrow">&#8598;</span>
                       <span class="arrow">&#8599;</span><br>
                       <span class="arrow">&#8601;</span>
                       <span class="arrow">&#8600;</span>`;
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
