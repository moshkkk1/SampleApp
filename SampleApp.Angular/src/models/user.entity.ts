export interface Base{
    id: number
}

export default interface User extends Base {
    name: string;
}