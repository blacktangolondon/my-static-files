"use strict";

/*************************************************************************
 * FULL SCRIPTS.JS - NEW VERSION v2 (JSON DATA VERSION)
 *************************************************************************/

/*************************************************************************
 * GLOBAL DATA & HELPER FUNCTIONS
 *************************************************************************/
// Qui creiamo un oggetto "data" che definisce le categorie e gli strumenti
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

// Helper function to parse il valore gap
function parseGap(val) {
  return (val === "-" || isNaN(parseFloat(val))) ? 0 : parseFloat(val);
}

/*************************************************************************
 * IMPLEMENTAZIONE DELLE FUNZIONI DI UPDATE PER L'OVERVIEW
 *************************************************************************/
// Ecco l'implementazione completa della funzione updateSymbolOverview:
// Questa funzione cerca lo strumento nelle varie collezioni (stocks, etf, futures, fx) e
// aggiorna l’elemento HTML con id "symbol-info-container" mostrando alcuni valori chiave.
function updateSymbolOverview(instrumentName) {
  let info = null;
  // Verifica in ogni raccolta: puoi personalizzare l'ordine o il metodo se necessario.
  if (stocksFullData[instrumentName]) {
    info = stocksFullData[instrumentName];
  } else if (etfFullData[instrumentName]) {
    info = etfFullData[instrumentName];
  } else if (futuresFullData[instrumentName]) {
    info = futuresFullData[instrumentName];
  } else if (fxFullData[instrumentName]) {
    info = fxFullData[instrumentName];
  }
  const container = document.getElementById("symbol-info-container");
  if (info) {
    container.innerHTML = `
      <h2>${instrumentName}</h2>
      <p><strong>SCORE:</strong> ${info.summaryLeft[0]}</p>
      <p><strong>TREND:</strong> ${info.summaryLeft[1]}</p>
      <p><strong>APPROACH:</strong> ${info.summaryLeft[2]}</p>
      <p><strong>GAP TO PEAK:</strong> ${info.summaryLeft[3]}</p>
      <p><strong>KEY AREA:</strong> ${info.summaryLeft[4]}</p>
      <p><strong>S&P500 CORRELATION:</strong> ${info.summaryRight[0]}</p>
      <p><strong>S&P500 VOLATILITY RATIO:</strong> ${info.summaryRight[1]}</p>
    `;
  } else {
    container.innerHTML = `<p>Nessun dato disponibile per ${instrumentName}</p>`;
  }
}

/*************************************************************************
 * JSON DATA LOADING & MAPPING FUNCTIONS
 *************************************************************************/
// Variabili globali per i dati caricati dal JSON
let stocksFullData = {};
let etfFullData = {};
let futuresFullData = {};
let fxFullData = {};

// Funzioni di mapping: converte ogni oggetto JSON nel formato atteso (summaryLeft, summaryRight)
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
    currentInstrument = "AMAZON";  // Assicurati che questa dichiarazione esista una sola volta
    if (stocksFullData[currentInstrument]) {
      updateChart(currentInstrument);
      updateSymbolOverview(currentInstrument);
      updateBlock3(currentInstrument);
      updateBlock4(currentInstrument);
    } else if (etfFullData[currentInstrument]) {
      updateChartETF(currentInstrument);
      updateSymbolOverview(currentInstrument); // Puoi eventualmente creare updateSymbolOverviewETF se necessario
      updateBlock3ETF(currentInstrument);
      updateBlock4(currentInstrument);
    } else if (futuresFullData[currentInstrument]) {
      updateChartFutures(currentInstrument);
      updateSymbolOverview(currentInstrument); // Analogamente per futures
      updateBlock3Futures(currentInstrument);
      updateBlock4(currentInstrument);
    } else if (fxFullData[currentInstrument]) {
      updateChartFX(currentInstrument);
      updateSymbolOverview(currentInstrument); // Analogamente per fx
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
// ... (Altre funzioni renderPortfolio2Charts, renderPortfolio3Charts, renderPortfolio4Charts, renderPortfolio1ChartsFX, etc. rimangono invariati)
// Per brevità non riscrivo qui l'intero blocco; nel tuo file assicurati che tutte le funzioni siano incluse.

/*************************************************************************
 * CORRELATION LOGIC E ALTRI AGGIORNAMENTI
 *************************************************************************/
// Qui rimangono le funzioni pearsonCorrelation, drawMostCorrelatedChart, getCorrelationListForCategory,
// showTabCorrelation, updateBlock4, updateChartGeneric, updateChart, updateChartETF, updateChartFutures, updateChartFX,
// showBlock3Tab, updateBlock3Generic, updateBlock3, updateBlock3ETF, updateBlock3Futures, updateBlock3FX,
// updateBlock3TradingViewGeneric, updateBlock3TradingView, updateBlock3TradingViewETF, updateBlock3TradingViewFutures, updateBlock3TradingViewFX.
// Assicurati di includere tutte queste funzioni esattamente come nel tuo script originale.

/*************************************************************************
 * MAIN EVENT HANDLERS & INITIALIZATION (RESTO DEL CODICE)
 *************************************************************************/
// Gli event handler principali e l'inizializzazione restano invariati come nel tuo script attuale.
// Ad esempio l'aggiornamento della sidebar, del full screen, della gestione dei click, ecc.
