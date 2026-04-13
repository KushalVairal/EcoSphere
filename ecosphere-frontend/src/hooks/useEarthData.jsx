import { useState, useEffect, useCallback } from 'react'
import { countryService } from '../services/countryService'

export function useEarthData() {
  const [countries, setCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [metricsLoading, setMetricsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [watchlist, setWatchlist] = useState([])

  // Load all countries on mount
  useEffect(() => {
    countryService.fetchAllCountries()
      .then(data => {
        setCountries(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Select a country and fetch its full metrics
  const selectCountry = useCallback(async (isoCode) => {
    if (!isoCode) {
      setSelectedCountry(null)
      return
    }
    setMetricsLoading(true)
    try {
      const data = await countryService.fetchMetrics(isoCode)
      setSelectedCountry(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setMetricsLoading(false)
    }
  }, [])

  const toggleWatchlist = useCallback(async (isoCode) => {
    const isWatched = watchlist.includes(isoCode)
    if (isWatched) {
      await countryService.removeFromWatchlist(isoCode)
      setWatchlist(prev => prev.filter(c => c !== isoCode))
    } else {
      await countryService.addToWatchlist(isoCode)
      setWatchlist(prev => [...prev, isoCode])
    }
  }, [watchlist])

  return {
    countries,
    selectedCountry,
    loading,
    metricsLoading,
    error,
    watchlist,
    selectCountry,
    toggleWatchlist,
  }
}
