import { calculateShipping } from '../utils/shipping';

// Tableau de [distance, weight, type, résultat attendu]
const validCases: [number, number, 'standard' | 'express', number][] = [
    [10,  5,  'standard', 10],   // courte distance, léger
    [100, 5,  'standard', 25],   // moyenne distance, léger
    [600, 5,  'standard', 50],   // longue distance, léger
    [100, 20, 'standard', 37.5], // moyenne distance, lourd
    [10,  5,  'express',  20],   // express
    [100, 5,  'express',  50],   // moyenne express
];

describe('calculateShipping - cas valides', () => {
    test.each(validCases)(
        'distance=%i, weight=%i, type=%s → %f',
        (distance, weight, type, expected) => {
            expect(calculateShipping(distance, weight, type)).toBe(expected);
        }
    );
});

const errorCases: [number, number, string][] = [
    [-1, 5,  'Invalid distance'],
    [10, 0,  'Invalid weight'],
    [10, 51, 'Invalid weight'],
];

test.each(errorCases)('distance=%i, weight=%i → throws %s', (distance, weight, msg) => {
    expect(() => calculateShipping(distance, weight, 'standard')).toThrow(msg);
});