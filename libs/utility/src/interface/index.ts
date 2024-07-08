export interface PIC {
  id: string;
  username: string;
  at: Date;
}

export interface Buyer_Info {
  name: string;
  phone: string;
  email: string;
  address: string;
  at: Date;
}

export interface Image {
  id: string;
  name: string;
  url: string;
  isMain: boolean;
}
