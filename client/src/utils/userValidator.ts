type Role = "admin" | "user" | "stagiaire";

export function validateUserRegistration(
    age: number,
    role: string,
    email: string
): boolean {
    if (role !== "admin" && role !== "user" && role !== "stagiaire") {
        throw new Error("Rôle invalide");
    }

    if (age > 120) {
        throw new Error("Âge invalide");
    }

    if (age < 18) {
        if ((role as Role) === "stagiaire") {
            return true;
        }
        return false;
    }

    if (!email.includes("@") || !email.includes(".")) {
        return false;
    }

    return true;
}
