import { validateUserRegistration } from "../utils/userValidator";

describe("validateUserRegistration - White Box Testing (100% Branch Coverage)", () => {

    // --- Branche : rôle invalide ---
    it("lève une erreur pour un rôle invalide", () => {
        expect(() => validateUserRegistration(25, "superadmin", "test@test.com")).toThrow("Rôle invalide");
    });

    // --- Branche : âge > 120 ---
    it("lève une erreur pour un âge supérieur à 120", () => {
        expect(() => validateUserRegistration(121, "user", "test@test.com")).toThrow("Âge invalide");
    });

    // --- Branche : âge < 18, rôle = stagiaire → true ---
    it("accepte un mineur avec le rôle stagiaire", () => {
        expect(validateUserRegistration(16, "stagiaire", "test@test.com")).toBe(true);
    });

    // --- Branche : âge < 18, rôle ≠ stagiaire → false ---
    it("refuse un mineur avec le rôle user", () => {
        expect(validateUserRegistration(16, "user", "test@test.com")).toBe(false);
    });

    // --- Branche : email sans @ → false ---
    it("refuse un email sans @", () => {
        expect(validateUserRegistration(25, "user", "testtest.com")).toBe(false);
    });

    // --- Branche : email avec @ mais sans point → false ---
    it("refuse un email sans point", () => {
        expect(validateUserRegistration(25, "user", "test@testcom")).toBe(false);
    });

    // --- Branche finale : tout valide → true ---
    it("accepte une inscription valide (user)", () => {
        expect(validateUserRegistration(25, "user", "test@test.com")).toBe(true);
    });

    it("accepte une inscription valide (admin)", () => {
        expect(validateUserRegistration(30, "admin", "admin@site.com")).toBe(true);
    });

    it("accepte un stagiaire majeur avec email valide", () => {
        expect(validateUserRegistration(22, "stagiaire", "stage@entreprise.be")).toBe(true);
    });
});
