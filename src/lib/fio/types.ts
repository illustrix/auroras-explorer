// "OrderId": "e1576e85a7c6543847a7f478528817ea",
// "CompanyId": "68d282e10b2650dee8c75ff76cb16d38",
// "CompanyName": "Lumber Liquidators",
// "CompanyCode": "MM",
// "ItemCount": 100,
// "ItemCost": 410.0
export interface Order {
  OrderId: string
  CompanyId: string
  CompanyName: string
  CompanyCode: string
  ItemCount: number
  ItemCost: number
}

// "CXDataModelId": "0037f5f779eb63ac545af0d5c1744061",
// "MaterialName": "zircon",
// "MaterialTicker": "ZIR",
// "MaterialId": "82583e13472538b113667abc82421bda",
// "ExchangeName": "Moria Station Commodity Exchange",
// "ExchangeCode": "NC1",
// "Currency": "NCC",
// "Previous": null,
// "Price": 888.0,
// "PriceTimeEpochMs": 1767968133317,
// "High": 888.0,
// "AllTimeHigh": 4000.0,
// "Low": 888.0,
// "AllTimeLow": 29.299999237060547,
// "Ask": 888.0,
// "AskCount": 919,
// "Bid": 410.0,
// "BidCount": 100,
// "Supply": 6658,
// "Demand": 5487,
// "Traded": 0,
// "VolumeAmount": 0.0,
// "PriceAverage": 888.0,
// "NarrowPriceBandLow": 88.80000305175781,
// "NarrowPriceBandHigh": 2220.0,
// "WidePriceBandLow": 88.80000305175781,
// "WidePriceBandHigh": 2220.0,
// "MMBuy": null,
// "MMSell": null,
// "UserNameSubmitted": "VALMARUS",
// "Timestamp": "2026-01-14T16:20:22.172754Z"
export interface TradingSummary {
  BuyingOrders: Order[]
  SellingOrders: Order[]
  CXDataModelId: string
  MaterialName: string
  MaterialTicker: string
  MaterialId: string
  ExchangeName: string
  ExchangeCode: string
  Currency: string
  Previous: number | null
  Price: number
  PriceTimeEpochMs: number
  High: number
  AllTimeHigh: number
  Low: number
  AllTimeLow: number
  Ask: number
  AskCount: number
  Bid: number
  BidCount: number
  Supply: number
  Demand: number
  Traded: number
  VolumeAmount: number
  PriceAverage: number
  NarrowPriceBandLow: number
  NarrowPriceBandHigh: number
  WidePriceBandLow: number
  WidePriceBandHigh: number
  MMBuy: number | null
  MMSell: number | null
  UserNameSubmitted: string
  Timestamp: string
}

// "MaterialId": "e73f2311d23a1dc4e096d2cf389e5ee2",
// "CategoryName": "ship shields",
// "CategoryId": "a8e32e7e16219394989aea62fc0cd943",
// "Name": "advancedRadiationShielding",
// "Ticker": "ARP",
// "Weight": 0.03999999910593033,
// "Volume": 0.20000000298023224,
// "UserNameSubmitted": "TAIYI",
// "Timestamp": "2026-01-14T15:35:56.779516Z"

export interface Material {
  CategoryId: string
  CategoryName: string
  MaterialId: string
  Name: string
  Ticker: string
  Timestamp: string
  UserNameSubmitted: string
  Volume: number
  Weight: number
}

// [
//   {
//     "BuildingTicker": "RIG",
//     "RecipeName": "=\u003E",
//     "StandardRecipeName": "RIG:=\u003E",
//     "Inputs": [],
//     "Outputs": [],
//     "TimeMs": 17280000
//   },
//   {
//     "BuildingTicker": "TNP",
//     "RecipeName": "1xTC 4xREA 4xFLX=\u003E1xETC",
//     "StandardRecipeName": "TNP:4xFLX-4xREA-1xTC=\u003E1xETC",
//     "Inputs": [
//       {
//         "Ticker": "TC",
//         "Amount": 1
//       },
//       {
//         "Ticker": "REA",
//         "Amount": 4
//       },
//       {
//         "Ticker": "FLX",
//         "Amount": 4
//       }
//     ],
//     "Outputs": [
//       {
//         "Ticker": "ETC",
//         "Amount": 1
//       }
//     ],
//     "TimeMs": 69120000
//   },
export interface RecipeItem {
  Ticker: string
  Amount: number
}

export interface Recipe {
  BuildingTicker: string
  RecipeName: string
  StandardRecipeName: string
  Inputs: RecipeItem[]
  Outputs: RecipeItem[]
  TimeMs: number
}
