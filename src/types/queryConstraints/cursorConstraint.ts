import { ErrorInvalidFirebaseKey, ErrorInvalidCursorValue } from './error'
import { Cursor } from './queryConstraint'
import { IsValidKey } from '../utils'

export type CursorValue = string | boolean | number | null

export type CursorConstraint = <V, K extends string = never>(
	value: V extends CursorValue ? V : ErrorInvalidCursorValue,
	key?: K extends never ? K : IsValidKey<K, K, ErrorInvalidFirebaseKey>
) => Cursor<V, K>
