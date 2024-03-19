export declare type FetchedData = {
  comment: string;
  description: string;
  email: string;
  username: string;
  password: string;
  _id: string;
  productionYear: string;
  engineCode: string;
  cardImage: Images[];
  carModel: string;
  caption: string;
  comments: Comment[];
};

export declare type Images = {
  _id: string;
  src: string;
};

export declare type Comment = {
  comment: string;
};

export declare type UserData = {
  data: Data;
};
export declare type Data = {
  avatar: string;
  imagePlaceholder: string;
  createdAt: string;
  username: string;
};
