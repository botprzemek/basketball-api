import { Router } from 'express'

export default interface Route {
	[key: string]: Router
}