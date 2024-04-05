export declare type FetchedData = {
  comment: string;
  description: string;
  email: string;
  username: string;
  password: string;
  _id: string;
  numOfLikes: number;
  productionYear: string;
  engineCode: string;
  cardImage: Images[];
  carModel: string;
  caption: string;
  comments: Comment[];
  liked: boolean;
  data: Data;
  author: Author;
  usersWhoLiked: Author[];
};

export declare type Images = {
  _id: string;
  src: string;
  image: string;
};
export declare type Comment = {
  comment: string;
  createdAt: string;
  author: Author;
};
export declare type Author = {
  _id: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  imagePlaceholder: string;
  password: string;
  username: string;
  posts: FetchedData;
};

export declare type UserData = {
  data: Data;
};
export declare type Data = {
  avatar: string;
  imagePlaceholder: string;
  createdAt: string;
  username: string;
  _id: string;
  cardImage: string;
  description: string;
  carModel: string;
  productionYear: string;
  engineCode: string;
};
