// Mock country data with sustainability metrics
// This simulates what your Spring Boot backend will return
// Replace API calls with real endpoints once backend is running

export const MOCK_COUNTRIES = [
  {
    id: 1, isoCode: 'USA', name: 'United States',
    lat: 37.09, lon: -95.71,
    co2Emissions: 14.44,
    renewablePercentage: 21,
    forestArea: 33.9,
    population: 331000000,
    gdpPerCapita: 63530
  },
  {
    id: 2, isoCode: 'CHN', name: 'China',
    lat: 35.86, lon: 104.19,
    co2Emissions: 7.38,
    renewablePercentage: 29,
    forestArea: 23.0,
    population: 1412000000,
    gdpPerCapita: 12556
  },
  {
    id: 3, isoCode: 'IND', name: 'India',
    lat: 20.59, lon: 78.96,
    co2Emissions: 1.89,
    renewablePercentage: 38,
    forestArea: 24.3,
    population: 1393000000,
    gdpPerCapita: 2277
  },
  {
    id: 4, isoCode: 'DEU', name: 'Germany',
    lat: 51.16, lon: 10.45,
    co2Emissions: 7.72,
    renewablePercentage: 46,
    forestArea: 32.7,
    population: 83200000,
    gdpPerCapita: 50794
  },
  {
    id: 5, isoCode: 'BRA', name: 'Brazil',
    lat: -14.24, lon: -51.93,
    co2Emissions: 2.25,
    renewablePercentage: 83,
    forestArea: 59.4,
    population: 214000000,
    gdpPerCapita: 7519
  },
  {
    id: 6, isoCode: 'NOR', name: 'Norway',
    lat: 60.47, lon: 8.47,
    co2Emissions: 7.02,
    renewablePercentage: 98,
    forestArea: 33.2,
    population: 5400000,
    gdpPerCapita: 89090
  },
  {
    id: 7, isoCode: 'AUS', name: 'Australia',
    lat: -25.27, lon: 133.77,
    co2Emissions: 15.22,
    renewablePercentage: 29,
    forestArea: 17.4,
    population: 25690000,
    gdpPerCapita: 55060
  },
  {
    id: 8, isoCode: 'RUS', name: 'Russia',
    lat: 61.52, lon: 105.31,
    co2Emissions: 11.44,
    renewablePercentage: 20,
    forestArea: 49.8,
    population: 144100000,
    gdpPerCapita: 12195
  },
  {
    id: 9, isoCode: 'CAN', name: 'Canada',
    lat: 56.13, lon: -106.34,
    co2Emissions: 14.33,
    renewablePercentage: 67,
    forestArea: 38.2,
    population: 38010000,
    gdpPerCapita: 52051
  },
  {
    id: 10, isoCode: 'JPN', name: 'Japan',
    lat: 36.20, lon: 138.25,
    co2Emissions: 8.73,
    renewablePercentage: 21,
    forestArea: 68.5,
    population: 125700000,
    gdpPerCapita: 40113
  },
  {
    id: 11, isoCode: 'GBR', name: 'United Kingdom',
    lat: 55.37, lon: -3.43,
    co2Emissions: 5.31,
    renewablePercentage: 43,
    forestArea: 13.1,
    population: 67220000,
    gdpPerCapita: 46344
  },
  {
    id: 12, isoCode: 'FRA', name: 'France',
    lat: 46.22, lon: 2.21,
    co2Emissions: 4.56,
    renewablePercentage: 24,
    forestArea: 31.4,
    population: 67390000,
    gdpPerCapita: 44995
  },
  {
    id: 13, isoCode: 'ZAF', name: 'South Africa',
    lat: -30.55, lon: 22.93,
    co2Emissions: 8.17,
    renewablePercentage: 14,
    forestArea: 7.6,
    population: 59310000,
    gdpPerCapita: 6001
  },
  {
    id: 14, isoCode: 'NZL', name: 'New Zealand',
    lat: -40.90, lon: 174.88,
    co2Emissions: 6.55,
    renewablePercentage: 84,
    forestArea: 38.4,
    population: 5084000,
    gdpPerCapita: 44061
  },
  {
    id: 15, isoCode: 'SWE', name: 'Sweden',
    lat: 60.12, lon: 18.64,
    co2Emissions: 3.69,
    renewablePercentage: 65,
    forestArea: 68.7,
    population: 10350000,
    gdpPerCapita: 56217
  }
]

export const getCountryByIso = (isoCode) =>
  MOCK_COUNTRIES.find(c => c.isoCode === isoCode)

export const getAllCountries = () => MOCK_COUNTRIES
