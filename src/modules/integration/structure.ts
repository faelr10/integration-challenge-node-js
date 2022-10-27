export type ResponseIntegrationService = {
  message: string;
};

export interface IIntegrationService {
  execute(): Promise<ResponseIntegrationService>;
}
