import React from 'react'
import reducer from './storeReducer'
import initialState from './initialState'

export const StoreContext = React.createContext(null)

export function StoreProvider(props) {
	const [state, dispatch] = React.useReducer(reducer, initialState)

	const value = React.useMemo(() => {
		return {
			state,
			dispatch
		}
	})

	return <StoreContext.Provider value={value} {...props} />
}
