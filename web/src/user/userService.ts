import axios, { AxiosResponse } from 'axios';

export interface Player{
    username: string,
    password: string
}

export async function login(username: string, password: string){
    
    const response: AxiosResponse = await axios.post("...", {username, password});

    
}