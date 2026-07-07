type Credentials = {
    user: string;
    password: string;
}

export const validUser: Credentials = {
    user: "standard_user",
    password: "secret_sauce",
}

export const lockedUser: Credentials = {
    user: "locked_out_user",
    password: "secret_sauce",
}