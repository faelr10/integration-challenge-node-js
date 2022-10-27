import { Inject, Injectable } from '@nestjs/common';
import { ExtractDataGoogleSheets } from 'src/common/extractDataGoogleSheets/extractDataGoogleSheets';
import { IExtractDataGoogleSheets } from 'src/common/extractDataGoogleSheets/structure';
import { IIntegrationService, ResponseIntegrationService } from '../structure';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class IntegrationService implements IIntegrationService {
  constructor(
    @Inject(ExtractDataGoogleSheets)
    private readonly extractDataGoogleSheets: IExtractDataGoogleSheets,
    private readonly httpService: HttpService,
  ) {}

  async execute(): Promise<ResponseIntegrationService> {
    const dataGoogleSheets = await this.extractDataGoogleSheets.execute();
    const data = dataGoogleSheets.extractData;
    const extractStructureGoogleSheets = [];

    data.map((field, index) => {
      extractStructureGoogleSheets.push({
        company: data[index][0],
        name: data[index][1],
        email: data[index][2],
        phone: data[index][3],
        website: data[index][4],
      });
    });
    extractStructureGoogleSheets.shift();

    try {
      const re = /\S+@\S+\.\S+/;
      extractStructureGoogleSheets.map(async (data) => {
        if (
          re.test(data.email) &&
          data.email.includes(data.company.toLowerCase())
        ) {
          await this.httpService.axiosRef(
            `https://api.hubapi.com/contacts/v1/contact/createOrUpdate/email/${data.email}/`,
            {
              method: 'POST',
              headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${process.env.HAPI_KEY}`,
              },
              data: {
                properties: [
                  {
                    property: 'company',
                    value: data.company,
                  },
                  {
                    property: 'firstname',
                    value: data.name,
                  },
                  {
                    property: 'email',
                    value: data.email,
                  },
                  {
                    property: 'phone',
                    value: data.phone,
                  },
                  {
                    property: 'website',
                    value: data.website,
                  },
                ],
              },
            },
          );
        }
      });
    } catch (error) {
      console.log(error.response);
    }
    return { message: 'Extração realizada com sucesso!' };
  }
}
