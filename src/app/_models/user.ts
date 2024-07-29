export class User {
    id?: string;
    username?: string;
    password?: string;
    firstName?: string;
    middleNames?: string;
    lastName?: string;
    profileName?: string;
    email?: string;
    phone?: string;
    authenticated?: boolean;
    message?: string;
    token?: any;
    //roles?: any; //is a HashSet from backend
    //canView?: any; //is a HashSet from backend
}
