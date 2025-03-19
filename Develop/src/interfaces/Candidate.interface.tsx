// TODO: Create an interface for the Candidate objects returned by the API

export default interface Candidate {
    name: string;
    username: string;
    avatar_url: string;
    html_url: string;
    company?: string;
    location?: string;
    email?: string;
    bio?: string;
    login: string;
};
