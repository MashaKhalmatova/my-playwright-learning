const retries: number = 5;  // What does VS Code show?
const user = { email: "john@test.com" };
console.log(user.email);      // What does VS Code show?

function getTimeout(seconds: number): number {
  return seconds * 1000;  // Hint: look at the return type
}
const config = { baseURL: "https://staging.example.com" };
console.log(config.baseURL);  // Hint: case matters

function printName(name: string) {
  console.log(name);
}
const userName: string | undefined = undefined;
if (userName) {
  printName(userName);  // Hint: what if userName is undefined?
}

type Product = {
    name: string;
    price: string;
    inStock: boolean;
}
const product1: Product = {
    name: "Laptop",
    price: formatPrice(999.99),
    inStock: true
};
const product2: Product = {
    name: "Phone",
    price: formatPrice(499.99),
    inStock: false
};
function formatPrice(price: number): string {
    return `$${price.toFixed(2)}`;
}