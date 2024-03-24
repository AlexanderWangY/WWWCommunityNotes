import { User } from "../types/user";

export const retrieveUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

export const loginUser = (user: any) => {
    localStorage.setItem('user', JSON.stringify(user));
}