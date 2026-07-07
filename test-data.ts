type Credentials = {
    email: string;
    password: string;
    role?: string;
}

type sauceCredentials = {
    user: string;
    password: string;
}

export const validUser: Credentials = {
    email: "mkhalmatova@solvd.com",
    password: "Solvd123",
}

export function getLoginUrl(env: string): string{
    return`https://${env}.example.com/login`
}

export const sauceUser: sauceCredentials = {
    user: "standard_user",
    password: "secret_sauce",
}