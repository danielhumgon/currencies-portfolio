/**
 * API call to get the currencies prices
 */
import axios from 'axios'

const exchangeURL = "https://api.energiswap.exchange/v1/assets"

export const getCurrenciesPrice = async () => {
	try {
		
		const options = {
			method: 'GET',
			url: exchangeURL,
			headers: {
				Accept: 'application/json',
			}
		}
		const result = await axios(options)
		return result.data
	} catch (e) {
		return false
	}
}