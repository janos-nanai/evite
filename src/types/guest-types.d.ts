export interface PartnerData {
  _id?: string;
  firstName: string;
  lastName: string;
  nickName: string;
  foodGlutenFree: boolean;
  foodLactoseFree: boolean;
  foodDiabetic: boolean;
}

export interface ChildData {
  _id?: string;
  id?: string;
  firstName: string;
  lastName: string;
  nickName: string;
  age: number;
  foodGlutenFree: boolean;
  foodLactoseFree: boolean;
  foodDiabetic: boolean;
}

export interface GuestData {
  _id?: string;
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  phone: string;
  isComing: boolean;
  didReply: boolean;
  foodGlutenFree: boolean;
  foodLactoseFree: boolean;
  foodDiabetic: boolean;
  partner: PartnerData | null;
  children: ChildData[];
  createdDate: number;
  modifiedDate: number;
}

export interface GuestDataInit {
  voucherId: string;
  voucherPass: string;
  firstName: string;
  lastName: string;
  nickName: string;
}

export interface GuestDataUpdate {
  firstName: string;
  lastName: string;
  nickName: string;
  email: string;
  phone: string;
  isComing: boolean;
  didReply: boolean;
  foodGlutenFree: boolean;
  foodLactoseFree: boolean;
  foodDiabetic: boolean;
}
