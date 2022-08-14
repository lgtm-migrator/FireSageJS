import {
	DetectInvalidSegment,
	IntersectNumericRecordWithRecordStringNever,
	DetectNumericRecordType,
	DetectStringRecordType,
} from './detectInvalidSegment'
import { Users } from '../utilForTests'
import { IsSame, IsTrue } from './utils'
import {
	ErrorInvalidPathTypeNeedString,
	ErrorInvalidPathTypeOrNeedNumber,
} from './error'

describe('test ReplaceInvalidLastSegment', () => {
	it('ReplaceInvalidLastSegment positive case', () => {
		type A = DetectInvalidSegment<Users, 'a'>
		type B = DetectInvalidSegment<Users, `b/h/${string}`>
		type C = DetectInvalidSegment<Users, `b/h/${string}/s/${number}`>
		type D = DetectInvalidSegment<Users, `b/h/abc`>
		type E = DetectInvalidSegment<Users, `b/h/${string}/s/123`>

		IsTrue<IsSame<A, 'a'>>()
		IsTrue<IsSame<B, `b/h/${string}`>>()
		IsTrue<IsSame<C, `b/h/${string}/s/${number}`>>()
		IsTrue<IsSame<D, `b/h/abc`>>()
		IsTrue<IsSame<E, `b/h/${string}/s/123`>>()
	})

	it('ReplaceInvalidLastSegment negative case', () => {
		type A = DetectInvalidSegment<
			Users,
			// @ts-expect-error
			'a/b'
		>
		type B = DetectInvalidSegment<Users, `b/h/${number}`>
		type C = DetectInvalidSegment<Users, `b/h/${string}/s/${string}`>
		type D = DetectInvalidSegment<Users, `b/h/123`>
		type E = DetectInvalidSegment<Users, `b/h/${string}/s/abc`>

		IsTrue<IsSame<A, ErrorInvalidPathTypeOrNeedNumber>>()
		IsTrue<IsSame<B, ErrorInvalidPathTypeNeedString>>()
		IsTrue<IsSame<C, ErrorInvalidPathTypeOrNeedNumber>>()
		IsTrue<IsSame<D, ErrorInvalidPathTypeNeedString>>()
		IsTrue<IsSame<E, ErrorInvalidPathTypeOrNeedNumber>>()
	})

	it('test DetectAndIntersectNumericRecordType', () => {
		type A = IntersectNumericRecordWithRecordStringNever<number>
		type B = IntersectNumericRecordWithRecordStringNever<{ a: 1 }>
		type C = IntersectNumericRecordWithRecordStringNever<{ 100: 1 }>
		type D = IntersectNumericRecordWithRecordStringNever<
			Record<string, { a: 1 }>
		>
		type E = IntersectNumericRecordWithRecordStringNever<
			Record<number, { a: 1 }>
		>
		type F = IntersectNumericRecordWithRecordStringNever<
			Record<`${number}`, { a: 1 }> | number[]
		>

		IsTrue<IsSame<A, number>>()
		IsTrue<IsSame<B, { a: 1 }>>()
		IsTrue<IsSame<C, { 100: 1 }>>()
		IsTrue<IsSame<D, Record<string, { a: 1 }>>>()
		IsTrue<IsSame<E, Record<number, { a: 1 }> & Record<string, never>>>()
		IsTrue<
			IsSame<
				F,
				(Record<`${number}`, { a: 1 }> & Record<string, never>) | number[]
			>
		>()
	})
	it('test DetectNumericRecordType', () => {
		type A = DetectNumericRecordType<
			number | string | boolean | null | undefined
		>
		type B = DetectNumericRecordType<{ a: 1 }>
		type C = DetectNumericRecordType<{ 100: 1 }>
		type D = DetectNumericRecordType<Record<string, { a: 1 }>>
		type E = DetectNumericRecordType<Record<number, { a: 1 }>>
		type F = DetectNumericRecordType<Record<`${number}`, { a: 1 }> | number[]>
		type G = DetectStringRecordType<Record<number, { a: 1 }> | { a: 1 }>

		IsTrue<IsSame<A, false>>()
		IsTrue<IsSame<B, false>>()
		IsTrue<IsSame<C, true>>()
		IsTrue<IsSame<D, false>>()
		IsTrue<IsSame<E, true>>()
		IsTrue<IsSame<F, boolean>>()
		IsTrue<IsSame<G, boolean>>()
	})
	it('test DetectStringRecordType', () => {
		type A = DetectStringRecordType<
			number | string | boolean | null | undefined
		>
		type B = DetectStringRecordType<{ a: 1 }>
		type C = DetectStringRecordType<{ 100: 1 }>
		type D = DetectStringRecordType<Record<string, { a: 1 }>>
		type E = DetectStringRecordType<Record<number, { a: 1 }>>
		type F = DetectStringRecordType<Record<`${number}`, { a: 1 }> | number[]>
		type G = DetectStringRecordType<Record<number, { a: 1 }> | { a: 1 }>

		IsTrue<IsSame<A, false>>()
		IsTrue<IsSame<B, true>>()
		IsTrue<IsSame<C, false>>()
		IsTrue<IsSame<D, true>>()
		IsTrue<IsSame<E, false>>()
		IsTrue<IsSame<F, false>>()
		IsTrue<IsSame<G, boolean>>()
	})
})
