export interface Account {
    "accountNumber": string,
    "clientId": number,
    "accountType": string,
    "currency": string,
    "status": string
}

export interface Client {
    "id": number,
    "firstname": string,
    "lastname": string,
    "gender": string,
    "personId": string,
    "phoneNumber": string,
    "address": {
      "country": string,
      "city": string,
      "street": string
    }
    "photo"?: string
  }