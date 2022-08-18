import {
	IsNumericRecordType,
	IsStringRecordType,
	IsSame,
	IsTrue,
} from './isCommon'

describe('test ReplaceInvalidLastSegment', () => {
	it('test DetectNumericRecordType', () => {
		type A = IsNumericRecordType<number | string | boolean | null | undefined>
		type B = IsNumericRecordType<{ a: 1 }>
		type C = IsNumericRecordType<{ 100: 1 }>
		type D = IsNumericRecordType<Record<string, { a: 1 }>>
		type E = IsNumericRecordType<Record<number, { a: 1 }>>
		type F = IsNumericRecordType<Record<`${number}`, { a: 1 }> | number[]>
		type G = IsStringRecordType<Record<number, { a: 1 }> | { a: 1 }>

		IsTrue<IsSame<A, false>>()
		IsTrue<IsSame<B, false>>()
		IsTrue<IsSame<C, true>>()
		IsTrue<IsSame<D, false>>()
		IsTrue<IsSame<E, true>>()
		IsTrue<IsSame<F, boolean>>()
		IsTrue<IsSame<G, boolean>>()
	})
	it('test DetectStringRecordType', () => {
		type A = IsStringRecordType<number | string | boolean | null | undefined>
		type B = IsStringRecordType<{ a: 1 }>
		type C = IsStringRecordType<{ 100: 1 }>
		type D = IsStringRecordType<Record<string, { a: 1 }>>
		type E = IsStringRecordType<Record<number, { a: 1 }>>
		type F = IsStringRecordType<Record<`${number}`, { a: 1 }> | number[]>
		type G = IsStringRecordType<Record<number, { a: 1 }> | { a: 1 }>

		IsTrue<IsSame<A, false>>()
		IsTrue<IsSame<B, true>>()
		IsTrue<IsSame<C, false>>()
		IsTrue<IsSame<D, true>>()
		IsTrue<IsSame<E, false>>()
		IsTrue<IsSame<F, false>>()
		IsTrue<IsSame<G, boolean>>()
	})
})
