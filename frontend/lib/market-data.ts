export type Quote = {
  name: string
  symbol?: string
  price: number
  change: number
  changePct: number
}

export const tickerItems: Quote[] = [
  { name: "NIFTY 50", price: 23281.4, change: 215.6, changePct: 0.93 },
  { name: "SENSEX", price: 76598.5, change: 712.4, changePct: 0.94 },
  { name: "BANK NIFTY", price: 50124.3, change: -184.2, changePct: -0.37 },
  { name: "Gold", price: 73420, change: 540, changePct: 0.74 },
  { name: "Silver", price: 88210, change: -310, changePct: -0.35 },
  { name: "Crude Oil", price: 6748, change: 92, changePct: 1.38 },
]

export const giftNifty = {
  value: 23580,
  gap: 299,
  gapPct: 1.27,
}

export const indiX = {
  score: 75.4,
  zone: "Green Zone",
  components: [
    { label: "Momentum", value: 82 },
    { label: "Sentiment", value: 71 },
    { label: "VIX", value: 64 },
  ],
}

export const indices: Quote[] = [
  { name: "NIFTY 50", price: 23281.4, change: 215.6, changePct: 0.93 },
  { name: "SENSEX", price: 76598.52, change: 712.4, changePct: 0.94 },
  { name: "BANK NIFTY", price: 50124.3, change: -184.2, changePct: -0.37 },
  { name: "NIFTY IT", price: 41902.15, change: 388.7, changePct: 0.94 },
]

export const stocks: Quote[] = [
  { name: "RELIANCE", price: 2945.6, change: 0, changePct: 1.42 },
  { name: "TCS", price: 4128.3, change: 0, changePct: 0.88 },
  { name: "HDFC BANK", price: 1689.4, change: 0, changePct: -0.52 },
  { name: "INFOSYS", price: 1842.7, change: 0, changePct: 1.15 },
  { name: "ICICI BANK", price: 1198.2, change: 0, changePct: 0.34 },
  { name: "BHARTI AIRTEL", price: 1532.9, change: 0, changePct: 2.07 },
  { name: "ITC", price: 438.6, change: 0, changePct: -0.21 },
  { name: "SBIN", price: 824.3, change: 0, changePct: 0.96 },
  { name: "LT", price: 3611.5, change: 0, changePct: 1.33 },
  { name: "KOTAK BANK", price: 1758.4, change: 0, changePct: -0.78 },
  { name: "AXIS BANK", price: 1184.7, change: 0, changePct: 0.45 },
  { name: "HCL TECH", price: 1689.2, change: 0, changePct: 1.62 },
  { name: "MARUTI", price: 12842.0, change: 0, changePct: -0.34 },
  { name: "SUN PHARMA", price: 1812.6, change: 0, changePct: 0.71 },
  { name: "TITAN", price: 3398.9, change: 0, changePct: 1.04 },
  { name: "WIPRO", price: 542.3, change: 0, changePct: -0.43 },
  { name: "TATA MOTORS", price: 978.5, change: 0, changePct: 2.41 },
  { name: "ADANI ENT", price: 3124.7, change: 0, changePct: -1.18 },
  { name: "NTPC", price: 412.8, change: 0, changePct: 0.58 },
  { name: "POWERGRID", price: 332.1, change: 0, changePct: 0.29 },
]

export const commodities: Quote[] = [
  { name: "Gold", symbol: "per 10g", price: 73420, change: 540, changePct: 0.74 },
  { name: "Silver", symbol: "per kg", price: 88210, change: -310, changePct: -0.35 },
  { name: "Crude Oil", symbol: "per bbl", price: 6748, change: 92, changePct: 1.38 },
]

export type NewsItem = {
  source: string
  headline: string
  time: string
}

export const financialNews: NewsItem[] = [
  {
    source: "Economic Times",
    headline: "Nifty hits fresh record high as IT and auto stocks rally on global cues",
    time: "12 min ago",
  },
  {
    source: "Mint",
    headline: "RBI keeps repo rate unchanged at 6.5%, maintains 'withdrawal of accommodation' stance",
    time: "38 min ago",
  },
  {
    source: "Business Standard",
    headline: "FIIs turn net buyers, pump ₹4,200 crore into Indian equities this week",
    time: "1 hr ago",
  },
  {
    source: "Moneycontrol",
    headline: "Rupee strengthens to 83.12 against dollar amid easing crude prices",
    time: "2 hr ago",
  },
  {
    source: "Reuters",
    headline: "India's GDP growth seen at 7.2% for FY25, fastest among major economies",
    time: "3 hr ago",
  },
]

export const defenseNews: NewsItem[] = [
  {
    source: "The Hindu",
    headline: "DRDO successfully test-fires Agni-Prime ballistic missile off Odisha coast",
    time: "20 min ago",
  },
  {
    source: "India Today",
    headline: "HAL secures ₹62,000 crore deal for 156 Light Combat Helicopters",
    time: "55 min ago",
  },
  {
    source: "PTI",
    headline: "Indian Navy commissions INS Vagsheer, sixth Scorpene-class submarine",
    time: "1 hr ago",
  },
  {
    source: "ANI",
    headline: "India, France finalise terms for additional Rafale-M fighter jets",
    time: "2 hr ago",
  },
  {
    source: "Defense News",
    headline: "Border infrastructure push: BRO completes strategic tunnel near LAC",
    time: "4 hr ago",
  },
]
