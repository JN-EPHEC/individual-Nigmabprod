import { validatePassword } from "../utils/password";
describe("Password Validator - White Box Testing", () => {
    // Test initial pour initialiser le rapport de couverture
    // Ce test ne couvre que la première ligne de la fonction (Branch 1)
    it("devrait rejeter un mot de passe vide", () => {
        const result = validatePassword("", 25);
        expect(result).toBe(false);
    });
    // Branch 2 : trop court
it("devrait rejeter un mot de passe trop court", () => {
    expect(validatePassword("Ab1!", 25)).toBe(false);
});

// Branch 3 : trop long
it("devrait rejeter un mot de passe trop long", () => {
    expect(validatePassword("Abcdefghij1!345678901", 25)).toBe(false);
});

// Branch 4 : enfant sans minuscule
it("devrait rejeter un mot de passe enfant sans minuscule", () => {
    expect(validatePassword("ABCDEFGH", 10)).toBe(false);
});

// Branch 4 : enfant valide
it("devrait accepter un mot de passe enfant valide", () => {
    expect(validatePassword("abcdefgh", 10)).toBe(true);
});

// Branch 5 : adulte sans majuscule/minuscule/chiffre
it("devrait rejeter un mot de passe adulte sans majuscule", () => {
    expect(validatePassword("abcdef1!", 25)).toBe(false);
});

// Branch 6 : adulte sans caractère spécial
it("devrait rejeter un mot de passe adulte sans caractère spécial", () => {
    expect(validatePassword("Abcdef12", 25)).toBe(false);
});

// Adulte valide (Branch final)
it("devrait accepter un mot de passe adulte valide", () => {
    expect(validatePassword("Abcdef1!", 25)).toBe(true);
});

// Branch 7 : senior sans chiffre ni majuscule
it("devrait rejeter un mot de passe senior sans chiffre ni majuscule", () => {
    expect(validatePassword("abcdefgh", 70)).toBe(false);
});

// Senior valide (Branch final)
it("devrait accepter un mot de passe senior valide", () => {
    expect(validatePassword("abcdef1A", 70)).toBe(true);
});
});
