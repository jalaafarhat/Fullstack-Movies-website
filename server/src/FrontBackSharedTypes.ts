export type ReqRegister = {
    username: string;
    email: string;
    password: string;
};
export type ResRegister = {
    isAccepted: boolean;
    username: string;
    email: string;
    sid: string;
};

export type ReqLogin = {
    email: string;
    password: string;
};
export type ResLogin = {
    isAccepted: boolean;
    username: string;
    email: string;
    ispro: boolean;
    sid: string;
};

export type ReqData = {
    sid: string;
};
export type ResData = {
    isAccepted: boolean;
    username: string;
    email: string;
    ispro: boolean;
    proContent: String;
};

export type ReqGoPro = {
    sid: string;
};
export type ResGoPro = {
    isAccepted: boolean;
    proContent: String;
};

export type Reqdelete = {
    sid: string;
};
export type Resdelete = {
    isAccepted: boolean;
};

export type ReqUpdateEmail = {
    sid: string;
    email: string;
};
export type ResUpdateEmail = {
    isAccepted: boolean;
};