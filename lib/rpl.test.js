import { calculateRPL } from './rpl'

describe('calculateRPL tests', () => {
    it('calculates sum of 2 operands', () => {
        expect(calculateRPL(['1', '2', '+'])).toEqual(3)
    })
    
    it('calculates diff of 2 operands', () => {
        expect(calculateRPL(['1', '2', '-'])).toEqual(-1)
    })
    
    it('calculates multiplication of 2 operands', () => {
        expect(calculateRPL(['1', '2', '*'])).toEqual(2)
    })
    
    it('calculates division of 2 operands', () => {
        expect(calculateRPL(['1', '2', '/'])).toEqual(0.5)
    })
    
    it('throws error in case of wrong arguments order', () => {
        expect(() => calculateRPL(['1', '+', '2'])).toThrowError('Insufficient operands!')
    })
    
    it('throws error in case of wrong operator used', () => {
        expect(() => calculateRPL(['2', '2', '^'])).toThrowError(`Unknown operator '^' found!`)
    })
    
    it('throws error in case of wrong number of operands or operators', () => {
        expect(() => calculateRPL(['2', '2', '2'])).toThrowError(`Syntax error!`)
    })
    
    it('throws error in case of wrong number of operands or operators', () => {
        expect(() => calculateRPL(['2', '2', '2'])).toThrowError(`Syntax error!`)
    })
})
