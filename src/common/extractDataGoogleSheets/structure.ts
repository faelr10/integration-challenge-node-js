export type ResponseExtractDataGoogleSheets = {
  extractData: any[];
};

export interface IExtractDataGoogleSheets {
  execute(): Promise<ResponseExtractDataGoogleSheets>;
}
