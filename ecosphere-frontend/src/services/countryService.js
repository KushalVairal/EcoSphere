import apiClient from './apiClient'
import { getAllCountries, getCountryByIso } from '../mockData'

const isMockMode = () => import.meta.env.VITE_USE_MOCK === 'true'

export const countryService = {
  async fetchAllCountries() {
    if (isMockMode()) {
      await new Promise(r => setTimeout(r, 300))
      return getAllCountries()
    }
    const { data } = await apiClient.get('/countries')
    return data
  },

  async fetchMetrics(isoCode) {
    if (isMockMode()) {
      await new Promise(r => setTimeout(r, 200))
      const country = getCountryByIso(isoCode)
      if (!country) throw new Error(`Country ${isoCode} not found`)
      return country
    }
    const { data } = await apiClient.get(`/countries/${isoCode}/metrics`)
    return data
  },

  async fetchWatchlist() {
    if (isMockMode()) {
      await new Promise(r => setTimeout(r, 200))
      return []
    }
    const { data } = await apiClient.get('/users/me/watchlist')
    return data
  },

  async addToWatchlist(isoCode) {
    if (isMockMode()) {
      await new Promise(r => setTimeout(r, 150))
      return { success: true }
    }
    const { data } = await apiClient.post('/users/me/watchlist', { isoCode })
    return data
  },

  async removeFromWatchlist(isoCode) {
    if (isMockMode()) {
      await new Promise(r => setTimeout(r, 150))
      return { success: true }
    }
    await apiClient.delete(`/users/me/watchlist/${isoCode}`)
  }
}
