import { calculateShipping } from '../utils/shipping';

describe('calculateShipping', () => {
    it('devrait retourner 10 pour une courte distance standard', () => {
        expect(calculateShipping(10, 5, 'standard')).toBe(10);
    });

    it('devrait appliquer la majoration de 50% pour un colis lourd', () => {
        expect(calculateShipping(100, 20, 'standard')).toBe(37.5);
    });

    it('devrait multiplier par 2 en mode express', () => {
        expect(calculateShipping(10, 5, 'express')).toBe(20);
    });

    it('devrait lever une exception si la distance est négative', () => {
        expect(() => calculateShipping(-1, 5, 'standard')).toThrow('Invalid distance');
    });

    it('devrait lever une exception si le poids est nul ou négatif', () => {
        expect(() => calculateShipping(10, 0, 'standard')).toThrow('Invalid weight');
    });

    it('devrait lever une exception si le poids dépasse 50 kg', () => {
        expect(() => calculateShipping(10, 51, 'standard')).toThrow('Invalid weight');
    });
});