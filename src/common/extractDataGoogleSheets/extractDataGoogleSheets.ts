import { google } from 'googleapis';
import {
  IExtractDataGoogleSheets,
  ResponseExtractDataGoogleSheets,
} from './structure';

export class ExtractDataGoogleSheets implements IExtractDataGoogleSheets {
  async execute(): Promise<ResponseExtractDataGoogleSheets> {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'src/auth/auth.json',
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });
    const client = await auth.getClient();
    const googleSheets = google.sheets({
      version: 'v4',
      auth: client,
    });
    const spreadsheetId = '1GtXdWyiK2LbO8wnOldC2NXpvy30BYWTnajy-b9SYjPg';
    const getRows = await googleSheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'Página1',
      valueRenderOption: 'UNFORMATTED_VALUE',
      dateTimeRenderOption: 'FORMATTED_STRING',
    });
    return { extractData: getRows.data.values };
  }
}
